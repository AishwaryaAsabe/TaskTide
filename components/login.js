/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */

"use client"; // This makes this component a client component

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';

const LoginComponent = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/login', formData);

      // Save the necessary data in localStorage
      if (res.data.token) {
        localStorage.setItem('token', res.data.token); // Save the token
        localStorage.setItem('userType', res.data.userType); // Save user type
        localStorage.setItem('userId', res.data.userId); // Save user ID
        localStorage.setItem('name', res.data.name); // Save user name

        toast.success('Login successful!');

        // Redirect based on user type
        router.push(`/dashboard/${res.data.userType}`); // Redirect to the dashboard for the user type
      }
    } catch (error) {
      console.error(error);
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-teal-600 hover:bg-teal-500"
          >
            Sign in
          </button>
        </form>


        {/* Link to reset password page */}
      <p className="mt-6 text-center text-sm text-gray-600">
        Forgot your password?{' '}
        <Link href="/ResetPasswordRequest">
          <span className="font-medium text-teal-600 hover:text-teal-500">Reset it here</span>
        </Link>
      </p>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/register">
            <span className="font-medium text-teal-600 hover:text-teal-500">Register</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginComponent;
