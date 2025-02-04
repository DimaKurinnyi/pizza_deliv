'use client';
import { cn } from '@/lib/utils';
import { useCategoryStore } from '@/store/category';
import { Category } from '@prisma/client';
import React from 'react';
interface Props {
  items:Category[]
  className?: string;
}

// const cats = ['Pizzas', 'Soup', 'Paste', 'Snacks', 'Drinks', 'Coffee', 'Desserts', 'Combo'];



export const Categories: React.FC<Props> = ({items, className }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);
  return (
    <div className={cn('inline-flex gap-1 p-1 bg-gray-50 rounded-2xl', className)}>
      {items.map((cat, index) => (
        <a
        href={`#${cat.name}`}
          key={index}
          className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5',
            categoryActiveId === cat.id && 'bg-white shadow-md shadow-gray-200 text-primary',
          )}>
          <button>{cat.name}</button>
        </a>
      ))}
    </div>
  );
};
