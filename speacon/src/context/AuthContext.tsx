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
    login: (role: Role) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (role: Role) => {
        // 더미 로그인 로직
        if (role === 'ADMIN') {
            setUser({ id: 'admin_1', name: '최고 관리자', role: 'ADMIN' });
        } else if (role === 'SPEAKER') {
            setUser({ id: 'spk_001', name: '김 AI', role: 'SPEAKER' });
        } else if (role === 'CLIENT') {
            setUser({ id: 'client_999', name: '스마일기업(주)', role: 'CLIENT' });
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
