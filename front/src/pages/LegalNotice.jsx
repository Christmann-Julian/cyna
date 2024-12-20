import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../assets/css/terms-page.css";

const LegalNotice = () => {
  const [locale, setLocale] = useState("fr-FR"); 
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch("/public/translation/legal_notices_multilang.json"); 
        const data = await response.json();
        
        switch (locale) {
          case "fr-FR":
            setContent(data.fr);
            break;
          case "ar-SA":
            setContent(data.ar);
            break;
          default:
            setContent(data.en); 
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du fichier JSON :", error);
      }
    };

    fetchContent();
  }, [locale]); 

  return (
    <>
      <Navbar />
      <div className="legal-notice">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      <Footer />
    </>
  );
};

export default LegalNotice;
