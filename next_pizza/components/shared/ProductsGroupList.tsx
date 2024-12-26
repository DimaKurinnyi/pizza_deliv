"use client"

import React, { useEffect, useRef } from 'react';
import { Title } from './title';
import {useIntersection} from 'react-use' //для скрола по категориям
import { cn } from '@/lib/utils';
import { ProductCard } from './ProductCard';
import { useCategoryStore } from '@/store/category';

interface Props {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[];
  categoryId: number;
  className?: string;
  listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
  title,
  items,
  categoryId,
  className,
  listClassName,
}) => {
  const setActiveCategoryId = useCategoryStore((state)=>state.setActiveId)
  const intersectionRef = useRef(null)
  const intersection = useIntersection(intersectionRef,{
    threshold:0.4,
  })
  useEffect(()=>{

    if(intersection?.isIntersecting){
   setActiveCategoryId(categoryId)
    }
  },[categoryId, intersection?.isIntersecting, setActiveCategoryId])

  return <div className={className} id={title} ref={intersectionRef}>
    <Title text={title} size='lg' className='font-extrabold mb-5'/>
    <div className={cn('grid grid-cols-3 gap-[50px]',listClassName)}>
      {
        items.map((product,i)=>(
          <ProductCard 
          key={i}
          id = {product.id}
          name={product.name}
          imageUrl={product.imageUrl}
          price={product.items[0].price}/>
        ))
      }
    </div>
  </div>;
};
