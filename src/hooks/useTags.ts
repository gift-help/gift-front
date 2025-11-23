import '../i18n.ts';
import { useTranslation } from 'react-i18next';

export const useTags = () => {
    const { t } = useTranslation('tags');

    // Получить все категории
    const getCategories = () => {
        return [
            { id: 'creativity', name: t('tags.creativity') },
            { id: 'hobbies', name: t('tags.hobbies') },
            { id: 'sport', name: t('tags.sport') },
            { id: 'technologies', name: t('tags.technologies') },
            { id: 'style', name: t('tags.style') },
            { id: 'character', name: t('tags.character') },
            { id: 'entertainment', name: t('tags.entertainment') },
            { id: 'art', name: t('tags.art') },
            { id: 'travel', name: t('tags.travel') },
            { id: 'home', name: t('tags.home') },
            { id: 'auto', name: t('tags.auto') },
        ];
    };

    // Получить элементы категории
    const getCategoryItems = (categoryId: string) => {
        const items = {
            creativity: ['drawing', 'photography', 'knitting', 'embroidery', 'calligraphy', 'interior', 'guitar', 'singing', 'dancing', 'sewing'],
            arts: ['painting', 'sculpture']
        };

        return items[categoryId as keyof typeof items]?.map(itemId => ({
            id: itemId,
            name: t(`items.${categoryId}.${itemId}`)
        })) || [];
    };

    return { getCategories, getCategoryItems };
};