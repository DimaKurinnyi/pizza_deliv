'use client';
import { Dialog, DialogContent } from '@/shared/components/ui/dialog';

import React from 'react';

import { ProductWithRelations } from '@/@types/prisma';
import { cn } from '@/shared/lib/utils';
import { useCartStore } from '@/shared/store/cart';
import { useRouter } from 'next/navigation';
import { ChoosePizzaForm } from '../ChoosePizzaForm';
import { ChooseProductForm } from '../ChooseProductForm';
interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
  const router = useRouter();
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);
  const addCartItem = useCartStore((state) => state.addCartItem);
  const onAddProduct = () => {
    addCartItem({
      productItemId: firstItem.id,
    });
    console.log(product.items[0]);
  };
  const onAddPizza = (productItemId: number, ingredients: number[]) => {
    addCartItem({
      productItemId,
      ingredients,
    });
    console.log(product.items);
  };
  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className={cn('p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden', className)}>
        {isPizzaForm ? (
          <ChoosePizzaForm imageUrl={product.imageUrl} name={product.name} ingredients={product.ingredients} items={product.items} onSubmit={onAddPizza} />
        ) : (
          <ChooseProductForm imageUrl={product.imageUrl} name={product.name} onSubmit={onAddProduct} price={firstItem.price} />
        )}
      </DialogContent>
    </Dialog>
  );
};
