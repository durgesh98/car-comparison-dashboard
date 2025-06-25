import React, { createContext, useContext, useState } from 'react';
import carsData from '../data/cars.json';

const CarContext = createContext();

export const CarProvider = ({ children }) => {
  const [cars] = useState(carsData);
  const [selectedCars, setSelectedCars] = useState([]);
  const [filters, setFilters] = useState({
    brand: '',
    minPrice: 0,
    maxPrice: Infinity,
    type: '',
    sortBy: ''
  });

  const toggleCarSelection = (carId) => {
    setSelectedCars((prev) =>
      prev.includes(carId)
        ? prev.filter((id) => id !== carId)
        : [...prev, carId]
    );
  };

  const filteredCars = cars
    .filter((car) => {
      const min = isNaN(filters.minPrice) ? 0 : filters.minPrice;
      const max = isNaN(filters.maxPrice) ? Infinity : filters.maxPrice;
      const brandMatch = !filters.brand || car.brand.toLowerCase().includes(filters.brand.toLowerCase());
      const typeMatch = !filters.type || car.type?.toLowerCase() === filters.type.toLowerCase();
      const priceMatch = car.price >= min && car.price <= max;
      return brandMatch && typeMatch && priceMatch;
    })
    .sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'rating-desc') return b.rating - a.rating;
      return 0;
    });

  return (
    <CarContext.Provider
      value={{
        cars: filteredCars,
        selectedCars,
        toggleCarSelection,
        setFilters
      }}
    >
      {children}
    </CarContext.Provider>
  );
};

export const useCarContext = () => useContext(CarContext);
