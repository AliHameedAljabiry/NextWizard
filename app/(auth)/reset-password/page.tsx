'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function ResetPasswordPage() {
  const router = useRouter();
  const token = useSearchParams().get('token');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    setMessage(data.message);

    if (data.message === 'Password updated successfully') {
    router.push('/sign-in'); // or wherever you want
}

  };

  return (
    <form onSubmit={handleReset} className="space-y-4 max-w-md mx-auto mt-10">
      <h1 className="text-xl font-bold">Reset Password</h1>
      <input
        type="password"
        placeholder="New password"
        className="w-full p-2 border rounded"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Update Password</button>
      {message && <p className="text-green-500 mt-2">{message}</p>}
    </form>
  );
}
