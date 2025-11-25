import { NextResponse } from "next/server";
import { updateItemPrice } from "@/lib/RentalManagementSystem";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const id = body?.id;
  const pricePerDay = body?.pricePerDay;

  if (typeof id !== "number" || typeof pricePerDay !== "number" || pricePerDay <= 0) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const result = updateItemPrice(id, pricePerDay);
  if ("error" in result) {
    return NextResponse.json(result, { status: 404 });
  }

  return NextResponse.json(result);
}
