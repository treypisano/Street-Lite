import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, clearSessionErrors } from '../../store/session';
import DemoLogin from './DemoLogin';
import { Link } from 'react-router-dom';
import './Forms.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = field => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="session-form">
      <form className="session-fields" onSubmit={handleSubmit}>
        <h2>Log In</h2>
        <div className="form-group">
          <input
            type="text"
            value={email}
            onChange={update('email')}
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={update('password')}
            placeholder="Password"
          />
        </div>
        <div className="error-msg">{errors?.email}</div>
        <button type="submit" className="submit-btn" disabled={!email || !password}>
          Log In
        </button>
      </form>
      <div className="demo-login-container">
        <DemoLogin />
      </div>
      <div className="redirect-msg">
        New to street_lite? <Link to="/signup" className="redirect-link">Sign Up</Link>
      </div>
    </div>
  );
}

export default LoginForm;
