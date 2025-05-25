import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import apiRequest from "../utils/apiRequest";
import LoadingSpinner from "./LoadingSpinner";
import AddressUpdateForm from "./AddressUpdateForm";
import { useSelector } from "react-redux";

const ListAddress = () => {
  const { t } = useTranslation();
  const [addresses, setAddresses] = useState([]);
  const [fetchAddressesLoading, setFetchAddressesLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    setFetchAddressesLoading(true);

    const fetchAddresses = async () => {
      try {
        const { data, error } = await apiRequest("/user/addresses", "GET", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (data !== null) {
          setAddresses(data);
          setFetchAddressesLoading(false);
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
        setFetchAddressesLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  return (
    <>
      {fetchAddressesLoading ? (
        <LoadingSpinner height={"100px"} />
      ) : (
        <>
          {addresses.length === 0 ? (
            <div className="d-flex justify-content-center">
              {t("address.noAddress")}
            </div>
          ) : (
            <Accordion defaultActiveKey="Accordion">
              {addresses.map((address, index) => (
                <Accordion.Item eventKey={index} key={index}>
                  <Accordion.Header>
                    {t("address.name")} {index + 1}
                  </Accordion.Header>
                  <Accordion.Body>
                    <AddressUpdateForm address={address} />
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          )}
          <div className="d-flex justify-content-center mt-4">
            <Link to="/account/address" className="btn btn-add">
              {t("address.add")}
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default ListAddress;
