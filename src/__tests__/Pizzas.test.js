import React from 'react';
import Pizzas from '../components/Pizzas';
import { render, screen } from '@testing-library/react';
import axios from 'axios';

jest.mock('axios');

const pizzaTypes = ['Cheese', 'Pepperoni', 'Pineapple'];

describe('Pizzas', () => {
  test('it shows a loading indicator initially, and no pizzas', async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: pizzaTypes }));
    render(<Pizzas />);

    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toEqual([]);
  });

  test('it displays a list of pizzas', async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: pizzaTypes }));
    render(<Pizzas />);

    const listItems = await screen.findAllByRole('listitem');
    expect(listItems).toHaveLength(3);
  });

  test('it shows an error when fetching pizzas fails', async () => {
    axios.get.mockImplementation(() => Promise.reject(Error()));
    render(<Pizzas />);

    expect(
      await screen.findByText('Failed to fetch pizzas.')
    ).toBeInTheDocument();
  });
});
