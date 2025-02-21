'use client';
import { cn } from '@/shared/lib/utils';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { CartDrawerItem } from './CartDrawerItem';
interface Props {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
  return (
    <div className={cn('bg-white', className)}>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
          <SheetHeader>
            <SheetTitle>
              In Cart <span className="font-bold"> 3 items</span>
            </SheetTitle>
          </SheetHeader>
          <div className="-mx-6 mt-5 overflow-auto flex-1">
            <div className="mb-2">
              <CartDrawerItem id={0} imageUrl={''} details={''} name={''} price={0} quantity={1} />
            </div>
            <div className="mb-2">
              <CartDrawerItem id={0} imageUrl={''} details={''} name={''} price={0} quantity={1} />
            </div>
            <div className="mb-2">
              <CartDrawerItem id={0} imageUrl={''} details={''} name={''} price={0} quantity={1} />
            </div>
          </div>

          <SheetFooter className="-mx-6 bg-white p-8">
            <div className="w-full">
              <div className="flex mb-4">
                <span className="flex flex-1 text-lg text-neutral-500">
                  Total
                  <div className="flex flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2 "></div>
                </span>
                <span className="font-bold text-lg">100£</span>
              </div>
              <Link href="/cart">
                <Button type="submit" className="w-full h-12 text-base">
                  Order
                  <ArrowRight className="w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};
