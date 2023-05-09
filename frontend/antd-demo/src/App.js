import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import TelaInicial from './TelaInicial';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

function App() {
  const handleLogin = (userData) => {
    console.log('Usuário logado:', userData);
  };

  return (
    <div className="app-container">
      <h1 style={{ textAlign: 'center' }}>Minha Trilha App</h1>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/inicial" element={<TelaInicial />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
