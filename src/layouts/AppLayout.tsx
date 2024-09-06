// app/layout.tsx
'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AppSider from '@/components/AppSider';

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AppSider />

      <div className="flex-1 pl-16">
        <header className="fixed top-0 left-0 right-0 h-14 bg-[#198cf8] flex items-center justify-between px-4 z-10">
        <div className="flex items-center p-7 h-10 px-4">
            <h1 className="text-white text-xl ml-20 font-bold ml-4">Daag</h1>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
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
