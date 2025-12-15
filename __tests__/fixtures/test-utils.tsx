/**
 * Test utilities and helpers
 */

import { render as rtlRender, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'
import { Providers } from '@/redux/providers'

/**
 * Custom render function that wraps components with providers
 */
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Providers>{children}</Providers>
  }

  return rtlRender(ui, { wrapper: Wrapper, ...options })
}

/**
 * Create mock API response
 */
export function createMockApiResponse<T>(data: T, success = true) {
  return {
    success,
    data,
    message: success ? 'Success' : 'Error occurred',
    statusCode: success ? 200 : 400,
  }
}

/**
 * Create mock API error
 */
export function createMockApiError(message: string, statusCode = 400) {
  return {
    message,
    statusCode,
    code: 'ERROR',
  }
}

/**
 * Wait for async updates
 */
export const waitForAsync = () => new Promise(resolve => setTimeout(resolve, 0))

// Re-export everything from React Testing Library
export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
