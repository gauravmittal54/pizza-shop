import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './index.css';
import HamburgerMenu from './components/HamburgerMenu';
import OrderPlaced from './components/OrderPlaced';
import Home from './components/Home'
import TrackOrder from './components/TrackOder';

function App() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className={`app-container ${isMenuOpen ? 'menu-open' : ''}`}>
        <header>
          <nav>
            <HamburgerMenu isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
            <ul className={`menu ${isMenuOpen ? 'open' : ''}`}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/place-order">Place an order</Link>
              </li>
              <li>
                <Link to="/track-order">Track Order</Link>
              </li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/place-order" element={<OrderPlaced/>} />
          <Route path="/track-order" element={<TrackOrder/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
