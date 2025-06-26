/**
 * TryCatchWrapper Utility
 *
 * A utility module that provides wrapper functions for handling errors in both
 * synchronous and asynchronous operations. This module helps standardize error
 * handling across the application and provides a clean way to wrap functions
 * with try-catch blocks.
 *
 * Features:
 * - Async function wrapper with error handling
 * - Sync function wrapper with error handling
 * - Customizable error handlers
 * - Optional finally blocks
 * - Default error logging
 *
 * Usage Examples:
 *
 * // Wrapping an async function
 * const safeApiCall = wrapAsync(async (id: string) => {
 *   return await fetch(`/api/users/${id}`);
 * });
 *
 * // Wrapping with custom error handler
 * const safeDataFetch = wrapAsync(fetchUserData, {
 *   onError: (error) => showToast('Failed to fetch user data'),
 *   onFinally: () => setLoading(false)
 * });
 *
 * // Wrapping a sync function
 * const safeJsonParse = wrapSync(JSON.parse, {
 *   onError: (error) => console.warn('Invalid JSON format')
 * });
 *
 * @author React Native Boilerplate
 * @version 1.0.0
 */

/**
 * Configuration options for try-catch wrapper functions
 */
interface TryCatchOptions {
  /** Custom error handler function. If not provided, default error handling will be used */
  onError?: (error: any) => void;
  /** Function to execute in the finally block, regardless of success or failure */
  onFinally?: () => void;
  /** Whether to use default error handling when no custom onError is provided */
  defaultErrorHandling?: boolean;
}

/**
 * Default error handler that logs errors with function context
 *
 * @param error - The error object that was caught
 * @param functionName - Name of the function where the error occurred
 *
 * @example
 * // This function is called automatically when no custom error handler is provided
 * // and defaultErrorHandling is true (default)
 */
const defaultErrorHandler = (error: any, functionName: string) => {
  console.error(`An error occurred in ${functionName}:`, error);
  // You can add more default error handling here like:
  // - Showing a toast notification
  // - Logging to crash analytics
  // - Sending error reports to monitoring services
  // - etc.
};

/**
 * Wraps an async function with try-catch handling
 *
 * This function creates a wrapper around async functions to provide consistent
 * error handling and optional cleanup operations. It preserves the original
 * function's type signature while adding error safety.
 *
 * @template T - Array of argument types for the wrapped function
 * @template R - Return type of the wrapped function
 *
 * @param fn - The async function to wrap
 * @param options - Configuration options for error handling
 * @returns A wrapped version of the function that handles errors gracefully
 *
 * @example
 * // Basic usage
 * const safeApiCall = wrapAsync(async (userId: string) => {
 *   const response = await fetch(`/api/users/${userId}`);
 *   return response.json();
 * });
 *
 * @example
 * // With custom error handling
 * const safeUserFetch = wrapAsync(fetchUser, {
 *   onError: (error) => {
 *     showErrorToast('Failed to load user');
 *     logError(error);
 *   },
 *   onFinally: () => setLoading(false),
 *   defaultErrorHandling: false // Disable default logging
 * });
 *
 * @example
 * // Usage in component
 * const handleButtonClick = async () => {
 *   const result = await safeApiCall('123');
 *   if (result) {
 *     // Handle successful result
 *     setUserData(result);
 *   }
 *   // Errors are already handled by the wrapper
 * };
 */
export const wrapAsync = <T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  options: TryCatchOptions = {},
): ((...args: T) => Promise<R | undefined>) => {
  const { onError, onFinally, defaultErrorHandling = true } = options;

  return async (...args: T): Promise<R | undefined> => {
    try {
      const result = await fn(...args);
      return result;
    } catch (error) {
      if (onError) {
        onError(error);
      } else if (defaultErrorHandling) {
        defaultErrorHandler(error, fn.name);
      }
      return undefined;
    } finally {
      if (onFinally) {
        onFinally();
      }
    }
  };
};

/**
 * Wraps a synchronous function with try-catch handling
 *
 * This function creates a wrapper around synchronous functions to provide
 * consistent error handling. It's useful for operations that might throw
 * errors like JSON parsing, data validation, or mathematical operations.
 *
 * @template T - Array of argument types for the wrapped function
 * @template R - Return type of the wrapped function
 *
 * @param fn - The synchronous function to wrap
 * @param options - Configuration options for error handling
 * @returns A wrapped version of the function that handles errors gracefully
 *
 * @example
 * // Wrapping JSON.parse to handle invalid JSON
 * const safeJsonParse = wrapSync(JSON.parse, {
 *   onError: (error) => console.warn('Invalid JSON provided'),
 *   defaultErrorHandling: false
 * });
 *
 * const data = safeJsonParse('{"valid": "json"}'); // Returns parsed object
 * const invalid = safeJsonParse('invalid json'); // Returns undefined, logs warning
 *
 * @example
 * // Wrapping array operations
 * const safeArrayAccess = wrapSync((arr: any[], index: number) => {
 *   return arr[index].someProperty;
 * }, {
 *   onError: () => console.warn('Array access failed')
 * });
 *
 * @example
 * // Mathematical operations
 * const safeDivision = wrapSync((a: number, b: number) => {
 *   if (b === 0) throw new Error('Division by zero');
 *   return a / b;
 * });
 */
export const wrapSync = <T extends any[], R>(
  fn: (...args: T) => R,
  options: TryCatchOptions = {},
): ((...args: T) => R | undefined) => {
  const { onError, onFinally, defaultErrorHandling = true } = options;

  return (...args: T): R | undefined => {
    try {
      const result = fn(...args);
      return result;
    } catch (error) {
      if (onError) {
        onError(error);
      } else if (defaultErrorHandling) {
        defaultErrorHandler(error, fn.name);
      }
      return undefined;
    } finally {
      if (onFinally) {
        onFinally();
      }
    }
  };
};

/**
 * Best Practices and Guidelines:
 *
 * 1. Use wrapAsync for:
 *    - API calls and network requests
 *    - File system operations
 *    - Database queries
 *    - Any async operation that might fail
 *
 * 2. Use wrapSync for:
 *    - JSON parsing operations
 *    - Data transformation functions
 *    - Array/Object manipulations that might throw
 *    - Mathematical calculations
 *
 * 3. Error Handling Strategy:
 *    - Always check if the result is undefined before using it
 *    - Provide meaningful error messages in custom handlers
 *    - Use onFinally for cleanup operations (hiding loaders, etc.)
 *    - Consider disabling defaultErrorHandling for user-facing operations
 *
 * 4. Performance Considerations:
 *    - Wrapper functions have minimal overhead
 *    - Original function types are preserved
 *    - No additional async/await layers are introduced
 *
 * 5. Integration with State Management:
 *    - Can be used with Redux thunks
 *    - Compatible with React Query/SWR error handling
 *    - Works well with React hooks and state updates
 */
