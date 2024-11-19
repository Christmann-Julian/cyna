import React from "react";

const InfoAccount = () => {
  return (
    <div className="login-form">
      <div className="row">
        <div className="col-12">
          <h2>Informations personnelles</h2>
        </div>
      </div>
      <form className="form">
        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <label>
                Votre nom<span>*</span>
              </label>
              <input />
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <label>
                Votre prénom<span>*</span>
              </label>
              <input />
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <label>
                Votre Email<span>*</span>
              </label>
              <input />
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <label>Votre Mot de passe</label>
              <input type="password" />
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <label>Confirmation de votre Mot de passe</label>
              <input type="password" />
            </div>
          </div>
          <div className="col-12">
            <div className="form-group login-btn">
              <button className="btn" type="submit">
                Modifier
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InfoAccount;
