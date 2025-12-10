import { useTranslation } from 'react-i18next';

export const useDescription = () => {
  const { t } = useTranslation('description');

  const getTitle = () => t('title');
  const getInstructions = () => t('instructions');
  const getPlaceholder = () => t('placeholder');
  const getButtonLabel = () => t('button');

  return {
    getTitle,
    getInstructions,
    getPlaceholder,
    getButtonLabel,
    maxLength: 350,
  };
};
