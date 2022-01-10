import React from 'react';
import { render, screen } from '@testing-library/react';
import MainScreen from './components/main-screen';

test('renders learn react link', () => {
  render(<MainScreen />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
