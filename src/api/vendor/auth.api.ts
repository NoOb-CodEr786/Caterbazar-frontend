import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Types
interface Vendor {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
  accountStatus: string;
  profilePicture: string | null;
  loginAttempts: number;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

interface SignupResponse {
  statusCode: number;
  data: {
    user: Vendor;
  };
  message: string;
  success: boolean;
}

interface LoginResponse {
  statusCode: number;
  data: {
    user: Vendor;
    accessToken: string;
    refreshToken: string;
  };
  message: string;
  success: boolean;
}

interface VerifyOTPResponse {
  statusCode: number;
  data: {
    user: Vendor;
    accessToken: string;
    refreshToken: string;
  };
  message: string;
  success: boolean;
}

interface ResendOTPResponse {
  statusCode: number;
  data: object;
  message: string;
  success: boolean;
}

// Axios instance for vendor auth
const vendorAuthAPI = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Vendor Signup
export const vendorSignup = async (signupData: {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}): Promise<SignupResponse> => {
  try {
    const response = await vendorAuthAPI.post<SignupResponse>("/auth/signup", {
      ...signupData,
      role: "vendor",
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || {
      message: "Signup failed. Please try again.",
      success: false,
    };
  }
};

// Vendor Login
export const vendorLogin = async (loginData: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  try {
    const response = await vendorAuthAPI.post<LoginResponse>("/auth/login", loginData);
    
    // Store tokens and user data in localStorage
    if (response.data.success && response.data.data.accessToken) {
      localStorage.setItem("accessToken", response.data.data.accessToken);
      localStorage.setItem("refreshToken", response.data.data.refreshToken);
      localStorage.setItem("role", response.data.data.user.role);
      localStorage.setItem("vendorData", JSON.stringify(response.data.data.user));
    }
    
    return response.data;
  } catch (error: any) {
    throw error.response?.data || {
      message: "Login failed. Please try again.",
      success: false,
    };
  }
};

// Verify OTP
export const vendorVerifyOTP = async (otpData: {
  phoneNumber: string;
  otp: string;
}): Promise<VerifyOTPResponse> => {
  try {
    const response = await vendorAuthAPI.post<VerifyOTPResponse>("/auth/verify-otp", otpData);
    
    // Store tokens and user data in localStorage after successful verification
    if (response.data.success && response.data.data.accessToken) {
      localStorage.setItem("accessToken", response.data.data.accessToken);
      localStorage.setItem("refreshToken", response.data.data.refreshToken);
      localStorage.setItem("role", response.data.data.user.role);
      localStorage.setItem("vendorData", JSON.stringify(response.data.data.user));
    }
    
    return response.data;
  } catch (error: any) {
    throw error.response?.data || {
      message: "OTP verification failed. Please try again.",
      success: false,
    };
  }
};

// Resend OTP
export const vendorResendOTP = async (phoneNumber: string): Promise<ResendOTPResponse> => {
  try {
    const response = await vendorAuthAPI.post<ResendOTPResponse>("/auth/resend-otp", {
      phoneNumber,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || {
      message: "Failed to resend OTP. Please try again.",
      success: false,
    };
  }
};

// Get Current Vendor
export const getCurrentVendor = async (): Promise<Vendor | null> => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return null;

    const response = await vendorAuthAPI.get<{ data: { user: Vendor } }>("/auth/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    
    return response.data.data.user;
  } catch (error) {
    return null;
  }
};

// Logout
export const vendorLogout = async (): Promise<void> => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    
    if (refreshToken) {
      await vendorAuthAPI.post("/auth/logout", { refreshToken });
    }
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    // Clear localStorage regardless of API call success
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    localStorage.removeItem("vendorData");
  }
};

export type { Vendor, SignupResponse, LoginResponse, VerifyOTPResponse, ResendOTPResponse };
