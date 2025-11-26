import { useEffect, useState } from 'react'
import { init, backButton, viewport } from '@telegram-apps/sdk'
import '@telegram-apps/telegram-ui/dist/styles.css'
import './index.css'
import './i18n';
import { useCSSTheme } from "./hooks/useCSSTheme.ts";
import BuildVersion from './components/BuildVersion';
import { QuestionsPage} from "./pages/questions/ui";
import { useTranslation } from "react-i18next";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {HomePage} from "./pages/home/ui";
import {BaseInfoPage} from "./pages/baseInfo/ui";
import {DescriptionPage} from "./pages/description/ui";

function App() {
    const [isTMA, setIsTMA] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { ready } = useCSSTheme();
    const { t, i18n, ready: i18nReady } = useTranslation();

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


    if (isLoading || !ready || !i18nReady) {
        return (
            <div className="loading">
                Loading...
                <div>i18n Ready: {i18nReady ? 'Yes' : 'No'}</div>
                <div>Language: {i18n.language}</div>
            </div>
        )
    }

    const NavigationWrapper = () => {

        return (
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/base_info" element={<BaseInfoPage/>}/>
                <Route path="/questions" element={<QuestionsPage/>}/>
                <Route path="/description" element={<DescriptionPage/>}/>
            </Routes>
        );
    }

    return (
        <Router>
        <div className="app" >
            <NavigationWrapper />
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
        </Router>
    )
}

export default App;