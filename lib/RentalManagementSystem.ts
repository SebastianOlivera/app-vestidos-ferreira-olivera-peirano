export type Category = "dress" | "shoes" | "bag" | "jacket";

export type Item = {
  id: number;
  name: string;
  category: Category;
  pricePerDay: number;
  sizes: string[]; // for shoes you can use "36-41"
  color: string;
  style?: string;
  description: string;
  images: string[];
  alt: string;
};

export type Rental = {
  id: string | number;
  itemId: number;
  start: string; // ISO date (yyyy-mm-dd)
  end: string;   // ISO date (yyyy-mm-dd)
  customer: { name: string; email: string; phone: string };
  createdAt: string;
  status: "active" | "canceled";
};

// In-memory store for demo. Replace with a DB in production.
const items: Item[] = [
  {
    id: 1,
    name: "Silk Evening Gown",
    category: "dress",
    pricePerDay: 79,
    sizes: ["XS", "S", "M", "L"],
    color: "champagne",
    style: "evening",
    description: "Luxurious silk gown with flattering silhouette.",
    images: ["/images/dresses/silk-evening-gown.jpg"],
    alt: "Model wearing a champagne silk evening gown",
  },
  {
    id: 2,
    name: "Black Tie Dress",
    category: "dress",
    pricePerDay: 99,
    sizes: ["S", "M", "L", "XL"],
    color: "black",
    style: "black-tie",
    description: "Elegant black-tie dress for formal events.",
    images: ["/images/dresses/black-tie-dress.jpg"],
    alt: "Elegant black tie dress",
  },
  {
    id: 3,
    name: "Floral Midi Dress",
    category: "dress",
    pricePerDay: 49,
    sizes: ["XS", "S", "M"],
    color: "floral",
    style: "daytime",
    description: "Bright floral midi for daytime events.",
    images: ["/images/dresses/floral-midi-dress.jpg"],
    alt: "Floral midi dress perfect for daytime events",
  },
  {
    id: 4,
    name: "Velvet Cocktail Dress",
    category: "dress",
    pricePerDay: 59,
    sizes: ["S", "M", "L"],
    color: "burgundy",
    style: "cocktail",
    description: "Rich velvet cocktail dress in deep tones.",
    images: ["/images/dresses/velvet-cocktail-dress.jpg"],
    alt: "Velvet cocktail dress in deep tones",
  },
  {
    id: 5,
    name: "Black Strappy Heels",
    category: "shoes",
    pricePerDay: 35,
    sizes: ["36", "37", "38", "39", "40"],
    color: "black",
    style: "stiletto",
    description: "Sleek black strappy heels with a slender heel for formal looks.",
    images: ["/images/shoes/black-strappy-heels.svg"],
    alt: "Pair of black strappy stiletto heels",
  },
  {
    id: 6,
    name: "Champagne Block Heels",
    category: "shoes",
    pricePerDay: 32,
    sizes: ["36", "37", "38", "39", "40", "41"],
    color: "champagne",
    style: "block-heel",
    description: "Comfortable champagne block heels ideal for weddings and daytime events.",
    images: ["/images/shoes/champagne-block-heels.svg"],
    alt: "Champagne-toned block heels with ankle strap",
  },
  {
    id: 7,
    name: "Metallic Platform Sandals",
    category: "shoes",
    pricePerDay: 38,
    sizes: ["37", "38", "39", "40", "41"],
    color: "silver",
    style: "platform",
    description: "Shimmering silver platform sandals that add height and shine.",
    images: ["/images/shoes/metallic-platform-sandals.svg"],
    alt: "Silver metallic platform sandals",
  },
];

let rentals: Rental[] = [
  {
    id: 1,
    itemId: 1,
    start: "2025-12-15",
    end: "2025-12-17",
    customer: {
      name: "María González",
      email: "maria.gonzalez@email.com",
      phone: "+598 91 234 567"
    },
    createdAt: "2025-11-20T10:30:00.000Z",
    status: "active"
  },
  {
    id: 2,
    itemId: 3,
    start: "2025-12-10",
    end: "2025-12-12",
    customer: {
      name: "Ana Rodríguez",
      email: "ana.rodriguez@email.com",
      phone: "+598 92 345 678"
    },
    createdAt: "2025-11-22T14:15:00.000Z",
    status: "active"
  },
  {
    id: 3,
    itemId: 2,
    start: "2025-12-20",
    end: "2025-12-22",
    customer: {
      name: "Lucía Fernández",
      email: "lucia.fernandez@email.com",
      phone: "+598 93 456 789"
    },
    createdAt: "2025-11-21T16:45:00.000Z",
    status: "active"
  }
];

export function listItems(filters?: {
  q?: string;
  category?: Category;
  size?: string;
  color?: string;
  style?: string;
}) {
  const q = filters?.q?.toLowerCase().trim();
  return items.filter((it) => {
    if (filters?.category && it.category !== filters.category) return false;
    if (filters?.size && !it.sizes.includes(filters.size)) return false;
    if (filters?.color && it.color.toLowerCase() !== filters.color.toLowerCase()) return false;
    if (filters?.style && (it.style ?? "").toLowerCase() !== filters.style.toLowerCase()) return false;
    if (q) {
      const hay = [it.name, it.color, it.style ?? "", it.category].join(" ").toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

export function getItem(id: number) {
  return items.find((i) => i.id === id) ?? null;
}

export function getItemRentals(itemId: number) {
  return rentals.filter((r) => r.itemId === itemId && r.status === "active");
}

export function hasOverlap(aStart: string, aEnd: string, bStart: string, bEnd: string) {
  return !(aEnd < bStart || bEnd < aStart);
}

export function isItemAvailable(itemId: number, start: string, end: string) {
  const rs = getItemRentals(itemId);
  return rs.every((r) => !hasOverlap(start, end, r.start, r.end));
}

export function createRental(data: Omit<Rental, "id" | "createdAt" | "status">) {
  const ok = isItemAvailable(data.itemId, data.start, data.end);
  if (!ok) return { error: "Item is not available for the selected dates." as const };
  const id = crypto.randomUUID();
  const rental: Rental = { ...data, id, createdAt: new Date().toISOString(), status: "active" };
  rentals.push(rental);
  return { rental };
}

export function listRentals() {
  return rentals
    .slice()
    .sort((a, b) => a.start.localeCompare(b.start) || a.createdAt.localeCompare(b.createdAt));
}

export function cancelRental(id: string | number) {
  const idx = rentals.findIndex((x) => x.id.toString() === id.toString());
  if (idx === -1) return { error: "Rental not found" as const };
  rentals.splice(idx, 1);
  return { ok: true as const };
}

export function updateItemPrice(id: number, pricePerDay: number) {
  const item = items.find((i) => i.id === id);
  if (!item) return { error: "Item not found" as const };
  item.pricePerDay = pricePerDay;
  return { item };
}

export function deleteItem(id: number) {
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) return { error: "Item not found" as const };

  items.splice(idx, 1);
  rentals = rentals.filter((r) => r.itemId !== id);
  return { ok: true as const };
}
