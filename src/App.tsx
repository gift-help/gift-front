import { useEffect, useState } from 'react'
import { init, backButton, viewport } from '@telegram-apps/sdk'
import './App.css'
import './i18n'; // Импорт должен быть здесь
import '@telegram-apps/telegram-ui/dist/styles.css'
import { Button, Input } from '@telegram-apps/telegram-ui'
import { useCSSTheme } from "./hooks/useCSSTheme.ts";
import BuildVersion from './components/BuildVersion';
import {Questions} from "./pages/questions/ui";
import { useTelegramLanguage } from "./hooks/useTelegramLanguage.ts";
import { useTranslation } from "react-i18next";

function App() {
    const [isTMA, setIsTMA] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { ready, themeParams } = useCSSTheme();
    const { t, i18n, ready: i18nReady } = useTranslation();
    const currentLanguage = useTelegramLanguage();

    useEffect(() => {
        const initApp = async () => {
            try {
                await init()
                console.log('Running in Telegram Mini App')

                // Ждем инициализации i18n
                await i18n.isInitialized;
                console.log('i18n initialized:', i18n.isInitialized);
                console.log('Current language:', i18n.language);
                console.log('Available translations:', i18n.getResourceBundle(i18n.language, 'common'));
                const browserLang = navigator.language?.split('-')[0];
                console.log(browserLang)
                backButton.show()
                backButton.onClick(() => window.history.back())
                viewport.expand()
                setIsTMA(true)

                // Тестируем перевод
                console.log('Translation test:', t('title'));

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
                                    language_code: 'ru', // Добавьте language_code для разработки
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

                // Ждем инициализации i18n в dev mode
                await i18n.isInitialized;
            } finally {
                setIsLoading(false)
            }
        }

        initApp()
    }, [i18n, t])

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

    if (isLoading || !ready || !i18nReady) {
        return (
            <div className="loading">
                Loading...
                <div>i18n Ready: {i18nReady ? 'Yes' : 'No'}</div>
                <div>Language: {i18n.language}</div>
            </div>
        )
    }

    return (
        <div className="app" style={appStyle}>
            <Questions />
            {/*<h1>Gift Mini App</h1>
            {/* Используйте t без префикса common:, т.к. это defaultNS */}
            <h1>{t('title')}</h1>
            <p>Environment: {isTMA ? 'Telegram' : 'Browser (Development)'}</p>
            <p>Current Language: {currentLanguage}</p>
            <p>i18n Language: {i18n.language}</p>


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
            </div>*/}

            {isTMA && window.Telegram?.WebApp?.initDataUnsafe?.user && (
                <div className="user-info">
                    <h2>User Info:</h2>
                    <p>ID: {window.Telegram.WebApp.initDataUnsafe.user.id} </p>
                    <p>Name: {window.Telegram.WebApp.initDataUnsafe.user.first_name}</p>
                    <p>Username: @{(window.Telegram.WebApp.initDataUnsafe.user.username)}</p>
                    <p>Language: {window.Telegram.WebApp.initDataUnsafe.user.language_code}</p>
                </div>
            )}

            <BuildVersion />
        </div>
    )
}

export default App;