import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeUser } from '../../store/slices/UserSlice.js';
import { useNavigate } from 'react-router-dom'; 
import './Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = useSelector(state => state.user);
  const totalValue = useSelector(state => state.crypto.total_value);
  const [avatarIcon, setAvatarIcon] = useState("");

  useEffect(() => {
    if (totalValue !== null && totalValue !== undefined) {
      if (totalValue >= 100000) {
        setAvatarIcon("/img/users/rich5.png");
      } else if (totalValue >= 10000) {
        setAvatarIcon("/img/users/rich4.png");
      } else if (totalValue >= 1000) {
        setAvatarIcon("/img/users/rich3.png");
      } else if (totalValue >= 100) {
        setAvatarIcon("/img/users/rich2.png");
      } else {
        setAvatarIcon("/img/users/rich1.png");
      }
    }
  }, [totalValue]);

  const handleLogout = () => {
    dispatch(removeUser());
    navigate('/');
  };

  return (
    <header>
      <nav>
        <ul className="header-ul">
          <li>
            <Link to="/home">
              <img className='logo-photo' src="/img/Logo.png" alt="Logo" />
            </Link>
          </li>
          <li className={location.pathname === '/home' ? 'header-li current' : 'header-li'}>
            <Link to="/home">Homepage</Link>
          </li>
          <li className={location.pathname === '/cryptocurrency' ? 'header-li current' : 'header-li'}>
            <Link to="/cryptocurrency">Cryptocurrency</Link>
          </li>
          <li className={location.pathname === '/contact' ? 'header-li current' : 'header-li'}>
            <Link to="/calculator">Сalculator</Link>
          </li>
          <li className={location.pathname === '/contact' ? 'header-li current' : 'header-li'}>
            <Link to="/contact">About Us</Link>
          </li>
        </ul>
      </nav>
      <div className="auth-buttons">
        {email && (
          <div className='logout-conatiner'>
              <div className="user-info-container">
                <p>{email}</p>
                <button onClick={handleLogout}>Logout</button>
              </div>
              <img className='avatar-icon' src={avatarIcon} alt="Avatar" />
          </div>
        )}
        {!email && (
          <div className='login-registration-container'>
            <div className='login-container'>
              <Link to="/login">Login</Link>
            </div>
            <div className='registration-container'>
              <Link to="/register">Register</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;