import { ProductItem } from '@prisma/client';
import { Variant } from '../components/shared/GroupeVariant';
import { pizzaSize, PizzaType } from '../constants/pizza';

export const getAvailablePizzaSize = (items: ProductItem[], type: PizzaType): Variant[] => {
  const filtredPizzasByType = items.filter((item) => item.pizzaType === type);
  return pizzaSize.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !filtredPizzasByType.some((pizza) => Number(pizza.size) === Number(item.value)),
  }));
};
