'use client';
import { useFilterIngredients } from '@/hooks/useFilterIngredients';
import qs from 'qs';
import React, { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { CheckboxFilterGroup } from './CheckboxFilterGroup';

import { useRouter, useSearchParams } from 'next/navigation';
import { useSet } from 'react-use';
import { RangeSlider } from './RangeSlider';
import { Title } from './title';
interface Props {
  className?: string;
}
interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}
interface QueryFilters extends PriceProps {
  type?: string;
  size?: string;

  ingredients?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const router = useRouter();
  const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;
  const [price, setPrice] = useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  });

  const { ingredients, loading, onAddId, selectedIngredients } = useFilterIngredients(
    searchParams.get('ingredients')?.split(','),
  );
  const items = ingredients.map((item) => ({ value: String(item.id), text: item.name }));

  const [size, { toggle: toggleSizes }] = useSet(
    new Set<string>(searchParams.get('size')?.split(',') || []),
  );
  const [type, { toggle: toggleType }] = useSet(
    new Set<string>(searchParams.get('type')?.split(',') || []),
  );
  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice({
      ...price,
      [name]: value,
    });
  };

  useEffect(() => {
    const filters = {
      ...price,
      type: Array.from(type),
      size: Array.from(size),
      ingredients: Array.from(selectedIngredients),
    };
    const query = qs.stringify(filters, { arrayFormat: 'comma' });
    router.push(`?${query}`, { scroll: false });
  }, [price, selectedIngredients, size, type, router]);
  return (
    <div className={className}>
      <Title text="Filters" size="sm" className="mb-5 font-bold" />
      <CheckboxFilterGroup
        name="type"
        className="mb-5"
        title="Type"
        selected={type}
        onClickCheckbox={toggleType}
        items={[
          { text: 'Slim', value: '1' },
          { text: 'Traditionary', value: '2' },
        ]}
      />
      <CheckboxFilterGroup
        name="sizes"
        className="mb-5"
        title="Sizes"
        selected={size}
        onClickCheckbox={toggleSizes}
        items={[
          { text: '20 sm', value: '20' },
          { text: '30 sm', value: '30' },
          { text: '40 sm', value: '40' },
        ]}
      />
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Price from</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={String(price.priceFrom)}
            onChange={(e) => updatePrice('priceFrom', Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="1000"
            min={100}
            max={1000}
            value={String(price.priceTo)}
            onChange={(e) => updatePrice('priceTo', Number(e.target.value))}
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[price.priceFrom || 0, price.priceTo || 1000]}
          onValueChange={([priceFrom, priceTo]) => setPrice({ priceFrom, priceTo })}
        />
      </div>
      <CheckboxFilterGroup
        title="Ingredients"
        name="Ingredients"
        className="mt-5"
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCheckbox={onAddId}
        selected={selectedIngredients}
      />
    </div>
  );
};
