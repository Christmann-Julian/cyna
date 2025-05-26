import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../assets/css/legal-notice.css';
import { getCurrentLocale } from '../utils/language';
import i18next from 'i18next';

const LegalNotice = () => {
  const [locale, setLocale] = useState(getCurrentLocale());
  const [content, setContent] = useState('');

  const fetchContent = async (locale) => {
    try {
      const response = await fetch('/public/translation/legal_notices_multilang.json');
      const data = await response.json();

      switch (locale) {
        case 'fr-FR':
          setContent(data.fr);
          break;
        case 'ar-SA':
          setContent(data.ar);
          break;
        default:
          setContent(data.en);
      }
    } catch (error) {
      console.error('Error fetching the JSON file:', error);
    }
  };

  useEffect(() => {
    fetchContent(locale);

    const handleLanguageChange = () => {
      const newLocale = getCurrentLocale();
      setLocale(newLocale);
      fetchContent(newLocale);
    };

    i18next.on('languageChanged', handleLanguageChange);

    return () => {
      i18next.off('languageChanged', handleLanguageChange);
    };
  }, [locale]);

  return (
    <>
      <Navbar />
      <div className="legal-notice container">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      <Footer />
    </>
  );
};

export default LegalNotice;
