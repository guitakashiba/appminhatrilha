import React, { useCallback } from 'react';
import { Button, Form, Input, Select, notification } from 'antd';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const SignupForm = () => {
  const navigate = useNavigate();
  const onFinishSignup = useCallback(async (values) => {
    try {
      const response = await api.user.create(values);

      if (!response.ok) {
        throw new Error('Erro na criação do usuário');
      }

      const data = await response.json();
      console.log(data);
      notification.success({
        message: 'Usuário criado com sucesso!',
        duration: 3,
      });

      
      navigate('/inicial');

    } catch (error) {
      console.error('Erro ao enviar o formulário de inscrição:', error);
      notification.error({
        message: 'Erro ao criar usuário. Por favor, tente novamente.',
        duration: 3,
      });
    }
  }, [navigate]);

  return (
    <div className="signup-container">
      <h2>Cadastro</h2>
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
          rules={[
            { required: true, message: 'Insira seu email!' },
            { type: 'email', message: 'Insira um email válido!' },
          ]}
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
                  new Error('As senhas não conferem!')
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirme a senha" />
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit">
            Cadastrar
            </Button>
        </Form.Item>

      </Form>
    </div>
  );
};

export default SignupForm;
