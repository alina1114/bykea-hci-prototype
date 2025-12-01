import { ArrowLeft, CreditCard, Calendar, Lock } from "lucide-react";
import { useState } from "react";
import { GlobalSpeakerButton } from "./GlobalSpeakerButton";

interface AddPaymentMethodScreenProps {
  onBack: () => void;
  onPaymentAdd: (card: { id: string; type: "card"; name: string; last4: string }) => void;
  speakerActive: boolean;
  onSpeakerToggle: () => void;
  language: "en" | "ur";
}

export function AddPaymentMethodScreen({
  onBack,
  onPaymentAdd,
  speakerActive,
  onSpeakerToggle,
  language
}: AddPaymentMethodScreenProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const text = {
    en: {
      title: "Add Payment Card",
      cardNumber: "Card Number",
      cardHolder: "Cardholder Name",
      expiryDate: "Expiry Date (MM/YY)",
      cvv: "CVV",
      addCard: "Add Card",
      cancel: "Cancel",
      success: "Card added successfully!",
      required: "This field is required",
      invalidCard: "Invalid card number",
      invalidExpiry: "Invalid expiry date",
      invalidCVV: "Invalid CVV"
    },
    ur: {
      title: "پیمنٹ کارڈ شامل کریں",
      cardNumber: "کارڈ نمبر",
      cardHolder: "کارڈ ہولڈر کا نام",
      expiryDate: "میعاد ختم ہونے کی تاریخ (MM/YY)",
      cvv: "سی وی وی",
      addCard: "کارڈ شامل کریں",
      cancel: "منسوخ کریں",
      success: "کارڈ کامیابی سے شامل ہو گیا!",
      required: "یہ فیلڈ ضروری ہے",
      invalidCard: "غلط کارڈ نمبر",
      invalidExpiry: "غلط میعاد ختم ہونے کی تاریخ",
      invalidCVV: "غلط سی وی وی"
    }
  };

  const t = text[language];

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(" ") : cleaned;
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleCardNumberChange = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    if (cleaned.length <= 16 && /^\d*$/.test(cleaned)) {
      setCardNumber(formatCardNumber(cleaned));
    }
  };

  const handleExpiryChange = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length <= 4) {
      setExpiryDate(formatExpiryDate(cleaned));
    }
  };

  const handleCvvChange = (value: string) => {
    if (value.length <= 3 && /^\d*$/.test(value)) {
      setCvv(value);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    const cleanedCard = cardNumber.replace(/\s/g, "");
    if (!cleanedCard) {
      newErrors.cardNumber = t.required;
    } else if (cleanedCard.length !== 16) {
      newErrors.cardNumber = t.invalidCard;
    }

    if (!cardHolder.trim()) {
      newErrors.cardHolder = t.required;
    }

    const cleanedExpiry = expiryDate.replace(/\D/g, "");
    if (!cleanedExpiry) {
      newErrors.expiryDate = t.required;
    } else if (cleanedExpiry.length !== 4) {
      newErrors.expiryDate = t.invalidExpiry;
    } else {
      const month = parseInt(cleanedExpiry.slice(0, 2));
      if (month < 1 || month > 12) {
        newErrors.expiryDate = t.invalidExpiry;
      }
    }

    if (!cvv) {
      newErrors.cvv = t.required;
    } else if (cvv.length !== 3) {
      newErrors.cvv = t.invalidCVV;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onPaymentAdd({ id: "card123", type: "card", name: cardHolder, last4: cardNumber.slice(-4) });
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onBack();
      }, 1500);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#F5F8F3] dark:bg-[#121212]">
      {/* Header */}
      <div className="bg-white dark:bg-[#1E1E1E] px-6 py-4 flex items-center justify-between border-b border-[#E0E0E0] dark:border-[#2A2A2A]">
        <button
          onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-2xl hover:bg-[#F5F8F3] dark:hover:bg-[#2A2A2A] transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-[#1A1A1A] dark:text-white" strokeWidth={2.5} />
        </button>
        <h1 className="text-[#1A1A1A] dark:text-white font-bold flex-1 text-center">
          {t.title}
        </h1>
        <GlobalSpeakerButton isActive={speakerActive} onToggle={onSpeakerToggle} />
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        {/* Card Preview */}
        <div className="bg-gradient-to-br from-[#0CAA41] to-[#0a8f37] rounded-3xl p-8 mb-8 shadow-2xl">
          <div className="flex justify-between items-start mb-12">
            <CreditCard className="w-12 h-12 text-white" strokeWidth={2} />
            <div className="text-white text-xs opacity-70">VISA</div>
          </div>
          <div className="text-white text-2xl tracking-wider mb-6 font-mono">
            {cardNumber || "•••• •••• •••• ••••"}
          </div>
          <div className="flex justify-between items-end">
            <div>
              <div className="text-white/70 text-xs mb-1">CARD HOLDER</div>
              <div className="text-white font-bold text-lg">
                {cardHolder || "YOUR NAME"}
              </div>
            </div>
            <div>
              <div className="text-white/70 text-xs mb-1">EXPIRES</div>
              <div className="text-white font-bold">
                {expiryDate || "MM/YY"}
              </div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 bg-[#E8F5EC] dark:bg-[#0CAA41]/10 border-2 border-[#0CAA41] rounded-2xl p-5 text-center">
            <p className="text-[#0CAA41] font-bold text-lg">{t.success}</p>
          </div>
        )}

        {/* Form */}
        <div className="space-y-5">
          {/* Card Number */}
          <div>
            <label className="block text-[#1A1A1A] dark:text-white font-bold mb-3">
              {t.cardNumber}
            </label>
            <div className="relative">
              <CreditCard className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A] dark:text-[#B0B0B0]" />
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => handleCardNumberChange(e.target.value)}
                className={`w-full pl-14 pr-6 py-5 rounded-2xl border-2 ${
                  errors.cardNumber
                    ? "border-[#DC3545] bg-[#FFF5F5] dark:bg-[#DC3545]/10"
                    : "border-[#E0E0E0] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]"
                } text-[#1A1A1A] dark:text-white focus:outline-none focus:border-[#0CAA41] transition-colors font-mono text-lg`}
                placeholder="1234 5678 9012 3456"
              />
            </div>
            {errors.cardNumber && (
              <p className="mt-2 text-[#DC3545] text-sm font-bold">{errors.cardNumber}</p>
            )}
          </div>

          {/* Card Holder */}
          <div>
            <label className="block text-[#1A1A1A] dark:text-white font-bold mb-3">
              {t.cardHolder}
            </label>
            <input
              type="text"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
              className={`w-full px-6 py-5 rounded-2xl border-2 ${
                errors.cardHolder
                  ? "border-[#DC3545] bg-[#FFF5F5] dark:bg-[#DC3545]/10"
                  : "border-[#E0E0E0] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]"
              } text-[#1A1A1A] dark:text-white focus:outline-none focus:border-[#0CAA41] transition-colors uppercase`}
              placeholder="JOHN DOE"
            />
            {errors.cardHolder && (
              <p className="mt-2 text-[#DC3545] text-sm font-bold">{errors.cardHolder}</p>
            )}
          </div>

          {/* Expiry and CVV */}
          <div className="grid grid-cols-2 gap-4">
            {/* Expiry Date */}
            <div>
              <label className="block text-[#1A1A1A] dark:text-white font-bold mb-3">
                {t.expiryDate}
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A] dark:text-[#B0B0B0]" />
                <input
                  type="text"
                  value={expiryDate}
                  onChange={(e) => handleExpiryChange(e.target.value)}
                  className={`w-full pl-12 pr-4 py-5 rounded-2xl border-2 ${
                    errors.expiryDate
                      ? "border-[#DC3545] bg-[#FFF5F5] dark:bg-[#DC3545]/10"
                      : "border-[#E0E0E0] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]"
                  } text-[#1A1A1A] dark:text-white focus:outline-none focus:border-[#0CAA41] transition-colors font-mono`}
                  placeholder="MM/YY"
                />
              </div>
              {errors.expiryDate && (
                <p className="mt-2 text-[#DC3545] text-xs font-bold">{errors.expiryDate}</p>
              )}
            </div>

            {/* CVV */}
            <div>
              <label className="block text-[#1A1A1A] dark:text-white font-bold mb-3">
                {t.cvv}
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A] dark:text-[#B0B0B0]" />
                <input
                  type="password"
                  value={cvv}
                  onChange={(e) => handleCvvChange(e.target.value)}
                  className={`w-full pl-12 pr-4 py-5 rounded-2xl border-2 ${
                    errors.cvv
                      ? "border-[#DC3545] bg-[#FFF5F5] dark:bg-[#DC3545]/10"
                      : "border-[#E0E0E0] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]"
                  } text-[#1A1A1A] dark:text-white focus:outline-none focus:border-[#0CAA41] transition-colors font-mono text-lg`}
                  placeholder="•••"
                  maxLength={3}
                />
              </div>
              {errors.cvv && (
                <p className="mt-2 text-[#DC3545] text-xs font-bold">{errors.cvv}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="bg-white dark:bg-[#1E1E1E] px-6 py-6 space-y-3 border-t border-[#E0E0E0] dark:border-[#2A2A2A]">
        <button
          onClick={handleSubmit}
          className="w-full bg-[#0CAA41] text-white rounded-3xl py-7 hover:bg-[#0a8f37] transition-colors shadow-lg shadow-[#0CAA41]/20 font-bold text-xl"
        >
          {t.addCard}
        </button>
        <button
          onClick={onBack}
          className="w-full bg-white dark:bg-[#1E1E1E] border-2 border-[#E0E0E0] dark:border-[#2A2A2A] text-[#1A1A1A] dark:text-white rounded-3xl py-5 hover:bg-[#F5F8F3] dark:hover:bg-[#2A2A2A] transition-colors font-bold text-lg"
        >
          {t.cancel}
        </button>
      </div>
    </div>
  );
}