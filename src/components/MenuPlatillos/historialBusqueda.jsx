import React, { useState } from 'react';
import { Input, List, AutoComplete, Space } from 'antd';
import { HistoryOutlined, SearchOutlined } from '@ant-design/icons';

const SearchHistory = () => {
  const [searches, setSearches] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    if (inputValue.trim() !== '') {
      setSearches([inputValue, ...searches]);
      setInputValue('');
    }
  };

  const options = searches.map(search => ({
    value: search,
    label: (
      <Space>
        <HistoryOutlined />
        {search}
      </Space>
    ),
  }));

  return (
    <div>
      <AutoComplete
        style={{ width: '100%', marginBottom: 20 }}
        options={options}
      >
        <Input
          placeholder="Realiza una búsqueda"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={handleSearch}
          suffix={<SearchOutlined />}
        />
      </AutoComplete>
      <List   
        renderItem={(item) => (
          <List.Item>
            <Space>
              <HistoryOutlined />
              {item}
            </Space>
          </List.Item>
        )}
      />
    </div>
  );
};

export default SearchHistory;
