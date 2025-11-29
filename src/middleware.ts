import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define route patterns and their required roles
const ROUTE_PERMISSIONS = {
  // User routes - require 'user' role
  '/profile': ['user'],
  '/my-inquiries': ['user'],
  
  // Vendor routes - require 'vendor' role  
  '/dashboard': ['vendor'],
  
  // Super admin routes - require 'superadmin' or 'admin' role
  '/superadmin': ['superadmin', 'admin'],
  
  // Vendor details pages - only accessible by users (customers)
  '/vendors/': ['user'], // This will match any vendor detail page
  
  // Auth routes - accessible to all unauthenticated users
  '/auth': ['guest'],
};

// Routes that don't require authentication
const PUBLIC_ROUTES = [
  '/',
  '/vendors', // Vendor listing page (public)
  '/auth',
];

// Function to check if a route is public
function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(route => {
    if (route === '/') return pathname === '/';
    return pathname.startsWith(route) && !pathname.startsWith('/vendors/');
  });
}

// Function to check if a route is a vendor detail page
function isVendorDetailPage(pathname: string): boolean {
  const vendorDetailPattern = /^\/vendors\/[a-fA-F0-9]{24}$/;
  return vendorDetailPattern.test(pathname);
}

// Function to get user role from request
function getUserRole(request: NextRequest): string | null {
  // Try to get role from cookie first
  const roleCookie = request.cookies.get('userRole')?.value;
  if (roleCookie) return roleCookie;
  
  // Fallback: try to get from localStorage (this won't work in middleware, but we'll handle it)
  // The client-side will need to set cookies when auth state changes
  return null;
}

// Function to check if user is authenticated
function isAuthenticated(request: NextRequest): boolean {
  const accessToken = request.cookies.get('accessToken')?.value;
  return !!accessToken;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow public routes
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }
  
  // Get user authentication status and role
  const authenticated = isAuthenticated(request);
  const userRole = getUserRole(request);
  
  // Handle vendor detail pages (e.g., /vendors/6927c3249b529b4fc5582475)
  if (isVendorDetailPage(pathname)) {
    if (!authenticated) {
      // Redirect unauthenticated users to signin
      return NextResponse.redirect(new URL('/auth/customer/signin', request.url));
    }
    
      if (userRole !== 'user') {
        // Only users (customers) can view vendor detail pages
        // Redirect vendors to their dashboard, admins to their panel
        if (userRole === 'vendor') {
          return NextResponse.redirect(new URL('/dashboard', request.url));
        } else if (userRole === 'superadmin' || userRole === 'admin') {
          return NextResponse.redirect(new URL('/superadmin/dashboard', request.url));
        } else {
          // Unknown role, redirect to home
          return NextResponse.redirect(new URL('/', request.url));
        }
      }    return NextResponse.next();
  }
  
  // Check specific route permissions
  for (const [route, allowedRoles] of Object.entries(ROUTE_PERMISSIONS)) {
    if (pathname.startsWith(route)) {
      // Check if user is authenticated
      if (!authenticated && !allowedRoles.includes('guest')) {
        // Redirect to appropriate signin page based on route
        if (route.startsWith('/superadmin')) {
          return NextResponse.redirect(new URL('/auth/superadmin/signin', request.url));
        } else if (route.startsWith('/dashboard')) {
          return NextResponse.redirect(new URL('/auth/vendor/signin', request.url));
        } else {
          return NextResponse.redirect(new URL('/auth/customer/signin', request.url));
        }
      }
      
      // Check role permissions
      if (authenticated && userRole && !allowedRoles.includes(userRole)) {
        // Redirect based on user's actual role
        switch (userRole) {
          case 'user':
            return NextResponse.redirect(new URL('/profile', request.url));
          case 'vendor':
            return NextResponse.redirect(new URL('/dashboard', request.url));
          case 'superadmin':
          case 'admin':
            return NextResponse.redirect(new URL('/superadmin/dashboard', request.url));
          default:
            return NextResponse.redirect(new URL('/', request.url));
        }
      }
      
      break;
    }
  }
  
  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg).*)',
  ],
};