import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../assets/css/contact.css';
import ChatBotCyna from '../components/ChatBotCyna';
import { useTranslation } from 'react-i18next';
import apiRequest from '../utils/apiRequest';
import { useForm } from 'react-hook-form';
import Loading from './Loading';
import Alert from '../components/Alert';

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [alertMessage, setAlerteMessage] = useState({ message: '', type: '' });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (formData) => {
    setLoading(true);
    const sendMessage = async () => {
      const { error: errorContact } = await apiRequest('/contacts', 'POST', {
        headers: {
          'Content-Type': 'application/ld+json',
        },
        body: {
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
      });

      setLoading(false);

      if (errorContact) {
        setAlerteMessage({
          message: t('contact.errors.serverError'),
          type: 'danger',
        });
      } else {
        setAlerteMessage({
          message: t('contact.sendSuccess'),
          type: 'success',
        });
        reset();
      }
    };

    sendMessage();
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <section id="contact-us" className="contact-us section mx-3">
        <div className="container">
          <div className="contact-head">
            <div className="row">
              <div className="col-lg-8 col-12">
                <div className="form-main">
                  <div className="title">
                    <h4>{t('contact.help')}</h4>
                    <h3>{t('contact.writeUs')}</h3>
                  </div>
                  <Alert message={alertMessage.message} type={alertMessage.type} />
                  <form className="form" method="post" onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                      <div className="col-lg-6 col-12">
                        <div className="form-group">
                          <label>
                            {t('contact.email')}
                            <span>*</span>
                          </label>
                          <input
                            {...register('email', {
                              required: t('contact.errors.emailRequired'),
                              pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/,
                                message: t('contact.errors.emailPattern'),
                              },
                            })}
                          />
                          {errors.email && (
                            <span className="text-danger">{errors.email.message}</span>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-12">
                        <div className="form-group">
                          <label>
                            {t('contact.subject')}
                            <span>*</span>
                          </label>
                          <input
                            {...register('subject', {
                              required: t('contact.errors.subjectRequired'),
                              maxLength: {
                                value: 255,
                                message: t('contact.errors.maxLength'),
                              },
                              minLength: {
                                value: 3,
                                message: t('contact.errors.minLength'),
                              },
                            })}
                          />
                          {errors.subject && (
                            <span className="text-danger">{errors.subject.message}</span>
                          )}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group message">
                          <label>
                            {t('contact.message')}
                            <span>*</span>
                          </label>
                          <textarea
                            {...register('message', {
                              required: t('contact.errors.messageRequired'),
                              maxLength: {
                                value: 255,
                                message: t('contact.errors.messageMaxLength'),
                              },
                              minLength: {
                                value: 3,
                                message: t('contact.errors.minLength'),
                              },
                            })}
                          ></textarea>
                          {errors.message && (
                            <span className="text-danger">{errors.message.message}</span>
                          )}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group button">
                          <button type="submit" className="btn ">
                            {t('contact.send')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-4 col-12">
                <div className="single-head">
                  <div className="single-info">
                    <h4 className="title title-map">{t('contact.map')}</h4>
                    <div className="google-map-container">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2622.6960995961854!2d2.258768675964356!3d48.90212859762816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6659f1e10c725%3A0xb6c33c29eee1be6f!2s11%20Av.%20Dubonnet%2C%2092400%20Courbevoie!5e0!3m2!1sfr!2sfr!4v1736518622577!5m2!1sfr!2sfr"
                        width="100%"
                        height="300"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ChatBotCyna />
      <Footer />
    </>
  );
};

export default Contact;
