'use client';

import { useState } from 'react';
import AddDressForm from './AddDressForm';
import AttributeManager from './AttributeManager';
import CreateAdminForm from './CreateAdminForm';

type AdminItem = {
  id: number | string;
  name: string;
  category: string;
  sizes: string[];
  color: string;
  style: string;
  pricePerDay: number;
};

type InventorySectionProps = {
  initialItems: AdminItem[];
};

export default function InventorySection({ initialItems }: InventorySectionProps) {
  const [items, setItems] = useState<AdminItem[]>(initialItems);
  const [showForm, setShowForm] = useState(false);
  const [showAttributeManager, setShowAttributeManager] = useState(false);
  const [showCreateAdmin, setShowCreateAdmin] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [availableColors, setAvailableColors] = useState(['black', 'white', 'red', 'blue', 'champagne', 'burgundy', 'floral', 'navy', 'emerald']);
  const [availableSizes, setAvailableSizes] = useState(['XS', 'S', 'M', 'L', 'XL']);
  const [availableStyles, setAvailableStyles] = useState(['evening', 'cocktail', 'black-tie', 'daytime', 'casual', 'formal']);
  const [nextId, setNextId] = useState(() => {
    const maxId = Math.max(...initialItems.map(item => 
      typeof item.id === 'number' ? item.id : 0
    ));
    return maxId + 1;
  });

  const handleAddAttribute = (type: 'color' | 'size' | 'style', value: string) => {
    switch (type) {
      case 'color':
        setAvailableColors([...availableColors, value]);
        break;
      case 'size':
        setAvailableSizes([...availableSizes, value.toUpperCase()]);
        break;
      case 'style':
        setAvailableStyles([...availableStyles, value]);
        break;
    }
  };

  const handleAdminCreated = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  const handleAddDress = (newDress: {
    name: string;
    category: string;
    sizes: string[];
    color: string;
    style: string;
    pricePerDay: number;
  }) => {
    const newItem: AdminItem = {
      id: nextId,
      ...newDress,
    };
    setItems([...items, newItem]);
    setNextId(nextId + 1);
    setShowForm(false);
  };

  return (
    <section className="mt-8">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Inventory</h2>
        <div className="flex gap-2">
          {!showForm && !showAttributeManager && !showCreateAdmin && (
            <>
              <button
                onClick={() => setShowCreateAdmin(true)}
                className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
              >
                Create Admin User
              </button>
              <button
                onClick={() => setShowAttributeManager(true)}
                className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700"
              >
                Manage Attributes
              </button>
              <button
                onClick={() => setShowForm(true)}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
              >
                Add New Dress
              </button>
            </>
          )}
        </div>
      </div>

      {successMessage && (
        <div className="mt-4 p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-sm text-green-600 dark:text-green-400">{successMessage}</p>
        </div>
      )}
      {showForm && (
        <AddDressForm
          onAdd={handleAddDress}
          onCancel={() => setShowForm(false)}
          availableColors={availableColors}
          availableSizes={availableSizes}
          availableStyles={availableStyles}
        />
      )}

      {showAttributeManager && (
        <AttributeManager
          availableColors={availableColors}
          availableSizes={availableSizes}
          availableStyles={availableStyles}
          onAddAttribute={handleAddAttribute}
          onClose={() => setShowAttributeManager(false)}
        />
      )}

      {showCreateAdmin && (
        <CreateAdminForm
          onClose={() => setShowCreateAdmin(false)}
          onSuccess={handleAdminCreated}
        />
      )}

      <div className="mt-3 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left">
              <th className="py-2 pr-4">ID</th>
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Category</th>
              <th className="py-2 pr-4">Sizes</th>
              <th className="py-2 pr-4">Color</th>
              <th className="py-2 pr-4">Style</th>
              <th className="py-2 pr-4">Price/day</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i: AdminItem) => (
              <tr key={i.id} className="border-t">
                <td className="py-2 pr-4">{i.id}</td>
                <td className="py-2 pr-4">{i.name}</td>
                <td className="py-2 pr-4">{i.category}</td>
                <td className="py-2 pr-4">{i.sizes.join(", ")}</td>
                <td className="py-2 pr-4">{i.color}</td>
                <td className="py-2 pr-4">{i.style}</td>
                <td className="py-2 pr-4">${i.pricePerDay}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
