import React from 'react';
import { Button, Modal, Space } from 'antd';

const success = () => {
  Modal.success({
    content: 'some messages...some messages...',
  });
};

const App = () => (
  <Space wrap>
    <Button onClick={success}>Success</Button>
  </Space>
);
export default App;