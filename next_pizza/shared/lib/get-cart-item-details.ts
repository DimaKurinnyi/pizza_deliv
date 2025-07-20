<<<<<<< HEAD
import { mapPizzaType, PizzaSize, PizzaType } from '../constants/pizza';
import { CartStateItem } from '../store/cart';

export const getCartItemDetails = (ingredients: CartStateItem['ingredients'], pizzaType?: PizzaType | null, pizzaSize?: PizzaSize | null): string => {
=======

import { mapPizzaType, PizzaSize, PizzaType } from '../constants/pizza';
import { CartStateItem } from '../store/cart';

export const getCartItemDetails = (pizzaType: PizzaType | null, pizzaSize: PizzaSize | null, ingredients: CartStateItem['ingredients']): string => {
>>>>>>> 70d0c0d66ea6428beb12f4ed390f7b1bd840c60b
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
