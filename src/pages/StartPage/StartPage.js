import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';
import Header from '../../components/Header/Header';

const StartPage = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate('/home');
    }
  }, [isAuth, navigate]);

  return (
    <div>
      <Header />
      <h1>StartPage</h1>
    </div>
  );
};

export default StartPage;