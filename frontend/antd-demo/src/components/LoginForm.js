//LoginForm.js
import React, { useCallback } from 'react';
import { Button, Form, Input, notification } from 'antd';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import novaLogo from '../capa(2).png';

const LoginForm = ({ onLogin }) => {
  const navigate = useNavigate();
  const onFinish = useCallback(async (values) => {
    try {
      const { email, password } = values;
      const response = await api.auth.login(email, password);

      if (response.success) {
        const data = response.usuario;
        console.log(data);
        onLogin(data);
        navigate('/dashboard');
        localStorage.setItem('user', JSON.stringify(data));
        
        notification.success({
          message: 'Login realizado com sucesso!',
          duration: 3,
        });

      } else {
        throw new Error(response.message || 'Erro desconhecido');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      notification.error({
        message: 'Erro ao fazer login. Por favor, tente novamente.',
        duration: 3,
      });
    }
  }, [onLogin, navigate]);
  

  return (
    <div className="login-container" 
          style={{  width:'80%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center' }}>
      <div>
        <img  
            src={novaLogo} 
            alt="Logo" 
            style={{width: '450px', 
                    height:'300px'
                  }} 
        />
      </div>
      <div>
        <h2>Login</h2>
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Insira o seu email!' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Insira a sua senha!' }]}
          >
            <Input.Password placeholder="Senha" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
            
          </Form.Item>
          <Form.Item>
            <h2>Ainda não possui conta? Faça o seu cadastro já!</h2>
            <Link to="/signup">
              <Button type="primary" htmlType="submit">
                  Cadastrar
              </Button>
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
