"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Language = "en" | "hi" | "ta" | "te";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    speak: (key: string) => void;
}

const translations: Record<Language, Record<string, string>> = {
    hi: {
        "dashboard": "मंडी डैशबोर्ड",
        "sell_crop": "फसल बेचें",
        "msp_check": "MSP जाँचें",
        "connect_wallet": "वॉलेट जोड़ें",
        "wallet_connected": "वॉलेट जुड़ा हुआ है",
        "buy_now": "अभी खरीदें",
        "govt_msp": "सरकारी MSP",
        "quantity": "मात्रा",
        "current_bid": "वर्तमान बोली",
        "farmer": "किसान",
        "iot_verified": "IoT सत्यापित ✅",
        "warning_low": "⚠️ बोली कम है",
        "new_bid_alert": "आपको एक नई बोली प्राप्त हुई है: ",
        "escrow_locked": "धनराशि एस्क्रौ में जमा हो गई है। अब आप फसल पहुंचा सकते हैं।",
        "hero_title": "सुरक्षित। पारदर्शी।",
        "hero_immutable": "अपरिवर्तनीय।",
        "hero_desc": "सरकार द्वारा समर्थित विकेंद्रीकृत खरीद मंच। किसानों के लिए उचित मूल्य और राष्ट्र के लिए छेड़छाड़-मुक्त निविदा सुनिश्चित करना।",
        "role_farmer": "किसान / आपूर्तिकर्ता",
        "desc_farmer": "AI-संचालित उचित मूल्य निर्धारण, IoT वजन सत्यापन और सीधे मंडी बिक्री उपकरणों तक पहुंच प्राप्त करें।",
        "role_vendor": "कॉर्पोरेट विक्रेता",
        "desc_vendor": "प्रतिबद्ध-प्रकट बोली और स्वचालित एस्क्रौ के साथ सुरक्षित सरकारी निविदाओं में भाग लें।",
        "role_officer": "खरीद अधिकारी",
        "desc_officer": "निविदाएं बनाएं, गुणवत्ता जांच को मंजूरी दें और फंड जारी करने के लिए डिजिटल हस्ताक्षरों का प्रबंधन करें।",
        "role_auditor": "विनियामक लेखा परीक्षक",
        "desc_auditor": "अनुपालन और फॉरेंसिक ऑडिट के लिए अपरिवर्तनीय ब्लॉकचेन बहीखाता तक केवल-पठन पहुंच।",
        "platform": "मंच",
        "governance": "शासन",
        "contact": "संपर्क",
        "emergency_audit": "आपातकालीन ऑडिट",
        "view_tenders": "सक्रिय निविदाएं देखें",
        "select_portal": "एक्सेस पोर्टल का चयन करें",
        "access_portal": "पोर्टल खोलें"
    },
    en: {
        "dashboard": "Dashboard",
        "sell_crop": "Sell Crop",
        "msp_check": "MSP Check",
        "connect_wallet": "Connect Wallet",
        "wallet_connected": "Wallet Connected",
        "buy_now": "Buy Now",
        "govt_msp": "Govt MSP",
        "quantity": "Quantity",
        "current_bid": "Current Bid",
        "farmer": "Farmer",
        "iot_verified": "IoT Verified",
        "warning_low": "⚠️ Low Bid",
        "new_bid_alert": "You have received a new bid of ",
        "escrow_locked": "Funds have been locked in Escrow. You can deliver now.",
        "hero_title": "Secure. Transparent.",
        "hero_immutable": "Immutable.",
        "hero_desc": "The government-backed decentralized procurement platform. Ensuring fair prices for farmers and tamper-proof tendering for the nation.",
        "role_farmer": "Farmer / Supplier",
        "desc_farmer": "Access AI-driven fair pricing, IoT weight verification, and direct-to-mandi selling tools.",
        "role_vendor": "Corporate Vendor",
        "desc_vendor": "Participate in secure government tenders with Commit-Reveal bidding and automated escrow.",
        "role_officer": "Procurement Officer",
        "desc_officer": "Create tenders, approve quality checks, and manage digital signatures for fund release.",
        "role_auditor": "Regulatory Auditor",
        "desc_auditor": "Read-only access to the immutable blockchain ledger for compliance and forensic audit.",
        "platform": "Platform",
        "governance": "Governance",
        "contact": "Contact",
        "emergency_audit": "Emergency Audit",
        "view_tenders": "View Active Tenders",
        "select_portal": "Select Access Portal",
        "access_portal": "Access Portal"
    },
    ta: {
        "dashboard": "மண்டி டாஷ்போர்டு",
        "sell_crop": "பயிர் விற்க",
        "msp_check": "MSP சரிபார்க்க",
        "connect_wallet": "பணப்பையை இணைக்கவும்",
        "wallet_connected": "இணைக்கப்பட்டது",
        "buy_now": "இப்போது வாங்க",
        "govt_msp": "அரசு MSP",
        "quantity": "அளவு",
        "current_bid": "தற்போதைய ஏலம்",
        "farmer": "விவசாயி",
        "iot_verified": "IoT சரிபார்க்கப்பட்டது",
        "warning_low": "⚠️ குறைந்த ஏலம்",
        "new_bid_alert": "புதிய ஏலம் வந்துள்ளது: ",
        "escrow_locked": "பணம் பாதுகாப்பாக உள்ளது. நீங்கள் பயிரை அனுப்பலாம்.",
        "hero_title": "பாதுகாப்பான. வெளிப்படையான.",
        "hero_immutable": "மாற்ற முடியாதது.",
        "hero_desc": "அரசு ஆதரவுடன் செயல்படும் பரவலாக்கப்பட்ட கொள்முதல் தளம். விவசாயிகளுக்கு நியாயமான விலையையும், தேசத்திற்கு பாதுகாப்பான டெண்டர்களையும் உறுதி செய்கிறது.",
        "role_farmer": "விவசாயி / விற்பனையாளர்",
        "desc_farmer": "AI-உந்துதல் நியாயமான விலை, IoT எடை சரிபார்ப்பு மற்றும் நேரடி விற்பனை கருவிகள்.",
        "role_vendor": "கார்ப்பரேட் விற்பனையாளர்",
        "desc_vendor": "பாதுகாப்பான அரசு டெண்டர்களில் பங்கேற்கவும்.",
        "role_officer": "கொள்முதல் அதிகாரி",
        "desc_officer": "டெண்டர்களை உருவாக்கவும் மற்றும் டிஜிட்டல் கையொப்பங்களை நிர்வகிக்கவும்.",
        "role_auditor": "தணிக்கையாளர்",
        "desc_auditor": "தணிக்கைக்காக பிளாக்செயின் பதிவேட்டைப் பார்க்கவும்.",
        "platform": "தளம்",
        "governance": "நிர்வாகம்",
        "contact": "தொடர்பு",
        "emergency_audit": "அவசர தணிக்கை",
        "view_tenders": "செயலில் உள்ள டெண்டர்கள்",
        "select_portal": "அணுகல் போர்ட்டலைத் தேர்ந்தெடுக்கவும்",
        "access_portal": "உள்ளிடவும்"
    },
    te: {
        "dashboard": "మండి డాష్‌బోర్డ్",
        "sell_crop": "పంట అమ్మకం",
        "msp_check": "MSP తనిఖీ",
        "connect_wallet": "వాలెట్ కనెక్ట్ చేయండి",
        "wallet_connected": "కనెక్ట్ చేయబడింది",
        "buy_now": "ఇప్పుడే కొనండి",
        "govt_msp": "ప్రభుత్వ MSP",
        "quantity": "పరిమాణం",
        "current_bid": "ప్రస్తుత బిడ్",
        "farmer": "రైతు",
        "iot_verified": "IoT ధృవీకరించబడింది",
        "warning_low": "⚠️ తక్కువ బిడ్",
        "new_bid_alert": "కొత్త బిడ్ వచ్చింది: ",
        "escrow_locked": "డబ్బు జమ చేయబడింది. మీరు పంటను పంపవచ్చు.",
        "hero_title": "సురక్షితమైన. పారదర్శక.",
        "hero_immutable": "మార్చలేనిది.",
        "hero_desc": "ప్రభుత్వ మద్దతుతో నడిచే వికేంద్రీకృత సేకరణ వేదిక. రైతులకు న్యాయమైన ధరలను నిర్ధారిస్తుంది.",
        "role_farmer": "రైతు / సరఫరాదారు",
        "desc_farmer": "AI-ఆధారిత న్యాయమైన ధరలు మరియు IoT బరువు తనిఖీ.",
        "role_vendor": "కార్పొరేట్ విక్రేత",
        "desc_vendor": "సురక్షితమైన ప్రభుత్వ టెండర్లలో పాల్గొనండి.",
        "role_officer": "సేకరణ అధికారి",
        "desc_officer": "టెండర్లను సృష్టించండి మరియు నిధులను విడుదల చేయండి.",
        "role_auditor": "ఆడిటర్",
        "desc_auditor": "బ్లాక్‌చెయిన్ రికార్డులను తనిఖీ చేయండి.",
        "platform": "ప్లాట్ఫారమ్",
        "governance": "పరిపాలన",
        "contact": "సంప్రదించండి",
        "emergency_audit": "అత్యవసర ఆడిట్",
        "view_tenders": "టెండర్లను చూడండి",
        "select_portal": "పోర్టల్‌ను ఎంచుకోండి",
        "access_portal": "ప్రవేశించండి"
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>("en");

    const t = (key: string) => {
        return translations[language][key] || key;
    };

    const speak = (key: string) => {
        const text = translations[language][key] || key;
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            // Try to match language code
            if (language === 'hi') utterance.lang = 'hi-IN';
            if (language === 'ta') utterance.lang = 'ta-IN';
            if (language === 'te') utterance.lang = 'te-IN';

            window.speechSynthesis.speak(utterance);
        }
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, speak }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
    return context;
};
