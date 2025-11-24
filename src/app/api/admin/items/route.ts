import { NextResponse } from "next/server";
import { addItem, deleteItem, updateItemPrice } from "@/lib/RentalManagementSystem";
import { isAdmin, verifyCsrfToken } from "@/lib/CsrfSessionManagement";

export async function POST(req: Request) {
  const form = await req.formData();
  const csrf = form.get("csrf")?.toString();
  if (!(await verifyCsrfToken(csrf))) {
    return NextResponse.json({ error: "Invalid CSRF token" }, { status: 400 });
  }
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const mode = form.get("mode")?.toString();
  if (mode === "create") {
    const name = form.get("name")?.toString().trim();
    const category = form.get("category")?.toString().trim();
    const sizes = form.get("sizes")?.toString().split(",").map((s) => s.trim()).filter(Boolean) ?? [];
    const color = form.get("color")?.toString().trim();
    const pricePerDay = Number(form.get("pricePerDay") ?? NaN);
    if (!name || !category || !color || !pricePerDay || sizes.length === 0) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const { error } = addItem({ name, category: category as any, color, pricePerDay, sizes, description: "", images: ["/images/dresses/black-tie-dress.jpg"], alt: name });
    if (error) return NextResponse.json({ error }, { status: 400 });
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  if (mode === "delete") {
    const id = Number(form.get("id") ?? NaN);
    const { error } = deleteItem(id);
    if (error) {
      return NextResponse.json({ error: "Artículo no encontrado" }, { status: 404 });
    }
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  if (mode === "update-price") {
    const id = Number(form.get("id") ?? NaN);
    const pricePerDay = Number(form.get("pricePerDay") ?? NaN);
    const { error } = updateItemPrice(id, pricePerDay);
    if (error) return NextResponse.json({ error: "Artículo no encontrado" }, { status: 404 });
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
