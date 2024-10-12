import './App.css';
import CreateGame from "./Components/Game/CreateGame";
import { Route, Routes } from "react-router-dom";
import EditGame from "./Components/Game/EditGame";
import Game from "./Components/Game/Game";
import Header from "./Components/Common/Header";
import Home from "./Components/Layout/Home";
import Navbar from './Components/Common/Navbar';
import ViewTable from './Components/Game/ViewTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className='custom-container'>
      <div className='left-container'>
        <div className='navbar-div'>
          <Navbar />
        </div>
      </div>

      <div className='right-container'>
        <div className='header-div'>
          <Header onSearch={handleSearch} /> {/* 검색 기능 전달 */}
        </div>

        <div className="content-div">
          <Routes>
            <Route path="/" element={<Home searchTerm={searchTerm} />} /> {/* 메인 페이지 */}
            <Route path="/edit-game/:id" element={<EditGame />} />
            <Route path="/game/:id" element={<Game />} />
            <Route path="/create-game" element={<CreateGame />} />
            <Route path="/view-table" element={<ViewTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
