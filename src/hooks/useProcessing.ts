import { useTranslation } from 'react-i18next';

export const useProcessing = () => {
  const { t } = useTranslation('processing');

  const getTitle = () => t('title');
  // Steps
  const getStepAnalyzing = () => t('steps.analyzing');
  const getStepSearching = () => t('steps.searching');
  const getStepWrapping = () => t('steps.wrapping');
  const getStepReady = () => t('steps.ready');

  return {
    getTitle,
    getStepAnalyzing,
    getStepSearching,
    getStepWrapping,
    getStepReady,
  };
};
