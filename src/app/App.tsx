import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Header from "../header/Header";
import Home from "../home/Home";
import Portfolio from "../portfolio/Portfolio";
import Stats from "../stats/Stats";
import './App.css';

function App() {
  return (
    <>
      <div className="app">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
