import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../assets/css/contact.css";
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const Contact = () => {
    const { t } = useTranslation();

    return (
        <>
            <Navbar />
            <section id="contact-us" className="contact-us section mx-3">
                <div className="container">
                    <div className="contact-head">
                        <div class="row">
                            <div className="col-lg-8 col-12">
                                <div className="form-main">
                                    <div className="title">
                                        <h4>{t("contact.help")}</h4>
                                        <h3>{t("contact.writeUs")}</h3>
                                    </div>
                                    <form className="form" method="post" action="mail/mail.php">
                                        <div className="row">
                                            <div className="col-lg-6 col-12">
                                                <div className="form-group">
                                                    <label>{t("contact.email")}<span>*</span></label>
                                                    <input name="email" type="email" placeholder=""/>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-12">
                                                <div className="form-group">
                                                    <label>{t("contact.subject")}<span>*</span></label>
                                                    <input name="subject" type="text" placeholder=""/>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group message">
                                                    <label>{t("contact.message")}<span>*</span></label>
                                                    <textarea name="message" placeholder=""></textarea>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group button">
                                                    <button type="submit" className="btn ">{t("contact.send")}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-4 col-12">
                                <div className="single-head">
                                    <div className="single-info">
                                        <h4 className="title">{t("contact.chatbot")}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Contact;