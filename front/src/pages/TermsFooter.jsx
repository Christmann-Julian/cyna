import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../assets/css/terms-page.css";

const TermsFooter = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Contenu principal */}
      <div className="terms-container">
        <div className="terms-content">
          <h1 className="terms-title">Mentions Légales</h1>

          {/* Section Définition */}
          <section className="terms-section">
            <h2>Définitions</h2>
            <p>
              Client : tout professionnel ou personne physique capable au sens des
              articles 1123 et suivants du code civil, ou personne morale, qui
              visite le site objet des présentes conditions générales.
            </p>
            {/* Ajoutez ici les autres paragraphes de la section */}
          </section>

          {/* Section Présentation du site internet */}
          <section className="terms-section">
            <h2>1. Présentation du site internet</h2>
            <p>
              En vertu de l'article 6 de la loi n°2004-575 du 21 juin 2004 pour la
              confiance dans l'économie numérique, il est précisé aux utilisateurs
              du site internet <a href="https://www.cyna-it.fr">https://www.cyna-it.fr</a> l'identité des différents intervenants
              dans le cadre de sa réalisation et de son suivi...
            </p>
            {/* Continuez avec les autres paragraphes de la section */}
          </section>

          {/* Continuez avec les autres sections en suivant le même format */}
          {/* ... */}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default TermsFooter;
