import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login and register forms', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: /회원 로그인/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /회원가입/i })).toBeInTheDocument();
});
