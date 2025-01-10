import React, { useState, useEffect } from "react";
import ChatBot from "react-chatbotify";
import i18next from "i18next";
import { getCurrentLocale } from "../utils/language";
import Loading from "../pages/Loading";

const ChatBotCyna = () => {
    const [locale, setLocale] = useState(getCurrentLocale());
    const [content, setContent] = useState(null);

    const fetchContent = async (locale) => {
        try {
            const response = await fetch("/public/translation/chatbot.json");
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
            console.error("Error fetching the JSON file:", error);
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

    if(!content){
        return <Loading/>

    }
    
    const settings = {
        isOpen: true,
        general: {
            primaryColor: '#302082',
            secondaryColor: 'purple',
            fontFamily: 'Arial, sans-serif',
            embedded: false,
            botName: "CynaBot"
        },
        audio: {
            disabled: true,
        },
        chatHistory: {
            storageKey: "concepts_settings"
        }
    };
    const flow = {
        start: {
            message: content.start,
            transition: {duration: 0},
			path: "show_options"
        },
        show_options: {
            message: content.showOptions.message,
            options: [content.showOptions.account, content.showOptions.orders, content.showOptions.payment, content.showOptions.supportTeam],            
            chatDisabled: true,
            path: async (params) => {
                switch (params.userInput) {
                    case content.showOptions.account:
                        return "account"
                        break;
                    case content.showOptions.orders:
                        return "orders"
                        break;                    
                    case content.showOptions.payment:
                        return "payment"
                        break;
                    case content.showOptions.supportTeam :
                        return "support_team"
                    default:
                        return "start";
                }
            },
        },
        account: {
            message: content.account.message,
            chatDisabled: true,
            options: [content.account.resetPassword, content.account.personnalInfo, content.account.showOptions],
            path: async (params) => {
                switch (params.userInput) {
                    case content.account.resetPassword:
                        return "reset_password"
                        break;
                    case content.account.personnalInfo:
                        return "personal_info"
                        break;
                    case content.account.showOptions: 
                    return "show_options"                    
                }
            },
        },
        reset_password: {
            message: content.resetPassword1
            + content.resetPassword2,
            chatDisabled: true,
            transition: {duration: 500},
            path: "account"
        },
        personal_info:{
            message: content.personalInfo1+
            content.personalInfo2, 
            chatDisabled: true,
            transition: {duration: 500},
            path: "account"
        },
        orders: {
            message: content.orders.message,
            chatDisabled: true,
            options: [content.orders.myOrders, content.orders.showOptions],
            path: async (params) => {
                switch (params.userInput) {
                    case content.orders.myOrders:
                        return "myorders"
                        break;
                    case content.orders.showOptions:
                        return "show_options"
                        break;
                }
            },
        }, 
        myorders: {
            message: content.myOrders1+
            content.myOrders2,
            transition: {duration: 500},
            path: "orders"
        },
        payment: {
            message: content.payment.message,
            chatDisabled: true,
            options: [content.payment.paymentMethod, content.payment.showOption],
            path: async (params) => {
                switch (params.userInput) {
                    case content.payment.paymentMethod:
                        return "payment"
                        break;
                    case content.payment.showOption:
                        return "show_options"
                        break
                }
            },
        },
        support_team: {
            message: content.supportTeam,
            transition: {duration: 500},
            path: "show_options"
        }
    };

    return (
        <ChatBot
            flow={flow}
            settings={settings}
        />
    );
};

export default ChatBotCyna;
