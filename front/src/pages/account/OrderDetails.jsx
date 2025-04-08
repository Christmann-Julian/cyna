import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiRequest from "../../utils/apiRequest";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useSelector } from "react-redux";
import Loading from "../Loading";
import { useTranslation } from "react-i18next";
import "../../assets/css/order-details.css";
import { formatPrice, formatDate } from "../../utils/utils";
import { getCurrentLocale } from "../../utils/language";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const { t } = useTranslation();
  const currentLocale = getCurrentLocale();

  const statusTranslations = {
    paid: t("orderDetails.statusPaid"),
    active: t("orderDetails.statusActive"),
    terminated: t("orderDetails.statusTerminated"),
    renewed: t("orderDetails.statusRenewed"),
  };

  useEffect(() => {
    async function fetchOrderDetails() {
      const { data, error } = await apiRequest(`/orders/${id}`, "GET", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (error) {
        setError(error);
      } else {
        setOrder(data);
      }
    }
    fetchOrderDetails();
  }, [id]);

  const handleDownloadInvoice = async () => {
    setIsDownloading(true);
    try {
      const response = await apiRequest(`/order/${currentLocale}/${id}/download`, "GET", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      });
  
      if (response.error) {
        throw new Error("Failed to download the invoice");
      }
  
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice_${order.reference}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Error downloading the invoice:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  if (error) {
    return <div>Error : {error}</div>;
  }

  if (!order) {
    return <Loading />;
  }

  return (
    <>
        <Navbar />
        <div className="container mt-5 order-details-container">
          <h1 className="mb-4">{t("orderDetails.title")}</h1>
          <p><strong>{t("orderDetails.reference")}</strong> {order.reference}</p>
          <p><strong>{t("orderDetails.status")}</strong> {statusTranslations[order.status] || order.status}</p>
          <p><strong>{t("orderDetails.date")}</strong> {formatDate(new Date(order.date)) || "Non spécifiée"}</p>
          <p><strong>{t("orderDetails.paymentMethod")}</strong> {order.paymentMethod?.last4 ? `**** **** **** ${order.paymentMethod.last4}` : t("orderDetails.noPaymentMethod")}</p>
          <p><strong>{t("orderDetails.address")}</strong> {order.address}</p>

          <h1 className="mt-4 mb-4">{t("orderDetails.services")}</h1>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>{t("orderDetails.lineProductName")}</th>
                <th>{t("orderDetails.lineQuantity")}</th>
                <th>{t("orderDetails.linePrice")}</th>
                <th>{t("orderDetails.linePromotionPrice")}</th>
              </tr>
            </thead>
            <tbody>
              {order.orderLines.map((line, index) => (
                <tr key={index}>
                  <td>{line.name}</td>
                  <td>{line.quantity}</td>
                  <td>{formatPrice(line.price)}</td>
                  <td>{line.promotionPrice ? formatPrice(line.promotionPrice) : t("orderDetails.lineNoPromotion")}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4">
            <p><strong>{t("orderDetails.total")}</strong> {formatPrice(order.total)}</p>
            <p><strong>{t("orderDetails.promotion")}</strong> {order.promotion ? formatPrice(order.promotion) : t("orderDetails.noPromotion")}</p>
          </div>

          <button 
            onClick={handleDownloadInvoice} 
            className="btn btn-primary mt-3 mb-2"
            disabled={isDownloading}
          >
            {isDownloading ? t("orderDetails.downloadProgress") : t("orderDetails.download")}
          </button>
        </div>
        <Footer />
    </>
  );
}

export default OrderDetails;