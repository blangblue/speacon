import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type Role = 'ADMIN' | 'SPEAKER' | 'CLIENT' | null;

interface User {
    id: string;
    name: string;
    role: Role;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password?: string) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = async (email: string, password: string = '1234') => {
        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('로그인 실패');
            }

            const data = await response.json();
            const { access_token, user: userData } = data;

            localStorage.setItem('token', access_token);
            setUser({
                id: userData.id,
                name: userData.name || userData.email,
                role: userData.role as Role
            });
            return true;
        } catch (error) {
            console.error('Login error:', error);
            alert('로그인에 실패했습니다. 아이디나 비밀번호를 확인해주세요.');
            return false;
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
