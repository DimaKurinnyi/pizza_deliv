import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Button } from '../ui';
import { Title } from './title';

interface Props {
  imageUrl: string;
  name: string;

  price: number;
loading?: boolean;
  onSubmit?: VoidFunction
  className?: string;
}


// choose a product form
export const ChooseProductForm: React.FC<Props> = ({
  className,
  name,
  price,
  imageUrl,
  onSubmit,
  loading,
}) => {
  

  return (
    <div className={cn(className, 'flex flex-1')}>
      <div className="flex items-center justify-center flex-1 w-full">
        <img src={imageUrl} alt={name} className="w-[350] h-[350px]" />
      </div>
      <div className="flex flex-col w-[490px] gap-5 p-7 bg-[#f7f6f5]">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        
        <Button loading={loading} onClick={()=>onSubmit?.()} className="h-[55px] px-10 text-base rounded-[18px] w-full">
          Add {price} $
        </Button>
      </div>
    </div>
  );
};
