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

  // get all classes
  public async getAllClasses(): Promise<ApiResponse<Class[]>> {
    return apiService.get<Class[]>(this.baseUrl);
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

  public async getAll(): Promise<Class[]> {
    return apiService.get<Class[]>(this.baseUrl);
  }

  public async getById(id: number): Promise<Class> {
    return apiService.get<Class>(`${this.baseUrl}/${id}`);
  }

  public async create(classData: Partial<Class>): Promise<Class> {
    const response = await apiService.post("/classes", classData);
    return response.data;
  }

  public async update(id: number, classData: Partial<Class>): Promise<Class> {
    const response = await apiService.patch(`/classes/${id}`, classData);
    return response.data;
  }

  public async delete(id: number): Promise<void> {
    await apiService.delete(`/classes/${id}`);
  }
}

// export singleton instance
export const classesService = ClassesService.getInstance();

export default classesService; 