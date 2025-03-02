import apiService, { ApiResponse, PaginatedResponse, PaginationParams } from './api.service';

// teacher model
export interface Teacher {
  id: number;
  name: string;
  email: string;
  subject: string;
  contactNumber: string;
}

// create teacher request
export interface CreateTeacherRequest {
  name: string;
  email: string;
  subject: string;
  contactNumber: string;
}

// update teacher request
export interface UpdateTeacherRequest {
  name?: string;
  email?: string;
  subject?: string;
  contactNumber?: string;
}

class TeachersService {
  private static instance: TeachersService;
  private baseUrl = '/teachers';

  private constructor() { }

  public static getInstance(): TeachersService {
    if (!TeachersService.instance) {
      TeachersService.instance = new TeachersService();
    }
    return TeachersService.instance;
  }

  // get all teachers (paginated)
  public async getTeachers(params: PaginationParams = {}): Promise<PaginatedResponse<Teacher>> {
    return apiService.getPaginated<Teacher>(this.baseUrl, params);
  }

  // get all teachers
  public async getAllTeachers(): Promise<ApiResponse<Teacher[]>> {
    return apiService.get<Teacher[]>(this.baseUrl);
  }

  // get a single teacher
  public async getTeacher(id: number): Promise<ApiResponse<Teacher>> {
    return apiService.get<Teacher>(`${this.baseUrl}/${id}`);
  }

  // create a teacher
  public async createTeacher(data: CreateTeacherRequest): Promise<ApiResponse<Teacher>> {
    return apiService.post<Teacher>(this.baseUrl, data);
  }

  // update a teacher
  public async updateTeacher(id: number, data: UpdateTeacherRequest): Promise<ApiResponse<Teacher>> {
    return apiService.patch<Teacher>(`${this.baseUrl}/${id}`, data);
  }

  // delete a teacher
  public async deleteTeacher(id: number): Promise<ApiResponse<void>> {
    return apiService.delete<void>(`${this.baseUrl}/${id}`);
  }
}

// export singleton instance
export const teachersService = TeachersService.getInstance();

export default teachersService; 