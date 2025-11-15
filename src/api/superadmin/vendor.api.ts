import api from './auth.api';

// Types
export interface Vendor {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
  accountStatus: 'active' | 'pending' | 'suspended';
  profilePicture: string | null;
  loginAttempts: number;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
}

export interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface GetVendorsResponse {
  statusCode: number;
  data: {
    vendors: Vendor[];
    pagination: PaginationData;
  };
  message: string;
  success: boolean;
}

export interface GetVendorByIdResponse {
  statusCode: number;
  data: {
    vendor: Vendor;
  };
  message: string;
  success: boolean;
}

/**
 * Get all vendors with pagination
 */
export const getAllVendors = async (
  page: number = 1,
  limit: number = 10,
  status?: string,
  search?: string
): Promise<GetVendorsResponse> => {
  try {
    const params: any = {
      page,
      limit,
    };

    if (status && status !== 'all') {
      params.status = status;
    }

    if (search) {
      params.search = search;
    }

    const response = await api.get<GetVendorsResponse>('/admin/vendors', { params });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Failed to fetch vendors' };
  }
};

/**
 * Get vendor by ID
 */
export const getVendorById = async (vendorId: string): Promise<GetVendorByIdResponse> => {
  try {
    const response = await api.get<GetVendorByIdResponse>(`/admin/vendors/${vendorId}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Failed to fetch vendor details' };
  }
};

/**
 * Update vendor status
 */
export const updateVendorStatus = async (
  vendorId: string,
  status: 'active' | 'suspended' | 'pending'
): Promise<any> => {
  try {
    const response = await api.patch(`/admin/vendors/${vendorId}/status`, { status });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Failed to update vendor status' };
  }
};
