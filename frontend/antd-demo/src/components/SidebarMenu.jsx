import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  HistoryOutlined,
  TeamOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Outlet } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

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

  return <Layout style={layoutStyle}>
    <Sider style={siderStyle}>
      <Menu
        onClick={({ key: path }) => redirectTo(path)}
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
