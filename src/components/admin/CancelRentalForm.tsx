'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type CancelRentalFormProps = {
  csrf: string;
};

export default function CancelRentalForm({ csrf }: CancelRentalFormProps) {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.append('csrf', csrf);

    try {
      const response = await fetch('/api/admin/rentals/cancel', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Successful cancellation, refresh the page to show updated data
        router.refresh();
        // Clear the input
        (e.target as HTMLFormElement).reset();
        setIsLoading(false);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to cancel rental');
        setIsLoading(false);
      }
    } catch {
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <section className="mt-10">
      <h2 className="font-semibold">Cancel Rental</h2>
      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
        Enter the rental ID to cancel an active rental.
      </p>
      <form onSubmit={handleSubmit} className="mt-3 flex gap-3 max-w-md">
        <input
          type="text"
          name="rentalId"
          placeholder="Enter rental ID"
          className="flex-1 px-3 py-2 border rounded-lg text-sm dark:bg-slate-800"
          required
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 disabled:opacity-50"
        >
          {isLoading ? 'Cancelling...' : 'Cancel Rental'}
        </button>
      </form>
      
      {error && (
        <div className="mt-3 p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg max-w-md">
          <p className="text-sm text-red-600 dark:text-red-400" data-testid="cancel-error">
            {error}
          </p>
        </div>
      )}
    </section>
  );
}
