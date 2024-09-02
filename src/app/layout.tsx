// app/layout.tsx
import { ReactNode } from 'react';
import AppLayout from '../layouts/AppLayout';
import './globals.css';


export const metadata = {
  title: 'MyApp',
  description: 'A description of MyApp',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <>
          {children}
        </>
      </body>
    </html>
  );
}
