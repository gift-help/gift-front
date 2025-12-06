import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { Checkbox } from '@telegram-apps/telegram-ui';

import { useBaseInfo } from '@/hooks/useBaseInfo';
import formInfoStore from '@/shared/store/store';

export const FormatCard = observer(() => {
  const store = formInfoStore;
  const { getFormatOptions } = useBaseInfo();
  const { t } = useTranslation('baseInfo');

  return (
    <div className="card">
      <p className="card-title">{t('questions.format')}</p>
      <div className="options-list">
        {getFormatOptions().map((opt) => (
          <label key={opt.value} className="option-row">
            <Checkbox
              checked={store.formats.includes(opt.value)}
              onChange={() => store.toggleFormat(opt.value)}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
});
