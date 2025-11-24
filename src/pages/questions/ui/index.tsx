import {observer} from "mobx-react-lite";
import {Button, Tabbar, TabsList} from "@telegram-apps/telegram-ui";
import React, {useState} from "react";
import {Tags} from "./components/Tags.tsx";
import {useTranslation} from "react-i18next";

export const Questions = observer(() => {
    const [activeTab, setActiveTab] = useState('tags')
    const { t } = useTranslation();

    return(
        <div
        style={{
            display: 'flex',
            flexDirection: 'column'
        }}
        >
            <TabsList>
                <TabsList.Item
                    selected={activeTab === 'tags'}
                    onClick={() => setActiveTab('tags')}
                >
                    {"Интересы"}
                </TabsList.Item>
                <TabsList.Item
                    selected={activeTab === 'questions'}
                    onClick={() => setActiveTab('questions')}
                >
                    {"Вопросы"}
                </TabsList.Item>
            </TabsList>
            {activeTab === 'tags' && <Tags/>}
            {activeTab === 'tags' && <Button
                size="m"
                mode={'filled'}
                onClick={() => setActiveTab('questions')}
            >
                {t('buttons:next')}
            </Button>}
            {activeTab === 'questions' && <div>
                <Button
                    size="m"
                    mode={'bezeled'}
                    onClick={() => setActiveTab('tags')}
                >
                    {t('buttons:back')}
                </Button>
                <Button
                    size="m"
                    mode={'filled'}
                >
                    {t('buttons:next')}
                </Button>
            </div>}
        </div>
    )
});