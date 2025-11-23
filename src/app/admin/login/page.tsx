'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AdminLogin() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check for error in URL params (from server redirect)
  const urlError = searchParams.get('error');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      // Get CSRF token first
      const csrfResponse = await fetch('/api/csrf-token');
      const { token } = await csrfResponse.json();
      formData.append('csrf', token);

      const response = await fetch('/api/admin/login', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Successful login, redirect will happen automatically
        router.push('/admin');
      } else {
        const data = await response.json();
        setError(data.error || 'Invalid credentials');
        setIsLoading(false);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-bold">Admin sign in</h1>
      <form onSubmit={handleSubmit} className="mt-6 grid gap-3 rounded-2xl border p-4">
        <input 
          name="username" 
          placeholder="Username" 
          className="rounded-xl border px-4 py-3 text-sm" 
          disabled={isLoading}
        />
        <input 
          name="password" 
          type="password" 
          placeholder="Password" 
          className="rounded-xl border px-4 py-3 text-sm" 
          disabled={isLoading}
        />
        
        {(error || urlError) && (
          <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-xl">
            <p className="text-sm text-red-600 dark:text-red-400" data-testid="login-error">
              {error || urlError}
            </p>
          </div>
        )}

        <button 
          type="submit"
          disabled={isLoading}
          className="rounded-xl bg-fuchsia-600 text-white px-4 py-3 text-sm font-semibold hover:bg-fuchsia-700 disabled:opacity-50"
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
        <p className="text-xs text-slate-500">Protected area. Authorized staff only.</p>
      </form>
    </div>
  );
}
