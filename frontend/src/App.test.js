import { render, screen } from '@testing-library/react';
import App from './App';

test('renders practice result and member forms', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: /CI\/CD 실습 결과/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /회원 로그인/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /회원가입/i })).toBeInTheDocument();
});
