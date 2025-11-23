import {Chip, Modal} from "@telegram-apps/telegram-ui";
import {useTags} from "../../../../hooks/useTags.ts";
import React, {useState} from "react";
import {observer} from "mobx-react-lite";
import formInfoStore from "../../../../shared/store/store.ts";
import '../../../../index.css'

interface TagsModalProps {
    tag: string;
    open: boolean;
    setOpen: (open: boolean) => void
}
export const TagsModal = observer(({tag, setOpen, open}: TagsModalProps) => {
    const { getCategories, getCategoryItems } = useTags();
    const {tags} = formInfoStore;
    console.log(tags)

    const items = getCategoryItems(tag);

    const handleItemClick = (item: string) => {
        formInfoStore.addTag(tag, item)
    }

    return(
        <Modal
            open={open}
            onOpenChange={setOpen}
            className={'modal'}
        >
            <div style={{display: 'flex', flexWrap :'wrap', justifyContent: 'center', gap: '5px'}}>
                {items.map(item => (
                    <Chip
                        key={item.id}
                        mode={!!tags?.[tag]?.includes(item.name) ? 'mono' : 'outline'}
                        className={'chip'}
                        onClick={() => handleItemClick(item.name)}
                    >
                        {item.name}
                    </Chip>
                ))}
            </div>
        </Modal>
    )
})
