import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, clearSessionErrors } from '../../store/session';
import DemoLogin from './DemoLogin';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './Forms.css';

function LoginForm () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })); 
  }

  return (
    <div className='session-form'>
      <form className="session-fields" onSubmit={handleSubmit}>
        <h2>Log In Form</h2>
        <label>
          <span>Email </span>
          <input type="text"
            value={email}
            onChange={update('email')}
            placeholder="Email"
          />
        </label>
        {/* <div className="errors">{errors?.email}</div> */}
        <label>
          <span>Password </span>
          <input type="password"
            value={password}
            onChange={update('password')}
            placeholder="Password"
          />
        </label>
        <div className="errors">{errors?.email}</div>
        <input
          type="submit"
          value="Log In"
          disabled={!email || !password}
        />
      </form>
      <DemoLogin />
      <div className="signup-redirect">
            New to street_lite?
            <br></br>
            <Link to="/signup" className="signup-link">
              Sign Up
            </Link>
      </div>
    </div>
  );
}

export default LoginForm;