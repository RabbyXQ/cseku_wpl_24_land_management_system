// app/layout.tsx
import { ReactNode } from 'react';
import './globals.css';
import { NextUIProvider } from '@nextui-org/react';
import { Josefin_Sans } from 'next/font/google';
import LayoutProvider from '@/components/LayoutProvider';

const roboto = Josefin_Sans({
  subsets: ['latin'],
  weight: ['400', '700'], // Use 'weight' instead of 'weights'
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <NextUIProvider>
          <LayoutProvider>{children}</LayoutProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
