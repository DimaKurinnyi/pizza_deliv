
import { mapPizzaType, PizzaSize, PizzaType } from '../constants/pizza';
import { CartStateItem } from '../store/cart';

export const getCartItemDetails = (pizzaType: PizzaType | null, pizzaSize: PizzaSize | null, ingredients: CartStateItem['ingredients']): string => {
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
