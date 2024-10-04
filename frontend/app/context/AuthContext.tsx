'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    // Helper function to check if token is JWT
    const isJWT = (token: string) => {
        return token.split('.').length === 3; // A JWT token will have 3 parts
    };

    // Validate if token is a JWT and decode, or treat it as opaque token (non-JWT)
    const isValidToken = (token: string | null): boolean => {
        if (!token) return false;
        try {
            if (isJWT(token)) {
                const decoded = jwtDecode<User>(token); // Decode if it's a JWT
                return !!decoded; // If decoding succeeds, it's valid
            } else {
                // Assume the token is valid if it's not a JWT (Laravel API token)
                return true;
            }
        } catch (error) {
            console.error("Invalid token format:", error);
            return false; // Return false if token is invalid
        }
    };

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken && isValidToken(savedToken)) {
            setToken(savedToken);
            if (isJWT(savedToken)) {
                const decoded: User = jwtDecode(savedToken); // Decode JWT
                setUser(decoded);
            } else {
                // Handle non-JWT token (e.g., Laravel token)
                // Optionally, fetch user details from the backend
                setUser({
                    id: 1, // Placeholder or fetch from backend
                    name: 'John Doe',
                    email: 'johndoe@example.com'
                });
            }
        }
    }, []);

    const login = (token: string) => {
        if (isValidToken(token)) {
            localStorage.setItem('token', token);
            setToken(token);
            if (isJWT(token)) {
                const decoded: User = jwtDecode(token); // Decode and set user for JWT
                setUser(decoded);
            } else {
                // Set user for non-JWT token or fetch from API
                setUser({
                    id: 1, // Placeholder or fetch from backend
                    name: 'John Doe',
                    email: 'johndoe@example.com'
                });
            }
        } else {
            console.error('Invalid token during login');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
