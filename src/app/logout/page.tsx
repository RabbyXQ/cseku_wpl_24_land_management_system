'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/protectors/AuthContext'; // Adjust the path as needed

const LogoutPage: React.FC = () => {
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const performLogout = async () => {
      await logout();
      router.push('/login'); // Redirect to login page after logout
    };

    performLogout();
  }, [logout, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-md rounded-lg text-center">
        <h1 className="text-xl font-bold mb-4">Logging out...</h1>
        <p>Please wait while we log you out.</p>
      </div>
    </div>
  );
};

export default LogoutPage;
