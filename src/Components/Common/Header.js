import React from 'react';
import './Common.css';

const Header = () => {
  return (
    <header className="header bg-light p-3">
      <div className="container-fluid">
        <input type="text" className="form-control" placeholder="Search..." />
      </div>
    </header>
  );
};

export default Header;
