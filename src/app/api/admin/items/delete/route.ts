import { NextResponse } from "next/server";
import { deleteItem } from "@/lib/RentalManagementSystem";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const id = body?.id;

  if (typeof id !== "number" || Number.isNaN(id)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const result = deleteItem(id);
  if ("error" in result) {
    return NextResponse.json(result, { status: 404 });
  }

  return NextResponse.json(result);
}
