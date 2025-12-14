import { Button, Checkbox, Input, Modal, Radio, Text } from '@telegram-apps/telegram-ui';
import { observer } from 'mobx-react-lite';

import { useFilters } from '@/hooks/useFilters.ts';
import { useTranslation } from 'react-i18next';
import filtersStore from '@/shared/store/filters.store.ts';
import '../../../../index.css';

interface CardModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const FiltersModal = observer(({ setOpen, open }: CardModalProps) => {
  const { getMarketplaceOptions, getDeliveryOptions, getBudgetOptions } = useFilters();
  const { t } = useTranslation();

  return (
    <Modal open={open} onOpenChange={setOpen} className={'modal'}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '10px',
        }}
      >
        <div className={'card'}>
          <Text>{t('filters:budget_title')}</Text>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <Input
              type="number"
              min={0}
              max={100}
              inputMode="numeric"
              className={'input'}
              placeholder={getBudgetOptions().from}
              onChange={(e) => filtersStore.setBudgetFrom(e.target.value)}
              style={{
                width: '50px',
              }}
            />
            <Input
              type="number"
              min={0}
              max={100}
              inputMode="numeric"
              className={'input'}
              placeholder={getBudgetOptions().to}
              onChange={(e) => filtersStore.setBudgetTo(e.target.value)}
              style={{
                width: '50px',
              }}
            />
          </div>
        </div>

        <div className="card">
          <Text>{t('filters:marketplace_title')}</Text>
          <div
            style={{
              display: 'grid',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {getMarketplaceOptions().map((opt) => (
              <label key={opt.value} className="option-row">
                <Checkbox
                  checked={filtersStore.filters?.market?.includes(opt.value)}
                  onChange={() => filtersStore.setMarketplace(opt.value)}
                />
                <Text>{opt.label}</Text>
              </label>
            ))}
          </div>
        </div>

        <div className={'card'}>
          <Text>{t('filters:delivery_title')}</Text>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {getDeliveryOptions().map((opt) => (
              <label key={opt.value} className="option-row">
                <Radio
                  name="delivery"
                  checked={filtersStore.filters.delivery === opt.value}
                  onChange={() => filtersStore.setDelivery(opt.value)}
                />
                <Text>{opt.label}</Text>
              </label>
            ))}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: '20px',
          }}
        >
          <Button mode={'bezeled'}>{t('buttons:clear')}</Button>
          <Button onClick={filtersStore.submitFilters}>{t('buttons:apply')}</Button>
        </div>
      </div>
    </Modal>
  );
});

