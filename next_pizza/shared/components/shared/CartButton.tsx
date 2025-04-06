'use client';

import { cn } from '@/shared/lib/utils';
import { useCartStore } from '@/shared/store/cart';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import React from 'react';
import { Button } from '../ui';
import { CartDrawer } from './CartDrawer';

interface Props {
  className?: string;
}

export const CartButton: React.FC<Props> = ({ className }) => {
  const loading = useCartStore((state) => state.loading);
  const totalAmount = useCartStore((state) => state.totalAmount);
  const items = useCartStore((state) => state.items);
  return (
    <CartDrawer>
      <Button loading={loading} className={cn('group relative', { 'w-[105px]': loading }, className)}>
        <b>{totalAmount}$</b>
        <span className="h-full w-[1px] mx-3 bg-white/30"></span>
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart className="h-4 w-4 relative" strokeWidth={2} /> <b>{items.length}</b>
        </div>
        <ArrowRight className="w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
      </Button>
    </CartDrawer>
  );
};
