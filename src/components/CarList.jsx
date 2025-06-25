import React from 'react';
import { useCarContext } from '../context/CarContext';

const CarList = () => {
  const { cars, toggleCarSelection, selectedCars } = useCarContext();

   if (cars.length === 0) {
    return (
      <div className="text-center text-gray-600 mt-10 text-lg">
        No cars found. Try adjusting your filters.
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Car List</h2>
      {cars.map((car) => (
        <div key={car.id} className="border p-3 mb-3 rounded flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex-1">
            <p>
              <strong>{car.brand} {car.model}</strong>
            </p>
            <p data-testid="car-price">₹{car.price.toLocaleString()}</p>
            <p>Weight: {car.weight}kg</p>
            <p>Rating: {car.rating}/5</p>
          </div>
          {car.image && (
            <img
              src={car.image}
              alt={`${car.brand} ${car.model}`}
              className="w-20 h-16 object-cover rounded"
              loading="lazy"
            />
          )}
          <button
            onClick={() => toggleCarSelection(car.id)}
            className={`px-3 py-1 rounded text-white ${selectedCars.includes(car.id) ? 'bg-red-500' : 'bg-green-500'}`}
          >
            {selectedCars.includes(car.id) ? 'Remove' : 'Compare'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default CarList;



