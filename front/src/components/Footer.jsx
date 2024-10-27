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

const Footer = () => {
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
          <Link to="/">CGU</Link>
        </li>
        <li className="list-inline-item">
          <Link to="/">Mentions légales</Link>
        </li>
        <li className="list-inline-item">
          <Link to="/">Contact</Link>
        </li>
      </ul>
      <p className="copyright">Copyright Cyna © 2024</p>
    </footer>
  );
};

export default Footer;
