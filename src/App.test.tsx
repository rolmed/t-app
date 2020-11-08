import React from 'react';
import { render, screen } from '@testing-library/react';
import { History } from 'history';
import App from './App';

test('renders learn react link', () => {
  render(<App history={{} as History} />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
