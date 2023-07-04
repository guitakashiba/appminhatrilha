import { Breadcrumb, Layout, Menu, theme, notification } from 'antd';
import {
  HomeOutlined,
  HistoryOutlined,
  TeamOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const { Header, Content, Footer } = Layout;

const App = () => {
  const navigate = useNavigate();

  const redirectTo = (path) => {
    navigate(path);
  };

  const onLogout = async () => {
    try {
      const response = await api.auth.logout();

      if (response.success) {
        console.log('Logout bem sucedido');

        // Remova os itens do localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('disciplinas');
        localStorage.removeItem('cargaHorariaTotal');
        localStorage.removeItem('selectedDisciplinas');

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
  };

  const handleClick = ({ key: path }) => {
    if (path === '/logout') {
      onLogout();
    } else {
      redirectTo(path);
    }
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ width:'100%', height:'100%'}}>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          onClick={handleClick}
          style={{width:'100%'}}
        >
          <Menu.Item key="/dashboard" icon={<TeamOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="/disciplinas" icon={<HomeOutlined />}>
            Disciplinas
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
      </Header>
      <Content
        className="site-layout"
        style={{
          padding: '0 50px',
          flex: '1 0 auto',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          
        </Breadcrumb>
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Minha Trilha App ©2023
      </Footer>
    </Layout>
  );
};

export default App;
