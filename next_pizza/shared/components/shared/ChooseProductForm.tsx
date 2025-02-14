import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Button } from '../ui';
import { Title } from './title';

interface Props {
  imageUrl: string;
  name: string;

  items?: any[];
  onClickAdd?: VoidFunction;
  className?: string;
}

export const ChooseProductForm: React.FC<Props> = ({
  className,
  name,
  items,
  imageUrl,
  onClickAdd,
}) => {
  const textDetails = '30sm , rtyyt text ,560g';
  const totalPrice = 40;

  return (
    <div className={cn(className, 'flex flex-1')}>
      <div className="flex items-center justify-center flex-1 w-full">
        <img src={imageUrl} alt={name} className="w-[350] h-[350px]" />
      </div>
      <div className="flex flex-col w-[490px] gap-5 p-7 bg-[#f7f6f5]">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{textDetails}</p>
        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full">
          Add {totalPrice} $
        </Button>
      </div>
    </div>
  );
};
