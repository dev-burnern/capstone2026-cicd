import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login register and project info link', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: /회원 로그인/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /회원가입/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /프로젝트 정보 확인/i })).toHaveAttribute(
    'href',
    '/projectInfo.html'
  );
});
