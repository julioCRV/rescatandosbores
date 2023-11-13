import React, { useState } from 'react';
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

const App = () => {
  const [submenu1Visible, setSubmenu1Visible] = useState(false);
  const [submenu2Visible, setSubmenu2Visible] = useState(false);

  const handleSubmenu1Click = () => {
    setSubmenu1Visible(!submenu1Visible);
    // Asegurarse de que el otro submenu esté cerrado
    setSubmenu2Visible(false);                                          
  };

  const handleSubmenu2Click = () => {
    setSubmenu2Visible(!submenu2Visible);
    // Asegurarse de que el otro submenu esté cerrado
    setSubmenu1Visible(false);
  };

  return (
    <Menu mode="horizontal">
      <SubMenu
       
        icon={<MailOutlined />}
        onTitleClick={handleSubmenu1Click}
        visible={submenu1Visible}
      >
        <Menu.Item >Opción 1</Menu.Item>
        <Menu.Item>Opción 2</Menu.Item>
      </SubMenu>
      <SubMenu
     
        icon={<AppstoreOutlined />}
        onTitleClick={handleSubmenu2Click}
        visible={submenu2Visible}
      >
        <Menu.Item >Opción 3</Menu.Item>
        <Menu.Item >Opción 4</Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default App;
