import React from 'react';
import './Common.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary flex-column" style={{ height: '100vh' }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Brand</a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav flex-column">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Dashboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Games</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Settings</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
