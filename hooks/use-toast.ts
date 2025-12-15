/**
 * Toast notification hook using sonner
 */

import { toast as sonnerToast } from 'sonner';
import type { ToastType } from '@/types';

export interface ToastOptions {
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function useToast() {
  const show = (message: string, type: ToastType = 'info', options?: ToastOptions) => {
    const toastOptions = {
      duration: options?.duration,
      action: options?.action,
    };

    switch (type) {
      case 'success':
        return sonnerToast.success(message, toastOptions);
      case 'error':
        return sonnerToast.error(message, toastOptions);
      case 'warning':
        return sonnerToast.warning(message, toastOptions);
      case 'info':
      default:
        return sonnerToast.info(message, toastOptions);
    }
  };

  const success = (message: string, options?: ToastOptions) => show(message, 'success', options);
  const error = (message: string, options?: ToastOptions) => show(message, 'error', options);
  const warning = (message: string, options?: ToastOptions) => show(message, 'warning', options);
  const info = (message: string, options?: ToastOptions) => show(message, 'info', options);

  return {
    show,
    success,
    error,
    warning,
    info,
  };
}
