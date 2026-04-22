import './App.css';
import { useMemo, useState } from 'react';
import axios from 'axios';

const branchSteps = [
  {
    name: 'main',
    label: '기준 브랜치',
    detail: '최종 배포 이미지를 생성하는 기준점',
  },
  {
    name: 'dev',
    label: '통합 브랜치',
    detail: '기능 브랜치를 모아 CI 검증',
  },
  {
    name: 'feat/ci-cd',
    label: '작업 브랜치',
    detail: '화면 개선과 GitHub Actions 실습',
  },
];

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
  const [currentUser, setCurrentUser] = useState(null);
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
      setCurrentUser(response.data);
      setLoginMessage(`${response.data.name}님, 환영합니다.`);
      setLoginForm({
        userId: '',
        password: '',
      });
    } catch (error) {
      setCurrentUser(null);
      setLoginMessage(error.response?.data || '로그인에 실패했습니다.');
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <main className="app-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Docker + GitHub Actions</p>
          <h1>CI/CD 실습 결과</h1>
          <p>
            React, Spring Boot, MariaDB를 Docker Compose로 실행하고 GitHub Actions로
            빌드와 이미지 배포 흐름을 검증합니다.
          </p>
        </div>
      </section>

      <section className="summary-grid" aria-label="서비스 구성">
        <article className="summary-card">
          <span>Frontend</span>
          <strong>React + Nginx</strong>
          <p>localhost:63342</p>
        </article>
        <article className="summary-card">
          <span>Backend</span>
          <strong>Spring Boot</strong>
          <p>{apiBaseUrl}</p>
        </article>
        <article className="summary-card">
          <span>Database</span>
          <strong>MariaDB</strong>
          <p>localhost:3316</p>
        </article>
      </section>

      <section className="branch-flow" aria-label="브랜치 흐름">
        <div className="section-heading">
          <p className="eyebrow">Branch Flow</p>
          <h2>main → dev → feat</h2>
        </div>
        <ol className="branch-list">
          {branchSteps.map((step) => (
            <li key={step.name}>
              <span>{step.label}</span>
              <strong>{step.name}</strong>
              <p>{step.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="forms-grid">
        <form className="panel" onSubmit={handleLogin}>
          <div className="panel-heading">
            <p className="eyebrow">Member API</p>
            <h2>회원 로그인</h2>
          </div>

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
          <div className="panel-heading">
            <p className="eyebrow">Practice Result</p>
            <h2>회원가입</h2>
          </div>

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

      <section className="login-state" aria-label="로그인 상태">
        <span>현재 로그인</span>
        <strong>{currentUser ? currentUser.name : '없음'}</strong>
      </section>
    </main>
  );
}

export default App;
