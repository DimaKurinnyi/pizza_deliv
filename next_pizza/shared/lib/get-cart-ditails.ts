import { cartDTO } from '../services/dto/cart.dto';
import { CartStateItem } from '../store/cart';

interface ReturnProps {
  items: CartStateItem[];
  totalAmount: number;
}

export const getCartDetails = (data: cartDTO): ReturnProps => {
  const items = data.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productItem.product.name,
    price: item.productItem.product.price,
    imageUrl: item.productItem.product.imageUrl,
    pizzaSize: item.productItem.size,
    pizzaType: item.productItem.pizzaType,
    ingredients: item.ingredients.map((ingredient) => ({
      name: ingredient.name,
      price: ingredient.price,
    })),
  }));

  return{
    items,
    totalAmount: data.totalAmount,
  }
  
};
