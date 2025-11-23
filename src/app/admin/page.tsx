import { isAdmin, getOrCreateCsrfToken } from "@/lib/CsrfSessionManagement";
import { listItems, listRentals } from "@/lib/RentalManagementSystem";
import { redirect } from "next/navigation";
import InventorySection from "@/src/components/admin/InventorySection";
import RentalsTable from "@/src/components/admin/RentalsTable";

type AdminItem = {
  id: number | string;
  name: string;
  category: string;
  sizes: string[];
  color: string;
  style: string;
  pricePerDay: number;
};

export default async function Page() {
  if (!isAdmin()) redirect("/admin/login");
  const csrf = await getOrCreateCsrfToken();

  const items = listItems().map(item => ({
    ...item,
    style: item.style || 'N/A',
  }));
  const rentals = listRentals();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin dashboard</h1>
        <form action="/api/admin/logout" method="POST">
          <button className="text-sm rounded-lg border px-3 py-2">Sign out</button>
        </form>
      </div>

      <InventorySection initialItems={items} />

      <RentalsTable initialRentals={rentals} csrf={csrf} />
    </div>
  );
}
