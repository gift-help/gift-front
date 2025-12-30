import { Card, Text } from '@telegram-apps/telegram-ui';
import './Card.css';
import { useState } from 'react';
import { CardModal } from '@/pages/results/ui/components/CardModal.tsx';

interface ProductCardProps {
  product: {
    title: string;
    cost: string;
    market: string;
    description: string;
    link: string;
  };
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Card style={{ width: '48%', marginBottom: '10px' }} onClick={() => setOpenModal(true)}>
      <div
        style={{
          padding: '40px',
        }}
      ></div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
          padding: '15px',
        }}
      >
        <Text weight={'2'} className={'title'}>
          {product.title}
        </Text>
        <Text className={'cost'}>{product.cost} рублей</Text>
        <Text className={'market'}>{product.market}</Text>
      </div>
      <CardModal product={product} open={openModal} setOpen={setOpenModal} />
    </Card>
  );
};
