import { mapPizzaType, PizzaSize, PizzaType } from '../constants/pizza';
import { CartStateItem } from '../store/cart';

export const getCartItemDetails = (ingredients: CartStateItem['ingredients'], pizzaType?: PizzaType | null, pizzaSize?: PizzaSize | null): string => {
  const details = [];
  if (pizzaSize && pizzaType) {
    const typeName = mapPizzaType[pizzaType];
    details.push(`${typeName} ${pizzaSize} sm`);
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient) => ingredient.name));
  }

  return details.join(', ');
};
