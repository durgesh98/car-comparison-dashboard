import React from 'react';
import { useCarContext } from '../context/CarContext';
import carsData from '../data/cars.json';

const CarComparison = () => {
  const { selectedCars } = useCarContext();
  const carsToCompare = carsData.filter((car) => selectedCars.includes(car.id));

  if (!selectedCars.length) return <div className="text-gray-500">Select cars to compare</div>;

  return (
    <div className="bg-white p-4 rounded max-h-[36vh] shadow overflow-auto">
      <h2 className="text-xl font-semibold mb-4">Comparison</h2>
      <table className="min-w-full text-sm text-left border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Attribute</th>
            {carsToCompare.map((car) => (
              <th key={car.id} className="p-2">
                {car.brand} {car.model}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {['price', 'weight', 'rating'].map((attr) => (
            <tr key={attr} className="border-t">
              <td className="p-2 font-medium capitalize">{attr}</td>
              {carsToCompare.map((car) => (
                <td key={car.id} className="p-2">
                  {attr === 'price' ? `₹${car[attr].toLocaleString()}` : car[attr]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarComparison;