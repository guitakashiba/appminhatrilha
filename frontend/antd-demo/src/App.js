// App.js
import React, { useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import TelaInicial from './TelaInicial';
import UserContext from './UserContext';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null); // Crie um estado para o usuário

  const handleLogin = (userData) => {
    setUser(userData.usuario); // Ajuste os dados do usuário quando o login for bem-sucedido
    console.log('Usuário logado:', userData);
  };

  return (
    <div className="app-container">
      <h1 style={{ textAlign: 'center' }}>Minha Trilha App</h1>
      <Router>
        <UserContext.Provider value={{ user }}>
          <Routes>
            <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/inicial" element={<TelaInicial />} />
          </Routes>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
