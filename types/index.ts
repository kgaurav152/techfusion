/**
 * Shared types and utility types
 */

import type { User, Event, Participation, Coordinator, Result } from './domain';
import type { ApiError } from './api';

export * from './domain';
export * from './api';

// Utility Types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type WithId<T> = T & { _id: string };
export type Without<T, K extends keyof T> = Omit<T, K>;
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Async State Types
export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

export interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
}

// Component Props Types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface LayoutProps extends BaseComponentProps {
  title?: string;
  description?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

export interface PageProps {
  params: Record<string, string>;
  searchParams: Record<string, string | string[] | undefined>;
}

// Table and List Types
export interface SortConfig<T> {
  key: keyof T;
  direction: 'asc' | 'desc';
}

export interface FilterConfig<T> {
  field: keyof T;
  value: any;
  operator?: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan';
}

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType<any>;
  badge?: string | number;
  children?: NavItem[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

// Event Handlers
export type ChangeHandler<T = HTMLInputElement> = (event: React.ChangeEvent<T>) => void;
export type ClickHandler<T = HTMLButtonElement> = (event: React.MouseEvent<T>) => void;
export type SubmitHandler<T = HTMLFormElement> = (event: React.FormEvent<T>) => void;

// Extended Domain Types with Relations
export interface UserWithParticipations extends User {
  participations?: Participation[];
  totalEvents?: number;
}

export interface EventWithDetails extends Event {
  coordinatorDetails?: Coordinator[];
  registrationCount?: number;
  isUserRegistered?: boolean;
}

export interface ParticipationWithDetails extends Participation {
  user?: User;
  event?: Event;
  result?: Result;
}

// Select/Dropdown Options
export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
  icon?: React.ComponentType<any>;
}

// Toast/Notification Types
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastConfig {
  message: string;
  type: ToastType;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Modal/Dialog Types
export interface ModalProps extends BaseComponentProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

// File Upload Types
export interface FileWithPreview extends File {
  preview?: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

// Environment Variables
export interface EnvConfig {
  NEXT_PUBLIC_API_URL: string;
  NEXT_PUBLIC_BASE_URL: string;
  MONGODB_URI: string;
  JWT_SECRET: string;
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
  SMTP_HOST?: string;
  SMTP_PORT?: string;
  SMTP_USER?: string;
  SMTP_PASS?: string;
}
