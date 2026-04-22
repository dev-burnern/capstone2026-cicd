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
    <main>
      <h1>CI/CD실습 - feature/github-ci, feature/github-cd 브랜치</h1>
      <hr />

      <section>
        <h2>회원 로그인</h2>
        <form onSubmit={handleLogin}>
          <input
            name="userId"
            type="text"
            placeholder="아이디"
            value={loginForm.userId}
            onChange={handleLoginChange}
            required
          />
          <br />
          <input
            name="password"
            type="password"
            placeholder="비밀번호"
            value={loginForm.password}
            onChange={handleLoginChange}
            required
          />
          <br />
          <button type="submit" disabled={loginLoading}>
            {loginLoading ? '로그인 중...' : '로그인'}
          </button>
        </form>
        {loginMessage ? <p>{loginMessage}</p> : null}
      </section>

      <hr />

      <section>
        <h2>회원가입</h2>
        <form onSubmit={handleRegister}>
          <input
            name="userId"
            type="text"
            placeholder="아이디"
            value={registerForm.userId}
            onChange={handleRegisterChange}
            required
          />
          <br />
          <input
            name="password"
            type="password"
            placeholder="비밀번호"
            value={registerForm.password}
            onChange={handleRegisterChange}
            required
          />
          <br />
          <input
            name="name"
            type="text"
            placeholder="이름"
            value={registerForm.name}
            onChange={handleRegisterChange}
            required
          />
          <br />
          <button type="submit" disabled={registerLoading}>
            {registerLoading ? '등록 중...' : '회원가입'}
          </button>
        </form>
        {registerMessage ? <p>{registerMessage}</p> : null}
      </section>

      <hr />
      <a href="/projectInfo.html">프로젝트 정보 확인</a>
    </main>
  );
}

export default App;
