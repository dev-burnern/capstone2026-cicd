import './App.css';
import { useMemo, useState } from 'react';
import axios from 'axios';

function App() {
  const apiBaseUrl = useMemo(
    () => process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api/members',
    []
  );
  const [registerForm, setRegisterForm] = useState({
    userId: '',
    password: '',
    name: '',
  });
  const [loginForm, setLoginForm] = useState({
    userId: '',
    password: '',
  });
  const [registerMessage, setRegisterMessage] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [registerLoading, setRegisterLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const handleRegisterChange = ({ target: { name, value } }) => {
    setRegisterForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleLoginChange = ({ target: { name, value } }) => {
    setLoginForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setRegisterLoading(true);
    setRegisterMessage('');

    try {
      await axios.post(`${apiBaseUrl}/register`, registerForm);
      setRegisterMessage('회원가입이 완료되었습니다.');
      setRegisterForm({
        userId: '',
        password: '',
        name: '',
      });
    } catch (error) {
      setRegisterMessage(error.response?.data || '회원가입을 다시 시도해주세요.');
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginLoading(true);
    setLoginMessage('');

    try {
      const response = await axios.post(`${apiBaseUrl}/login`, loginForm);
      setLoginMessage(`${response.data.name}님, 환영합니다.`);
      setLoginForm({
        userId: '',
        password: '',
      });
    } catch (error) {
      setLoginMessage(error.response?.data || '로그인에 실패했습니다.');
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <main className="app-shell">
      <section className="forms-grid">
        <form className="panel" onSubmit={handleLogin}>
          <h1>회원 로그인</h1>

          <label htmlFor="login-user-id">아이디</label>
          <input
            id="login-user-id"
            name="userId"
            type="text"
            placeholder="아이디"
            value={loginForm.userId}
            onChange={handleLoginChange}
            required
          />

          <label htmlFor="login-password">비밀번호</label>
          <input
            id="login-password"
            name="password"
            type="password"
            placeholder="비밀번호"
            value={loginForm.password}
            onChange={handleLoginChange}
            required
          />

          <button type="submit" disabled={loginLoading}>
            {loginLoading ? '로그인 중...' : '로그인'}
          </button>

          {loginMessage ? <p className="feedback">{loginMessage}</p> : null}
        </form>

        <form className="panel" onSubmit={handleRegister}>
          <h1>회원가입</h1>

          <label htmlFor="register-user-id">아이디</label>
          <input
            id="register-user-id"
            name="userId"
            type="text"
            placeholder="아이디"
            value={registerForm.userId}
            onChange={handleRegisterChange}
            required
          />

          <label htmlFor="register-password">비밀번호</label>
          <input
            id="register-password"
            name="password"
            type="password"
            placeholder="비밀번호"
            value={registerForm.password}
            onChange={handleRegisterChange}
            required
          />

          <label htmlFor="register-name">이름</label>
          <input
            id="register-name"
            name="name"
            type="text"
            placeholder="이름"
            value={registerForm.name}
            onChange={handleRegisterChange}
            required
          />

          <button type="submit" disabled={registerLoading}>
            {registerLoading ? '등록 중...' : '회원가입'}
          </button>

          {registerMessage ? <p className="feedback">{registerMessage}</p> : null}
        </form>
      </section>
    </main>
  );
}

export default App;
