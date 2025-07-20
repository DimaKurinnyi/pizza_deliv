<<<<<<< HEAD
import { Providers } from '@/shared/components/shared';
import { Nunito } from 'next/font/google';
import './globals.css';
=======

import { Nunito } from 'next/font/google';
import './globals.css';
import {Toaster} from 'react-hot-toast';

>>>>>>> 70d0c0d66ea6428beb12f4ed390f7b1bd840c60b

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
});

<<<<<<< HEAD
=======


>>>>>>> 70d0c0d66ea6428beb12f4ed390f7b1bd840c60b
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
<<<<<<< HEAD
      <head>
        <link data-rh="true" rel="icon" href="/logo.png" />
      </head>
      <body className={nunito.variable}>
        <Providers>{children}</Providers>
      </body> 
    </html>
  );
}
  
=======
        <head>
            <link data-rh='true' rel="icon" href="/logo.png" />
        </head>
      <body className={nunito.variable}>
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
>>>>>>> 70d0c0d66ea6428beb12f4ed390f7b1bd840c60b
