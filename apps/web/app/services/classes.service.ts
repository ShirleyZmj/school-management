import apiService, { ApiResponse, PaginatedResponse, PaginationParams } from './api.service';
import { Teacher } from './teachers.service';

// class model
export interface Class {
  id: number;
  name: string;
  level: string;
  formTeacherId: number;
  formTeacher?: Teacher;
}

// create class request
export interface CreateClassRequest {
  name: string;
  level: string;
  formTeacherId: number;
}

// update class request
export interface UpdateClassRequest {
  name?: string;
  level?: string;
  formTeacherId?: number;
}

class ClassesService {
  private static instance: ClassesService;
  private baseUrl = '/classes';

  private constructor() { }

  public static getInstance(): ClassesService {
    if (!ClassesService.instance) {
      ClassesService.instance = new ClassesService();
    }
    return ClassesService.instance;
  }

  // get all classes (paginated)
  public async getClasses(params: PaginationParams = {}): Promise<PaginatedResponse<Class>> {
    return apiService.getPaginated<Class>(this.baseUrl, params);
  }

  // get a single class
  public async getClass(id: number): Promise<ApiResponse<Class>> {
    return apiService.get<Class>(`${this.baseUrl}/${id}`);
  }

  // create a class
  public async createClass(data: CreateClassRequest): Promise<ApiResponse<Class>> {
    return apiService.post<Class>(this.baseUrl, data);
  }

  // update a class
  public async updateClass(id: number, data: UpdateClassRequest): Promise<ApiResponse<Class>> {
    return apiService.patch<Class>(`${this.baseUrl}/${id}`, data);
  }

  // delete a class
  public async deleteClass(id: number): Promise<ApiResponse<void>> {
    return apiService.delete<void>(`${this.baseUrl}/${id}`);
  }
}

// export singleton instance
export const classesService = ClassesService.getInstance();

export default classesService; 