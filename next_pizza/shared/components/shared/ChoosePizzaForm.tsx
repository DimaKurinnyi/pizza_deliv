import { mapPizzaType, PizzaSize, pizzaSize, PizzaType } from '@/shared/constans/pizza';
import { cn } from '@/shared/lib/utils';
import { Ingredient, ProductItem } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import { useSet } from 'react-use';
import { Button } from '../ui';
import { GroupeVariant } from './GroupeVariant';
import { IngredientItem } from './IngredientItem';
import { ProductImg } from './ProductImg';
import { Title } from './title';

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  onClickAddCart?: VoidFunction;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  className,
  name,
  items,
  imageUrl,
  onClickAddCart,
  ingredients,
}) => {
  const [size, setSize] = useState<PizzaSize>(30);
  const [type, setType] = useState<PizzaType>(1);

  const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));

  const textDetails = `${size}sm , ${mapPizzaType[type]}  ,560g`;

  const pizzaPrice =
    items.find((item) => item.pizzaType === type && item.size === size)?.price || 0;
  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);
  const totalPrice = pizzaPrice + totalIngredientsPrice;

  const handleClickAdd = () => {
    onClickAddCart?.();
    console.log({ size, type, ingredients: selectedIngredients });
  };
  const availablePizzas = items.filter((item) => item.pizzaType === type);
  const availablePizzaSize = pizzaSize.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !availablePizzas.some((pizza) => Number(pizza.size) === Number(item.value)),
  }));

  useEffect(()=>{
    const isAvailableSize = availablePizzaSize.find((item)=>Number(item.value) === size && !item.disabled)
    const availableSize = availablePizzaSize.find((item)=>!item.disabled)
    if(!isAvailableSize && availableSize){
      setSize(Number(availableSize.value) as PizzaSize)
    }
  },[type])
  //ujjf 

  return (
    <div className={cn(className, 'flex flex-1')}>
      <ProductImg imageUrl={imageUrl} size={size} />
      <div className="flex flex-col w-[490px] gap-5 p-7 bg-[#f7f6f5]">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{textDetails}</p>
        <GroupeVariant
          items={availablePizzaSize}
          value={String(size)}
          onClick={(value) => setSize(Number(value) as PizzaSize)}
        />
        <GroupeVariant
          items={PizzaType}
          value={String(type)}
          onClick={(value) => setType(Number(value) as PizzaType)}
        />
        <div className="grid grid-cols-3 gap-3">
          {ingredients.map((item, index) => (
            <IngredientItem
              key={index}
              imageUrl={item.imageUrl}
              name={item.name}
              price={item.price}
              onClick={() => addIngredient(item.id)}
              active={selectedIngredients.has(item.id)}
            />
          ))}
        </div>
        <Button onClick={handleClickAdd} className="h-[55px] px-10 text-base rounded-[18px] w-full">
          Add {totalPrice} $
        </Button>
      </div>
    </div>
  );
};
