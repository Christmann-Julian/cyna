import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import userLogo from "../../assets/img/user.png";
import "../../assets/css/account.css";
import { Link, useLocation } from "react-router-dom";
import authProvider from "../../utils/authProvider";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

const AccountLayout = ({ children }) => {
  const { t } = useTranslation();
  const [roles, setRoles] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const location = useLocation();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token !== null) {
      const decodedToken = jwtDecode(token);
      setRoles(decodedToken.roles);
    }
    authProvider.getUserInfo(token).then(setUserInfo).catch(console.error);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <Navbar />
      <div className="container mb-4 account-container">
        <div className="row account-row">
          <div className="col-lg-4 pb-5">
            <div className="account-card pb-1">
              <div className="account-card-profile">
                <div className="account-card-avatar">
                  <img src={userLogo} alt="user image" />
                </div>
                {userInfo ? (
                  <div className="account-card-details">
                    <h5 className="account-card-name text-lg">{userInfo.firstname + " " + userInfo.lastname}</h5>
                    <span className="account-card-position">{userInfo.email}</span>
                  </div>
                ) : (
                  <div className="account-card-details">
                    <div className="loading-bar" style={{backgroundColor: '#e3e3e3', width: '100px', height: '20px', marginBottom: '5px'}}></div>
                    <div className="loading-bar" style={{backgroundColor: '#e3e3e3', width: '100px', height: '10px'}}></div>
                  </div>
                )}
              </div>
            </div>
            <div className="wizard">
              <nav className="list-group list-group-flush">
                <Link className={`list-group-item ${isActive("/account") ? "active" : ""}`} to="/account">
                    {t("navbar.infoAccount")}
                </Link>
                <Link className={`list-group-item ${isActive("/account/order") ? "active" : ""}`} to="/account/order">
                  {t("navbar.orderAccount")}
                </Link>
                {roles.includes("ROLE_ADMIN") && (
                  <Link className="list-group-item" to="/admin">Admin Panel</Link>
                )}
              </nav>
            </div>
          </div>
          <div className="col-lg-8 pb-5">
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AccountLayout;