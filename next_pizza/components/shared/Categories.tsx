'use client';
import { cn } from '@/lib/utils';
import { useCategoryStore } from '@/store/category';
import React from 'react';
interface Props {
  className?: string;
}

// const cats = ['Pizzas', 'Soup', 'Paste', 'Snacks', 'Drinks', 'Coffee', 'Desserts', 'Combo'];

const cats = [
  { id: 1, name: 'Pizzas' },
  { id: 2, name: 'Soup' },
  { id: 3, name: 'Paste' },
  { id: 4, name: 'Snacks' },
  { id: 5, name: 'Drinks' },
  { id: 6, name: 'Coffee' },
  { id: 7, name: 'Desserts' },
  { id: 8, name: 'Combo' },
];

export const Categories: React.FC<Props> = ({ className }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);
  return (
    <div className={cn('inline-flex gap-1 p-1 bg-gray-50 rounded-2xl', className)}>
      {cats.map((cat, index) => (
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
