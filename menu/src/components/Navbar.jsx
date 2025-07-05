import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav>
      {/* Logo */}
      <div className="navbar-logo">
        The Solitaire
      </div>

      
      <div className="nav-links">
        <Link to='/'>Home</Link>
        <Link to="/order">Orders</Link>
      <Link to='/addfood'>Menu</Link>
       <Link to='/about'>About</Link>
        <Link to='/career'>Career</Link>
       
      </div>

     
     
      

     
    </nav>
  );
};

export default Navbar;