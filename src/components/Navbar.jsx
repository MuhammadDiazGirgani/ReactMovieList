// src/components/Navbar.jsx
import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-transparent position-fixed w-100" style={{ zIndex: 1000 }}>
      <div className="container-fluid">
        <a className="navbar-brand text-white" href="/">Netflix</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active text-white" aria-current="page" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/">Link</a>
            </li>
          </ul>
          <button className="btn btn-outline-danger" type="submit">Login</button>
            <button className="btn btn-outline-danger" type="submit">Register</button>
  </div>
      </div>
    </nav>
  );
};

export default Navbar;
