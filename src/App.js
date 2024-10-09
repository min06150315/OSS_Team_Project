import './App.css';
import CreateGame from "./Components/Game/CreateGame";
import ShowGame from "./Components/Game/ShowGame";
import { Route, Routes } from "react-router-dom";
import EditGame from "./Components/Game/EditGame";
import Game from "./Components/Game/Game";
import Header from "./Components/Common/Header";
import Home from "./Components/Layout/Home";
import Footer from './Components/Common/Footer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="">
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit-game/:id" element={<EditGame />} />
            <Route path="/game/:id" element={<Game />} />
            <Route path="/create-game" element={<CreateGame />} />
            <Route path="/show-game" element={<ShowGame />} />
          </Routes>
        </div>
      </header>
    </div>
  );
}

export default App;