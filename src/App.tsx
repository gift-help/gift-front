import { useEffect, useState } from 'react'
import { init, backButton, viewport } from '@telegram-apps/sdk'
import '@telegram-apps/telegram-ui/dist/styles.css'
import './index.css'
import './i18n';
import { useCSSTheme } from "./hooks/useCSSTheme.ts";
import BuildVersion from './components/BuildVersion';
import {HomePage} from "./pages/home/ui";
import { useAuth } from './hooks/useAuth';
import { QuestionsPage} from "./pages/questions/ui";
import { useTranslation } from "react-i18next";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {BaseInfoPage} from "./pages/baseInfo/ui";
import {DescriptionPage} from "./pages/description/ui";

function App() {
    // @ts-ignore
    const [isTMA, setIsTMA] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { isLoading: authLoading, logout, token } = useAuth(); // Используем хук аутентификации
    const { ready } = useCSSTheme();
    const { t, i18n, ready: i18nReady } = useTranslation();

    useEffect(() => {
        const initApp = async () => {
            try {
                init();
                console.log('Running in Telegram Mini App')

                i18n.isInitialized;

                backButton.show();
                backButton.onClick(() => window.history.back());
                viewport.expand();
                setIsTMA(true);
            } catch (error) {
                console.log('Development mode: Mocking Telegram Web App', error)
                if (!window.Telegram) {
                    // mock data for development
                    window.Telegram = {
                        WebApp: {
                            initData: 'query_id=AAFA-HJGAAAAAED4ckYTrP_S&user=%7B%22id%22%3A1181939776%2C%22first_name%22%3A%22%D0%90%D0%BB%D1%91%D0%BD%D0%B0%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22alyona_filyaeva%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2F5muFdLPE3yEuWZnWVIhVLLM74u7gy7DgQvXlLfNaTKA.svg%22%7D&auth_date=1764411806&signature=6OWfiL6Ky-aqQTq-chjjQfklbXjsg_90kIC11gJnR5ongsPr4xJWYeMVHLPBvfze66as-9mcj6uXkI__ttlYDw&hash=b17372f5ea73b1bd90b58fb6570c883906464cd30fe508242af18a4727d1eb6d',
                            initDataUnsafe: {
                                user: {
                                    id: 123456789,
                                    first_name: 'Test',
                                    username: 'test_user',
                                    language_code: 'ru',
                                },
                                auth_date: Math.floor(Date.now() / 1000),
                                hash: 'mock_hash',
                            },

                            expand: () => console.log('expanded'),
                            ready: () => console.log('ready'),
                            close: () => logout,
                            sendData: (data: string) => console.log('sendData:', data),
                        },
                    }
                }
                window.Telegram?.WebApp?.ready?.()
                window.Telegram?.WebApp?.expand?.()
                setIsTMA(true)

                await i18n.isInitialized;
            } finally {
                setIsLoading(false)
            }
        }

        initApp()
    }, [i18n, t])


    if (isLoading || !ready || !i18nReady || authLoading) {
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
            {/*{isTMA && window.Telegram?.WebApp?.initDataUnsafe?.user && (
                <div className="user-info">
                    <h2>User Info:</h2>
                    <p>ID: {window.Telegram.WebApp.initDataUnsafe.user.id} </p>
                    <p>Name: {window.Telegram.WebApp.initDataUnsafe.user.first_name}</p>
                    <p>Username: @{(window.Telegram.WebApp.initDataUnsafe.user.username)}</p>
                    <p>Language: {window.Telegram.WebApp.initDataUnsafe.user.language_code}</p>
                </div>
            )}*/}
            {
                token ? <p>Успешно авторизован</p> : <p>Авторизация не прошла</p>
            }
            <BuildVersion />
        </div>
        </Router>
    )
}

export default App;