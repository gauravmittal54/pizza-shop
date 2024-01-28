// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './index.css';
import HamburgerMenu from './components/hamburgerMenu';
import OrderForm from './components/OrderPlaced';
import Home from './components/Home'
import TrackOrder from './components/TrackOder';

function App() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
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

        <Route path="/" exact component={Home} />
        <Route path="/place-order" component={OrderForm} />
        <Route path="/track-order" component={TrackOrder} />
      </div>
    </Router>
  );
}

export default App;
