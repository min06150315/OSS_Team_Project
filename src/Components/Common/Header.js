import React, { useState } from 'react'; // React와 useState 훅을 import
import './Common.css'; // CSS 파일 import

// Header 컴포넌트 정의. 부모 컴포넌트에서 onSearch 함수를 props로 받음
const Header = ({ onSearch }) => {
  // 검색어를 관리하기 위한 상태 변수 선언
  const [searchTerm, setSearchTerm] = useState('');

  // 입력 값이 변경될 때 호출되는 핸들러
  const handleSearch = (event) => {
    setSearchTerm(event.target.value); // 입력 값을 상태에 저장
    onSearch(event.target.value); // 검색어를 부모 컴포넌트로 전달
  };

  return (
    <header className="header">
      <input 
        type="text" 
        className="form-control" 
        placeholder="검색하기" // 검색창의 플레이스홀더
        value={searchTerm} // 상태에서 검색어 값 설정
        onChange={handleSearch} // 입력 변경 시 핸들러 호출
      />
    </header>
  );
};

export default Header; // Header 컴포넌트를 내보냄