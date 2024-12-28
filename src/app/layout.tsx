import '@rainbow-me/rainbowkit/styles.css';
import type { ReactNode } from 'react';

import { Open_Sans } from 'next/font/google';

import { Providers } from './providers';

const open_sans = Open_Sans({ subsets: ['latin'] });

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
   return (
      <html lang="en">
         <body className={open_sans.className}>
            <Providers>{children}</Providers>
         </body>
      </html>
   );
}
