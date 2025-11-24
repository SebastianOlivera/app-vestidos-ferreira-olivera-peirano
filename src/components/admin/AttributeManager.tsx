'use client';

import { useState } from 'react';

type AttributeType = 'color' | 'size' | 'style';

type AttributeManagerProps = {
  availableColors: string[];
  availableSizes: string[];
  availableStyles: string[];
  onAddAttribute: (type: AttributeType, value: string) => void;
  onClose: () => void;
};

export default function AttributeManager({
  availableColors,
  availableSizes,
  availableStyles,
  onAddAttribute,
  onClose,
}: AttributeManagerProps) {
  const [selectedType, setSelectedType] = useState<AttributeType>('color');
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const getCurrentAttributes = () => {
    switch (selectedType) {
      case 'color':
        return availableColors;
      case 'size':
        return availableSizes;
      case 'style':
        return availableStyles;
    }
  };

  const validateInput = (value: string): string | null => {
    // Check if empty
    if (!value.trim()) {
      return 'Value cannot be empty';
    }

    // Check for invalid characters (only letters, hyphens, and spaces allowed)
    const validPattern = /^[a-zA-Z\s-]+$/;
    if (!validPattern.test(value)) {
      return 'Only letters, spaces, and hyphens are allowed';
    }

    // Check for duplicates (case-insensitive)
    const currentAttributes = getCurrentAttributes();
    if (currentAttributes.some(attr => attr.toLowerCase() === value.toLowerCase())) {
      return `This ${selectedType} already exists`;
    }

    return null;
  };

  const handleAdd = () => {
    const trimmedValue = inputValue.trim();
    const validationError = validateInput(trimmedValue);

    if (validationError) {
      setError(validationError);
      return;
    }

    onAddAttribute(selectedType, trimmedValue.toLowerCase());
    setInputValue('');
    setError('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Attribute Manager</h2>
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Attribute Type</label>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSelectedType('color');
                  setInputValue('');
                  setError('');
                }}
                className={`px-4 py-2 rounded-lg border ${
                  selectedType === 'color'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Colors
              </button>
              <button
                onClick={() => {
                  setSelectedType('size');
                  setInputValue('');
                  setError('');
                }}
                className={`px-4 py-2 rounded-lg border ${
                  selectedType === 'size'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Sizes
              </button>
              <button
                onClick={() => {
                  setSelectedType('style');
                  setInputValue('');
                  setError('');
                }}
                className={`px-4 py-2 rounded-lg border ${
                  selectedType === 'style'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Styles
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Add New {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setError('');
                }}
                onKeyDown={handleKeyDown}
                placeholder={`Enter ${selectedType} name`}
                className="flex-1 px-3 py-2 border rounded-lg dark:bg-slate-800 border-slate-300 dark:border-slate-700"
              />
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Add
              </button>
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">
              Current {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}s
            </h3>
            <div className="flex flex-wrap gap-2">
              {getCurrentAttributes().map((attr) => (
                <span
                  key={attr}
                  className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-sm border border-slate-200 dark:border-slate-700"
                >
                  {attr}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 border rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
