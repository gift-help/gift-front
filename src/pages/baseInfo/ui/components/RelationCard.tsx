import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { Radio } from '@telegram-apps/telegram-ui';

import { useBaseInfo } from '@/hooks/useBaseInfo';
import formInfoStore from '@/shared/store/store';

export const RelationCard = observer(() => {
  const store = formInfoStore;
  const { getRelationOptions } = useBaseInfo();
  const { t } = useTranslation('baseInfo');

  return (
    <div className="card">
      <p className="card-title">{t('questions.relation')}</p>
      <div className="options-list">
        {getRelationOptions().map((opt) => (
          <label key={opt.value} className="option-row">
            <Radio
              name="relation"
              checked={store.relationLevel === opt.value}
              onChange={() => store.setRelationLevel(opt.value)}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
});
