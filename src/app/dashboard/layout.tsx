// app/root-layout.tsx
import { ReactNode } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import AppLayout from '../../layouts/AppLayout'; // Adjust the path as needed

export const metadata = {
  title: 'MyApp',
  description: 'A description of MyApp',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    
    <body>
        <AppLayout>
          {children}
        </AppLayout>
    </body>
    
  );
}
