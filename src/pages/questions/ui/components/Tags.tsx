import  { useState } from 'react';
import '../../../../i18n.ts';
import {useTags} from "@/hooks/useTags.ts";
import {Badge, Button, Text} from "@telegram-apps/telegram-ui";
import '../../../../index.css'
import {TagsModal} from "./TagsModal.tsx";
import {useTranslation} from "react-i18next";
import formInfoStore from "../../../../shared/store/data.store.ts";

export const Tags = () => {
    const { getCategories } = useTags();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const { t } = useTranslation();
    const {tags} = formInfoStore;

    const categories = getCategories();

    const handleTagClick = (id: string) => {
        setSelectedCategory(id);
        setOpenModal(true);
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '20px',
                textAlign: 'center',
                gap: '20px'
            }}
        >
            <Text>{t('title_tags')}</Text>
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                    marginBottom: '20px',
                    alignItems: 'center',
                    justifyContent: 'center'
            }}
            >
                {categories.map(category => (
                    <div style={{
                        position: 'relative'
                    }}>
                        <Button
                            key={category.id}
                            onClick={() => handleTagClick(category.id)}
                            mode={(tags?.[category.id]?.length > 0) ? 'filled' : 'bezeled'}
                            size={'s'}
                        >
                            {category.name}

                        </Button>
                        {tags?.[category.id]?.length > 0 && <Badge
                            type={'number'}
                            mode={'white'}
                            className={'badge'}
                        >
                            {tags?.[category.id]?.length}
                        </Badge>}
                    </div>
                ))}
            </div>
            <TagsModal open={openModal} tag={selectedCategory} setOpen={setOpenModal} />
        </div>
    );
};

