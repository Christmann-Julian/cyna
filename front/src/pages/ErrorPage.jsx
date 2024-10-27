import { useRouteError } from "react-router-dom";
import '../assets/css/errors.css';
import { Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <section className="error-page">
      <div className="table">
        <div className="table-cell">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 offset-lg-3 col-12">
                <div className="error-inner">
                  <h2>404</h2>
                  <h5>Cette page est introuvable</h5>
                  <p>
                    Oups ! La page que vous recherchez n'existe pas. Elle a
                    peut-être été déplacée ou supprimée.
                  </p>
                  <div className="button">
                    <Link to="/" className="btn">Retourner à l'accueil</Link>
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
