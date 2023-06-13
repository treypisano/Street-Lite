import React from 'react';
import SignupForm from './SignupForm';
import ReactModal from 'react-modal';
import { useSelector } from 'react-redux';

function SignupFormModal() {
  const modal = useSelector(state => state.modal)

  return (
    <>
        <ReactModal className="signup-modal" ariaHideApp={false} isOpen={ modal === "signup"}>
          <SignupForm />
        </ReactModal>

    </>
  );
}

export default SignupFormModal;
