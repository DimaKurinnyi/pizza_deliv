'use client';
import { cn } from '@/shared/lib/utils';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { CartButton } from './CartButton';
import { Container } from './Container';
import { ProfileButton } from './ProfileButton';
import { SearchInput } from './SearchInput';
import { AuthModal } from './modals/auth-modal/AuthModal';

interface Props {
  hasCart?: boolean;
  hasSearch?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({ className, hasSearch = true, hasCart = true }) => {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const session = useSession();

  console.log('Session:', session);
  useEffect(() => {
    if (searchParams.has('paid')) {
      setTimeout(() => {
        toast.success('Payment successful! Your order is being processed.');
        router.replace('/');
      }, 500);
    }
    if (searchParams.has('verified')) {
      setTimeout(() => {
        toast.success('Payment successful! Your order is being processed.');
        router.replace('/');
      }, 500);
    }
  }, [router, searchParams]);

  if (session.status === 'loading') {
    return <div className="h-16 w-full bg-white animate-pulse" />;
  }

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
        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        {/* right side */}
        <div className="flex items-center gap-3">
          <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
          {hasCart && <CartButton />}
        </div>
      </Container>
    </div>
  );
};
