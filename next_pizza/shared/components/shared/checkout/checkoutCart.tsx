import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { getCartItemDetails } from '@/shared/lib/get-cart-item-details';
import { CartStateItem } from '@/shared/store/cart';
import React from 'react';
import { CheckoutItem } from '../CheckoutItem';
import { CheckoutItemSkeleton } from '../CheckoutItemSkeleton';
import { WhiteBlock } from '../WhiteBlock';

interface Props {
  className?: string;
  items: CartStateItem[];
  removeCartItem: (id: number) => void;
  onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
  loading?: boolean;
}

export const CheckoutCart: React.FC<Props> = ({ className, items, removeCartItem, onClickCountButton, loading }) => {
  return (
    <WhiteBlock className={className} title="1. Cart">
      <div className="flex flex-col gap-5">
        {loading
          ? [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index} />)
          : items.map((item) => (
              <CheckoutItem
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                details={getCartItemDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize)}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                disabled={item.disabled}
                onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                onClickRemove={() => removeCartItem(item.id)}
              />
            ))}
      </div>
    </WhiteBlock>
  );
};
