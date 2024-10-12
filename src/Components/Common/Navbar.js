import React from 'react';
import { Link } from 'react-router-dom';
import './Common.css';

const Navbar = () => {
  return (
    <nav className="custom-navbar">
      <ul className="navbar-nav">
        <li className='nav-item'>
          <Link to="/" className="navbar-brand nav-title" href="#">OSS Team Project</Link>
        </li>
        <div className='nav-content'>
          <li className="nav-item"> 
            <Link className="nav-link" to="create-game">Create Game</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="view-table">View Table</Link>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
