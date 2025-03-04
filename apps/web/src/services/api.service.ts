import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ERROR_CODE_MAP } from "../constants/errorMessages";

// response
export interface ApiResponse<T> {
  data?: T;
  message?: string | string[];  // Always return string array
  errorCode?: string;
  statusCode?: number;  // Make statusCode required
  success: boolean;
}

interface PaginatedData<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// paginated response
export interface PaginatedResponse<T> extends ApiResponse<PaginatedData<T>> {
  data: PaginatedData<T>;
}

// pagination params
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

interface IRequestConfig extends AxiosRequestConfig {
  silent?: boolean;
}

class ApiService {
  private api: AxiosInstance;
  private static instance: ApiService;

  private constructor() {
    // create axios instance
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api/v1',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // request interceptor
    this.api.interceptors.request.use(
      (config) => {
        // add token to the request headers
        // const token = localStorage.getItem('token');
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // response interceptor
    this.api.interceptors.response.use(
      (response) => {
        // Return response directly, let request method handle the logic
        return response;
      },
      (error: AxiosError<ApiResponse<any>>) => {
        // If server returned a response, use it
        if (error.response?.data) {
          return Promise.reject(error.response.data);
        }

        // Handle network or other errors
        return Promise.reject({
          statusCode: 500,
          errorCode: 'NETWORK_ERROR',
          message: error.message || 'Network connection error'
        });
      }
    );
  }

  // singleton instance
  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }


  // common request method
  private async request<T>(config: IRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.api(config);
      const { data, statusCode, message, errorCode } = response.data;

      // If statusCode is not 200, treat as error
      if (statusCode !== 200) {
        throw {
          statusCode,
          message,
          errorCode,
          success: false
        };
      }

      // Return success response
      return {
        success: true,
        data,
        message: "success",
      };
    } catch (error: any) {
      let mappedMessage = error.message;
      if (error.errorCode && Object.prototype.hasOwnProperty.call(ERROR_CODE_MAP, error.errorCode)) {
        mappedMessage = ERROR_CODE_MAP[error.errorCode as keyof typeof ERROR_CODE_MAP];
      }
      // Handle error response
      const errorResponse: ApiResponse<T> = {
        success: false,
        statusCode: error.statusCode || 500,
        message: this.formatMessageToArray(mappedMessage),
        errorCode: error.errorCode || 'UNKNOWN_ERROR'
      };

      // Log error if not silent
      if (!config.silent) {
        console.error('API Error:', errorResponse);
      }

      return errorResponse;
    }
  }

  // Helper function to format message to array
  private formatMessageToArray(message: string | string[] | undefined): string[] {
    if (!message) {
      return ['Unknown error'];
    }
    if (Array.isArray(message)) {
      return message;
    }
    return [message];
  }

  // GET Request
  public async get<T>(url: string, params?: any): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: 'GET',
      url,
      params,
    });
  }

  // POST Request
  public async post<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: 'POST',
      url,
      data,
    });
  }

  // PUT Request
  public async put<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: 'PUT',
      url,
      data,
    });
  }

  // PATCH Request
  public async patch<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: 'PATCH',
      url,
      data,
    });
  }

  // DELETE Request
  public async delete<T>(url: string): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: 'DELETE',
      url,
    });
  }

  // Get Paginated Data
  public async getPaginated<T>(
    url: string,
    params: PaginationParams = {}
  ): Promise<PaginatedResponse<T>> {
    try {
      const response = await this.get<{ items: T[], total: number, page: number, pageSize: number, totalPages: number }>(
        url,
        params
      );

      if (!response.success || !response.data) {
        throw response;
      }

      return {
        ...response,
        data: {
          items: response.data.items,
          total: response.data.total,
          page: response.data.page,
          pageSize: response.data.pageSize,
          totalPages: response.data.totalPages,
        },
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to fetch paginated data',
        errorCode: error.errorCode || 'PAGINATION_ERROR',
        statusCode: error.statusCode || 500,
        data: {
          items: [],
          total: 0,
          page: 1,
          pageSize: 10,
          totalPages: 0,
        },
      };
    }
  }
}

// Export Singleton Instance
export const apiService = ApiService.getInstance();

// Export Types
export default apiService; 