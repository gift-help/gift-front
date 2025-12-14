import { useState, useEffect, useCallback } from 'react';
import { authApi } from "@/shared/api/auth.ts";

interface UseAuthReturn {
    token: string | null;
    isLoading: boolean;
    error: string | null;
    logout: () => void;
    clearError: () => void;
}

export function useAuth(): UseAuthReturn {
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    const authenticateUser = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            const webApp = window.Telegram?.WebApp;

            if (!webApp) {
                throw new Error('Telegram WebApp not found');
            }

            const initData = webApp.initData;

            if (!initData) {
                throw new Error('Telegram init data not available');
            }

            console.log('Sending auth request...');

            const response = await authApi.telegramAuth(initData);

            if (response.token) {
                setToken(response.token);
                localStorage.setItem('jwt_token', response.token);
                console.log('Auth successful, token saved');
            } else {
                throw new Error('No token received');
            }

        } catch (err) {
            console.error('Authentication failed:', err);

            // КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ: очищаем токен из localStorage при 401
            if (err instanceof Error && err.message.includes('401')) {
                localStorage.removeItem('jwt_token');
                setToken(null);
                console.log('Invalid token cleared from localStorage');
            }

            setError(err instanceof Error ? err.message : 'Authentication failed');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setError(null);
        localStorage.removeItem('jwt_token');
        console.log('User logged out');
    }, []);

    useEffect(() => {
        const initializeAuth = async () => {
            const savedToken = localStorage.getItem('jwt_token');

            if (!savedToken) {
                try {
                    await authenticateUser();

                } catch (error) {
                    console.error('Token validation failed:', error);
                    localStorage.removeItem('jwt_token');
                } finally {
                    setIsLoading(false);
                }
            }
        };

        initializeAuth();

    }, []); // Добавили зависимость

    return {
        token,
        isLoading,
        error,
        logout,
        clearError,
    };
}