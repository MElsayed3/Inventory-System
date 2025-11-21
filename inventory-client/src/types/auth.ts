// src/types/auth.ts

/**
 * Interface for the data sent to POST /api/auth/login
 */
export interface LoginRequest {
  employee_code: string;
  password: string;
}

/**
 * Interface for the data received from the successful login response (200 OK)
 */
export interface LoginResponse {
  token: string;
  role: 'مدير' | 'مخزن' | 'صيانة'; // The defined roles in the system
  employeeCode: string;
  message: string;
}

/**
 * Interface to store the user's authentication state locally
 */
export interface AuthState {
  token: string | null;
  role: 'مدير' | 'مخزن' | 'صيانة' | null;
  employeeCode: string | null;
  isAuthenticated: boolean;
}