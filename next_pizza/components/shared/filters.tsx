'use client';
import { useFilterIngredients } from '@/hooks/useFilterIngredients';

import React from 'react';
import { Input } from '../ui/input';
import { CheckboxFilterGroup } from './CheckboxFilterGroup';



import { RangeSlider } from './RangeSlider';
import { Title } from './title';
import { useFilters } from '@/hooks/use-filters';
import { useQueryFilters } from '@/hooks/use-query-filters';
interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  

  const { ingredients, loading } = useFilterIngredients();
  const filters = useFilters()
  useQueryFilters(filters)
  const items = ingredients.map((item) => ({ value: String(item.id), text: item.name }));

  const updatePrice = (prices:number[]) => {
    filters.setPrice('priceFrom',prices[0])
    filters.setPrice('priceTo', prices[1])
  }
  
  return (
    <div className={className}>
      <Title text="Filters" size="sm" className="mb-5 font-bold" />
      <CheckboxFilterGroup
        name="type"
        className="mb-5"
        title="Type"
        selected={filters.type}
        onClickCheckbox={filters.setPizzaTypes}
        items={[
          { text: 'Slim', value: '1' },
          { text: 'Traditionary', value: '2' },
        ]}
      />
      <CheckboxFilterGroup
        name="sizes"
        className="mb-5"
        title="Sizes"
        selected={filters.sizes}
        onClickCheckbox={filters.setSizes}
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
            value={String(filters.price.priceFrom)}
            onChange={(e) => filters.setPrice('priceFrom', Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="1000"
            min={100}
            max={1000}
            value={String(filters.price.priceTo)}
            onChange={(e) => filters.setPrice('priceTo', Number(e.target.value))}
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[filters.price.priceFrom || 0, filters.price.priceTo || 1000]}
          onValueChange={updatePrice}
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
        onClickCheckbox={filters.setSelectedIngredients}
        selected={filters.selectedIngredients}
      />
    </div>
  );
};
