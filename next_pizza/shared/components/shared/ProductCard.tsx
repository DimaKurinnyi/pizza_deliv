import { Ingredient } from '@prisma/client';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui';
import { Title } from './title';
interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  className?: string;
  ingredients: Ingredient[];
}
export const ProductCard: React.FC<Props> = ({ id, name, price, imageUrl, className, ingredients }) => {
  return (
    <div className={className}>
      <Link href={`/product/${id}`}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <img className="w-[215px] h-[215px]" src={imageUrl} alt={name} />
        </div>
        <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />
        <p className="text-sm text-gray-400">{ingredients.map((ingredient) => ingredient.name).join(', ')}</p>

        <div className="flex justify-between items-center mt-4">
          <span className="text[20px]">
            from <b>{price}</b>
          </span>
          <Button variant="secondary" className="text-base font-bold">
            <Plus size={20} className="mr-1" />
            Add to bag
          </Button>
        </div>
      </Link>
    </div>
  );
};
