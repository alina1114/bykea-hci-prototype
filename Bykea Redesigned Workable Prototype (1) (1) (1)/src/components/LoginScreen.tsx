import { useState } from "react";
import { Phone } from "lucide-react";
import { motion } from "motion/react";
import { useVoiceAssistScreen } from "./useVoiceAssistScreen";

interface LoginScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  language: "en" | "ur";
}

export function LoginScreen({ onNavigate, language }: LoginScreenProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  
  const voiceAssist = useVoiceAssistScreen({
    screenKey: 'login',
    language,
    autoAnnounce: true
  });

  const text = {
    en: {
      title: "Welcome to Bykea",
      subtitle: "Sign in with your phone number",
      placeholder: "Enter phone number",
      button: "Continue",
      helper: "We'll send you a verification code"
    },
    ur: {
      title: "بائیکیا میں خوش آمدید",
      subtitle: "اپنے فون نمبر سے سائن ان کریں",
      placeholder: "فون نمبر درج کریں",
      button: "جاری رکھیں",
      helper: "ہم آپ کو تصدیقی کوڈ بھیجیں گے"
    }
  };

  const t = text[language];

  const handleContinue = () => {
    if (phoneNumber.length >= 10) {
      voiceAssist.announceButton('continueButton', voiceAssist.content.elements.sendingCode);
      onNavigate("otp", { phone: phoneNumber });
    } else {
      voiceAssist.announceError('invalidPhone');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#F5F8F3] dark:bg-[#121212]">
      {/* Header with Logo */}
      <div className="bg-[#0CAA41] pt-16 pb-12 px-6 rounded-b-[3rem]">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
            <span className="text-[#0CAA41] font-bold" style={{ fontSize: '36px' }}>B</span>
          </div>
          <h1 className="text-white font-bold mb-2" style={{ fontSize: '28px' }}>{t.title}</h1>
        </motion.div>
      </div>

      {/* Content */}
      <motion.div 
        className="flex-1 px-6 py-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="text-[#1A1A1A] dark:text-white mb-8 font-bold text-center" style={{ fontSize: '22px' }}>
          {t.subtitle}
        </h2>

        {/* Phone Input */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border-2 border-[#E0E0E0] dark:border-[#2A2A2A] p-4 mb-3 flex items-center gap-3">
          <Phone className="w-6 h-6 text-[#0CAA41]" strokeWidth={2.5} />
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            onFocus={() => voiceAssist.announceInputFocus(t.placeholder)}
            placeholder={t.placeholder}
            className="flex-1 bg-transparent text-[#1A1A1A] dark:text-white outline-none font-bold"
            style={{ fontSize: '18px' }}
            aria-label={t.placeholder}
          />
        </div>

        <p className="text-[#6B6B6B] dark:text-[#B0B0B0] text-center mb-8" style={{ fontSize: '14px' }}>
          {t.helper}
        </p>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={phoneNumber.length < 10}
          className="w-full bg-[#0CAA41] text-white rounded-2xl py-4 font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#0a8f37] shadow-lg shadow-[#0CAA41]/20"
          style={{ fontSize: '20px', height: '56px' }}
          aria-label={t.button}
        >
          {t.button}
        </button>
      </motion.div>
    </div>
  );
}