export const mapPizzaSize = {
  30: 'small',
  40: 'medium',
  50: 'large',
} as const;
export const mapPizzaType = {
  1: 'thick',
  2: 'thin',
} as const;

export const pizzaSize = Object.entries(mapPizzaSize).map(([ value,name]) => ({
  name,
  value,
}));
export const PizzaType = Object.entries(mapPizzaType).map(([ value,name]) => ({
    name,
    value,
  }));


export type PizzaSize = keyof typeof mapPizzaSize
export type PizzaType = keyof typeof mapPizzaType