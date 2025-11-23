import React, { useState } from 'react';
import '../../../../i18n.ts';
import {useTags} from "../../../../hooks/useTags.ts";
import {Badge, Button, Chip} from "@telegram-apps/telegram-ui";
import '../../../../index.css'
import {TagsModal} from "./TagsModal.tsx";
import {useTranslation} from "react-i18next";

export const Tags = () => {
    const { getCategories, getCategoryItems } = useTags();
    const [selectedCategory, setSelectedCategory] = useState();
    const [openModal, setOpenModal] = useState(false);
    const { t } = useTranslation();

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
                marginTop: '20px'
            }}
        >
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

                    <Chip
                        key={category.id}
                        onClick={() => handleTagClick(category.id)}
                        mode={selectedCategory == category.id ? 'mono' : 'outline'}
                        className={`chip ${selectedCategory == category.id ? 'selected' : ''}`}
                        size={20}
                        style={{
                            position: 'relative'
                        }}
                    >
                        {category.name}
                        <Badge type={'dot'} mode="prominent"
                               size="s" style={{
                            position: 'absolute',
                            right: '8px',
                            top: '50%',
                            transform: 'translateY(-50%)'
                        }}>
                            5
                        </Badge>
                    </Chip>
                ))}
            </div>
            <Button
                size="m"
                mode={'filled'}
            >
                {t('buttons:next')}
            </Button>
            <TagsModal open={openModal} tag={selectedCategory} setOpen={setOpenModal} />
        </div>
    );
};