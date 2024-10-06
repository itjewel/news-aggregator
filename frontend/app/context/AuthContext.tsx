'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import fetchUserInfoFromAPI from '../utils/fetchUserInfoFromAPI';

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

    const isJWT = (token: string) => {
        return token.split('.').length === 3; 
    };

    const isValidToken = (token: string | null): boolean => {
        if (!token) return false;
        try {
            if (isJWT(token)) {
                const decoded = jwtDecode<User>(token);
                return !!decoded; 
            } else {
                return true; // Assume non-JWT tokens are valid
            }
        } catch (error) {
            console.error("Invalid token format:", error);
            return false; // Invalid token
        }
    };

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken && isValidToken(savedToken)) {
            setToken(savedToken);
            if (isJWT(savedToken)) {
                const decoded: User = jwtDecode(savedToken);
                setUser(decoded);
            } else {
                // Fetch user info from the API for non-JWT token
                fetchUserInfoFromAPI(savedToken, setUser);
            }
        }
    }, []);

    const login = (token: string) => {
        if (isValidToken(token)) {
            localStorage.setItem('token', token);
            setToken(token);
            if (isJWT(token)) {
                const decoded: User = jwtDecode(token);
                setUser(decoded);
            } else {
                // Fetch user info from the API for non-JWT token
                fetchUserInfoFromAPI(token, setUser);
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
