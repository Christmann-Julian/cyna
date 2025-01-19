import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../assets/css/checkout.css";
import { useTranslation } from 'react-i18next';

const Checkout = () => {
    const { t } = useTranslation();

    return (
        <>
            <Navbar />
            <div className="checkout section">
                <div className="container">
                    <h2 className="section-title">Checkout</h2>

                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                            <div className="billing-details">
                                <h3>{t('Informations de facturation')}</h3>
                                <form>
                                    <div className="form-group">
                                        <label>{t('Nom complet')}</label>
                                        <input type="text" placeholder="John Doe" />
                                    </div>
                                    <div className="form-group">
                                        <label>{t('Adresse e-mail')}</label>
                                        <input type="email" placeholder="johndoe@example.com" />
                                    </div>
                                    <div className="form-group">
                                        <label>{t('Numéro de téléphone')}</label>
                                        <input type="text" placeholder="+33 6 12 34 56 78" />
                                    </div>
                                    <div className="form-group">
                                        <label>{t('Adresse')}</label>
                                        <input type="text" placeholder="123 Rue de Paris" />
                                    </div>
                                    <div className="form-group">
                                        <label>{t('Code postal')}</label>
                                        <input type="text" placeholder="75001" />
                                    </div>
                                    <div className="form-group">
                                        <label>{t('Ville')}</label>
                                        <input type="text" placeholder="Paris" />
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-12">
                            <div className="order-summary">
                                <h3>{t('Résumé de la commande')}</h3>
                                <ul>
                                    <li>Produit 1 - Durée : 1 mois - Quantité : 2<span>150,00€</span></li>
                                    <li>Produit 2 - Durée : 3 mois - Quantité : 1<span>150,00€</span></li>
                                    <li>Produit 3 - Durée : 6 mois - Quantité : 1<span>150,00€</span></li>
                                    <li>Sous Total<span>450,00€</span></li>
                                    <li>Taxe (20%)<span>90,00€</span></li>
                                    <li className="last">Total<span>540,00€</span></li>
                                </ul>
                                <div>
                                    <a href="" className="btn">Confirmer et payer</a>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Checkout;
