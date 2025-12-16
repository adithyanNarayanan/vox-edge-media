"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client";

interface User {
    id: string;
    email?: string;
    phoneNumber?: string;
    displayName: string;
    photoURL?: string;
    provider: 'email' | 'phone' | 'google';
    role?: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    token: string | null;
    login: (email: string, password: string) => Promise<User | void>;
    register: (email: string, password: string, displayName?: string) => Promise<void>;
    sendEmailOTP: (email: string) => Promise<any>;
    verifyEmailOTP: (email: string, otp: string, displayName?: string, phoneNumber?: string, password?: string) => Promise<void>;
    googleAuth: (email: string, displayName: string, photoURL?: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            fetchUser(storedToken);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUser = async (authToken: string) => {
        try {
            // Manually passing token as apiClient might not have it in localStorage yet during init
            const data = await apiClient.get<{ user: User }>('/auth/me', {
                headers: { 'Authorization': `Bearer ${authToken}` }
            });
            setUser(data.user);
        } catch (error) {
            console.error("Error fetching user", error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        const data = await apiClient.post<{ token: string; user: User }>('/auth/login', { email, password });

        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('token', data.token);
        localStorage.setItem('auth_token', data.token); // Sync with apiClient expectation
        return data.user;
    };

    const register = async (email: string, password: string, displayName?: string) => {
        const data = await apiClient.post<{ token: string; user: User }>('/auth/register', { email, password, displayName });

        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('token', data.token);
        localStorage.setItem('auth_token', data.token);
    };

    const sendEmailOTP = async (email: string) => {
        try {
            const data = await apiClient.post<any>('/auth/email/send-otp', { email });
            return data.devOTP;
        } catch (error: any) {
            console.error("Send Email OTP Error:", error);
            throw error;
        }
    };

    const verifyEmailOTP = async (email: string, otp: string, displayName?: string, phoneNumber?: string, password?: string) => {
        const data = await apiClient.post<{ token: string; user: User }>('/auth/email/verify-otp', {
            email, otp, displayName, phoneNumber, password
        });

        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('token', data.token);
        localStorage.setItem('auth_token', data.token);
    };

    const googleAuth = async (email: string, displayName: string, photoURL?: string) => {
        const data = await apiClient.post<{ token: string; user: User }>('/auth/google', {
            email, displayName, photoURL
        });

        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('token', data.token);
        localStorage.setItem('auth_token', data.token);
    };

    const logout = async () => {
        try {
            await apiClient.post('/auth/logout', {});
        } catch (error) {
            console.error('Logout API error:', error);
        }

        // Clear client-side state
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('auth_token');
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            token,
            login,
            register,
            sendEmailOTP,
            verifyEmailOTP,
            googleAuth,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
