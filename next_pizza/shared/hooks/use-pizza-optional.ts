import { ProductItem } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useSet } from 'react-use';
import { Variant } from '../components/shared/GroupeVariant';
import { PizzaSize, PizzaType } from '../constants/pizza';
import { getAvailablePizzaSize } from '../lib/get-available-pizza-size';

interface ReturnProps {
  size: PizzaSize;
  setSize: (size: PizzaSize) => void;
  type: PizzaType;
  selectedIngredients: Set<number>;
  addIngredient: (id: number) => void;
  availableSizes: Variant[];
  setType: (type: PizzaType) => void;
}

export const usePizzaOptionals = (items: ProductItem[]): ReturnProps => {
  const [size, setSize] = useState<PizzaSize>(30);
  const [type, setType] = useState<PizzaType>(1);

  const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));
  const availableSizes = getAvailablePizzaSize(items, type);
  useEffect(() => {
    const isAvailableSize = availableSizes?.find(
      (item) => Number(item.value) === size && !item.disabled,
    );
    const availableSize = availableSizes.find((item) => !item.disabled);
    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [type]);
  return {
    size,
    setSize,
    type,
    setType,
    selectedIngredients,
    addIngredient,
    availableSizes,
  };
};
