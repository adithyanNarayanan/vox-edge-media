import { API_BASE_URL } from "./api-config"

interface FetchOptions extends RequestInit {
    headers?: Record<string, string>
    token?: string | null
}

class ApiClient {
    private baseUrl: string

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    private getTokens() {
        if (typeof window !== "undefined") {
            return localStorage.getItem("auth_token")
        }
        return null
    }

    private async request<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
        const { headers = {}, ...rest } = options
        const token = this.getTokens()

        const config: RequestInit = {
            ...rest,
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...headers,
            },
        }

        const url = endpoint.startsWith('http') ? endpoint : `${this.baseUrl}${endpoint}`

        try {
            const response = await fetch(url, config)
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || data.error || "Something went wrong")
            }

            return data
        } catch (error: any) {
            // If 401, maybe redirect to login or clear token?
            if (error.message === 'Invalid or expired token') {
                if (typeof window !== "undefined") {
                    localStorage.removeItem("auth_token")
                }
            }
            throw error
        }
    }

    // Auth methods
    async post<T>(endpoint: string, data: any, options?: FetchOptions) {
        return this.request<T>(endpoint, {
            method: "POST",
            body: JSON.stringify(data),
            ...options,
        })
    }

    async get<T>(endpoint: string, options?: FetchOptions) {
        return this.request<T>(endpoint, {
            method: "GET",
            ...options,
        })
    }

    async put<T>(endpoint: string, data: any, options?: FetchOptions) {
        return this.request<T>(endpoint, {
            method: "PUT",
            body: JSON.stringify(data),
            ...options,
        })
    }

    async delete<T>(endpoint: string, options?: FetchOptions) {
        return this.request<T>(endpoint, {
            method: "DELETE",
            ...options,
        })
    }
}

export const apiClient = new ApiClient(API_BASE_URL)
