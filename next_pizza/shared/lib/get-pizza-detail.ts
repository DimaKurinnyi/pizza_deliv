import { Ingredient, ProductItem } from '@prisma/client';
import { mapPizzaType, PizzaSize, PizzaType } from '../constants/pizza';
import { calcTotalPizzaPrice } from './calc-total-pizza-price';

export const getPizzaDetail = (
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
  type: PizzaType,
  size: PizzaSize,
) => {
  const totalPrice = calcTotalPizzaPrice(items, ingredients, selectedIngredients, type, size);
  const textDetails = `${size}sm , ${mapPizzaType[type]}  ,560g`;
  return { textDetails, totalPrice };
};
