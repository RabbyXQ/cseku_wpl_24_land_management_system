'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaGoogle, FaGithub, FaFacebook } from 'react-icons/fa';
import Link from 'next/link';

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    retypePassword: '',
    email: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard'); // Redirect to dashboard if token exists
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.retypePassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          email: formData.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'An error occurred');
        setSuccess(null);
      } else {
        setSuccess('User registered successfully!');
        setError(null);
        setFormData({
          username: '',
          password: '',
          retypePassword: '',
          email: '',
        });
      }
    } catch (error) {
      setError('An error occurred');
      setSuccess(null);
    }
  };

  const handleSocialSignUp = (provider: string) => {
    // Handle social sign up here
    console.log(`Sign up with ${provider}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Retype Password</label>
            <input
              type="password"
              name="retypePassword"
              value={formData.retypePassword}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={() => handleSocialSignUp('Google')}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
          >
            <FaGoogle size={24} className="text-[#DB4437]" />
          </button>
          <button
            onClick={() => handleSocialSignUp('GitHub')}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
          >
            <FaGithub size={24} className="text-[#333]" />
          </button>
          <button
            onClick={() => handleSocialSignUp('Facebook')}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
          >
            <FaFacebook size={24} className="text-[#4267B2]" />
          </button>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-indigo-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
      </div>
    </div>
  );
};

export default SignupPage;
