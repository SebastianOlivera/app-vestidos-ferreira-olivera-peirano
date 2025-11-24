import { NextResponse } from "next/server";
import { isAdmin, verifyCsrfToken } from "@/lib/CsrfSessionManagement";
import { cancelRental } from "@/lib/RentalManagementSystem";

export async function POST(req: Request) {
  if (!isAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const csrf = form.get("csrf")?.toString() ?? null;
  if (!verifyCsrfToken(csrf)) {
    return NextResponse.json({ error: "Invalid CSRF token" }, { status: 400 });
  }

  const rentalId = form.get("rentalId")?.toString();
  if (!rentalId) {
    return NextResponse.json({ error: "Rental ID is required" }, { status: 400 });
  }

  const result = cancelRental(rentalId);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
