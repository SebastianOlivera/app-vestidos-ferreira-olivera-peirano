'use client';

import { useState } from 'react';

type AddDressFormProps = {
  onAdd: (dress: {
    name: string;
    category: string;
    sizes: string[];
    color: string;
    style: string;
    pricePerDay: number;
  }) => void;
  onCancel: () => void;
  availableColors: string[];
  availableSizes: string[];
  availableStyles: string[];
};

export default function AddDressForm({ onAdd, onCancel, availableColors, availableSizes, availableStyles }: AddDressFormProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('dress');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [color, setColor] = useState('');
  const [style, setStyle] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');

  const toggleSize = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const price = parseFloat(pricePerDay);
    
    if (!name || !selectedSizes.length || !color || !style || !price) {
      alert('Please fill all fields');
      return;
    }

    onAdd({
      name,
      category,
      sizes: selectedSizes,
      color,
      style,
      pricePerDay: price,
    });

    // Reset form
    setName('');
    setCategory('dress');
    setSelectedSizes([]);
    setColor('');
    setStyle('');
    setPricePerDay('');
  };

  return (
    <div className="mt-4 p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
      <h3 className="font-semibold mb-3">Add New Dress</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800"
            placeholder="e.g., Red Evening Gown"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800"
          >
            <option value="dress">Dress</option>
            <option value="shoes">Shoes</option>
            <option value="bag">Bag</option>
            <option value="jacket">Jacket</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Sizes</label>
          <div className="flex gap-3 flex-wrap">
            {availableSizes.map(size => (
              <label key={size} className="flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedSizes.includes(size)}
                  onChange={() => toggleSize(size)}
                  className="cursor-pointer"
                />
                <span className="text-sm">{size}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Color</label>
          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800"
          >
            <option value="">Select a color</option>
            {availableColors.map(c => (
              <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Style</label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800"
          >
            <option value="">Select a style</option>
            {availableStyles.map(s => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Price per Day ($)</label>
          <input
            type="number"
            value={pricePerDay}
            onChange={(e) => setPricePerDay(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800"
            placeholder="e.g., 59"
            step="0.01"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Dress
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
