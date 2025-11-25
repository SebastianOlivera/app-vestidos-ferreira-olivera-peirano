'use client';

import { useState } from 'react';

type Rental = {
  id: string | number;
  itemId: number;
  start: string;
  end: string;
  customer: { name: string; email: string; phone: string };
  createdAt: string;
  status: 'active' | 'canceled';
};

type RentalsTableProps = {
  initialRentals: Rental[];
  csrf: string;
};

export default function RentalsTable({ initialRentals, csrf }: RentalsTableProps) {
  const [rentals, setRentals] = useState<Rental[]>(initialRentals);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCancel = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const rentalId = formData.get('rentalId')?.toString();
    formData.append('csrf', csrf);

    try {
      const response = await fetch('/api/admin/rentals/cancel', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Remove the rental from the list
        setRentals((prev) => prev.filter((r) => r.id.toString() !== rentalId));
        // Clear the input
        (e.target as HTMLFormElement).reset();
        setIsLoading(false);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to cancel rental');
        setIsLoading(false);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="mt-10">
        <h2 className="font-semibold">Scheduled rentals</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="py-2 pr-4">Rental ID</th>
                <th className="py-2 pr-4">Item</th>
                <th className="py-2 pr-4">Dates</th>
                <th className="py-2 pr-4">Customer</th>
                <th className="py-2 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {rentals.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="py-2 pr-4">{r.id}</td>
                  <td className="py-2 pr-4">{r.itemId}</td>
                  <td className="py-2 pr-4">
                    {r.start} → {r.end}
                  </td>
                  <td className="py-2 pr-4">
                    {r.customer.name}
                    <div className="text-slate-500 text-xs">{r.customer.email} • {r.customer.phone}</div>
                  </td>
                  <td className="py-2 pr-4 capitalize">{r.status}</td>
                </tr>
              ))}
              {rentals.length === 0 && (
                <tr>
                  <td className="py-3 text-slate-500" colSpan={5}>
                    No rentals have been registered
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-semibold">Cancel Rental</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Enter the rental ID to cancel an active rental.
        </p>
        <form onSubmit={handleCancel} className="mt-3 flex gap-3 max-w-md">
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
    </>
  );
}
