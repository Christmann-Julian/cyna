import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../assets/css/account.css";
import "../../assets/css/forms.css";
import userLogo from "../../assets/img/user.png";
import { Link } from "react-router-dom";
import InfoAccount from "../../components/account/InfoAccount";
import useAuth from "../../hook/useAuth";

const Account = () => {
  const { authenticatedUser } = useAuth();

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
                <div className="account-card-details">
                  <h5 className="account-card-name text-lg">Daniel Adams</h5>
                  <span className="account-card-position">daniel@test.com</span>
                </div>
              </div>
            </div>
            <div className="wizard">
              <nav className="list-group list-group-flush">
                <Link className="list-group-item active" to="/account">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="d-inline-block font-weight-medium">
                        Mes informations
                      </div>
                    </div>
                  </div>
                </Link>
                <Link className="list-group-item" to="/account/order">
                  Mes commandes
                </Link>
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
