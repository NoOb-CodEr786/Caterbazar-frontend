"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { userLogout } from "@/api/user/auth.api";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = async () => {
    await userLogout();
    setIsAuthenticated(false);
    router.push("/auth/customer/signin");
  };

  return (
    <nav className="bg-orange-600  sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Side - Logo and Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <img
                src="/images/logo.png"
                alt="Caterbazar Logo"
                className="h-10 w-auto filter brightness-0 invert"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/vendors"
                className="text-white hover:text-orange-300 font-medium transition-colors"
              >
                Vendors
              </Link>
              <Link
                href="/photos"
                className="text-white hover:text-orange-300 font-medium transition-colors"
              >
                Photos
              </Link>
              <Link
                href="/blogs"
                className="text-white hover:text-orange-300 font-medium transition-colors"
              >
                Blogs
              </Link>
            </div>
          </div>

          {/* Right Side - Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors"
                >
                  <User className="w-5 h-5 text-white" />
                </button>
                
                {showProfileMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setShowProfileMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-20">
                      <Link
                        href="/profile"
                        className="px-4 py-2 text-gray-700 hover:bg-orange-50 transition-colors flex items-center gap-2"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <User className="w-4 h-4" />
                        My Profile
                      </Link>
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          handleLogout();
                        }}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-orange-50 transition-colors flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/auth"
                  className="text-white hover:text-orange-300 font-semibold transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/auth/customer/signup"
                  className="px-4 py-2 bg-white text-orange-600 rounded-lg hover:bg-orange-50 font-semibold transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-orange-300"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <div className="flex flex-col space-y-4">
             
              <Link
                href="/vendors"
                className="text-white hover:text-orange-300 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Vendors
              </Link>
              <Link
                href="/photos"
                className="text-white hover:text-orange-300 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Photos
              </Link>
              <Link
                href="/blogs"
                className="text-white hover:text-orange-300 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Blogs
              </Link>

              <div className="pt-4 border-t border-white/20 space-y-3">
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/profile"
                      className="block text-center text-white hover:text-orange-300 font-semibold transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleLogout();
                      }}
                      className="w-full text-center text-white hover:text-orange-300 font-semibold transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth"
                      className="block text-center text-white hover:text-orange-300 font-semibold transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/auth/customer/signup"
                      className="block text-center px-4 py-2 bg-white text-orange-600 rounded-lg hover:bg-orange-50 font-semibold transition-colors mx-4"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
