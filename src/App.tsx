import {useEffect, useState, useCallback} from 'react';
import {init, backButton } from '@telegram-apps/sdk';
import '@telegram-apps/telegram-ui/dist/styles.css';
import './index.css';
import './i18n';
import {useCSSTheme} from './hooks/useCSSTheme.ts';
import BuildVersion from './components/BuildVersion';
import {useAuth} from './hooks/useAuth';
import {QuestionsPage} from "./pages/questions/ui";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {HomePage} from './pages/home/ui';
import {BaseInfoPage} from "./pages/baseInfo/ui";
import {DescriptionPage} from "./pages/description/ui";
import {ResultsPage} from "@/pages/results";

// Создаем отдельный компонент для маршрутов
const NavigationWrapper = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/base_info" element={<BaseInfoPage/>}/>
            <Route path="/questions" element={<QuestionsPage/>}/>
            <Route path="/description" element={<DescriptionPage/>}/>
            <Route path="/results" element={<ResultsPage/>}/>
        </Routes>
    );
};

function App() {
    // @ts-ignore
    const [isTMA, setIsTMA] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {isLoading: authLoading, logout, token } = useAuth();
    const {ready} = useCSSTheme();

    // Функция для инициализации TMA
    const initTelegramApp = useCallback(async () => {
        try {
            // Инициализируем SDK
            init();
            console.log('Running in Telegram Mini App');

            // Инициализируем только если доступно
            if (backButton.isSupported()) {
                backButton.show();
                backButton.onClick(() => window.history.back());
            }

            setIsTMA(true);

        } catch (error) {
            console.log('Development mode: Mocking Telegram Web App', error);
            // Упрощенный мок для разработки
            if (!window.Telegram?.WebApp) {
                window.Telegram = {
                    WebApp: {
                        initData: '',
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
                        ready: () => {
                            console.log('Telegram WebApp ready');
                            /*setIsLoading(false);*/
                        },
                        expand: () => console.log('expanded'),
                        close: () => logout(),
                        sendData: (data: string) => console.log('sendData:', data),
                        isExpanded: true,
                        version: '6.0',
                        platform: 'web',
                        colorScheme: 'light',
                        themeParams: {},
                    },
                };
            }

            // Вызываем ready только один раз
            window.Telegram?.WebApp?.ready?.();
            setIsTMA(false); // В разработке это не TMA
        }
    }, [logout]);

    // Главный эффект инициализации
    useEffect(() => {
        let mounted = true;

        const initializeApp = async () => {
            try {
                // Ждем инициализации темы
                // Ждем инициализации i18n через событие или промис
                // Если в i18n есть метод initialize, используем его

                // Инициализируем TMA
                await initTelegramApp();

                // Симулируем небольшую задержку для стабильности
                await new Promise(resolve => setTimeout(resolve, 100));

            } catch (error) {
                console.error('Initialization error:', error);
            } finally {
                if (mounted) {
                    setIsLoading(false);
                }
            }
        };

        initializeApp();

        // Очистка при размонтировании
        return () => {
            mounted = false;
        };
    }, [initTelegramApp]); // Зависимости только от initTelegramApp

    // Проверка состояния загрузки
    if (isLoading || !ready || authLoading) {
        return (
            <div className="loading">
                <div>Loading...</div>
                <div>Theme ready: {ready ? 'Yes' : 'No'}</div>
                <div>Auth loading: {authLoading ? 'Yes' : 'No'}</div>
            </div>
        );
    }

    return (
        <Router>
            <div className="app">
                <NavigationWrapper/>
                {
                    token ? <p>Успешно авторизован</p> : <p>Авторизация не прошла</p>
                }
                <BuildVersion/>
            </div>
        </Router>
    );
}

export default App;