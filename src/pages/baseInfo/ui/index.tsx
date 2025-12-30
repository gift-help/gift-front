import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { reaction } from 'mobx';
import { useTranslation } from 'react-i18next';
import { Button, IconButton, Text } from '@telegram-apps/telegram-ui';

import { GenderAgeCard } from './components/GenderAgeCard';
import { OccasionCard } from './components/OccasionCard';
import { FormatCard } from './components/FormatCard';
import { RelationCard } from './components/RelationCard';
import { CustomProgress } from './components/CustomProgress';

import formInfoStore from '@/shared/store/data.store.ts';

export const BaseInfoPage = observer(() => {
  const navigate = useNavigate();
  const store = formInfoStore;
  const { t } = useTranslation('baseInfo');
  // Handle Close Logic
  const handleClose = () => {
    formInfoStore.reset();
    navigate('/');
  };

  // Navigation Logic
  useEffect(() => {
    store.isBaseInfoComplete = false;
  }, [store]);
  useEffect(() => {
    const dispose = reaction(
      () => store.isBaseInfoComplete,
      (isComplete) => {
        if (isComplete) navigate('/questions');
      },
    );
    return () => dispose();
  }, [navigate, store]);

  // Calculate Progress Logic
  const { gender, age, occasion, formats, relationLevel } = store;
  let filledCount = 0;
  if (gender) filledCount++;
  if (age !== '') filledCount++;
  if (occasion) filledCount++;
  if (formats.length > 0) filledCount++;
  if (relationLevel) filledCount++;

  const progressValue = filledCount / 5;

  return (
    <div className="base-info-container">
      <div className="header-wrapper">
        <div
          style={{
            position: 'absolute',
            left: '-12px',
          }}
        >
          <IconButton mode="plain" onClick={handleClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12 5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
            </svg>
          </IconButton>
        </div>
        <Text weight="1">{t('title')}</Text>
      </div>

      <div className="content-wrapper">
        <div
          style={{ textAlign: 'center', marginBottom: '24px', width: '100%', marginTop: '15px' }}
        >
          <Text style={{ fontSize: 14, lineHeight: '16px', fontWeight: 510 }}>
            {t('description')}
          </Text>
        </div>

        <GenderAgeCard />
        <OccasionCard />
        <FormatCard />
        <RelationCard />

        <div
          style={{
            position: 'fixed',
            bottom: 50,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <CustomProgress value={progressValue} />
        </div>

        <div
          style={{
            display: 'flex',
            padding: '23px',
            justifyContent: 'center',
          }}
        >
          <Button onClick={() => store.submitBaseInfo()} disabled={!store.canProceed}>
            {t('buttons.next')}
          </Button>
        </div>
      </div>
    </div>
  );
});
