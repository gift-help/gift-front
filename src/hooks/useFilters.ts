import { useTranslation } from 'react-i18next';

export const useFilters = () => {
  const { t } = useTranslation('filters');

  const getMarketplaceOptions = () => [
    { value: 'wildberries', label: t('marketplace.wildberries') },
    { value: 'ozon', label: t('marketplace.ozon') },
    { value: 'ya_market', label: t('marketplace.ya_market') },
  ];

  const getDeliveryOptions = () => [
    { value: 'any', label: t('delivery.any') },
    { value: 'today', label: t('delivery.today') },
    { value: 'tomorrow', label: t('delivery.tomorrow') },
    { value: 'up_5_days', label: t('delivery.up_5_days') },
  ];

  const getBudgetOptions = () => ({
    from: t('budget.from'),
    to: t('budget.to'),
  });

  return {
    getMarketplaceOptions,
    getDeliveryOptions,
    getBudgetOptions,
  };
};
