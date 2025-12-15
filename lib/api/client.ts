/**
 * Centralized API client with error handling and request interceptors
 */

import type { ApiError } from '@/types';

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');

    if (!response.ok) {
      const error: ApiError = {
        message: 'An error occurred',
        statusCode: response.status,
      };

      if (isJson) {
        const errorData = await response.json();
        error.message = errorData.message || errorData.error || error.message;
        error.code = errorData.code;
        error.details = errorData.details;
      } else {
        error.message = response.statusText || error.message;
      }

      throw error;
    }

    if (isJson) {
      return response.json();
    }

    return response.text() as any;
  }

  private getHeaders(customHeaders?: HeadersInit): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...customHeaders,
    };

    return headers;
  }

  private buildUrl(endpoint: string, params?: Record<string, any>): string {
    const url = new URL(endpoint, this.baseUrl || window.location.origin);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return url.toString();
  }

  /**
   * Generic request method with error handling
   */
  async request<T = any>(
    endpoint: string,
    options: RequestInit & { params?: Record<string, any> } = {}
  ): Promise<T> {
    const { params, headers, ...restOptions } = options;
    const url = this.buildUrl(endpoint, params);

    try {
      const response = await fetch(url, {
        ...restOptions,
        headers: this.getHeaders(headers),
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      if ((error as ApiError).statusCode) {
        throw error;
      }

      const apiError: ApiError = {
        message: error instanceof Error ? error.message : 'Network error occurred',
        code: 'NETWORK_ERROR',
      };

      throw apiError;
    }
  }

  /**
   * GET request
   */
  async get<T = any>(endpoint: string, params?: Record<string, any>): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', params });
  }

  /**
   * POST request
   */
  async post<T = any>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    });
  }

  /**
   * PUT request
   */
  async put<T = any>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
    });
  }

  /**
   * PATCH request
   */
  async patch<T = any>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
      ...options,
    });
  }

  /**
   * DELETE request
   */
  async delete<T = any>(endpoint: string, params?: Record<string, any>): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE', params });
  }

  /**
   * Upload file with multipart/form-data
   */
  async upload<T = any>(endpoint: string, formData: FormData): Promise<T> {
    const url = this.buildUrl(endpoint);

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      if ((error as ApiError).statusCode) {
        throw error;
      }

      const apiError: ApiError = {
        message: error instanceof Error ? error.message : 'Upload failed',
        code: 'UPLOAD_ERROR',
      };

      throw apiError;
    }
  }
}

export const apiClient = new ApiClient();
