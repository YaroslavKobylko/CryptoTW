import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Form } from '../Form/Form';
import { setUser } from '../../store/slices/UserSlice.js';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Означення обробника подій на зовнішньому рівні
  const handleLogin = useCallback((email, password) => {
    console.log('Logging in with email:', email); // Додана перевірка в консоль
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log('User logged in:', user); // Додана перевірка в консоль
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          })
        );
        navigate('/home');
      })
      .catch(error => {
        console.error('Login error:', error);
        alert('Invalid user or password!');
      });
  }, [dispatch, navigate]);

  const handleFormSubmit = (email, password) => {
    console.log('Form submitted with email:', email); // Додана перевірка в консоль
    handleLogin(email, password);
  };

  console.log('Rendering Login component'); // Додана перевірка в консоль

  return <Form title="sign in" handleClick={handleFormSubmit} />;
};

export { Login };