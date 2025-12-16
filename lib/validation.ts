// Validation utility functions for authentication forms

export interface ValidationResult {
    isValid: boolean;
    error?: string;
}

/**
 * Validate email format
 */
export const validateEmail = (email: string): ValidationResult => {
    if (!email) {
        return { isValid: false, error: "Email is required" };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { isValid: false, error: "Please enter a valid email address" };
    }

    return { isValid: true };
};

/**
 * Validate password strength
 */
export const validatePassword = (password: string): ValidationResult => {
    if (!password) {
        return { isValid: false, error: "Password is required" };
    }

    if (password.length < 6) {
        return { isValid: false, error: "Password must be at least 6 characters" };
    }

    if (password.length > 128) {
        return { isValid: false, error: "Password is too long (max 128 characters)" };
    }

    // Check for at least one letter and one number for stronger security
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (!hasLetter || !hasNumber) {
        return { isValid: false, error: "Password must contain both letters and numbers" };
    }

    return { isValid: true };
};

/**
 * Validate display name
 */
export const validateDisplayName = (name: string): ValidationResult => {
    if (!name || !name.trim()) {
        return { isValid: false, error: "Name is required" };
    }

    if (name.trim().length < 2) {
        return { isValid: false, error: "Name must be at least 2 characters" };
    }

    if (name.trim().length > 50) {
        return { isValid: false, error: "Name is too long (max 50 characters)" };
    }

    // Check for valid characters (letters, spaces, hyphens, apostrophes)
    const nameRegex = /^[a-zA-Z\s\-']+$/;
    if (!nameRegex.test(name)) {
        return { isValid: false, error: "Name can only contain letters, spaces, hyphens, and apostrophes" };
    }

    return { isValid: true };
};

/**
 * Validate phone number (without country code)
 * Now accepts international format since country code is selected separately
 */
export const validatePhoneNumber = (phone: string): ValidationResult => {
    if (!phone || !phone.trim()) {
        return { isValid: false, error: "Phone number is required" };
    }

    // Remove spaces, hyphens, and parentheses
    const cleanPhone = phone.replace(/[\s\-()]/g, '');

    // Check for numeric digits only
    if (!/^\d+$/.test(cleanPhone)) {
        return {
            isValid: false,
            error: "Phone number should contain only digits"
        };
    }

    // Check length (most phone numbers are 7-15 digits)
    if (cleanPhone.length < 7 || cleanPhone.length > 15) {
        return {
            isValid: false,
            error: "Phone number should be between 7-15 digits"
        };
    }

    return { isValid: true };
};

/**
 * Validate confirm password matches password
 */
export const validateConfirmPassword = (password: string, confirmPassword: string): ValidationResult => {
    if (!confirmPassword) {
        return { isValid: false, error: "Please confirm your password" };
    }

    if (password !== confirmPassword) {
        return { isValid: false, error: "Passwords do not match" };
    }

    return { isValid: true };
};

/**
 * Get password strength level
 */
export const getPasswordStrength = (password: string): {
    strength: 'weak' | 'medium' | 'strong';
    score: number;
} => {
    let score = 0;

    if (password.length >= 6) score++;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (score <= 2) return { strength: 'weak', score };
    if (score <= 4) return { strength: 'medium', score };
    return { strength: 'strong', score };
};
