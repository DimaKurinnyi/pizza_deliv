import React from 'react';
import { cn } from '../../lib/utils';
import { Title } from '.';
interface Props {
  title?: string;
  endAdornment?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  children: React.ReactNode;
}

export const WhiteBlock: React.FC<Props> = ({ title, endAdornment, className, contentClassName, children }) => {
  return (
    <div className={cn('bg-white rounded-3xl', className)}>
      {title && (
        <div className="flex items-center justify-between p-5 px-7 border-b border-gray-100">
          <Title text={title} className="text-sm font-bold" />
          {endAdornment}
        </div>
      )}
      <div className={cn('p-5 px-4', contentClassName)}>{children}</div>
    </div>
  );
};
