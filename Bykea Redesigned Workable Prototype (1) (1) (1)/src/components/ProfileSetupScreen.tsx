import { useState } from "react";
import { ArrowLeft, User, Mail } from "lucide-react";
import { motion } from "motion/react";

interface ProfileSetupScreenProps {
  onComplete: (data: { firstName: string; lastName: string; email: string; phone: string }) => void;
  onBack: () => void;
  language: "en" | "ur";
  phoneNumber?: string;
}

export function ProfileSetupScreen({ onComplete, onBack, language, phoneNumber }: ProfileSetupScreenProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(phoneNumber || "");

  const text = {
    en: {
      title: "Complete Your Profile",
      subtitle: "Help us get to know you better",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email Address",
      phone: "Phone Number",
      button: "Get Started",
      skip: "Skip for now"
    },
    ur: {
      title: "اپنی پروفائل مکمل کریں",
      subtitle: "ہمیں آپ کو بہتر جاننے میں مدد کریں",
      firstName: "پہلا نام",
      lastName: "آخری نام",
      email: "ای میل ایڈریس",
      phone: "فون نمبر",
      button: "شروع کریں",
      skip: "ابھی چھوڑ دیں"
    }
  };

  const t = text[language];

  const handleComplete = () => {
    if (firstName && lastName && email && phone) {
      onComplete({ firstName, lastName, email, phone });
    }
  };

  const isValid = firstName.trim() && lastName.trim() && email.trim() && email.includes("@") && phone.trim();

  return (
    <div className="flex flex-col h-screen bg-[#F5F8F3] dark:bg-[#121212]">
      {/* Header */}
      <div className="bg-white dark:bg-[#1E1E1E] px-6 py-4 flex items-center gap-4 border-b border-[#E0E0E0] dark:border-[#2A2A2A]">
        <button 
          onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-[#F5F8F3] dark:hover:bg-[#2A2A2A] transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-[#1A1A1A] dark:text-white" strokeWidth={2.5} />
        </button>
      </div>

      {/* Content */}
      <motion.div 
        className="flex-1 px-6 py-8 overflow-y-auto"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-[#0CAA41]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-[#0CAA41]" strokeWidth={2.5} />
          </div>
          <h1 className="text-[#1A1A1A] dark:text-white mb-2 font-bold" style={{ fontSize: '28px' }}>
            {t.title}
          </h1>
          <p className="text-[#6B6B6B] dark:text-[#B0B0B0]" style={{ fontSize: '16px' }}>
            {t.subtitle}
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {/* First Name */}
          <div>
            <label className="block text-[#6B6B6B] dark:text-[#B0B0B0] mb-2 font-bold" style={{ fontSize: '14px' }}>
              {t.firstName}
            </label>
            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border-2 border-[#E0E0E0] dark:border-[#2A2A2A] p-4 flex items-center gap-3">
              <User className="w-5 h-5 text-[#6B6B6B] dark:text-[#B0B0B0]" strokeWidth={2.5} />
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder={t.firstName}
                className="flex-1 bg-transparent text-[#1A1A1A] dark:text-white outline-none font-bold"
                style={{ fontSize: '18px' }}
              />
            </div>
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-[#6B6B6B] dark:text-[#B0B0B0] mb-2 font-bold" style={{ fontSize: '14px' }}>
              {t.lastName}
            </label>
            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border-2 border-[#E0E0E0] dark:border-[#2A2A2A] p-4 flex items-center gap-3">
              <User className="w-5 h-5 text-[#6B6B6B] dark:text-[#B0B0B0]" strokeWidth={2.5} />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder={t.lastName}
                className="flex-1 bg-transparent text-[#1A1A1A] dark:text-white outline-none font-bold"
                style={{ fontSize: '18px' }}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-[#6B6B6B] dark:text-[#B0B0B0] mb-2 font-bold" style={{ fontSize: '14px' }}>
              {t.email}
            </label>
            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border-2 border-[#E0E0E0] dark:border-[#2A2A2A] p-4 flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#6B6B6B] dark:text-[#B0B0B0]" strokeWidth={2.5} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.email}
                className="flex-1 bg-transparent text-[#1A1A1A] dark:text-white outline-none font-bold"
                style={{ fontSize: '18px' }}
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-[#6B6B6B] dark:text-[#B0B0B0] mb-2 font-bold" style={{ fontSize: '14px' }}>
              {t.phone}
            </label>
            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border-2 border-[#E0E0E0] dark:border-[#2A2A2A] p-4 flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#6B6B6B] dark:text-[#B0B0B0]" strokeWidth={2.5} />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t.phone}
                className="flex-1 bg-transparent text-[#1A1A1A] dark:text-white outline-none font-bold"
                style={{ fontSize: '18px' }}
              />
            </div>
          </div>
        </div>

        {/* Complete Button */}
        <button
          onClick={handleComplete}
          disabled={!isValid}
          className="w-full bg-[#0CAA41] text-white rounded-2xl py-4 font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#0a8f37] shadow-lg shadow-[#0CAA41]/20 mb-4"
          style={{ fontSize: '20px', height: '56px' }}
        >
          {t.button}
        </button>

        {/* Skip Link */}
        <button 
          onClick={() => onComplete({ firstName: "User", lastName: "", email: "", phone: "" })}
          className="text-[#6B6B6B] dark:text-[#B0B0B0] font-bold text-center w-full" 
          style={{ fontSize: '16px' }}
        >
          {t.skip}
        </button>
      </motion.div>
    </div>
  );
}