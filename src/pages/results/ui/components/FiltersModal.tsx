import {Button, Checkbox, Input, Modal, Radio, Text} from "@telegram-apps/telegram-ui";
import {observer} from "mobx-react-lite";
import '../../../../index.css'

interface CardModalProps {
    open: boolean;
    setOpen: (open: boolean) => void
}

export const FiltersModal = observer(({ setOpen, open}: CardModalProps) => {
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
                <div className={'card'}>
                    <Text>Бюджет</Text>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',

                        }}
                    >
                        <Input
                            type="number"
                            min={0}
                            max={100}
                            inputMode="numeric"
                            className={'input'}
                            placeholder={'От'}
                        />
                        <Input
                            type="number"
                            min={0}
                            max={100}
                            inputMode="numeric"
                            className={'input'}
                            placeholder={'До'}
                        />
                    </div>
                </div>

                <div className="card">
                    <Text>{'Маркетплейс'}</Text>
                    <div style={{
                        display: 'grid',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <label className="option-row">
                            <Checkbox
                            />
                            <Text>{'WildBerries'}</Text>
                        </label>
                        <label className="option-row">
                            <Checkbox
                            />
                            <Text>{'Ozon'}</Text>
                        </label>
                        <label className="option-row">
                            <Checkbox
                            />
                            <Text>{'Яндекс Маркет'}</Text>
                        </label>
                    </div>
                </div>

                <div className={'card'}>
                    <Text>Бюджет</Text>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <label className="option-row">
                            <Radio
                                name="gender"
                            />
                            <Text>{'Любой'}</Text>
                        </label>
                        <label className="option-row">
                            <Radio
                                name="gender"
                            />
                            <Text>{'Сегодня'}</Text>
                        </label>
                        <label className="option-row">
                            <Radio
                                name="gender"
                            />
                            <Text>{'Завтра'}</Text>
                        </label>
                        <label className="option-row">
                            <Radio
                                name="gender"
                            />
                            <Text>{'До 5 дней'}</Text>
                        </label>
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: '20px'
                }}>
                    <Button mode={'bezeled'}>Очистить</Button>
                    <Button>Применить</Button>
                </div>

            </div>
        </Modal>
    )
})


