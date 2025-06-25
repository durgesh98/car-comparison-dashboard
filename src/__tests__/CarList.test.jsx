import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CarProvider } from '../context/CarContext';
import CarList from '../components/CarList';
import Filters from '../components/Filters';

describe('Car Comparison Dashboard', () => {
  test('renders car list', () => {
    render(
      <CarProvider>
        <CarList />
      </CarProvider>
    );
    expect(screen.getByText(/Toyota Camry/i)).toBeInTheDocument();
  });

  test('filters by brand', () => {
    render(
      <CarProvider>
        <Filters />
        <CarList />
      </CarProvider>
    );
    fireEvent.change(screen.getByPlaceholderText(/Brand/i), {
      target: { value: 'Honda' },
    });
    expect(screen.getByText(/Honda Civic/i)).toBeInTheDocument();
    expect(screen.queryByText(/Toyota Camry/i)).not.toBeInTheDocument();
  });

  test('filters by max price', () => {
    render(
      <CarProvider>
        <Filters />
        <CarList />
      </CarProvider>
    );
    fireEvent.change(screen.getByPlaceholderText(/Max Price/i), {
      target: { value: '1000000' },
    });
    expect(screen.queryByText(/Camry/i)).not.toBeInTheDocument();
  });

  test('filters by car type', () => {
    render(
      <CarProvider>
        <Filters />
        <CarList />
      </CarProvider>
    );
    fireEvent.change(screen.getByDisplayValue(/All Types/i), {
      target: { value: 'SUV' },
    });
    expect(screen.queryByText(/Toyota Camry/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Kia Seltos/i)).toBeInTheDocument();
  });

  test('sorts cars by price ascending', () => {
    render(
      <CarProvider>
        <Filters />
        <CarList />
      </CarProvider>
    );
    fireEvent.change(screen.getByDisplayValue(/Sort By/i), {
      target: { value: 'price-asc' },
    });

    const prices = screen.getAllByTestId('car-price').map((el) =>
      Number(el.textContent.replace(/[^0-9]/g, ''))
    );
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('shows message when no cars match filters', () => {
    render(
      <CarProvider>
        <Filters />
        <CarList />
      </CarProvider>
    );
    fireEvent.change(screen.getByPlaceholderText(/Brand/i), {
      target: { value: 'InvalidBrand' },
    });
    expect(screen.getByText(/No cars found/i)).toBeInTheDocument();
  });
});
