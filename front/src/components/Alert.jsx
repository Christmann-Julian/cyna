import React, { useState, useEffect } from 'react';

const Alert = ({ message, type }) => {
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (message && type) {
      setAlert({ message, type });

      const timer = setTimeout(() => {
        setAlert(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message, type]);

  const handleAlertClose = () => {
    setAlert(null);
  };

  return (
    <>
      {alert && (
        <div className={`alert alert-${alert.type} alert-dismissible`} role="alert">
          <div>{alert.message}</div>
          <button
            type="button"
            className="btn-close"
            onClick={handleAlertClose}
            aria-label="Close"
          ></button>
        </div>
      )}
    </>
  );
};

export default Alert;
