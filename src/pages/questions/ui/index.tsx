import {observer} from "mobx-react-lite";
import {Tabbar, TabsList} from "@telegram-apps/telegram-ui";
import {useState} from "react";
import {Tags} from "./components/Tags.tsx";

export const Questions = observer(() => {
    const [activeTab, setActiveTab] = useState('tags')
    return(
        <>
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
            <Tags />
        </>
    )
});