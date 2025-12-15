/**
 * Generic hook for API data fetching with loading and error states
 */

import { useState, useEffect, useCallback } from 'react';
import type { ApiError, AsyncState } from '@/types';

export interface UseApiOptions<T> {
  enabled?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: ApiError) => void;
  refetchInterval?: number;
  initialData?: T;
}

export function useApi<T>(
  fetcher: () => Promise<T>,
  options: UseApiOptions<T> = {}
): AsyncState<T> & {
  refetch: () => Promise<void>;
  mutate: (data: T | ((prev: T | null) => T)) => void;
} {
  const {
    enabled = true,
    onSuccess,
    onError,
    refetchInterval,
    initialData = null,
  } = options;

  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState<boolean>(enabled);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    try {
      setLoading(true);
      setError(null);
      const result = await fetcher();
      setData(result);
      onSuccess?.(result);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError);
      onError?.(apiError);
    } finally {
      setLoading(false);
    }
  }, [fetcher, enabled, onSuccess, onError]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (refetchInterval && refetchInterval > 0) {
      const interval = setInterval(fetchData, refetchInterval);
      return () => clearInterval(interval);
    }
  }, [refetchInterval, fetchData]);

  const mutate = useCallback((newData: T | ((prev: T | null) => T)) => {
    setData((prev) => (typeof newData === 'function' ? (newData as any)(prev) : newData));
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    mutate,
  };
}
