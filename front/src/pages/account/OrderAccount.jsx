import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import userLogo from "../../assets/img/user.png";
import "../../assets/css/account.css";
import { Link } from "react-router-dom";
import useAuth from "../../hook/useAuth";

const OrderAccount = () => {
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
                <Link className="list-group-item" to="/account">
                  Mes informations
                </Link>
                <Link className="list-group-item active" to="/account/order">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="d-inline-block font-weight-medium">
                        Mes commandes
                      </div>
                    </div>
                  </div>
                </Link>
              </nav>
            </div>
          </div>
          <div className="col-lg-8 pb-5">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>Commande #</th>
                    <th>Date d'achat</th>
                    <th>Statut</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Link className="navi-link" to="/account/order/id">
                        78A643CD409
                      </Link>
                    </td>
                    <td>01/01/2024</td>
                    <td>
                      <span className="badge text-bg-danger m-0">Fini</span>
                    </td>
                    <td>
                      <span>50,00€</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Link className="navi-link" to="/account/order/id">
                        78A643CD409
                      </Link>
                    </td>
                    <td>01/01/2024</td>
                    <td>
                      <span className="badge text-bg-primary m-0">payé</span>
                    </td>
                    <td>50,00€</td>
                  </tr>
                  <tr>
                    <td>
                      <Link className="navi-link" to="/account/order/id">
                        78A643CD409
                      </Link>
                    </td>
                    <td>01/01/2024</td>
                    <td>
                      <span className="badge text-bg-primary m-0">payé</span>
                    </td>
                    <td>50,00€</td>
                  </tr>
                  <tr>
                    <td>
                      <Link className="navi-link" to="/account/order/id">
                        78A643CD409
                      </Link>
                    </td>
                    <td>01/01/2024</td>
                    <td>
                      <span className="badge text-bg-success m-0">
                        En cours
                      </span>
                    </td>
                    <td>50,00€</td>
                  </tr>
                  <tr>
                    <td>
                      <Link className="navi-link" to="/account/order/id">
                        78A643CD409
                      </Link>
                    </td>
                    <td>01/01/2024</td>
                    <td>
                      <span className="badge text-bg-success m-0">
                        En cours
                      </span>
                    </td>
                    <td>50,00€</td>
                  </tr>
                  <tr>
                    <td>
                      <Link className="navi-link" to="/account/order/id">
                        78A643CD409
                      </Link>
                    </td>
                    <td>01/01/2024</td>
                    <td>
                      <span className="badge text-bg-success m-0">
                        En cours
                      </span>
                    </td>
                    <td>50,00€</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderAccount;
