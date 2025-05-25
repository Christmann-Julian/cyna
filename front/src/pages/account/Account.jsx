import React from "react";
import InfoAccount from "../../components/account/InfoAccount";
import AccountLayout from "./AccountLayout";
import ListAddress from "../../components/ListAddress";
import { useTranslation } from "react-i18next";
import ListPaymentMethod from "../../components/ListPaymentMethod";

const Account = () => {
  const { t } = useTranslation();
  return (
    <AccountLayout>
      <div className="shop login" style={{ padding: 0 }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2>{t("infoAccount.title")}</h2>
            </div>
          </div>
          <InfoAccount />
          <div className="row mt-5 mb-4">
            <div className="col-12">
              <h2>{t("infoAccount.addressTitle")}</h2>
            </div>
          </div>
          <ListAddress />
          <div className="row mt-5 mb-4">
            <div className="col-12">
              <h2>{t("infoAccount.paymentMethodTitle")}</h2>
            </div>
          </div>
          <ListPaymentMethod />
        </div>
      </div>
    </AccountLayout>
  );
};

export default Account;
