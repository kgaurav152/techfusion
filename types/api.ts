/**
 * API request and response types
 */

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  statusCode?: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
  college?: string;
  department?: string;
  year?: string;
  role?: string;
}

export interface UpdateUserPayload {
  name?: string;
  phone?: string;
  college?: string;
  department?: string;
  year?: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface CreateEventPayload {
  title: string;
  description: string;
  category: string;
  eventType: 'technical' | 'cultural' | 'workshop' | 'competition';
  date: string | Date;
  venue: string;
  capacity: number;
  image?: string;
  rules?: string[];
  coordinators?: string[];
  prizePool?: number;
  registrationDeadline?: string | Date;
  teamSize?: {
    min: number;
    max: number;
  };
}

export interface UpdateEventPayload extends Partial<CreateEventPayload> {
  isActive?: boolean;
}

export interface EventRegistrationPayload {
  eventId: string;
  teamName?: string;
  teamMembers?: string[];
}

export interface UpdateParticipationStatusPayload {
  participationId: string;
  status: 'approved' | 'rejected' | 'cancelled';
  remarks?: string;
}

export interface CreateResultPayload {
  eventId: string;
  participationId: string;
  position: number;
  prize?: string;
  remarks?: string;
}

export interface VerifyCertificatePayload {
  certificateId: string;
  verificationCode: string;
}

export interface QueryPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
  details?: any;
}

export interface FileUploadResponse {
  success: boolean;
  url: string;
  publicId: string;
  format: string;
  resourceType: string;
}
