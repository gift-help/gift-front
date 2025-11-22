import { useEffect, useState } from 'react'
import { init, backButton, viewport } from '@telegram-apps/sdk'
import './App.css'
import '@telegram-apps/telegram-ui/dist/styles.css'
import {Button, Input} from '@telegram-apps/telegram-ui'
import {useCSSTheme} from "./hooks/useCSSTheme.ts";
import BuildVersion from './components/BuildVersion';
import {HomePage} from "./pages/home/ui";
import { useAuth } from './hooks/useAuth'; // Добавляем импорт

function App() {
    const [isTMA, setIsTMA] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { ready, themeParams } = useCSSTheme();
    const { token, isLoading: authLoading, error: authError, refreshToken } = useAuth(); // Используем хук аутентификации

    useEffect(() => {
        const initApp = async () => {
            try {
                await init()
                console.log('Running in Telegram Mini App')

                backButton.show()
                backButton.onClick(() => window.history.back())
                viewport.expand()
                setIsTMA(true)
            } catch (error) {
                console.log('Development mode: Mocking Telegram Web App', error)
                if (!window.Telegram) {
                    // mock data for development
                    window.Telegram = {
                        WebApp: {
                            initData: 'mock_data',
                            initDataUnsafe: {
                                user: {
                                    id: 123456789,
                                    first_name: 'Test',
                                    username: 'test_user',
                                },
                                auth_date: Math.floor(Date.now() / 1000),
                                hash: 'mock_hash',
                            },

                            expand: () => console.log('expanded'),
                            ready: () => console.log('ready'),
                            close: () => console.log('close'),
                            sendData: (data: string) => console.log('sendData:', data),
                        },
                    }
                }
                window.Telegram?.WebApp?.ready?.()
                window.Telegram?.WebApp?.expand?.()
                setIsTMA(true)
            } finally {
                setIsLoading(false)
            }
        }

        initApp()
    }, [])

    // Apply theme colors dynamically
    const appStyle = {
        backgroundColor: themeParams?.bg_color ?? '#fff',
        color: themeParams?.text_color ?? '#17212b',
        transition: 'all 0.3s ease',
        minHeight: '100vh',
        padding: '16px',
        flexDirection: 'column' as const,
        display: 'flex',
    }

    if (isLoading || !ready || authLoading) {
        return <div className="loading">Loading...</div>
    }

    if (authError) {
        return (
            <div className="app" style={appStyle}>
                <div className="error-container">
                    <h2>Authentication Error</h2>
                    <p>{authError}</p>
                    <Button onClick={refreshToken}>
                        Retry Authentication
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="app" style={appStyle}>
            <h1>Gift Mini App</h1>
            <p>Environment: {isTMA ? 'Telegram' : 'Browser (Development)'}</p>

            {/* Показываем статус аутентификации */}
            <div className="auth-status">
                <p>Authentication: {token ? '✅ Success' : '❌ Failed'}</p>
                {token && (
                    <p className="token-info">
                        Token: {token.substring(0, 20)}...
                    </p>
                )}
            </div>

            <div>
                <Button size="l" stretched className={"tg-button"}>
                    🎁 Generate Gift Idea
                </Button>
            </div>

            <div>
                <Button size="m" className={"tg-button--secondary"}>
                    Secondary button
                </Button>
            </div>

            <div className={"card"}>
                <p>Это карточка</p>
            </div>

            <div>
                <Input
                    placeholder={"А это инпут"}
                    className={"input"}/>
            </div>

            {isTMA && window.Telegram?.WebApp?.initDataUnsafe?.user && (
                <div className="user-info">
                    <h2>User Info:</h2>
                    <p>ID: {window.Telegram.WebApp.initDataUnsafe.user.id} </p>
                    <p>Name: {window.Telegram.WebApp.initDataUnsafe.user.first_name}</p>
                    <p>Username: @{(window.Telegram.WebApp.initDataUnsafe.user.username)}</p>
                </div>
            )}
            <BuildVersion />
            {/*<HomePage />*/}
        </div>
    )
}

export default App