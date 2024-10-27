import { useRouteError } from "react-router-dom";
import '../assets/css/errors.css';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ErrorPage = () => {
  const error = useRouteError();
  const { t } = useTranslation();

  return (
    <section className="error-page">
      <div className="table">
        <div className="table-cell">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 offset-lg-3 col-12">
                <div className="error-inner">
                  <h2>404</h2>
                  <h5>{t("error-page.error-404.title")}</h5>
                  <p>{t("error-page.error-404.message")}</p>
                  <div className="button">
                    <Link to="/" className="btn">{t("error-page.error-404.button")}</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ErrorPage;
