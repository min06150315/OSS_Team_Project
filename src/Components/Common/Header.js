import React, { useState } from 'react';
import './Common.css';

const Header = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value); // 검색어를 부모 컴포넌트로 전달
  };

  return (
    <header className="header">
      <input 
        type="text" 
        className="form-control" 
        placeholder="검색하기" 
        value={searchTerm}
        onChange={handleSearch} // 입력 변경 시 핸들러 호출
      />
    </header>
  );
};

export default Header;
