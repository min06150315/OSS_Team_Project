import './App.css';
import CreateGame from "./Components/Game/CreateGame";
import { Route, Routes } from "react-router-dom"; // 페이지 이동을 위한 라우팅 컴포넌트
import EditGame from "./Components/Game/EditGame";
import ViewGame from "./Components/Game/ViewGame";
import Header from "./Components/Common/Header";
import Home from "./Components/Layout/Home";
import Navbar from './Components/Common/Navbar';
import ViewTable from './Components/Game/ViewTable';
import 'bootstrap/dist/css/bootstrap.min.css'; // 부트스트랩 CSS
import { useState } from 'react'; // 상태 관리를 위해 useState Hook

function App() {
  // 검색어를 관리하는 상태 변수
  const [searchTerm, setSearchTerm] = useState('');

  // 검색어가 변경될 때 호출되는 함수
  const handleSearch = (term) => {
    setSearchTerm(term); // 검색어를 상태에 저장
  };

  return (
    <div className='custom-container'> {/* 전체 앱을 감싸는 컨테이너 */}
      <div className='left-container'> {/* 왼쪽 네비게이션 바 컨테이너 */}
        <div className='navbar-div'>
          <Navbar /> {/* 네비게이션 바 컴포넌트 */}
        </div>
      </div>

      <div className='right-container'> {/* 오른쪽 메인 콘텐츠 영역 */}
        <div className='header-div'>
          <Header onSearch={handleSearch} /> {/* 헤더 컴포넌트에 검색 기능 전달 */}
        </div>

        <div className="content-div">
          {/* 라우터 설정으로 페이지 이동을 관리 */}
          <Routes>
            <Route path="/" element={<Home searchTerm={searchTerm} />} /> {/* 검색어를 전달하는 메인 페이지 */}
            <Route path="/edit-game/:id" element={<EditGame />} /> {/* 게임 수정 페이지 */}
            <Route path="/view-game/:id" element={<ViewGame />} /> {/* 게임 정보 보기 페이지 */}
            <Route path="/create-game" element={<CreateGame />} /> {/* 게임 생성 페이지 */}
            <Route path="/view-table" element={<ViewTable />} /> {/* 게임 목록 테이블 */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;