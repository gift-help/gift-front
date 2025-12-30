import { observer } from 'mobx-react-lite';
import { Button, IconButton, TabsList } from '@telegram-apps/telegram-ui';
import { useState } from 'react';
import { Tags } from './components/Tags.tsx';
import { useTranslation } from 'react-i18next';
import { Questions } from './components/Questions.tsx';
import { useNavigate } from 'react-router-dom';

export const QuestionsPage = observer(() => {
  const [activeTab, setActiveTab] = useState('tags');
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
        }}
      >
        <IconButton mode="plain" onClick={() => navigate('/')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12 5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
          </svg>
        </IconButton>
        <TabsList>
          <TabsList.Item selected={activeTab === 'tags'} onClick={() => setActiveTab('tags')}>
            {t('interests')}
          </TabsList.Item>
          <TabsList.Item
            selected={activeTab === 'questions'}
            onClick={() => setActiveTab('questions')}
          >
            {t('questions')}
          </TabsList.Item>
        </TabsList>
      </div>

      {activeTab === 'tags' && <Tags />}
      {activeTab === 'questions' && <Questions />}
      {activeTab === 'tags' && (
        <Button size="m" mode={'filled'} onClick={() => setActiveTab('questions')}>
          {t('buttons:next')}
        </Button>
      )}
    </div>
  );
});
