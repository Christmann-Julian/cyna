import React, { useState, useEffect } from "react";
import "../assets/css/navbar.css";
import logo from "../assets/img/logo-cyna.webp";
import { Link, useLocation, useNavigate } from "react-router-dom";
import languages, { getCurrentLanguage, getCurrentLanguageCode } from "../utils/language";
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCartShopping,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import authProvider from "../utils/authProvider";

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isAuth, setIsAuth] = useState(null);
  const { t } = useTranslation();
  const currentLanguage = getCurrentLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = async () => {
      const authStatus = await authProvider.isAuthenticated();
      setIsAuth(authStatus);
    };

    isAuth();
  }, []);

  useEffect(() => {
    document.documentElement.lang = getCurrentLanguageCode();
    document.documentElement.dir = currentLanguage.dir || "ltr";
  }, [currentLanguage, t]);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    authProvider.logout();
    setIsAuth(false);
    if (location.pathname.includes('account')) {
      navigate('/login');
    }
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
                        placeholder={t("navbar.input-search")}
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
                      placeholder={t("navbar.input-search")}
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
                {t("navbar.home")}
              </Link>
            </li>
            <li className="nav-item">
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                  {t("navbar.account")}
                </Dropdown.Toggle>
                {isAuth ? (
                  <Dropdown.Menu>
                    <Link to="/account" className="dropdown-item" role="button">
                      {t("navbar.infoAccount")}
                    </Link>
                    <Link
                      to="/account/order"
                      className="dropdown-item"
                      role="button"
                    >
                      {t("navbar.orderAccount")}
                    </Link>
                  </Dropdown.Menu>
                ) : (
                  <Dropdown.Menu>
                    <Link to="/login" className="dropdown-item" role="button">
                      {t("navbar.login")}
                    </Link>
                    <Link
                      to="/register"
                      className="dropdown-item"
                      role="button"
                    >
                      {t("navbar.register")}
                    </Link>
                  </Dropdown.Menu>
                )}
              </Dropdown>
            </li>
            <li className="nav-item">
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                  {t("navbar.languages")}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {languages.map(({ code, name, country_code }) => (
                    <Dropdown.Item
                      key={country_code}
                      href="#"
                      onClick={() => {
                        i18next.changeLanguage(code);
                      }}
                    >
                      <span className={`fi fi-${country_code} mx-2`}></span>
                      {name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li className="nav-item">
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                  {t("navbar.categories")}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Link to="/" className="dropdown-item" role="button">
                    Catégorie 1
                  </Link>
                  <Link to="/" className="dropdown-item" role="button">
                    Catégorie 2
                  </Link>
                  <Link to="/" className="dropdown-item" role="button">
                    Catégorie 3
                  </Link>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li className="nav-item">
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                  {t("navbar.cyna")}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Link to="/about" className="dropdown-item" role="button">
                    {t("navbar.about")}
                  </Link>
                  <Link to="/terms-condition" className="dropdown-item" role="button">
                    {t("navbar.terms-condition")}
                  </Link>
                  <Link to="/legal-notice" className="dropdown-item" role="button">
                    {t("navbar.legal-notices")}
                  </Link>
                  <Link to="/contact" className="dropdown-item" role="button">
                    {t("navbar.contact")}
                  </Link>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            {isAuth && (
              <li className="nav-item">
                <a href="#" className="nav-link" onClick={handleLogout}>
                  {t("navbar.logout")}
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
