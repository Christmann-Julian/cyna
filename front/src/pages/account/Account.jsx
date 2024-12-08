import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../assets/css/account.css";
import "../../assets/css/forms.css";
import userLogo from "../../assets/img/user.png";
import { Link } from "react-router-dom";
import InfoAccount from "../../components/account/InfoAccount";
import authProvider from "../../utils/authProvider";
import { useTranslation } from "react-i18next";

const Account = () => {
  const { t } = useTranslation();
  const [roles, setRoles] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    authProvider.getPermissions().then(setRoles).catch(console.error);
    authProvider.getUserInfo().then(setUserInfo).catch(console.error);
  }, []);

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
                <Link className="list-group-item active" to="/account">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="d-inline-block font-weight-medium">
                        {t("navbar.infoAccount")}
                      </div>
                    </div>
                  </div>
                </Link>
                <Link className="list-group-item" to="/account/order">
                  {t("navbar.orderAccount")}
                </Link>
                {roles.includes("ROLE_ADMIN") && (
                  <Link className="list-group-item" to="/admin">Admin Panel</Link>
                )}
              </nav>
            </div>
          </div>
          <div className="col-lg-8 pb-5 shop login" style={{ padding: 0 }}>
            <div className="container">
              <InfoAccount />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Account;
