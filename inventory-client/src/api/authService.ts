// src/api/authService.ts

import apiClient from './axios';
import axios from 'axios';
// استخدام 'import type' للـ Interfaces بسبب ضبط TypeScript الصارم
import type { LoginRequest, LoginResponse } from '../types/auth'; 

/**
 * Handles the login request by posting credentials to the backend.
 * * @param credentials - Employee code and password.
 * @returns A promise that resolves with the LoginResponse data (token, role, etc.).
 * @throws An Error if login fails or a network issue occurs.
 */
export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    // النجاح: يتم إرجاع بيانات الاستجابة
    return response.data;
  } catch (error) {
    // فشل: معالجة الأخطاء وطرحها للـ Component ليتلقاها
    
    // 1. معالجة أخطاء Axios (مثل 401 Unauthorized)
    if (axios.isAxiosError(error) && error.response) {
      // طرح رسالة الخطأ المخصصة القادمة من السيرفر (مثل 'Invalid credentials')
      throw new Error(error.response.data.message || 'Login failed due to server error.');
    }

    // 2. معالجة الأخطاء الأخرى غير المتوقعة (مثل مشاكل الشبكة)
    throw new Error('An unexpected network error occurred.');
  }
};