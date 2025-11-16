import axios from 'axios';

/**
 * Logs an error to the console with a timestamp and optional context.
 * Handles both Axios errors and standard JavaScript errors.
 *
 * @param {unknown} error - The error to log.
 * @param {string} [context] - Optional context to include in the log.
 */
export function logError(error: unknown, context?: string) {
  const timestamp = new Date().toISOString();
  console.error(`[${timestamp}]${context ? ` [${context}]` : ''}`);

  // Axios-specific error
  if (axios.isAxiosError(error)) {
    console.error('Axios Error:');
    console.error('Message:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
      console.error('Headers:', JSON.stringify(error.response.headers, null, 2));
    } else if (error.request) {
      console.error('No response received. Request:', error.request);
    } else {
      console.error('Axios config:', JSON.stringify(error.config, null, 2));
    }
    console.error('Stack:', error.stack);
    return;
  }

  // Standard Error
  if (error instanceof Error) {
    console.error('Message:', error.message);
    console.error('Stack:', error.stack);
    return;
  }

  // Object or other types
  if (typeof error === 'object' && error !== null) {
    try {
      console.error('Error Object:', JSON.stringify(error, null, 2));
    } catch (jsonErr) {
      console.error('Failed to stringify error:', jsonErr);
    }
  } else {
    console.error('Raw error:', error);
  }
}
