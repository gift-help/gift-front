import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { reaction } from 'mobx';
import { useTranslation } from 'react-i18next';
import { Button } from '@telegram-apps/telegram-ui';

import { GenderAgeCard } from './components/GenderAgeCard';
import { OccasionCard } from './components/OccasionCard';
import { FormatCard } from './components/FormatCard';
import { RelationCard } from './components/RelationCard';
import { CustomProgress } from './components/CustomProgress';

import formInfoStore from '@/shared/store/store';

export const BaseInfoPage = observer(() => {
  const navigate = useNavigate();
  const store = formInfoStore;
  const { t } = useTranslation('baseInfo');

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
        <h1 className="header-title">{t('title')}</h1>
      </div>

      <div className="content-wrapper">
        <p className="description">{t('description')}</p>

        <GenderAgeCard />
        <OccasionCard />
        <FormatCard />
        <RelationCard />

        <div className="base-info-footer">
          <div
            style={{
              position: 'fixed',
              bottom: -50,
              padding: '120px',
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
            <Button size="m" onClick={() => store.submitBaseInfo()} disabled={!store.canProceed}>
              {t('buttons.next')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});
