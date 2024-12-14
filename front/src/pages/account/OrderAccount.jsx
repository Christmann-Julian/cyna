import React from "react";
import { Link } from "react-router-dom";
import AccountLayout from "./AccountLayout";

const OrderAccount = () => {
  return (
    <AccountLayout>
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
    </AccountLayout>
  );
};

export default OrderAccount;