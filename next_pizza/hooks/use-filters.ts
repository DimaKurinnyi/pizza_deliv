import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useSet } from 'react-use';

export interface QueryFilters extends PriceProps {
  type?: string;
  size?: string;

  ingredients?: string;
}

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

export interface Filters {
  sizes: Set<string>;
  type: Set<string>;
  selectedIngredients: Set<string>;
  price: PriceProps;
}
interface ReturnProps extends Filters {
  setPrice: (name: keyof PriceProps, value: number) => void;
  setPizzaTypes: (value: string) => void;
  setSizes: (value: string) => void;
  setSelectedIngredients: (value: string) => void;
}
export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

  const [price, setPrice] = useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  });

  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(searchParams.get('size')?.split(',') || []),
  );
  const [type, { toggle: toggleType }] = useSet(
    new Set<string>(searchParams.get('type')?.split(',') || []),
  );
  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get('ingredients')?.split(',')),
  );

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    sizes,
    type,
    selectedIngredients,
    price,
    setPrice: updatePrice,
    setPizzaTypes: toggleType,
    setSizes: toggleSizes,
    setSelectedIngredients: toggleIngredients,
  };
};
