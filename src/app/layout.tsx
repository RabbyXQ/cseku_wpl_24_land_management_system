// app/layout.tsx
import { ReactNode } from 'react';
import './globals.css';
import { NextUIProvider } from '@nextui-org/react';
import {josefine} from "@/utils/fonts";
import LayoutProvider from '@/components/LayoutProvider';


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={josefine.className}>
        <NextUIProvider>
          <LayoutProvider>{children}</LayoutProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
