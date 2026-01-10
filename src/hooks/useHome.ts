import { useTranslation } from 'react-i18next';

export const useHome = () => {
  const { t } = useTranslation('home');

  const getTitle = () => t('title');
  const getSubtitle = () => t('subtitle');
  const getButtonLabel = () => t('button');

  return {
    getTitle,
    getSubtitle,
    getButtonLabel,
  };
};
