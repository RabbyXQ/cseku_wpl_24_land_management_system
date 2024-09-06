// app/layout.tsx
import { ReactNode } from 'react';
import './globals.css';
import { NextUIProvider } from '@nextui-org/react';
import { Josefin_Sans, Roboto } from 'next/font/google';

export const metadata = {
  title: 'MyApp',
  description: 'A description of MyApp',
};

const roboto = Josefin_Sans({
  subsets: ['latin'],
  weight: ['400', '700'], // Use 'weight' instead of 'weights'
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
          {children}
      </body>
    </html>
  );
}
