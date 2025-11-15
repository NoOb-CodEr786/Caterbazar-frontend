import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Types
interface User {
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
    user: User;
  };
  message: string;
  success: boolean;
}

interface LoginResponse {
  statusCode: number;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
  message: string;
  success: boolean;
}

interface VerifyOTPResponse {
  statusCode: number;
  data: {
    user: User;
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

// Axios instance for user auth
const userAuthAPI = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// User Signup
export const userSignup = async (signupData: {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}): Promise<SignupResponse> => {
  try {
    const response = await userAuthAPI.post<SignupResponse>("/auth/signup", {
      ...signupData,
      role: "user",
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || {
      message: "Signup failed. Please try again.",
      success: false,
    };
  }
};

// User Login
export const userLogin = async (loginData: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  try {
    const response = await userAuthAPI.post<LoginResponse>("/auth/login", loginData);
    
    // Store tokens in localStorage
    if (response.data.success && response.data.data.accessToken) {
      localStorage.setItem("accessToken", response.data.data.accessToken);
      localStorage.setItem("refreshToken", response.data.data.refreshToken);
      localStorage.setItem("userRole", response.data.data.user.role);
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
export const verifyOTP = async (otpData: {
  phoneNumber: string;
  otp: string;
}): Promise<VerifyOTPResponse> => {
  try {
    const response = await userAuthAPI.post<VerifyOTPResponse>("/auth/verify-otp", otpData);
    
    // Store tokens in localStorage after successful verification
    if (response.data.success && response.data.data.accessToken) {
      localStorage.setItem("accessToken", response.data.data.accessToken);
      localStorage.setItem("refreshToken", response.data.data.refreshToken);
      localStorage.setItem("userRole", response.data.data.user.role);
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
export const resendOTP = async (phoneNumber: string): Promise<ResendOTPResponse> => {
  try {
    const response = await userAuthAPI.post<ResendOTPResponse>("/auth/resend-otp", {
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

// Get Current User
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return null;

    const response = await userAuthAPI.get<{ data: { user: User } }>("/auth/me", {
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
export const userLogout = async (): Promise<void> => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    
    if (refreshToken) {
      await userAuthAPI.post("/auth/logout", { refreshToken });
    }
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    // Clear localStorage regardless of API call success
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userRole");
  }
};

export type { User, SignupResponse, LoginResponse, VerifyOTPResponse, ResendOTPResponse };
