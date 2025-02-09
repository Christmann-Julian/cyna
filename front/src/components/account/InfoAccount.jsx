import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import apiRequest from "../../utils/apiRequest";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import authProvider from "../../utils/authProvider";
import Alert from "../Alert";
import LoadingSpinner from "../LoadingSpinner";
import { useSelector } from "react-redux";

const InfoAccount = () => {
  const [loading, setLoading] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState({ message: "", type: "" });
  const { t } = useTranslation();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();

  const password = watch("password");

  useEffect(() => {
    let userId;
    if (token) {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.id;
    }

    const fetchUserData = async () => {
      setLoading(true);
      const { data, error } = await apiRequest(`/users/${userId}`, "GET", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);

      if (data) {
        setValue("lastname", data.lastname);
        setValue("firstname", data.firstname);
        setValue("email", data.email);
      } else if (error) {
        setErrorUpdate({
          message: t("infoAccount.errors.fetchError"),
          type: "danger",
        });
      }
    };

    fetchUserData();
  }, [setValue, t]);

  const onSubmit = async (formData) => {
    setLoading(true);
    let userId;
    let userEmail;

    if (token) {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.id;
      userEmail = decodedToken.username;
    }

    const body = {
      email: formData.email,
      firstname: formData.firstname,
      lastname: formData.lastname,
    };

    if (formData.email !== userEmail) {
      body.isEmailVerified = false;
    }

    if (formData.password) {
      body.plainPassword = formData.password;
    }

    const { error: errorUpdate } = await apiRequest(`/users/${userId}`, "PATCH", {
      headers: {
        "Content-Type": "application/merge-patch+json",
        Authorization: `Bearer ${token}`,
      },
      body,
    });

    if (formData.email !== userEmail) {
      authProvider.logout();
      navigate("/login");
    }

    setLoading(false);

    if (errorUpdate) {
      setErrorUpdate({
        message: t("infoAccount.errors.serverError"),
        type: "danger",
      });
    } else {
      setErrorUpdate({
        message: t("infoAccount.success"),
        type: "success",
      });
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="login-form">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>  
        <div className="row">
          <div className="col-12">
            <Alert
              message={errorUpdate.message}
              type={errorUpdate.type}
            />
            <div className="form-group">
              <label>
                {t("infoAccount.lastname")}<span>*</span>
              </label>
              <input
                {...register("lastname", {
                  required: t("infoAccount.errors.lastnameRequired"),
                  maxLength: {
                    value: 50,
                    message: t("infoAccount.errors.maxLength"),
                  },
                  minLength: {
                    value: 2,
                    message: t("infoAccount.errors.minLength"),
                  },
                })}
              />
              {errors.lastname && (
                <span className="text-danger">
                  {errors.lastname.message}
                </span>
              )}
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <label>
                {t("infoAccount.firstname")}<span>*</span>
              </label>
              <input
                {...register("firstname", {
                  required: t("infoAccount.errors.firstnameRequired"),
                  maxLength: {
                    value: 50,
                    message: t("infoAccount.errors.maxLength"),
                  },
                  minLength: {
                    value: 2,
                    message: t("infoAccount.errors.minLength"),
                  },
                })}
              />
              {errors.firstname && (
                <span className="text-danger">
                  {errors.firstname.message}
                </span>
              )}
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <label>
                {t("infoAccount.email")}<span>*</span>
              </label>
              <input
                {...register("email", {
                  required: t("infoAccount.errors.emailRequired"),
                  pattern: {
                    value:
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/,
                    message: t("infoAccount.errors.emailPattern"),
                  },
                })}
              />
              {errors.email && (
                <span className="text-danger">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <label>{t("infoAccount.password")}</label>
              <input
                type="password"
                {...register("password", {
                  maxLength: {
                    value: 255,
                    message: t("infoAccount.errors.passwordMaxLength"),
                  },
                  minLength: {
                    value: 8,
                    message: t("infoAccount.errors.passwordMinLength"),
                  },
                  pattern: {
                    value:
                      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                    message: t("infoAccount.errors.passwordPattern"),
                  },
                })}
              />
              {errors.password && (
                <span className="text-danger">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <label>{t("infoAccount.confirmPassword")}</label>
              <input
                type="password"
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === password ||
                    t("infoAccount.errors.passwordMustMatch"),
                })}
              />
              {errors.confirmPassword && (
                <span className="text-danger">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>
          <div className="col-12">
            <div className="form-group login-btn d-flex justify-content-center">
              <button className="btn" type="submit">
                {t("infoAccount.btnUpdate")}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InfoAccount;