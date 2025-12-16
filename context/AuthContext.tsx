"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
    id: string;
    email?: string;
    phoneNumber?: string;
    displayName: string;
    photoURL?: string;
    provider: 'email' | 'phone' | 'google';
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, displayName?: string) => Promise<void>;
    sendEmailOTP: (email: string) => Promise<any>;
    verifyEmailOTP: (email: string, otp: string, displayName?: string, phoneNumber?: string, password?: string) => Promise<void>;
    googleAuth: (email: string, displayName: string, photoURL?: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';
console.log("Current API_URL:", API_URL); // Debugging log

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
            const res = await fetch(`${API_URL}/api/auth/me`, {
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
            } else {
                logout();
            }
        } catch (error) {
            console.error("Error fetching user", error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        const res = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Login failed');

        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('token', data.token);
    };

    const register = async (email: string, password: string, displayName?: string) => {
        const res = await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, displayName }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Registration failed');

        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('token', data.token);
    };

    const sendEmailOTP = async (email: string) => {
        try {
            const res = await fetch(`${API_URL}/api/auth/email/send-otp`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Failed to send OTP');
            return data.devOTP; // For development/testing
        } catch (error: any) {
            console.error("Send Email OTP Error:", error);
            if (error.message === 'Failed to fetch') {
                throw new Error("Unable to connect to server. Please ensure the backend is running.");
            }
            throw error;
        }
    };

    const verifyEmailOTP = async (email: string, otp: string, displayName?: string, phoneNumber?: string, password?: string) => {
        const res = await fetch(`${API_URL}/api/auth/email/verify-otp`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp, displayName, phoneNumber, password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'OTP verification failed');

        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('token', data.token);
    };

    const googleAuth = async (email: string, displayName: string, photoURL?: string) => {
        const res = await fetch(`${API_URL}/api/auth/google`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, displayName, photoURL }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Google auth failed');

        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('token', data.token);
    };

    const logout = async () => {
        try {
            // Call backend to clear httpOnly cookie
            await fetch(`${API_URL}/api/auth/logout`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error('Logout API error:', error);
            // Continue with client-side logout even if API fails
        }

        // Clear client-side state
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
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
