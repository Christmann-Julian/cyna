import React from "react";
import "../assets/css/footer.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faXTwitter,
  faLinkedin
} from "@fortawesome/free-brands-svg-icons";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer>
      <div className="social">
        <a href="#">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faXTwitter} />
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
      </div>
      <ul className="list-inline">
        <li className="list-inline-item">
          <Link to="/cgu">{t("footer.terms-condition")}</Link>
        </li>
        <li className="list-inline-item">
          <Link to="/legal-notice">{t("footer.legal-notices")}</Link>
        </li>
        <li className="list-inline-item">
          <Link to="/contact">{t("footer.contact")}</Link>
        </li>
      </ul>
      <p className="copyright">Copyright Cyna © 2024</p>
    </footer>
  );
};

export default Footer;
