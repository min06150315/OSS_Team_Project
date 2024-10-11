import './App.css';
import CreateGame from "./Components/Game/CreateGame";
import { Route, Routes } from "react-router-dom";
import EditGame from "./Components/Game/EditGame";
import Game from "./Components/Game/Game";
import Header from "./Components/Common/Header";
import Home from "./Components/Layout/Home";
import Navbar from './Components/Common/Navbar';
import ViewTable from './Components/Game/ViewTable';

function App() {
  return (
    <div className='container'>
      <div className='left-container'>
        <div className='navbar-div'><Navbar /></div>
      </div>

      <div className='right-container'>
        <div className='header-div'><Header /></div>

        {/* 페이지 변경을 위해 Routes 사용 */}
        <div className="content-div">
          <Routes>
            <Route path="/" element={<Home />} /> {/* 메인 페이지 */}
            <Route path="/edit-game/:id" element={<EditGame />} /> {/* 게임 수정 페이지 */}
            <Route path="/game/:id" element={<Game />} /> {/* 게임 세부정보 페이지 */}
            <Route path="/create-game" element={<CreateGame />} /> {/* 게임 생성 페이지 */}
            <Route path="/view-table" element={<ViewTable />} /> {/* 테이블 보기 */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
