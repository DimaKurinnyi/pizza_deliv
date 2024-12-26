'use client';
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { FilterChecboxProps, FilterCheckbox } from './FilterCheckbox';

type Item = FilterChecboxProps;

interface Props {
  title: string;
  items: Item[];
  defaultItems: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  onChange?: (value: string[]) => void;
  defaultValue?: string[];
  className?: string;
}

export const CheckboxFilterGroup: React.FC<Props> = ({
  title,
  items,
  defaultItems,
  limit = 5,
  searchInputPlaceholder = 'Search...',
  className,
  // onChange,
  // defaultValue,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState('');

  const list = showAll
    ? items.filter((item) => item.text.toLowerCase().includes(searchInputValue.toLowerCase()))
    : defaultItems?.slice(0, limit);

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };
  return (
    <div className={className}>
      <p className="font-bolt mb-3">{title}</p>
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
            checked={false}
            onCheckedChange={(ids) => console.log(ids)}
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
