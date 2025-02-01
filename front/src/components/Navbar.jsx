import React, { useState, useEffect } from "react";
import "../assets/css/navbar.css";
import logo from "../assets/img/logo-cyna.webp";
import { Link, useLocation, useNavigate } from "react-router-dom";
import languages, {
  getCurrentLanguage,
  getCurrentLanguageCode,
  getCurrentLocale,
} from "../utils/language";
import Dropdown from "react-bootstrap/Dropdown";
import {
  Navbar as BoostrapNavbar,
  Container,
  Nav,
  Form,
  InputGroup,
  Button,
  Badge,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faGlobe,
  faUser,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import authProvider from "../utils/authProvider";
import apiRequest from "../utils/apiRequest";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isAuth, setIsAuth] = useState(null);
  const [categories, setCategories] = useState(null);
  const { t } = useTranslation();
  const currentLanguage = getCurrentLanguage();
  const currentLocale = getCurrentLocale();
  const location = useLocation();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const fetchCategories = async () => {
    const { data, error: errorCode } = await apiRequest(
      `/${currentLocale}/categories`,
      "GET",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (errorCode) {
      setCategories(null);
    } else {
      setCategories(data);
    }
  };

  useEffect(() => {
    const isAuth = async () => {
      const authStatus = await authProvider.isAuthenticated();
      setIsAuth(authStatus);
    };

    isAuth();
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [currentLocale]);

  useEffect(() => {
    document.documentElement.lang = getCurrentLanguageCode();
    document.documentElement.dir = currentLanguage.dir || "ltr";
  }, [currentLanguage, t]);

  const handleLogout = () => {
    authProvider.logout();
    setIsAuth(false);
    if (location.pathname.includes("account") || location.pathname.includes("order")) {
      navigate("/login");
    }
  };

  return (
    <header className="header shop">
      <BoostrapNavbar bg="light" expand="lg" className="border-bottom">
        <Container>
          <BoostrapNavbar.Brand>
            <Link to="/">
              <img src={logo} alt="Logo" height="30" />
            </Link>
          </BoostrapNavbar.Brand>

          <div className="top-bar-mobile">
            <Dropdown className="d-inline-block me-2">
              <Dropdown.Toggle variant="link" className="nav-link">
                <FontAwesomeIcon icon={faGlobe} /> {currentLocale.slice(-2)}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {languages.map(({ code, name, country_code }) => (
                  <Dropdown.Item
                    key={country_code}
                    href="#"
                    onClick={() => {
                      i18next.changeLanguage(code);
                    }}
                    className="me-2"
                  >
                    <span className={`fi fi-${country_code} mx-2`}></span>
                    {name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown className="d-inline-block">
              <Dropdown.Toggle variant="link" className="nav-link">
                EUR €
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {["EUR €"].map((currency) => (
                  <Dropdown.Item key={currency} as="button">
                    {currency}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Container>
      </BoostrapNavbar>

      <BoostrapNavbar expand="lg" className="py-3 navbar-color">
        <Container>
          <div className="navbar-mobile-top d-flex d-lg-none w-100">
            <BoostrapNavbar.Toggle aria-controls="navbarMain" />
            <div className="mobile-search-container">
              <Form className="d-flex">
                <InputGroup>
                  <Form.Control
                    type="search"
                    placeholder={t("navbar.input-search")}
                  />
                  <Button variant="light">
                    <FontAwesomeIcon icon={faSearch} />
                  </Button>
                </InputGroup>
              </Form>
            </div>
          </div>

          <BoostrapNavbar.Collapse id="navbarMain">
            <Nav className="me-auto mb-2 mb-lg-0 d-lg-flex align-items-lg-center">
              <Link to="/" className="nav-link text-white d-flex align-items-center">
                <span>{t("navbar.home")}</span>
              </Link>
              <Dropdown>
                <Dropdown.Toggle variant="link" className="nav-link text-white">
                  {t("navbar.categories")}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {categories === null ? (
                    <Link
                      to="#"
                      className="dropdown-item"
                      role="button"
                      disabled
                    >
                      {t("navbar.no-categories")}
                    </Link>
                  ) : (
                    <>
                      {categories.map((category) => (
                        <Link
                          key={category.id}
                          className="dropdown-item"
                          to={`/category/${category.id}`}
                          role="button"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </>
                  )}
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle variant="link" className="nav-link text-white">
                  {t("navbar.cyna")}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Link to="/about" className="dropdown-item" role="button">
                      {t("navbar.about")}
                    </Link>
                    <Link
                      to="/cgu"
                      className="dropdown-item"
                      role="button"
                    >
                      {t("navbar.terms-condition")}
                    </Link>
                    <Link
                      to="/legal-notice"
                      className="dropdown-item"
                      role="button"
                    >
                      {t("navbar.legal-notices")}
                    </Link>
                    <Link to="/contact" className="dropdown-item" role="button">
                      {t("navbar.contact")}
                    </Link>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>

            <Form
              className="d-none d-lg-flex mx-auto"
              style={{ minWidth: "40%" }}
            >
              <InputGroup>
                <Form.Control
                  type="search"
                  placeholder={t("navbar.input-search")}
                />
                <Button variant="light">
                  <FontAwesomeIcon icon={faSearch} />
                </Button>
              </InputGroup>
            </Form>

            <Nav className="ms-auto d-lg-flex align-items-lg-center">
              <Dropdown>
                <Dropdown.Toggle
                  variant="link"
                  className="nav-link text-white d-flex align-items-center"
                >
                  <FontAwesomeIcon icon={faUser} className="me-2" />
                  <span>{t("navbar.account")}</span>
                </Dropdown.Toggle>
                {isAuth ? (
                  <Dropdown.Menu align="end">
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
                    <Dropdown.Divider />
                    <Link
                      to="#"
                      className="dropdown-item"
                      role="button"
                      onClick={handleLogout}
                    >
                      {t("navbar.logout")}
                    </Link>
                  </Dropdown.Menu>
                ) : (
                  <Dropdown.Menu align="end">
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
              <Link to="/cart" className="nav-link text-white d-flex align-items-center">
                <FontAwesomeIcon icon={faCartShopping} className="me-2" />
                <span>{t("navbar.cart")}</span>
                <Badge bg="light" text="dark" pill className="ms-2">
                  {cart.totalQuantity}
                </Badge>
              </Link>
            </Nav>
          </BoostrapNavbar.Collapse>
        </Container>
      </BoostrapNavbar>
    </header>
  );
};

export default Navbar;
