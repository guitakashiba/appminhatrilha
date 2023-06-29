import React, { useCallback } from 'react';
import { Layout, Menu, notification } from 'antd';
import {
  HomeOutlined,
  HistoryOutlined,
  TeamOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Outlet } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import api from '../services/api';

const { Header, Sider, Content } = Layout;

const headerStyle = {
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#142d4c',
  textAlign: 'center',
};

const contentStyle = {
  padding: '16px',
  maxHeight: '100vh',
  overflow: 'auto'
};

const siderStyle = {
  width: 256,
  minHeight: '100vh',
  backgroundColor: '#142d4c',
};

const layoutStyle = {
  width: '100%',
  maxHeight: '100vh'
};

const SidebarMenu = () => {

  const navigate = useNavigate()

  const redirectTo = (path) => {
    navigate(path)
  }

  const onLogout = useCallback(async () => {
    try {
      const response = await api.auth.logout();

      if (response.success) {
        console.log('Logout bem sucedido');
        localStorage.removeItem('user');
        redirectTo('/');
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
  }, [navigate]);

  const handleClick = ({ key: path }) => {
    if (path === '/logout') {
      onLogout();
    } else {
      redirectTo(path);
    }
  };

  return <Layout style={layoutStyle}>
    <Sider style={siderStyle}>
      <Menu
        //onClick={({ key: path }) => redirectTo(path)}
        onClick={handleClick}
        theme="dark" mode="inline"
        defaultSelectedKeys={['1']}
      >
        <Menu.Item key="/inicial" icon={<HomeOutlined />}>
          Home
        </Menu.Item>
        <Menu.Item key="/historico" icon={<HistoryOutlined />}>
          Histórico
        </Menu.Item>
        <Menu.Item key="/sobrenos" icon={<TeamOutlined />}>
          Sobre nós
        </Menu.Item>
        <Menu.Item key="/logout" icon={<LogoutOutlined />}>
          Logout
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout>
      <Header style={headerStyle}>Minha Trilha App</Header>
      <Content style={contentStyle}>
        <Outlet />
      </Content>
    </Layout>
  </Layout>
};

export default SidebarMenu;
