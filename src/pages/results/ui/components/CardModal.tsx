import { Modal, Text} from "@telegram-apps/telegram-ui";
import {observer} from "mobx-react-lite";
import '../../../../index.css'

interface CardModalProps {
    product: {
        title: string,
        cost: string,
        market: string,
        description: string,
        link: string
    };
    open: boolean;
    setOpen: (open: boolean) => void
}

export const CardModal = observer(({product, setOpen, open}: CardModalProps) => {
    return (
        <Modal
            open={open}
            onOpenChange={setOpen}
            className={'modal'}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px'
            }}>
                <Text weight={"2"} className={'title'}>{product.title}</Text>
                <div
                    style={{
                        width: '90%',
                        height: '150px',
                        border: '1px solid gray',
                        borderRadius: '30px'
                    }}
                >

                </div>
                <Text className={'cost'}>
                    {product.cost} рублей
                </Text>
                <Text className={'market'}>
                    {product.market}
                </Text>
                <Text >
                    {product.description}
                </Text>
            </div>
        </Modal>
    )
})
