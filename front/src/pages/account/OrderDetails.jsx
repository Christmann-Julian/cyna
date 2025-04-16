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
import { Modal, Button } from "react-bootstrap";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const { t } = useTranslation();
  const currentLocale = getCurrentLocale();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

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

  const handleCancelSubscription = async () => {
    setIsCancelling(true);
    try {
      const response = await apiRequest(`/order/subscription/cancel`, "POST", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ orderId: id }),
      });

      if (response.error) {
        throw new Error(response.error);
      }

      setOrder((prevOrder) => ({ ...prevOrder, status: "terminated" }));
      setShowCancelModal(false);
    } catch (error) {
      console.error("Error cancelling subscription:", error);
    } finally {
      setIsCancelling(false);
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
                <th>
                {order.reference.startsWith("sub")
                  ? t("orderDetails.duration")
                  : t("orderDetails.lineQuantity")}
                </th>
                <th>{t("orderDetails.linePrice")}</th>
                <th>{t("orderDetails.linePromotionPrice")}</th>
              </tr>
            </thead>
            <tbody>
              {order.orderLines.map((line, index) => (
                <tr key={index}>
                  <td>{line.name}</td>
                  <td>{line.quantity}{order.reference.startsWith("sub") && " " + t('orderDetails.month')}</td>
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
            className="btn btn-primary mt-3 mb-2 me-2"
            disabled={isDownloading}
          >
            {isDownloading ? t("orderDetails.downloadProgress") : t("orderDetails.download")}
          </button>

          {order.reference.startsWith("sub") && order.status === "active" && (
            <>
              <button
                onClick={() => setShowCancelModal(true)}
                className="btn btn-danger mt-3 mb-2"
              >
                {t("orderDetails.cancelSubscription")}
              </button>

              <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>{t("orderDetails.modal.title")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {t("orderDetails.modal.body")}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
                    {t("orderDetails.modal.close")}
                  </Button>
                  <Button
                    variant="danger"
                    onClick={handleCancelSubscription}
                    disabled={isCancelling}
                  >
                    {isCancelling ? t("orderDetails.modal.cancelling") : t("orderDetails.modal.confirm")}
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          )}
        </div>
        <Footer />
    </>
  );
}

export default OrderDetails;