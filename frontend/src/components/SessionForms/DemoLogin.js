import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';


function DemoLogin() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const login = () => {
    setErrors([]);
    return dispatch(sessionActions.login({ email: "demo@user.io", password: "password" }))
      .catch(async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  }

  return (
    <>
      <button id="demo-user" className="demo-login" onClick={() => login()}
      >Demo Login</button>
    </>
  );
}

export default DemoLogin;