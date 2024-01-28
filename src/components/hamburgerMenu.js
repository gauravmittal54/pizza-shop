// HamburgerMenu.js
import React, { useRef, useEffect } from 'react';

const HamburgerMenu = ({ isMenuOpen, setMenuOpen }) => {
  const menuRef = useRef(null);

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!isMenuOpen)} ref={menuRef}>
      ☰
    </div>
  );
};

export default HamburgerMenu;
