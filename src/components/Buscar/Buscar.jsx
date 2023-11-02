import { AudioOutlined } from '@ant-design/icons';
import React from 'react';
import { Input, Space } from 'antd';
import { Link } from 'react-router-dom';
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1677ff',
    }}
  />
);
const onSearch = (value, _e, info) => console.log(info?.source, value);
const App = () => (
  <Space direction="vertical">
    <Link to='/mostrar-resultados'><Search placeholder="input search text" onSearch={onSearch} enterButton /></Link>
  </Space>
);
export default App;