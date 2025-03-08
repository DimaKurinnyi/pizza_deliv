import { cartDTO } from '../services/dto/cart.dto';
import { CartStateItem } from '../store/cart';
import { calcCartItemTotalPrice } from './calc-cart-item-total-price';

interface ReturnProps {
  items: CartStateItem[];
  totalAmount: number;
}

export const getCartDetails = (data: cartDTO): ReturnProps => {
  const items = data.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productItem.product.name,
    price: calcCartItemTotalPrice(item),
    imageUrl: item.productItem.product.imageUrl,
    pizzaSize: item.productItem.size,
    pizzaType: item.productItem.pizzaType,
    ingredients: item.ingredients.map((ingredient) => ({
      name: ingredient.name,
      price: ingredient.price,
    })),
  }))as CartStateItem[];

  return {
    items,
    totalAmount: data.totalAmount,
  };
};
