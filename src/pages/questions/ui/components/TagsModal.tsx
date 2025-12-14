import { Button, Modal } from '@telegram-apps/telegram-ui';
import { useTags } from '@/hooks/useTags.ts';
import { observer } from 'mobx-react-lite';
import formInfoStore from '../../../../shared/store/data.store.ts';
import '../../../../index.css';

interface TagsModalProps {
  tag: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}
export const TagsModal = observer(({ tag, setOpen, open }: TagsModalProps) => {
  const { getCategoryItems } = useTags();
  const { tags } = formInfoStore;

  const items = getCategoryItems(tag);

  const handleItemClick = (item: string) => {
    formInfoStore.addTag(tag, item);
  };

  // @ts-ignore
  return (
    <Modal open={open} onOpenChange={setOpen} className={'modal'}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '7px' }}>
        {items.map((item) => (
          <Button
            key={item.id}
            mode={tags?.[tag]?.includes(item.name) ? 'filled' : 'bezeled'}
            size={'s'}
            onClick={() => handleItemClick(item.name)}
          >
            {item.name}
          </Button>
        ))}
      </div>
    </Modal>
  );
});
