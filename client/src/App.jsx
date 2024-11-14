import './App.css'
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GameContext from './components/GameContext';

function App() {


  return (
    <GameContext.Provider>
      <BrowserRouter>
        <main>
          <Routes>
            <Route path='/' element={<Home />}></Route>
          </Routes>
        </main>
      </BrowserRouter>
    </GameContext.Provider>
  );
}

export default App
