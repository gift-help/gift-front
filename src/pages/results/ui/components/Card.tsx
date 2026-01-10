import { Button, Card, Text } from '@telegram-apps/telegram-ui';
import './Card.css';

interface ProductCardProps {
  product: {
    title: string;
    search_query: string;
    description: string;
  };
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className={'card-product'}>
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
        <Text>{product.description}</Text>
        <div
          style={{
            display: 'flex',
            justifyContent: 'start',
            gap: '15px',
            paddingTop: '5px',
          }}
        >
          <Button
            className={'marketplace wb'}
            onClick={() =>
              window.open(
                `https://www.wildberries.ru/catalog/0/search.aspx?search=${product.search_query}`,
              )
            }
          >
            <p>WB</p>
          </Button>
          <Button
            className={'marketplace ozon'}
            onClick={() => window.open(`https://www.ozon.ru/search/?text=${product.search_query}`)}
          >
            <p>Ozon</p>
          </Button>
          <Button
            className={'marketplace yamarket'}
            onClick={() =>
              window.open(`https://market.yandex.ru/search?text=${product.search_query}`)
            }
          >
            <p>Я.Маркет</p>
          </Button>
        </div>
      </div>
    </Card>
  );
};
