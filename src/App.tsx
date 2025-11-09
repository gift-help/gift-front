import { useEffect, useState } from 'react'
import { init, backButton, viewport } from '@telegram-apps/sdk'
import './App.css'
import '@telegram-apps/telegram-ui/dist/styles.css'
import { Button } from '@telegram-apps/telegram-ui'
import { useTelegram } from './hooks/useTelegram'

function App() {
    const [isTMA, setIsTMA] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const { ready, themeParams } = useTelegram()

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
    }

    const buttonStyle = {
        backgroundColor: themeParams?.button_color ?? '#4dabf7',
        color: themeParams?.button_text_color ?? '#fff',
    }

    if (isLoading || !ready) {
        return <div className="loading">Loading...</div>
    }

    return (
        <div className="app" style={appStyle}>
            <h1>Gift Mini App</h1>
            <p>Environment: {isTMA ? 'Telegram' : 'Browser (Development)'}</p>

            <div className="buttons">
                <Button size="l" stretched style={buttonStyle}>
                    🎁 Generate Gift Idea
                </Button>
            </div>

            {isTMA && window.Telegram?.WebApp?.initDataUnsafe?.user && (
                <div className="user-info">
                    <h2>User Info:</h2>
                    <p>ID: {window.Telegram.WebApp.initDataUnsafe.user.id} </p>
                    <p>Name: {window.Telegram.WebApp.initDataUnsafe.user.first_name}</p>
                    <p>Username: @{(window.Telegram.WebApp.initDataUnsafe.user.username)}</p>
                </div>
            )}
        </div>
    )
}

export default App