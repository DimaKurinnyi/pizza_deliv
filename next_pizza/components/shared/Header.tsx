import { cn } from '@/lib/utils';
import { ArrowRight, ShoppingCart, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui';
import { Container } from './Container';
import { SearchInput } from './SearchInput';

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
          <div className="">
            <Button className="group relative">
              <b>100$</b>
              <span className="h-full w-[1px] mx-3 bg-white/30"></span>
              <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                <ShoppingCart className="h-4 w-4 relative" strokeWidth={2} /> <b>3</b>
              </div>
              <ArrowRight className="w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};
