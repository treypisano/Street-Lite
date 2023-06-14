import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import * as modalActions from '../../store/modal';
import { useLoggedIn } from "../../util/ApiUtil";
import LoginFormModal from "../SessionForms/LoginFormModal";
import LogoutButton from "../SessionForms/LogoutButton";
import SignupFormModal from "../SessionForms/SignupFormModal";
import ReactModal from "react-modal";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

function ProfileButton() {
  
/*  
// Modal Code
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const currentUser = useSelector((state) => state.session.user);
  
  const openMenu = () => {
    setShowMenu(true);
  };
  
  useEffect(() => {
    const closeMenu = () => {
      setShowMenu(false);
    };

    if (showMenu) {
      document.addEventListener('click', closeMenu);
    }
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);


  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const openLogin = () => {
    dispatch({type: modalActions.OPEN_LOGIN_MODAL, payload: 'open'})
  }

  const openSignup = () => {
    dispatch({type: modalActions.OPEN_SIGNUP_MODAL, payload: 'open'})
  }

  const toggleMenu = (e) => {
    setShowMenu((prevState) => !prevState);
  };

  const handleButtonClick = (link) => {
    window.open(link, "_blank");
  };
  */
  
  const currentUser = useSelector((state) => state.session.user);

    if (useLoggedIn()) {
        return (
            <div>
                Welcome Back, {currentUser.username}!
                <br></br>
                <LogoutButton />
            </div>
        )
    } else {
        return (
            <div>
                You are not logged in
                <br></br>
                {/* <ul className={`profile-dropdown ${showMenu ? 'open' : ''}`}>
                    <li onClick={openLogin}>
                        <div onClick={openLogin}>Login</div>
                    </li>
                    <li onClick={openSignup}>
                        <div onClick={openSignup}>Sign Up</div>
                    </li>
                </ul> */}
                <NavLink className="login" to="/login">
                    Log In
                </NavLink>
                <br></br>
                <NavLink className="signup" to="/signup">
                    Signup
                </NavLink>
            </div>
        )
    }

}

export default ProfileButton;


