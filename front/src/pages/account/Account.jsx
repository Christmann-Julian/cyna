import React from "react";
import InfoAccount from "../../components/account/InfoAccount";
import AccountLayout from "./AccountLayout";
import ListAddress from "../../components/ListAddress";
import { useTranslation } from "react-i18next";

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
          <div className="row mt-4 mb-4">
            <div className="col-12">
              <h2>{t("checkout.addressTitle")}</h2>
            </div>
          </div>
          <ListAddress />
        </div>
      </div>
    </AccountLayout>
  );
};

export default Account;
