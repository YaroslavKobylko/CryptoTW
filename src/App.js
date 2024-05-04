import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import StartPage from './pages/StartPage/StartPage';
import CryptocurrencyPage from './pages/CryptocurrencyPage/CryptocurrencyPage';
import CalculatorPage from '.pages/CalculatorPage';

function App() {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/" element={<StartPage />} />
      <Route path="/start" element={<StartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/cryptocurrency" element={<CryptocurrencyPage />} />
      <Route path="/calculator" element={<CalculatorPage />} />
    </Routes>
  );
}

export default App;