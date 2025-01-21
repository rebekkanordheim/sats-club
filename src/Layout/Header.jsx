import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import Logo from "../images/SatsLogo.jpg";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="SATS Clubs Logo" className="logo-image" />
        </Link>
      </div>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/cluboverview">Club Overview</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;