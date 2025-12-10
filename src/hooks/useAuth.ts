import { useState, useEffect, useCallback } from 'react';
import {authApi} from "@/shared/api/auth.ts";

interface UseAuthReturn {
    token: string | null;
    isLoading: boolean;
    error: string | null;
    logout: () => void;
}

export function useAuth(): UseAuthReturn {
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

            console.log(initData)

            const response = await authApi.telegramAuth(initData);

            if (response.token) {
                setToken(response.token);
                localStorage.setItem('jwt_token', response.token);
            } else {
                throw new Error('No token received');
            }

        } catch (err) {
            console.error('Authentication failed:', err);
            setError(err instanceof Error ? err.message : 'Authentication failed');
            setToken(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setError(null);
        localStorage.removeItem('jwt_token');
    }, []);

    useEffect(() => {
        const savedToken = localStorage.getItem('jwt_token');

        if (savedToken) {
            setToken(savedToken);
            setIsLoading(false);
        } else {
            authenticateUser();
        }
    }, []);

    return {
        token,
        isLoading,
        error,
        logout,
    };
}