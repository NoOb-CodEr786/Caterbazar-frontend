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

interface VendorProfileResponse {
  statusCode: number;
  data: {
    vendor: Vendor;
  };
  message: string;
  success: boolean;
}

interface UpdateProfileResponse {
  statusCode: number;
  data: {
    vendor: Vendor;
  };
  message: string;
  success: boolean;
}

// Axios instance for vendor API
const vendorAPI = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token
vendorAPI.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle 401 errors
vendorAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear tokens and redirect to login
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("role");
      localStorage.removeItem("vendorData");
      window.location.href = "/auth/vendor/signin";
    }
    return Promise.reject(error);
  }
);

// Get Vendor Profile
export const getVendorProfile = async (): Promise<VendorProfileResponse> => {
  try {
    const response = await vendorAPI.get<VendorProfileResponse>("/vendors/profile/me");
    return response.data;
  } catch (error: any) {
    throw error.response?.data || {
      message: "Failed to fetch profile. Please try again.",
      success: false,
    };
  }
};

// Update Vendor Profile
export const updateVendorProfile = async (profileData: {
  fullName?: string;
  profilePicture?: string | null;
}): Promise<UpdateProfileResponse> => {
  try {
    const response = await vendorAPI.put<UpdateProfileResponse>("/vendors/profile", profileData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || {
      message: "Failed to update profile. Please try again.",
      success: false,
    };
  }
};

export type { Vendor, VendorProfileResponse, UpdateProfileResponse };
