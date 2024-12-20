import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiRequest from "../utils/apiRequest";
import Loading from "./Loading";

const ConfirmEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const confirmEmail = async () => {
      const { data, error: errorConfirm } = await apiRequest(`/confirm-email`, "POST",
        {
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            "email_token": token,
          },
        }
      );

      if (errorConfirm) {
        navigate("/login");
      } else {
        localStorage.setItem("token", data.token);
        navigate("/account");
      }
    };

    confirmEmail();
  }, [token]);

  return <Loading />;
};

export default ConfirmEmail;
