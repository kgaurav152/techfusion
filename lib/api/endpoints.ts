/**
 * API endpoint constants and typed service functions
 */

import { apiClient } from './client';
import type {
  ApiResponse,
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  User,
  Event,
  EventRegistrationPayload,
  Participation,
  UpdateParticipationStatusPayload,
  CreateEventPayload,
  UpdateEventPayload,
  Result,
  CreateResultPayload,
  VerifyCertificatePayload,
  Stats,
  Coordinator,
  CampusAmbassador,
} from '@/types';

// Authentication Endpoints
export const authApi = {
  login: (payload: LoginPayload) =>
    apiClient.post<AuthResponse>('/api/login', payload),

  register: (payload: RegisterPayload) =>
    apiClient.post<AuthResponse>('/api/signup', payload),

  logout: () =>
    apiClient.post<ApiResponse>('/api/logout'),

  forgotPassword: (payload: ForgotPasswordPayload) =>
    apiClient.post<ApiResponse>('/api/forgotPassword', payload),

  resetPassword: (payload: ResetPasswordPayload) =>
    apiClient.post<ApiResponse>('/api/resetPassword', payload),

  getUserDetails: () =>
    apiClient.get<ApiResponse<User>>('/api/userDetails'),
};

// Event Endpoints
export const eventApi = {
  getAll: (params?: { category?: string; type?: string; isActive?: boolean }) =>
    apiClient.get<ApiResponse<Event[]>>('/api/event', params),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Event>>(`/api/event/${id}`),

  create: (payload: CreateEventPayload) =>
    apiClient.post<ApiResponse<Event>>('/api/event', payload),

  update: (id: string, payload: UpdateEventPayload) =>
    apiClient.put<ApiResponse<Event>>(`/api/event/${id}`, payload),

  delete: (id: string) =>
    apiClient.delete<ApiResponse>(`/api/event/${id}`),

  getMyEvents: () =>
    apiClient.get<ApiResponse<Event[]>>('/api/myEventDetails'),
};

// Registration Endpoints
export const registrationApi = {
  register: (payload: EventRegistrationPayload) =>
    apiClient.post<ApiResponse<Participation>>('/api/eventRegistration', payload),

  getMyRegistrations: () =>
    apiClient.get<ApiResponse<Participation[]>>('/api/getParticipationDetails'),

  getByEvent: (eventId: string) =>
    apiClient.get<ApiResponse<Participation[]>>('/api/getParticipantsByEvent', { eventId }),

  getPending: () =>
    apiClient.get<ApiResponse<Participation[]>>('/api/getPendingParticipants'),

  updateStatus: (payload: UpdateParticipationStatusPayload) =>
    apiClient.post<ApiResponse>('/api/updateStatus', payload),

  deleteParticipation: (participationId: string) =>
    apiClient.delete<ApiResponse>(`/api/deleteParticipation/${participationId}`),
};

// Result Endpoints
export const resultApi = {
  create: (payload: CreateResultPayload) =>
    apiClient.post<ApiResponse<Result>>('/api/result', payload),

  getByEvent: (eventId: string) =>
    apiClient.get<ApiResponse<Result[]>>(`/api/result/${eventId}`),

  verifyCertificate: (payload: VerifyCertificatePayload) =>
    apiClient.post<ApiResponse>('/api/verifyCertificate', payload),
};

// Coordinator Endpoints
export const coordinatorApi = {
  getAll: () =>
    apiClient.get<ApiResponse<Coordinator[]>>('/api/getAllCoordinator'),

  create: (payload: Partial<Coordinator>) =>
    apiClient.post<ApiResponse<Coordinator>>('/api/coordinator', payload),

  update: (id: string, payload: Partial<Coordinator>) =>
    apiClient.put<ApiResponse<Coordinator>>(`/api/coordinator/${id}`, payload),

  delete: (id: string) =>
    apiClient.delete<ApiResponse>(`/api/coordinator/${id}`),
};

// Campus Ambassador Endpoints
export const campusAmbassadorApi = {
  getAll: () =>
    apiClient.get<ApiResponse<CampusAmbassador[]>>('/api/campusAmbassador'),

  create: (payload: Partial<CampusAmbassador>) =>
    apiClient.post<ApiResponse<CampusAmbassador>>('/api/campusAmbassador', payload),

  update: (id: string, payload: Partial<CampusAmbassador>) =>
    apiClient.put<ApiResponse<CampusAmbassador>>(`/api/campusAmbassador/${id}`, payload),
};

// Admin Endpoints
export const adminApi = {
  getStats: () =>
    apiClient.get<ApiResponse<Stats>>('/api/getAllStats'),

  getAllParticipants: () =>
    apiClient.get<ApiResponse<User[]>>('/api/getAllParticipants'),

  deleteUser: (userId: string) =>
    apiClient.delete<ApiResponse>(`/api/deleteUser/${userId}`),
};

// Hospitality Endpoints
export const hospitalityApi = {
  getAccommodations: () =>
    apiClient.get<ApiResponse>('/api/hospitality'),

  createAccommodation: (payload: any) =>
    apiClient.post<ApiResponse>('/api/hospitality', payload),
};

// School Endpoints
export const schoolApi = {
  getEvents: () =>
    apiClient.get<ApiResponse>('/api/school'),

  createEvent: (payload: any) =>
    apiClient.post<ApiResponse>('/api/school', payload),
};
