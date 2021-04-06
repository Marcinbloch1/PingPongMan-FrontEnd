import React, { useState } from "react";
import { Button } from "../Buttons/Button";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Dropdown from "./Dropdown";
import Dropdown_1 from "./Dropdown_admin";

function Navbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const [dropdown, setDropdown] = useState(false);
  const [dropdown_1, setDropdown_1] = useState(false);
  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  const onMouseEnter_1 = () => {
    if (window.innerWidth < 960) {
      setDropdown_1(false);
    } else {
      setDropdown_1(true);
    }
  };
  const onMouseLeave_1 = () => {
    if (window.innerWidth < 960) {
      setDropdown_1(false);
    } else {
      setDropdown_1(false);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        PINGLARZ
      </Link>
      <div className="menu-icon" onClick={handleClick}>
        <i className={click ? "fas fa-times" : "fas fa-bars"} />
      </div>
      <ul className={click ? "nav-menu active" : "nav-menu"}>
        <li className="nav-item">
          <Link to="/" className="nav-links" onClick={closeMobileMenu}>
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/price-list" className="nav-links">
            Price list
          </Link>
        </li>

        <li className="nav-item2">
          <Link to="/reservation" className="nav-links">
            Pick table
          </Link>
        </li>

        <li
          className="nav-item"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <Link
            to="/user-account"
            className="nav-links"
            onClick={closeMobileMenu}
          >
            Account <i className="fas fa-caret-down" />
          </Link>
          {dropdown && <Dropdown />}
        </li>

        {/* <li
          className="nav-item"
          onMouseEnter={onMouseEnter_1}
          onMouseLeave={onMouseLeave_1}
        >
          <Link
            to="/admin-verification"
            className="nav-links"
            onClick={closeMobileMenu}
          >
            Admin page <i className="fas fa-caret-down" />
          </Link>
          {dropdown_1 && <Dropdown_1 />}
        </li> */}

        <li className="nav-item">
          <Link
            to="/admin-verification"
            className="nav-links"
            onClick={closeMobileMenu}
          >
            Admin page
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to="/sign-in"
            className="nav-links-mobile"
            onClick={closeMobileMenu}
          >
            Sign in
          </Link>
        </li>
      </ul>
      <Button link="/sign-in" className="btn" value="Sign in" />
    </nav>
  );
}

export default Navbar;
