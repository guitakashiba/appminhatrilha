import { Menu, Row } from 'antd';

function SidebarMenu(){

  function Content(){
    
  }

  return (
    <div style={{display: "flex", flexDirection: "row"}}>
    <Menu
      items={[
        {label: "Home"},
        {label: "Histórico"},
        {label: "Sobre nós"},
        {label: "Lougot"}
      ]}
    
    ></Menu>

  </div>
  );

}

export default SidebarMenu;