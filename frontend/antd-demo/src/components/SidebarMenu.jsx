import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  HistoryOutlined,
  TeamOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
const { Header, Sider, Content } = Layout;

const headerStyle = {
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea',
};

const contentStyle = {
  minHeight: 'calc(100vh - 64px)',
  padding: '24px',
  backgroundColor: '#108ee9',
};

const siderStyle = {
  width: 256,
  minHeight: '100vh',
  backgroundColor: '#3ba0e9',
};

const layoutStyle = {
  display: 'flex',
};

const SidebarMenu = () => (
  <Layout style={layoutStyle}>
    <Sider style={siderStyle}>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<HomeOutlined />}>
          Home
        </Menu.Item>
        <Menu.Item key="2" icon={<HistoryOutlined />}>
          Histórico
        </Menu.Item>
        <Menu.Item key="3" icon={<TeamOutlined />}>
          Sobre nós
        </Menu.Item>
        <Menu.Item key="4" icon={<LogoutOutlined />}>
          Logout
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout>
      <Header style={headerStyle}>Minha Trilha App</Header>
      <Content style={contentStyle}>
        {/* Aqui você pode colocar o conteúdo do seu componente */}
      </Content>
    </Layout>
  </Layout>
);

export default SidebarMenu;
