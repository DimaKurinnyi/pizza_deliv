import { Header } from '@/shared/components/shared/Header';
import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Next Pizza',
};

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
  // Optional modal content to be displayed on top of the main content.
}>) {
  return (
    <main className="min-h-screen">
      <Header />
      {children}
      {modal && modal}
    </main>
  );
}
