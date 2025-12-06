import { useTranslation } from 'react-i18next';

export const useBaseInfo = () => {
  const { t } = useTranslation('baseInfo');

  const getGenderOptions = () => [
    { value: 'FEMALE', label: t('gender.female') },
    { value: 'MALE', label: t('gender.male') },
  ];

  const getOccasionOptions = () => [
    { value: 'BIRTHDAY', label: t('occasion.birthday') },
    { value: 'NEW_YEAR', label: t('occasion.newYear') },
    { value: 'MARCH_8', label: t('occasion.march8') },
    { value: 'FEBRUARY_23', label: t('occasion.february23') },
    { value: 'WEDDING', label: t('occasion.wedding') },
    { value: 'ANNIVERSARY', label: t('occasion.anniversary') },
    { value: 'JUST_BECAUSE', label: t('occasion.justBecause') },
    { value: 'OTHER', label: t('occasion.other') },
  ];

  const getFormatOptions = () => [
    { value: 'WILDBERRIES', label: t('format.wildberries') },
    { value: 'IDEA_ONLY', label: t('format.ideaOnly') },
  ];

  const getRelationOptions = () => [
    { value: 'UNKNOWN', label: t('relation.unknown') },
    { value: 'VERY_POOR', label: t('relation.veryPoor') },
    { value: 'POOR', label: t('relation.poor') },
    { value: 'NORMAL', label: t('relation.normal') },
    { value: 'GOOD', label: t('relation.good') },
    { value: 'EXCELLENT', label: t('relation.excellent') },
  ];

  return {
    getGenderOptions,
    getOccasionOptions,
    getFormatOptions,
    getRelationOptions,
  };
};
