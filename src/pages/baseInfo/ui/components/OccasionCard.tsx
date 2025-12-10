import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { Radio, Input } from '@telegram-apps/telegram-ui';

import { useBaseInfo } from '@/hooks/useBaseInfo';
import formInfoStore from '@/shared/store/store';

export const OccasionCard = observer(() => {
  const store = formInfoStore;
  const { getOccasionOptions } = useBaseInfo();
  const { t } = useTranslation('baseInfo');

  return (
    <div className="card">
      <p className="card-title">{t('questions.occasion')}</p>

      <div className="options-list">
        {getOccasionOptions().map((opt) => (
          <label key={opt.value} className="option-row">
            <Radio
              name="occasion"
              checked={store.occasion === opt.value}
              onChange={() => store.setOccasion(opt.value)}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>

      {store.occasion === 'OTHER' && (
        <Input
          placeholder={t('placeholders.otherOccasion')}
          value={store.customOccasion}
          onChange={(e) => store.setCustomOccasion(e.target.value)}
          maxLength={30}
          style={{ caretColor: 'var(--tg-button-color)' }}
        />
      )}
    </div>
  );
});
