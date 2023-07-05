// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import TelaInicial from './TelaInicial';
import HistoricoDis from './components/HistoricoDis'
import Logout from './components/Logout';
import UserContext from './UserContext';
import api from './services/api';
import { Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import SidebarMenu from './components/SidebarMenu';
import SobreNos from './components/SobreNos';
import Dashboard from './Dashboard';



function App() {
  const [user, setUser] = useState(null); // Crie um estado para o usuário

  const handleLogin = (userData) => {
    setUser(userData.usuario); // Ajuste os dados do usuário quando o login for bem-sucedido
    console.log('Usuário logado:', userData);
  };
  const handleDisciplinaChange = (disciplinas) => {
    setUser(prevUser => ({ ...prevUser, disciplinas }));
  };

  const updateUserDisciplinas = async () => {
    if (user && user.usuario && user.disciplinas) {
      try {
        const response = await api.user.update(user.usuario.id, user.disciplinas);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Erro na atualização das disciplinas do usuário:', error);
      }
    }
  };

  useEffect(() => {
    updateUserDisciplinas();
  }, [user]);

  return (
    <div className="app-container">
      <Router>
        <UserContext.Provider value={{ user, setUser }}>
          <Routes>
            <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/" element={<SidebarMenu />}>
              <Route path="disciplinas" element={<TelaInicial onDisciplinaChange={handleDisciplinaChange} />} />
              <Route path="historico" element={<HistoricoDis />} />
              <Route path="sobrenos" element={<SobreNos />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="logout" element={<Logout />} />
            </Route> 
          </Routes>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
