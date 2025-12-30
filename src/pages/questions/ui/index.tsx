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
        <IconButton mode="plain" onClick={() => navigate(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M14 18L8 12L14 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
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
