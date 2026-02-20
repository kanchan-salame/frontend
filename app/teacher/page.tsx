"use client";
import React from 'react';
import api from '../../lib/api';
import { useRouter } from 'next/navigation';

export default function TeacherPage() {
  const router = useRouter();
  const logout = async () => {
    await api.post('/api/auth/logout');
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Teacher</h1>
          <button onClick={logout} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded">Logout</button>
        </div>
        <p className="text-sm text-slate-600">Teacher dashboard and class management.</p>
      </div>
    </div>
  );
}
