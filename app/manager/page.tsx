"use client";
import React from 'react';
import api from '../../lib/api';
import { useRouter } from 'next/navigation';

export default function ManagerPage() {
  const router = useRouter();
  const logout = async () => {
    await api.post('/api/auth/logout');
    router.push('/login');
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Manager</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
