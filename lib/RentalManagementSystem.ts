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
  id: string;
  itemId: number;
  start: string; // ISO date (yyyy-mm-dd)
  end: string;   // ISO date (yyyy-mm-dd)
  customer: { name: string; email: string; phone: string };
  createdAt: string;
  status: "active" | "canceled";
};

// In-memory store for demo. Replace with a DB in production.
let items: Item[] = [
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
    name: "Zapatos Negros Clásicos",
    category: "shoes",
    pricePerDay: 29,
    sizes: ["37", "38", "39"],
    color: "Negro",
    style: "formal",
    description: "Zapatos de tacón negros, acabado en cuero y plantilla acolchada.",
    images: ["/images/dresses/black-tie-dress.jpg"],
    alt: "Zapatos de tacón negros clásicos",
  },
  {
    id: 6,
    name: "Zapatillas Blancas Urbanas",
    category: "shoes",
    pricePerDay: 19,
    sizes: ["38", "40", "41"],
    color: "Blanco",
    style: "casual",
    description: "Zapatillas blancas cómodas para uso diario.",
    images: ["/images/dresses/floral-midi-dress.jpg"],
    alt: "Zapatillas blancas urbanas",
  },
];

let rentals: Rental[] = [];

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

function nextItemId() {
  return items.reduce((max, it) => Math.max(max, it.id), 0) + 1;
}

export function addItem(data: Omit<Item, "id"> & { id?: number }) {
  const id = data.id ?? nextItemId();
  const exists = items.some((i) => i.id === id);
  if (exists) return { error: "ID already exists" as const };
  const item: Item = { ...data, id };
  items.push(item);
  return { item };
}

export function deleteItem(id: number) {
  const before = items.length;
  items = items.filter((i) => i.id !== id);
  if (items.length === before) return { error: "Not found" as const };
  rentals = rentals.filter((r) => r.itemId !== id);
  return { ok: true as const };
}

export function updateItemPrice(id: number, pricePerDay: number) {
  const target = items.find((i) => i.id === id);
  if (!target) return { error: "Not found" as const };
  target.pricePerDay = pricePerDay;
  return { item: target };
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
  return rentals.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function cancelRental(id: string) {
  const r = rentals.find((x) => x.id === id);
  if (!r) return { error: "Not found" as const };
  r.status = "canceled";
  return { ok: true as const };
}
