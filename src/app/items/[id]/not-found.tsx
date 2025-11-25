import Link from "next/link";

export default function ItemNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold">Item not available</h1>
      <p className="mt-4 text-slate-600 dark:text-slate-400">
        The item you are looking for was removed or no longer exists.
      </p>
      <div className="mt-8">
        <Link
          href="/items"
          className="inline-flex rounded-xl bg-fuchsia-600 px-6 py-3 text-sm font-semibold text-white hover:bg-fuchsia-500"
        >
          Browse available items
        </Link>
      </div>
    </div>
  );
}
