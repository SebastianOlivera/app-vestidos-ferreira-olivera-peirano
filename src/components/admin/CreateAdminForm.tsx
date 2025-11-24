'use client';

import { useState } from 'react';

type CreateAdminFormProps = {
  onClose: () => void;
  onSuccess: (message: string) => void;
};

export default function CreateAdminForm({ onClose, onSuccess }: CreateAdminFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const validatePassword = (pwd: string): string | null => {
    // Check minimum length
    if (pwd.length < 8) {
      return 'Password must be at least 8 characters long';
    }

    // Check for at least one symbol
    const symbolRegex = /[!@#$%^&*()_+\-=\[\]{};:'",.\\<>?\/\|`~]/;
    if (!symbolRegex.test(pwd)) {
      return 'Password must contain at least one symbol';
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate username
    if (!username.trim()) {
      setError('Username cannot be empty');
      return;
    }

    // Validate password
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    // Check password confirmation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // In a real app, this would call an API
    // For now, we'll just simulate success
    onSuccess(`Admin user "${username}" created successfully`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Create New Admin User</h2>
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            >
              ✕
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              name="new-username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError('');
              }}
              className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 border-slate-300 dark:border-slate-700"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              name="new-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 border-slate-300 dark:border-slate-700"
              placeholder="At least 8 characters with 1 symbol"
            />
            <p className="mt-1 text-xs text-slate-500">
              Must be at least 8 characters and contain at least 1 symbol
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirm-password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError('');
              }}
              className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 border-slate-300 dark:border-slate-700"
              placeholder="Re-enter password"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400" data-testid="error-message">
                {error}
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Admin
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
