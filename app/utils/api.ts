// utils/api.ts
const API_BASE_URL = '/api/proxy/';

/**
 * Generic API function for making POST requests
 * @param {any} payload - The complete payload object to send
 * @param {RequestInit} options - Additional fetch options (headers, etc.)
 * @returns {Promise<any>} - The API response
 */
export const apiCall = async (payload: any, options: RequestInit = {}): Promise<any> => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers
      },
      body: JSON.stringify(payload),
      ...options
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('API call failed:', error);
    
    // More detailed error information
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Network error: Unable to connect to the server. This might be due to CORS policy or network issues.');
    }
    
    throw error;
  }
};