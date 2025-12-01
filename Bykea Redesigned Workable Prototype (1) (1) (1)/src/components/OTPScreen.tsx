import { ArrowLeft } from "lucide-react";
import { useState, useRef } from "react";

interface OTPScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  onBack: () => void;
  language: "en" | "ur";
}

export function OTPScreen({ onNavigate, onBack, language }: OTPScreenProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resent, setResent] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const text = {
    en: {
      title: "Enter Verification Code",
      subtitle: "We sent a code to your phone number",
      verify: "Verify",
      resend: "Didn't receive code? Resend",
      resent: "Code Resent!"
    },
    ur: {
      title: "تصدیقی کوڈ درج کریں",
      subtitle: "ہم نے آپ کے فون نمبر پر کوڈ بھیج دیا ہے",
      verify: "تصدیق کریں",
      resend: "کوڈ نہیں ملا؟ دوبارہ بھیجیں",
      resent: "کوڈ دوبارہ بھیج دیا گیا!"
    }
  };

  const t = text[language];

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    if (otp.every(digit => digit !== "")) {
      onNavigate("profileSetup");
    }
  };

  const handleResend = () => {
    setResent(true);
    setTimeout(() => setResent(false), 3000);
  };

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
      <div 
        className="flex-1 px-6 py-12"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-[#1A1A1A] dark:text-white mb-3 font-bold text-center" style={{ fontSize: '28px' }}>
          {t.title}
        </h1>
        <p className="text-[#6B6B6B] dark:text-[#B0B0B0] mb-12 text-center" style={{ fontSize: '16px' }}>
          {t.subtitle}
        </p>

        {/* OTP Input */}
        <div className="flex justify-center gap-3 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="tel"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-14 h-14 bg-white dark:bg-[#1E1E1E] border-2 border-[#E0E0E0] dark:border-[#2A2A2A] rounded-xl text-center text-[#1A1A1A] dark:text-white font-bold focus:border-[#0CAA41] outline-none transition-colors"
              style={{ fontSize: '24px' }}
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={otp.some(digit => digit === "")}
          className="w-full bg-[#0CAA41] text-white rounded-2xl py-4 font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#0a8f37] shadow-lg shadow-[#0CAA41]/20 mb-6"
          style={{ fontSize: '20px', height: '56px' }}
        >
          {t.verify}
        </button>

        {/* Resend Link */}
        <button
          onClick={handleResend}
          disabled={resent}
          className="text-[#0CAA41] font-bold text-center w-full" style={{ fontSize: '16px' }}
        >
          {resent ? t.resent : t.resend}
        </button>
      </div>
    </div>
  );
}