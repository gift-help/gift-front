import { useEffect, useState } from 'react'
import { init, backButton, viewport, mainButton, initData, } from '@telegram-apps/sdk'
import './App.css'

import {Avatar, Button, Cell, Headline, Input, Radio, Section, Title} from "@telegram-apps/telegram-ui";

function App() {
    const [isTMA, setIsTMA] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const user = window.Telegram.WebApp.initDataUnsafe.user;
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        gender: '',
        age: '',
        bio: '',
        newsletter: false,
        notifications: true,
        plan: 'basic'
    });

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

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
                [field]: value
        }))
    }

    if (isLoading) {
        return <div className="loading">Loading...</div>
    }

    return (
        <>
            {/* Hero Section */}
            <Section
                style={{
                    paddingTop: '32px',
                    paddingBottom: '24px',
                    background: 'var(--tg-theme-secondary-bg-color, #f4f4f5)',
                    marginBottom: '16px'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        gap: '16px'
                    }}
                >
                    <div
                        style={{
                            position: 'relative',
                            width: '96px',
                            height: '96px',
                            borderRadius: '50%',
                            border: '4px solid var(--tg-theme-button-color, #2481cc)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'var(--tg-theme-bg-color, #ffffff)'
                        }}
                    >
                        {user?.photo_url  ? (
                            <Avatar
                                src={user.photo_url}
                                size={96} // Немного меньше, чтобы поместиться в обводку

                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            />
                        ) : (
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'var(--tg-theme-button-color, #2481cc)',
                                    color: 'white',
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    borderRadius: '50%'
                                }}
                            >
                                {user?.first_name?.[0]?.toUpperCase() || 'U'}
                            </div>
                        )}
                    </div>

                    <div>
                        <Title
                            level="1"
                            style={{
                                marginBottom: '4px',
                                color: 'var(--tg-theme-text-color, #000000)'
                            }}
                        >
                            {user?.firstName} {user?.lastName || ''}
                        </Title>

                        {user?.username && (
                            <Headline
                                style={{
                                    color: 'var(--tg-theme-hint-color, #999999)',
                                    marginBottom: '8px'
                                }}
                            >
                                @{user.username}
                            </Headline>
                        )}

                        <div
                            style={{
                                color: 'var(--tg-theme-subtitle-text-color, #707579)',
                                fontSize: '14px'
                            }}
                        >
                            Добро пожаловать в приложение!
                        </div>
                    </div>
                </div>
            </Section>

            {/* Информация о пользователе */}
            <Section
                header="Информация профиля"
                style={{marginBottom: '16px'}}
            >
                <div
                    style={{
                        backgroundColor: 'var(--tg-theme-bg-color, #ffffff)',
                        borderRadius: '12px'
                    }}
                >
                    {user?.id || 'Не доступно'}
                </div>

                <div
                    style={{
                        backgroundColor: 'var(--tg-theme-bg-color, #ffffff)',
                        borderRadius: '12px'
                    }}
                >
                    {user?.languageCode ? user.languageCode.toUpperCase() : 'RU'}
                </div>
                <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Введите ваше имя"
                />
                <div style={{padding: '0 16px'}}>
                    <div style={{display: 'flex', alignItems: 'center', marginBottom: '12px'}}>
                        <Radio
                            name="gender"
                            value="male"
                            checked={formData.gender === 'male'}
                            onChange={(e) => handleInputChange('gender', e.target.value)}
                        />
                        <span style={{marginLeft: '8px'}}>Мужской</span>
                    </div>

                    <div style={{display: 'flex', alignItems: 'center', marginBottom: '12px'}}>
                        <Radio
                            name="gender"
                            value="female"
                            checked={formData.gender === 'female'}
                            onChange={(e) => handleInputChange('gender', e.target.value)}
                        />
                        <span style={{marginLeft: '8px'}}>Женский</span>
                    </div>
                </div>
            </Section>

            {/* Статистика */}
            <Section
                header="Статистика"
                style={{marginBottom: '24px'}}
            >
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '12px',
                        padding: '0 16px'
                    }}
                >
                    <div
                        style={{
                            background: 'var(--tg-theme-secondary-bg-color, #f4f4f5)',
                            padding: '16px',
                            borderRadius: '12px',
                            textAlign: 'center'
                        }}
                    >
                        <Title level="3" style={{ margin: '0 0 4px 0', color: 'var(--tg-theme-button-color, #2481cc)' }}>
                            1
                        </Title>
                        <div style={{ fontSize: '12px', color: 'var(--tg-theme-hint-color, #999999)' }}>
                            день в приложении
                        </div>
                    </div>

                    <div
                        style={{
                            background: 'var(--tg-theme-secondary-bg-color, #f4f4f5)',
                            padding: '16px',
                            borderRadius: '12px',
                            textAlign: 'center'
                        }}
                    >
                        <Title level="3" style={{ margin: '0 0 4px 0', color: 'var(--tg-theme-button-color, #2481cc)' }}>
                            0
                        </Title>
                        <div style={{ fontSize: '12px', color: 'var(--tg-theme-hint-color, #999999)' }}>
                            выполнено задач
                        </div>
                    </div>
                </div>
            </Section>

            {/* Кнопки действий */}
            <Section style={{ paddingBottom: '32px' }}>
                <Button
                    size="l"
                    stretched
                    style={{
                        marginBottom: '12px',
                        background: 'var(--tg-theme-button-color, #2481cc)',
                        color: 'var(--tg-theme-button-text-color, #ffffff)',
                    }}
                    /*onClick={() => onNavigate('second')}*/
                >
                    🚀 Перейти дальше
                </Button>
            </Section>

            {/* Footer */}
            <div
                style={{
                    padding: '20px 16px',
                    textAlign: 'center',
                    borderTop: '1px solid var(--tg-theme-section-separator-color, #e5e5e5)'
                }}
            >
                <div
                    style={{
                        fontSize: '12px',
                        color: 'var(--tg-theme-hint-color, #999999)'
                    }}
                >
                    С любовью для Telegram Mini Apps ❤️
                </div>
            </div>
        </>
    )
}

export default App
