import { cn } from '@/shared/lib/utils';
import {  User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui';
import { Container } from './Container';
import { SearchInput } from './SearchInput';
import { CartButton } from './CartButton';

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('border border-b', className)}>
      <Container className="flex items-center justify-between py-8">
        {/* left Side */}
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Logo" width={35} height={35} />
            <div className="">
              <h1 className="text-2xl uppercase font-black">Cool Pizza</h1>
              <p className="leading-3 text-gray-400 text-sm">Never better again</p>
            </div>
          </div>
        </Link>
        <div className="mx-10 flex-1">
          <SearchInput />
        </div>

        {/* right side */}
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-3">
            <User size={16} />
            Login
          </Button>
          <CartButton/>
        </div>
      </Container>
    </div>
  );
};
