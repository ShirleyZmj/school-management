import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// response
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  errorCode?: string;
  statusCode?: number;
  success?: boolean;
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
  pageSize?: number;
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
        const { statusCode, message, errorCode } = response.data;
        if (statusCode !== 200) {
          return Promise.reject({
            success: false,
            statusCode,
            message,
            errorCode,
          });
        } else {
          return response;
        }
      },
      (error: AxiosError) => {
        // handle error response
        if (error.response) {
          // server returned an error status code
          const { status } = error.response;

          if (status === 401) {
            // unauthorized, you can handle the logout logic here
            // localStorage.removeItem('token');
            // window.location.href = '/login';
          }

          return Promise.reject({
            success: false,
            errorCode: 'UNKNOWN_SERVER_ERROR',
            message: 'Unknown server error',
            statusCode: status,
          });
        }

        // network error or request cancelled
        return Promise.reject({
          success: false,
          errorCode: 'NETWORK_ERROR',
          message: error.message || 'Network error',
          statusCode: error.code || 500,
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
      const response: ApiResponse<T> = await this.api(config);
      return {
        success: true,
        statusCode: response.statusCode,
        data: response.data,
      };
    } catch (error: any) {
      let errorResponse: ApiResponse<T> = {
        message: error.message || 'Unknown error',
        errorCode: error.errorCode || 'UNKNOWN_ERROR',
        statusCode: error.statusCode || 500,
      };
      if (config.silent === false) {
        console.error(errorResponse);
      }
      return errorResponse;
    }
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