import React, { useCallback } from 'react';
import { Button, Form, Input, notification } from 'antd';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const LoginForm = ({ onLogin }) => {
    const navigate = useNavigate();
    const onFinish = useCallback(async (values) => {
      try {
        const { email, password } = values;
        const response = await api.auth.login(email, password);
  
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          onLogin(data);
          navigate('/inicial');
          // Armazena os detalhes do usuário no estado do componente ou em um cookie
          // Redireciona o usuário para a página principal
        } else {
          throw new Error('Credenciais inválidas');
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
    <div className="login-container">
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
  );
};

export default LoginForm;
