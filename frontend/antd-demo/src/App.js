import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import './App.css';


const { Option } = Select;

function App() {
  const onFinishSignup = async (values) => {
    try {
      const response = await fetch('http://localhost:3333/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      if (!response.ok) {
        throw new Error('Erro na criação do usuário');
      }
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Erro ao enviar o formulário de inscrição:', error);
    }
  };
  const onFinish = async (values) => {
    try {
      const { email, password } = values;
      const response = await fetch(`http://localhost:3333/login?email=${email}&senha=${password}`);
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Armazena os detalhes do usuário no estado do componente ou em um cookie
        // Redireciona o usuário para a página principal
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      // Exibe uma mensagem de erro ao usuário
    }
  };

  return (
    <div className="app-container">
      <h1 style={{textAlign: "center"}}>Minha Trilha App</h1>
      <div className="form-container">
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
          </Form>
        </div>

        <div className="divider"></div>

        <div className="signup-container">
          <h2>Signup</h2>
          <Form
            name="signup-form"
            initialValues={{ remember: true }}
            onFinish={onFinishSignup}
          >
            <Form.Item
              name="nome"
              rules={[{ required: true, message: 'Insira o seu nome!' }]}
            >
              <Input placeholder="Nome" />
            </Form.Item>

            <Form.Item
              name="matricula"
              rules={[{ required: true, message: 'Insira sua matrícula!' }]}
            >
              <Input placeholder="Matricula" />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Insira seu email!' },
                      { type:'email', message: 'Insira um email válido!'}]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="curso"
              rules={[{ required: true, message: 'Selecione seu curso!' }]}
            >
              <Select placeholder="Selecione o curso">
                <Option value="eca">Engenharia de Controle e Automação</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="senha"
              rules={[{ required: true, message: 'Insira sua senha!' }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item
              name="confirmaSenha"
              rules={[
                { required: true, message: 'Confirme sua senha!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('senha') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('As senham não conferem!')
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirme a senha" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Signup
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default App;
