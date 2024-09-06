'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AppSider from '@/components/AppSider';
import '../app/globals.css';
import { Button, NextUIProvider } from '@nextui-org/react';
import { FaMapMarked } from 'react-icons/fa';

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light'); // Default theme
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

  useEffect(() => {
    // Check for a stored theme preference in localStorage
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Save theme preference
  };

  useEffect(() => {
    // Apply the theme to the <html> element
    document.documentElement.className = theme;
  }, [theme]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <NextUIProvider>
      <div className="flex min-h-screen flex-col">
        <AppSider />

        <div className="flex-1 pl-16">
          <header className="fixed top-0 left-0 right-0 h-14 bg-green-900 flex items-center justify-between px-4 z-10">
            <div className="flex items-center ml-20 p-7 h-10 px-4">
              <FaMapMarked className='flex w-12 h-12 p-2' />
              <h1 className="text-white text-xl font-bold">Daag</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={toggleTheme}
                className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Toggle Theme
              </Button>
              <Button
                onClick={handleLogout}
                className="bg-red-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Logout
              </Button>
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
    </NextUIProvider>
  );
};

export default AppLayout;
