'use client';
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Skeleton } from '../ui/skeleton';
import { FilterChecboxProps, FilterCheckbox } from './FilterCheckbox';

type Item = FilterChecboxProps;

interface Props {
  title: string;
  items: Item[];
  defaultItems: Item[];
  limit?: number;
  loading?: boolean;
  searchInputPlaceholder?: string;
  onClickCheckbox?: (id: string) => void;
  defaultValue?: string[];
  className?: string;
  selectedIds?: Set<string>;
  name?: string;
}

export const CheckboxFilterGroup: React.FC<Props> = ({
  title,
  items,
  defaultItems,
  limit = 6,
  searchInputPlaceholder = 'Search...',
  className,
  loading,
  onClickCheckbox,
  selectedIds,
  name
}) => {
  const [showAll, setShowAll] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState('');

  const list = showAll
    ? items.filter((item) => item.text.toLowerCase().includes(searchInputValue.toLowerCase()))
    : defaultItems?.slice(0, limit);

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  if (loading) {
    return (
      <div className={className}>
        <p className="font-bold mb-3">{title}</p>
        {...Array(limit)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className="mb-3 h-6 rounded-[8px] bg-gray-100" />
          ))}
        <Skeleton className="mb-3 h-6 rounded-[8px] w-28 bg-gray-100" />
      </div>
    );
  }
  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>
      {/* //поиск по фильтру */}
      {showAll && (
        <div className="mb-5">
          <Input
            onChange={onChangeSearchInput}
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
          />
        </div>
      )}
      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map((item, index) => (
          <FilterCheckbox
            key={index}
            text={item.text}
            value={item.value}
            endAdornment={item.endAdornment}
            checked={selectedIds?.has(item.value)}
            onCheckedChange={() => onClickCheckbox?.(item.value)}
            name = {name}
          />
        ))}
      </div>
      {items?.length > limit && (
        <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
          <button className="text-primary mt-3" onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Show less' : '+ Show more'}
          </button>
        </div>
      )}
    </div>
  );
};
