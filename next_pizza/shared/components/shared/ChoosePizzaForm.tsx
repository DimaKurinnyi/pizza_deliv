'use client';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { cn } from '@/shared/lib/utils';
import { Ingredient, ProductItem } from '@prisma/client';
import React from 'react';

import { Button } from '../ui';
import { GroupeVariant } from './GroupeVariant';
import { IngredientItem } from './IngredientItem';
import { ProductImg } from './ProductImg';
import { Title } from './title';

import { usePizzaOptionals } from '@/shared/hooks/use-pizza-optional';
import { getPizzaDetail } from '@/shared/lib/get-pizza-detail';

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({ className, name, items, imageUrl, onSubmit, ingredients }) => {
  const { size, setSize, type, setType, selectedIngredients, addIngredient, availableSizes, currentItemId } = usePizzaOptionals(items);

  const { textDetails, totalPrice } = getPizzaDetail(items, ingredients, selectedIngredients, type, size);

  const handleClickAdd = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngredients));
    }
  };

  return (
    <div className={cn(className, 'flex flex-1')}>
      <ProductImg imageUrl={imageUrl} size={size} />
      <div className="flex flex-col w-[490px] gap-5 p-7 bg-[#f7f6f5]">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{textDetails}</p>
        <GroupeVariant items={availableSizes} value={String(size)} onClick={(value) => setSize(Number(value) as PizzaSize)} />
        <GroupeVariant items={PizzaType} value={String(type)} onClick={(value) => setType(Number(value) as PizzaType)} />
        <div className="grid grid-cols-3 gap-3">
          {ingredients.map((item, index) => (
            <IngredientItem key={index} imageUrl={item.imageUrl} name={item.name} price={item.price} onClick={() => addIngredient(item.id)} active={selectedIngredients.has(item.id)} />
          ))}
        </div>
        <Button onClick={handleClickAdd} className="h-[55px] px-10 text-base rounded-[18px] w-full">
          Add {totalPrice} $
        </Button>
      </div>
    </div>
  );
};
