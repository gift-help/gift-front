import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { Radio, Input } from '@telegram-apps/telegram-ui';

import { useBaseInfo } from '@/hooks/useBaseInfo';
import formInfoStore from '@/shared/store/data.store.ts';

export const GenderAgeCard = observer(() => {
  const store = formInfoStore;
  const { getGenderOptions } = useBaseInfo();
  const { t } = useTranslation('baseInfo');

  // Helper to block invalid characters
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow: Backspace, Delete, Tab, Escape, Enter, Arrow Keys
    if (
      ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(e.key)
    ) {
      return;
    }

    // Block: Minus, Plus, 'e' (scientific notation)
    if (
      ['-', '+', 'e', 'E', '.'].includes(e.key) ||
      (e.key === '0' && e.currentTarget.value === '0')
    ) {
      e.preventDefault();
    }
  };

  return (
    <>
      <div className="card">
        <p className="card-title">{t('questions.gender')}</p>

        <div className="gender-row">
          {getGenderOptions().map((opt) => (
            <label key={opt.value} className="option-row">
              <Radio
                name="gender"
                checked={store.gender === opt.value}
                onChange={() => store.setGender(opt.value)}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="card">
        <p className="card-title">{t('questions.age')}</p>

        <div className="age-input-wrapper">
          <Input
            type="number"
            value={store.age}
            onChange={(e) => store.setAge(e.target.value)}
            onKeyDown={handleKeyDown}
            min={0}
            max={100}
            inputMode="numeric"
          />
        </div>
      </div>
    </>
  );
});
