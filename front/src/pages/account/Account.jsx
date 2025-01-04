import React from "react";
import InfoAccount from "../../components/account/InfoAccount";
import AccountLayout from "./AccountLayout";

const Account = () => {
  return (
    <AccountLayout>
      <div className="shop login" style={{ padding: 0 }}>
        <div className="container">
          <InfoAccount />
        </div>
      </div>
    </AccountLayout>
  );
};

export default Account;