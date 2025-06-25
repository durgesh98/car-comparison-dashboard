import React, { Suspense, lazy } from 'react';
import { CarProvider } from './context/CarContext';
import Filters from './components/Filters';

const CarList = lazy(() => import('./components/CarList'));
const CarComparison = lazy(() => import('./components/CarComparison'));

function App() {
  return (
    <CarProvider>
      <main className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 md:px-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Car Comparison Dashboard</h1>
        <Filters />
        <Suspense fallback={<div className="text-center">Loading components...</div>}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <CarList />
            <CarComparison />
          </div>
        </Suspense>
      </main>
    </CarProvider>
  );
}

export default App;
