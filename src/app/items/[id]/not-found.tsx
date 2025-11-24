export default function ItemNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="text-2xl font-bold">Artículo no disponible</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        No pudimos encontrar el artículo que estás buscando.
      </p>
    </div>
  );
}
