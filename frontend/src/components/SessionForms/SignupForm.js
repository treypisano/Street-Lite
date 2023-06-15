import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signup, clearSessionErrors } from '../../store/session';
import { Link } from 'react-router-dom';
import './Forms.css';

function SignupForm() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const errors = useSelector(state => state.errors);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = field => {
    let setState;

    switch (field) {
      case 'email':
        setState = setEmail;
        break;
      case 'username':
        setState = setUsername;
        break;
      case 'password':
        setState = setPassword;
        break;
      case 'password2':
        setState = setPassword2;
        break;
      default:
        throw new Error('Unknown field in Signup Form');
    }

    return e => setState(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const user = {
      email,
      username,
      password
    };

    dispatch(signup(user));
  };

  return (
    <div className="session-form">
      <form className="session-fields" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="error-msg">{errors?.msg}</div>
        <div className="error-msg">{errors?.email}</div>
        <label>
          <input
            type="text"
            value={email}
            onChange={update('email')}
            placeholder="Email"
          />
        </label>
        <div className="error-msg">{errors?.username}</div>
        <label>
          <input
            type="text"
            value={username}
            onChange={update('username')}
            placeholder="Username"
          />
        </label>
        <div className="error-msg">{errors?.password}</div>
        <label>
          <input
            type="password"
            value={password}
            onChange={update('password')}
            placeholder="Password"
          />
        </label>
        <div className="error-msg">
          {password !== password2 && 'Confirm Password field must match'}
        </div>
        <label>
          <input
            type="password"
            value={password2}
            onChange={update('password2')}
            placeholder="Confirm Password"
          />
        </label>
        <button
          type="submit"
          className="submit-btn"
          disabled={!email || !username || !password || password !== password2}
        >
          Sign Up
        </button>
      </form>
      <div className="redirect-msg">
        Already have an account?{' '}
        <Link to="/login" className="redirect-link">
          Login
        </Link>
      </div>
    </div>
  );
}

export default SignupForm;
