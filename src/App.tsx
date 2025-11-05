import { useEffect, useState } from 'react'
import { init, backButton, viewport, mainButton } from '@telegram-apps/sdk'
import './App.css'
import {HomePage} from "./pages/home/ui";

function App() {
    const [isTMA, setIsTMA] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const initApp = async () => {
            try {
                // Пытаемся инициализировать Telegram Mini App
                await init()
                console.log('Running in Telegram Mini App')

                // Настройка Telegram Web App
                backButton.show()
                backButton.onClick(() => {
                    window.history.back()
                })

                viewport.expand()
                setIsTMA(true)

            } catch (error) {
                console.log('Development mode: Mocking Telegram Web App', error)

                // Мок данных для разработки
                if (!window.Telegram) {
                    window.Telegram = {
                        WebApp: {
                            initData: 'mock_data',
                            initDataUnsafe: {
                                user: {
                                    id: 123456789,
                                    first_name: 'Test',
                                    last_name: 'User',
                                    username: 'test_user',
                                    language_code: 'en',
                                    is_premium: true
                                },
                                chat: {
                                    id: 123456789,
                                    type: 'private'
                                },
                                auth_date: '1700000000',
                                hash: 'mock_hash'
                            },
                            platform: 'tdesktop',
                            version: '7.1',
                            colorScheme: 'light',
                            themeParams: {
                                bg_color: '#18222d',
                                text_color: '#ffffff',
                                hint_color: '#aaaaaa',
                                link_color: '#4dabf7',
                                button_color: '#4dabf7',
                                button_text_color: '#ffffff'
                            },
                            expand: () => console.log('Telegram WebApp expanded'),
                            ready: () => {
                                console.log('Telegram WebApp ready')
                                window.Telegram.WebApp.isReady = true
                            },
                            close: () => console.log('Telegram WebApp close'),
                            sendData: (data) => console.log('Telegram WebApp sendData:', data),
                            MainButton: {
                                text: 'SEND',
                                color: '#4dabf7',
                                textColor: '#ffffff',
                                isVisible: false,
                                isActive: true,
                                show: () => {
                                    console.log('MainButton show')
                                    window.Telegram.WebApp.MainButton.isVisible = true
                                },
                                hide: () => {
                                    console.log('MainButton hide')
                                    window.Telegram.WebApp.MainButton.isVisible = false
                                },
                                setText: (text) => {
                                    console.log('MainButton setText:', text)
                                    window.Telegram.WebApp.MainButton.text = text
                                },
                                onClick: (callback) => {
                                    console.log('MainButton onClick set')
                                    window.Telegram.WebApp.MainButton._clickCallback = callback
                                },
                                offClick: (callback) => {
                                    console.log('MainButton offClick')
                                    window.Telegram.WebApp.MainButton._clickCallback = null
                                }
                            },
                            BackButton: {
                                isVisible: false,
                                show: () => {
                                    console.log('BackButton show')
                                    window.Telegram.WebApp.BackButton.isVisible = true
                                },
                                hide: () => {
                                    console.log('BackButton hide')
                                    window.Telegram.WebApp.BackButton.isVisible = false
                                },
                                onClick: (callback) => {
                                    console.log('BackButton onClick set')
                                    window.Telegram.WebApp.BackButton._clickCallback = callback
                                },
                                offClick: (callback) => {
                                    console.log('BackButton offClick')
                                    window.Telegram.WebApp.BackButton._clickCallback = null
                                }
                            }
                        }
                    }
                }

                // Имитируем инициализацию Telegram
                window.Telegram.WebApp.ready()
                window.Telegram.WebApp.expand()
                setIsTMA(true)
            } finally {
                setIsLoading(false)
            }
        }

        initApp()
    }, [])

    const sendDataToBot = () => {
        if (isTMA && window.Telegram?.WebApp) {
            window.Telegram.WebApp.sendData('Hello from Mini App!')
        } else {
            console.log('Development: Data would be sent to bot')
            alert('Development mode: Data would be sent to bot')
        }
    }

    const closeApp = () => {
        if (isTMA && window.Telegram?.WebApp) {
            window.Telegram.WebApp.close()
        } else {
            console.log('Development: App would be closed')
            alert('Development mode: App would be closed')
        }
    }

    if (isLoading) {
        return <div className="loading">Loading...</div>
    }

    return (
        <div className="app">
            <h1>My Telegram Mini App</h1>
            <p>v1</p>
            <p>Environment: {isTMA ? 'Telegram' : 'Browser (Development)'}</p>

            <div className="buttons">
                <button onClick={sendDataToBot} className="btn primary">
                    Send Data to Bot
                </button>
                <button onClick={closeApp} className="btn secondary">
                    Close App
                </button>
            </div>

            {isTMA && window.Telegram?.WebApp?.initDataUnsafe?.user && (
                <div className="user-info">
                    <h2>User Info:</h2>
                    <p>ID: {window.Telegram.WebApp.initDataUnsafe.user.id}</p>
                    <p>Name: {window.Telegram.WebApp.initDataUnsafe.user.first_name}</p>
                    <p>Username: @{window.Telegram.WebApp.initDataUnsafe.user.username}</p>
                </div>
            )}
            <HomePage />
        </div>
    )
}

export default App
