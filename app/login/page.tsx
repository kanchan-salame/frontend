"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/api/auth/login', { email, password });
      const user = res.data.user;
      switch (user.role) {
        case 'super_admin':
          router.push('/super-admin');
          break;
        case 'admin':
          router.push('/dashboard');
          break;
        case 'manager':
          router.push('/manager');
          break;
        case 'teacher':
          router.push('/teacher');
          break;
        default:
          router.push('/student');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Sign in to your account</h2>
        {error && <div className="text-red-600 mb-3">{error}</div>}

        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
        <input
          className="border border-slate-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-300 mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="you@example.com"
          required
        />

        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
        <input
          className="border border-slate-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-300 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Your password"
          required
        />

        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded w-full">Login</button>
      </form>
    </div>
  );
}
