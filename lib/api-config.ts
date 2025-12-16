// API Configuration
// Update these endpoints to point to your backend server
// Backend API URL - ensure it ends with /api
export const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000"}/api`

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
    USERS: `${API_BASE_URL}/admin/users`,
    UPDATE_USER: (id: string) => `${API_BASE_URL}/admin/users/${id}`,
    DELETE_USER: (id: string) => `${API_BASE_URL}/admin/users/${id}`,
  },
  // Services endpoints
  SERVICES: {
    LIST: `${API_BASE_URL}/services`,
    ADMIN_LIST: `${API_BASE_URL}/services/admin/all`,
    CREATE: `${API_BASE_URL}/services`,
    UPDATE: (id: string) => `${API_BASE_URL}/services/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/services/${id}`,
  },
  // Plans endpoints
  PLANS: {
    LIST: `${API_BASE_URL}/plans`,
    ADMIN_LIST: `${API_BASE_URL}/plans/admin/all`,
    CREATE: `${API_BASE_URL}/plans`,
    UPDATE: (id: string) => `${API_BASE_URL}/plans/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/plans/${id}`,
  },
  // Content endpoints
  CONTENT: {
    GET: (key: string) => `${API_BASE_URL}/content/${key}`,
    ADMIN_LIST: `${API_BASE_URL}/content`,
    UPDATE: `${API_BASE_URL}/content`,
    DELETE: (key: string) => `${API_BASE_URL}/content/${key}`,
  },
}
