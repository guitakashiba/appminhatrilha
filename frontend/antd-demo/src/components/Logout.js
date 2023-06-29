import React, { useCallback } from 'react';
import { notification } from 'antd';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ onLogout }) => {
    const navigate = useNavigate();
    
    const onLogoutClick = useCallback(async () => {
      try {
        const response = await api.auth.logout();
  
        if (response.success) {
          console.log('Logout bem sucedido');
          onLogout();
          navigate('/login');
          localStorage.removeItem('user');
  
        } else {
          throw new Error(response.message || 'Falha ao fazer logout');
        }
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
        notification.error({
          message: 'Erro ao fazer logout. Por favor, tente novamente.',
          duration: 3,
        });
      }
    }, [onLogout, navigate]);
    
    return (
      <button onClick={onLogoutClick}>
        Logout
      </button>
    );
  };

  export default {LogoutButton};
  