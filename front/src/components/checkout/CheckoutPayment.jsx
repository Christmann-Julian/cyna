import React from "react";
import { useTranslation } from "react-i18next";
import { Accordion } from "react-bootstrap";

const CheckoutPayment = () => {
  const { t } = useTranslation();

  return (
    <div className="billing-details">
      <h3>{t("checkout.paymentTitle")}</h3>
      <Accordion defaultActiveKey="Accordion">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Accordion Item #1</Accordion.Header>
          <Accordion.Body>
            <form>
              <div className="form-group">
                <label>{t("checkout.firstname")}</label>
                <input
                  type="text"
                  placeholder={t("checkout.firstnameExample")}
                />
              </div>
              <div className="form-group">
                <label>{t("checkout.lastname")}</label>
                <input
                  type="text"
                  placeholder={t("checkout.lastnameExample")}
                />
              </div>
              <div className="form-group">
                <label>{t("checkout.adress1")}</label>
                <input type="text" placeholder={t("checkout.adress1Example")} />
              </div>
              <div className="form-group">
                <label>{t("checkout.adress2")}</label>
                <input type="text" placeholder={t("checkout.adress2Example")} />
              </div>
              <div className="form-group">
                <label>{t("checkout.city")}</label>
                <input type="text" placeholder={t("checkout.cityExample")} />
              </div>
              <div className="form-group">
                <label>{t("checkout.county")}</label>
                <input type="text" placeholder={t("checkout.countyExample")} />
              </div>
              <div className="form-group">
                <label>{t("checkout.postalCode")}</label>
                <input
                  type="text"
                  placeholder={t("checkout.postalCodeExample")}
                />
              </div>
              <div className="form-group">
                <label>{t("checkout.country")}</label>
                <input type="text" placeholder={t("checkout.countryExample")} />
              </div>
              <div className="form-group">
                <label>{t("checkout.phone")}</label>
                <input type="text" placeholder={t("checkout.phoneExample")} />
              </div>
            </form>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Accordion Item #2</Accordion.Header>
          <Accordion.Body>
            <form>
              <div className="form-group">
                <label>{t("checkout.firstname")}</label>
                <input
                  type="text"
                  placeholder={t("checkout.firstnameExample")}
                />
              </div>
              <div className="form-group">
                <label>{t("checkout.lastname")}</label>
                <input
                  type="text"
                  placeholder={t("checkout.lastnameExample")}
                />
              </div>
              <div className="form-group">
                <label>{t("checkout.adress1")}</label>
                <input type="text" placeholder={t("checkout.adress1Example")} />
              </div>
              <div className="form-group">
                <label>{t("checkout.adress2")}</label>
                <input type="text" placeholder={t("checkout.adress2Example")} />
              </div>
              <div className="form-group">
                <label>{t("checkout.city")}</label>
                <input type="text" placeholder={t("checkout.cityExample")} />
              </div>
              <div className="form-group">
                <label>{t("checkout.county")}</label>
                <input type="text" placeholder={t("checkout.countyExample")} />
              </div>
              <div className="form-group">
                <label>{t("checkout.postalCode")}</label>
                <input
                  type="text"
                  placeholder={t("checkout.postalCodeExample")}
                />
              </div>
              <div className="form-group">
                <label>{t("checkout.country")}</label>
                <input type="text" placeholder={t("checkout.countryExample")} />
              </div>
              <div className="form-group">
                <label>{t("checkout.phone")}</label>
                <input type="text" placeholder={t("checkout.phoneExample")} />
              </div>
            </form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-add">{t("checkout.paymentAdd")}</button>
      </div>
    </div>
  );
};

export default CheckoutPayment;
