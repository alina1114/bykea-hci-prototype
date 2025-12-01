import { Wallet, Banknote, Volume2, ArrowLeft, CheckCircle2 } from "lucide-react";
import { FloatingMicButton } from "./FloatingMicButton";
import { useState, useEffect } from "react";
import { AddMoneyModal } from "./AddMoneyModal";
import { GlobalSpeakerButton } from "./GlobalSpeakerButton";
import { useReadAloud } from "./ReadAloudContext";

interface NewPaymentScreenProps {
  onNavigate: (screen: string) => void;
  onVoiceClick: () => void;
  speakerActive: boolean;
  onSpeakerToggle: () => void;
  language: "en" | "ur";
}

export function NewPaymentScreen({ onNavigate, onVoiceClick, speakerActive, onSpeakerToggle, language }: NewPaymentScreenProps) {
  const [selectedPayment, setSelectedPayment] = useState<"cash" | "digital" | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [walletBalance, setWalletBalance] = useState(250);
  const readAloud = useReadAloud();

  const text = {
    en: {
      title: "Payment",
      completed: "Trip Completed!",
      thankYou: "Thank you for riding with Bykea",
      totalFare: "Total Fare",
      baseFare: "Base Fare",
      serviceFee: "Service Fee",
      selectPayment: "Select Payment Method",
      cash: "Cash Payment",
      cashDesc: "Pay cash to driver",
      digital: "Digital Payment",
      digitalDesc: "Pay with wallet or card",
      walletBalance: "Wallet Balance",
      addMoney: "Add Money",
      audioHelp: "Play Audio Instructions",
      completePayment: "Complete Payment"
    },
    ur: {
      title: "ادائیگی",
      completed: "سفر مکمل ہو گیا!",
      thankYou: "بائیکیا کے ساتھ سفر کرنے کا شکریہ",
      totalFare: "کل کرایہ",
      baseFare: "بنیادی کرایہ",
      serviceFee: "سروس فیس",
      selectPayment: "ادائیگی کا طریقہ منتخب کریں",
      cash: "نقد ادائیگی",
      cashDesc: "ڈرائیور کو نقد ادا کریں",
      digital: "ڈیجیٹل ادائیگی",
      digitalDesc: "والیٹ یا کارڈ سے ادا کریں",
      walletBalance: "والیٹ بیلنس",
      addMoney: "رقم شامل کریں",
      audioHelp: "آڈیو ہدایات چلائیں",
      completePayment: "ادائیگی مکمل کریں"
    }
  };

  const t = text[language];

  // Text-to-speech when speaker is active
  useEffect(() => {
    if (speakerActive) {
      const ttsTexts = [
        t.title,
        t.completed,
        t.thankYou,
        t.totalFare,
        "Rs. 150",
        t.selectPayment,
        t.cash,
        t.digital
      ];
      readAloud.play(ttsTexts, 'Payment Screen');
    } else {
      readAloud.stop();
    }
  }, [speakerActive]);

  const handleCompletePayment = () => {
    setShowSuccess(true);
    setTimeout(() => {
      onNavigate("home");
    }, 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-[#F5F8F3] dark:bg-[#121212]">
      {/* Header */}
      <div className="bg-white dark:bg-[#1E1E1E] px-5 py-5 border-b border-[#E0E0E0] dark:border-[#2A2A2A]">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate("driverOnWay")}
            className="w-11 h-11 rounded-2xl bg-[#F5F8F3] dark:bg-[#2A2A2A] flex items-center justify-center hover:bg-[#E0E0E0] dark:hover:bg-[#3A3A3A] transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#1A1A1A] dark:text-white" strokeWidth={2.5} />
          </button>
          <h2 className="text-[#1A1A1A] dark:text-white font-bold flex-1 text-center">{t.title}</h2>
          <GlobalSpeakerButton isActive={speakerActive} onToggle={onSpeakerToggle} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 pt-6 pb-6 overflow-y-auto space-y-5">
        {/* Success Badge */}
        <div className="bg-gradient-to-br from-[#E8F5EC] to-[#D4EFE0] dark:from-[#0CAA41]/10 dark:to-[#0CAA41]/5 border-2 border-[#0CAA41]/30 rounded-3xl p-8 text-center">
          <div className="w-20 h-20 bg-[#0CAA41] rounded-full mx-auto mb-4 flex items-center justify-center">
            <CheckCircle2 className="w-11 h-11 text-white" strokeWidth={2.5} />
          </div>
          <h2 className="text-[#1A1A1A] dark:text-white mb-2 font-bold text-xl">{t.completed}</h2>
          <p className="text-[#4A4A4A] dark:text-[#B0B0B0] font-semibold">{t.thankYou}</p>
        </div>

        {/* Fare Summary */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 border border-[#E0E0E0] dark:border-[#2A2A2A]">
          <div className="text-center pb-6 border-b border-[#E0E0E0] dark:border-[#2A2A2A]">
            <p className="text-[#4A4A4A] dark:text-[#B0B0B0] mb-2 font-semibold">{t.totalFare}</p>
            <h1 className="text-[#0CAA41] text-5xl font-bold">Rs. 150</h1>
          </div>

          <div className="space-y-4 pt-6">
            <div className="flex items-center justify-between">
              <span className="text-[#4A4A4A] dark:text-[#B0B0B0] font-semibold">{t.baseFare}</span>
              <span className="text-[#1A1A1A] dark:text-white font-bold">Rs. 120</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#4A4A4A] dark:text-[#B0B0B0] font-semibold">{t.serviceFee}</span>
              <span className="text-[#1A1A1A] dark:text-white font-bold">Rs. 30</span>
            </div>
          </div>
        </div>

        {/* Wallet Balance & Add Money */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 border border-[#E0E0E0] dark:border-[#2A2A2A]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#0CAA41]/10 rounded-2xl flex items-center justify-center">
                <Wallet className="w-6 h-6 text-[#0CAA41]" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[#4A4A4A] dark:text-[#B0B0B0] font-semibold text-sm">{t.walletBalance}</p>
                <h3 className="text-[#1A1A1A] dark:text-white font-bold text-2xl">Rs. {walletBalance}</h3>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowAddMoney(true)}
            className="w-full bg-[#0CAA41]/10 border-2 border-[#0CAA41] text-[#0CAA41] rounded-2xl py-5 hover:bg-[#0CAA41]/20 transition-colors font-bold text-lg"
          >
            {t.addMoney}
          </button>
        </div>

        {/* Payment Methods */}
        <div>
          <h3 className="mb-4 text-[#1A1A1A] dark:text-white font-bold text-lg">{t.selectPayment}</h3>
          
          <div className="space-y-4">
            {/* Cash Payment */}
            <button 
              onClick={() => setSelectedPayment("cash")}
              className={`w-full bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 border-2 hover:shadow-lg transition-all ${
                selectedPayment === "cash" 
                  ? "border-[#0CAA41]" 
                  : "border-[#E0E0E0] dark:border-[#2A2A2A] hover:border-[#0CAA41]"
              }`}
            >
              <div className="flex items-center gap-5">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                  selectedPayment === "cash" ? "bg-[#0CAA41]/10" : "bg-[#F5F8F3] dark:bg-[#2A2A2A]"
                }`}>
                  <Banknote className={`w-8 h-8 ${
                    selectedPayment === "cash" ? "text-[#0CAA41]" : "text-[#4A4A4A] dark:text-[#B0B0B0]"
                  }`} strokeWidth={2.5} />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-[#1A1A1A] dark:text-white mb-1 font-bold">{t.cash}</h3>
                  <p className="text-[#4A4A4A] dark:text-[#B0B0B0] font-semibold">{t.cashDesc}</p>
                </div>
                <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedPayment === "cash" 
                    ? "border-[#0CAA41]" 
                    : "border-[#E0E0E0] dark:border-[#2A2A2A]"
                }`}>
                  {selectedPayment === "cash" && (
                    <div className="w-4 h-4 rounded-full bg-[#0CAA41]"></div>
                  )}
                </div>
              </div>
            </button>

            {/* Digital Payment */}
            <button 
              onClick={() => setSelectedPayment("digital")}
              className={`w-full bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 border-2 hover:shadow-lg transition-all ${
                selectedPayment === "digital" 
                  ? "border-[#0CAA41]" 
                  : "border-[#E0E0E0] dark:border-[#2A2A2A] hover:border-[#0CAA41]"
              }`}
            >
              <div className="flex items-center gap-5">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                  selectedPayment === "digital" ? "bg-[#0CAA41]/10" : "bg-[#F5F8F3] dark:bg-[#2A2A2A]"
                }`}>
                  <Wallet className={`w-8 h-8 ${
                    selectedPayment === "digital" ? "text-[#0CAA41]" : "text-[#4A4A4A] dark:text-[#B0B0B0]"
                  }`} strokeWidth={2.5} />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-[#1A1A1A] dark:text-white mb-1 font-bold">{t.digital}</h3>
                  <p className="text-[#4A4A4A] dark:text-[#B0B0B0] font-semibold">{t.digitalDesc}</p>
                </div>
                <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedPayment === "digital" 
                    ? "border-[#0CAA41]" 
                    : "border-[#E0E0E0] dark:border-[#2A2A2A]"
                }`}>
                  {selectedPayment === "digital" && (
                    <div className="w-4 h-4 rounded-full bg-[#0CAA41]"></div>
                  )}
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Audio Help */}
        <button className="w-full bg-[#F5F8F3] dark:bg-[#2A2A2A] border-2 border-[#E0E0E0] dark:border-[#3A3A3A] rounded-2xl py-5 flex items-center justify-center gap-3 hover:bg-[#E8EDE6] dark:hover:bg-[#3A3A3A] transition-colors">
          <Volume2 className="w-6 h-6 text-[#0CAA41]" strokeWidth={2.5} />
          <span className="text-[#1A1A1A] dark:text-white font-bold">{t.audioHelp}</span>
        </button>
      </div>

      {/* Bottom Action */}
      <div className="bg-white dark:bg-[#1E1E1E] px-5 py-6 border-t border-[#E0E0E0] dark:border-[#2A2A2A]">
        <button
          onClick={handleCompletePayment}
          disabled={!selectedPayment}
          className={`w-full rounded-3xl py-7 transition-colors shadow-lg font-bold text-xl flex items-center justify-center ${
            selectedPayment
              ? "bg-[#0CAA41] text-white hover:bg-[#0a8f37] shadow-[#0CAA41]/20"
              : "bg-[#E0E0E0] dark:bg-[#2A2A2A] text-[#4A4A4A] dark:text-[#B0B0B0] cursor-not-allowed"
          }`}
        >
          {t.completePayment}
        </button>
      </div>

      {/* Add Money Modal */}
      {showAddMoney && (
        <AddMoneyModal onClose={() => setShowAddMoney(false)} language={language} />
      )}

      <FloatingMicButton onClick={onVoiceClick} />
    </div>
  );
}