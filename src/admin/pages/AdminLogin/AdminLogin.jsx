import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { auth } from '../../../services/firebase/firebase';

import './AdminLogin.css';

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );

      navigate('/admin');
    } catch (error) {
      console.error('Admin login failed:', error);

      if (
        error.code === 'auth/invalid-credential' ||
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/user-not-found'
      ) {
        setErrorMessage(
          'The email address or password is incorrect.',
        );
      } else if (error.code === 'auth/too-many-requests') {
        setErrorMessage(
          'Too many login attempts. Please wait a moment and try again.',
        );
      } else {
        setErrorMessage(
          'We could not sign you in. Please try again.',
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="admin-login">
      <div className="admin-login__card">
        <div className="admin-login__header">
          <a
            className="admin-login__brand"
            href="/"
            aria-label="Dceetechbro home"
          >
          <img
            className="navbar__logo"
            src="/images/dceelogo.png"
            alt="Dceetechbro"
          />
          </a>

          <p className="admin-login__label">
            Admin portal
          </p>

          <h1>Welcome back.</h1>

          <p>
            Sign in to manage your project enquiries and talent
            requests.
          </p>
        </div>

        <form
          className="admin-login__form"
          onSubmit={handleSubmit}
        >
          <div className="admin-login__field">
            <label htmlFor="admin-email">
              Email address
            </label>

            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@dceetechbro.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="admin-login__field">
            <label htmlFor="admin-password">
              Password
            </label>

            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </div>

          {errorMessage && (
            <p
              className="admin-login__error"
              role="alert"
            >
              {errorMessage}
            </p>
          )}

          <button
            className="admin-login__submit"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}

            <span aria-hidden="true">
              {isSubmitting ? '…' : '↗'}
            </span>
          </button>
        </form>

        <a className="admin-login__back" href="/">
          ← Back to Dceetechbro
        </a>
      </div>
    </main>
  );
}

export default AdminLogin;