import React from 'react';
import { useCarContext } from '../context/CarContext';

const Filters = () => {
  const { setFilters } = useCarContext();

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => {
      const newValue = name.includes('Price')
        ? value === '' ? (name === 'maxPrice' ? Infinity : 0) : Number(value)
        : value;
      return {
        ...prev,
        [name]: newValue,
      };
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 bg-white p-4 rounded shadow">
      <input
        name="brand"
        type="text"
        placeholder="Brand"
        className="border p-2 rounded"
        onChange={handleFilterChange}
      />
      <input
        name="minPrice"
        type="number"
        placeholder="Min Price"
        className="border p-2 rounded"
        onChange={handleFilterChange}
      />
      <input
        name="maxPrice"
        type="number"
        placeholder="Max Price"
        className="border p-2 rounded"
        onChange={handleFilterChange}
      />
      <select name="type" className="border p-2 rounded" onChange={handleFilterChange}>
        <option value="">All Types</option>
        <option value="Sedan">Sedan</option>
        <option value="SUV">SUV</option>
        <option value="Hatchback">Hatchback</option>
      </select>
      <select name="sortBy" className="border p-2 rounded" onChange={handleFilterChange}>
        <option value="">Sort By</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating-desc">Rating: High to Low</option>
      </select>
    </div>
  );
};

export default Filters;
