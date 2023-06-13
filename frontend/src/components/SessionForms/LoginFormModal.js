import React from 'react';
import LoginForm from './LoginForm';
import ReactModal from 'react-modal';
import { useSelector } from 'react-redux';

function LoginFormModal() {
  const modal = useSelector(state => state.modal)

  return (
    <>
        <ReactModal className="login-modal" isOpen={ modal === "login"}>
        {/* <ReactModal className="login-modal" ariaHideApp={false} isOpen={ modal === "login"}> */}
          <LoginForm />
        </ReactModal>

    </>
  );
}

export default LoginFormModal;

