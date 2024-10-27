import React, { useState } from "react";
import "../assets/css/navbar.css";
import logo from "../assets/img/logo-cyna.webp";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCartShopping,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <header className="header shop">
        <nav className="middle-inner">
          <div className="container">
            <div className="row">
              <div className="col-lg-2 col-md-2 col-6">
                <div className="logo">
                  <Link to="/" href="index.html">
                    <img src={logo} alt="logo" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-8 col-md-7 search-desktop">
                <div className="search-bar-top">
                  <div className="search-bar">
                    <form>
                      <input
                        name="search"
                        placeholder="Recherche..."
                        type="search"
                      />
                      <button className="btnn">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-3 col-6">
                <div className="right-bar">
                  <div className="sinlge-bar shopping">
                    <Link to="/cart" className="single-icon">
                      <FontAwesomeIcon icon={faCartShopping} />{" "}
                      <span className="total-count">2</span>
                    </Link>
                  </div>
                  <div className="sinlge-bar" aria-label="Toggle navigation">
                    <a className="single-icon" onClick={handleToggle}>
                      <FontAwesomeIcon icon={faBars} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row search-mobile">
              <div className="search-bar-top">
                <div className="search-bar">
                  <form>
                    <input
                      name="search"
                      placeholder="Recherche..."
                      type="search"
                    />
                    <button className="btnn">
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <nav
        className={`header-collapse collapse ${isCollapsed ? "" : "show"}`}
        id="navbarToggleExternalContent"
      >
        <div className="container">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Accueil
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button">
                Catégories
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Catégorie 1
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Catégorie 2
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
