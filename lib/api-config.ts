// API Configuration
// Update these endpoints to point to your backend server
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://your-backend-api.com/api"

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    SIGNUP: `${API_BASE_URL}/auth/signup`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    VERIFY: `${API_BASE_URL}/auth/verify`,
  },
  // Booking endpoints
  BOOKINGS: {
    CREATE: `${API_BASE_URL}/bookings`,
    LIST: `${API_BASE_URL}/bookings`,
    GET: (id: string) => `${API_BASE_URL}/bookings/${id}`,
    UPDATE: (id: string) => `${API_BASE_URL}/bookings/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/bookings/${id}`,
  },
  // Contact endpoints
  CONTACT: {
    SUBMIT: `${API_BASE_URL}/contact`,
    LIST: `${API_BASE_URL}/contact`,
  },
  // Admin endpoints
  ADMIN: {
    DASHBOARD: `${API_BASE_URL}/admin/dashboard`,
    BOOKINGS: `${API_BASE_URL}/admin/bookings`,
    MESSAGES: `${API_BASE_URL}/admin/messages`,
  },
}
