'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { HomeIcon, UserIcon, Cog6ToothIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import AppSider from '@/components/AppSider';

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Sidebar */}
      
      <AppSider/>

      {/* Main Layout */}
      <div className="flex-1 pl-16">
        
        
        
        <header className="fixed top-0  w-full bg-[#77afe7] p-0">
          <div className="flex items-center h-16 px-4">
            <h1 className="text-white text-xl font-bold ml-4">Admin Panel</h1>
          </div>
        </header>

        <main className="pt-16">
          <div className="container mx-auto p-4">
            {children}
          </div>
        </main>

        <footer className="text-center bg-white p-4 mt-auto">
          <p>© 2024 MyApp. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default AppLayout;
