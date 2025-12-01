import { ArrowLeft, Banknote, CreditCard, Wallet, Plus, Check, Trash2 } from "lucide-react";
import { useState } from "react";
import { GlobalSpeakerButton } from "./GlobalSpeakerButton";

interface PaymentMethod {
  id: string;
  type: "cash" | "card" | "wallet";
  name: string;
  details?: string;
  last4?: string;
}

interface PaymentMethodsScreenProps {
  onBack: () => void;
  onAddPaymentMethod: () => void;
  speakerActive: boolean;
  onSpeakerToggle: () => void;
  language: "en" | "ur";
  paymentMethods: PaymentMethod[];
  selectedPaymentId: string;
  onPaymentSelect: (id: string) => void;
  onRemovePayment: (id: string) => void;
}

export function PaymentMethodsScreen({
  onBack,
  onAddPaymentMethod,
  speakerActive,
  onSpeakerToggle,
  language,
  paymentMethods,
  selectedPaymentId,
  onPaymentSelect,
  onRemovePayment
}: PaymentMethodsScreenProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const text = {
    en: {
      title: "Payment Methods",
      selectPayment: "Select Payment Method",
      addNew: "Add Payment Method",
      cash: "Cash",
      cashDesc: "Pay driver in cash",
      card: "Credit/Debit Card",
      wallet: "Mobile Wallet",
      remove: "Remove",
      confirmDelete: "Remove this payment method?",
      cancel: "Cancel",
      default: "Default"
    },
    ur: {
      title: "ادائیگی کے طریقے",
      selectPayment: "ادائیگی کا طریقہ منتخب کریں",
      addNew: "ادائیگی کا طریقہ شامل کریں",
      cash: "نقد",
      cashDesc: "ڈرائیور کو نقد ادا کریں",
      card: "کریڈٹ/ڈیبٹ کارڈ",
      wallet: "موبائل والیٹ",
      remove: "ہٹائیں",
      confirmDelete: "یہ ادائیگی کا طریقہ ہٹائیں؟",
      cancel: "منسوخ کریں",
      default: "ڈیفالٹ"
    }
  };

  const t = text[language];

  const getIcon = (type: string) => {
    switch (type) {
      case "cash":
        return <Banknote className="w-7 h-7 text-[#0CAA41]" strokeWidth={2.5} />;
      case "card":
        return <CreditCard className="w-7 h-7 text-[#0CAA41]" strokeWidth={2.5} />;
      case "wallet":
        return <Wallet className="w-7 h-7 text-[#0CAA41]" strokeWidth={2.5} />;
      default:
        return <Banknote className="w-7 h-7 text-[#0CAA41]" strokeWidth={2.5} />;
    }
  };

  const handleDelete = (id: string) => {
    if (id !== "cash") { // Don't allow removing cash
      setShowDeleteConfirm(id);
    }
  };

  const confirmDelete = () => {
    if (showDeleteConfirm) {
      onRemovePayment(showDeleteConfirm);
      setShowDeleteConfirm(null);
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
        <h2 className="text-[#1A1A1A] dark:text-white font-bold mb-5 text-lg">
          {t.selectPayment}
        </h2>

        {/* Payment Methods List */}
        <div className="space-y-4 mb-6">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              onClick={() => onPaymentSelect(method.id)}
              className={`bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 border-2 ${
                selectedPaymentId === method.id
                  ? "border-[#0CAA41] shadow-lg shadow-[#0CAA41]/10"
                  : "border-[#E0E0E0] dark:border-[#2A2A2A]"
              } transition-all cursor-pointer hover:shadow-md`}
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div className="w-14 h-14 bg-[#0CAA41]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  {getIcon(method.type)}
                </div>

                {/* Details */}
                <div className="flex-1">
                  <h3 className="text-[#1A1A1A] dark:text-white font-bold text-lg mb-1">
                    {method.name}
                  </h3>
                  {method.details && (
                    <p className="text-[#4A4A4A] dark:text-[#B0B0B0] font-semibold">
                      {method.details}
                    </p>
                  )}
                  {method.last4 && (
                    <p className="text-[#4A4A4A] dark:text-[#B0B0B0] font-semibold">
                      •••• {method.last4}
                    </p>
                  )}
                  {method.id === "cash" && (
                    <p className="text-[#4A4A4A] dark:text-[#B0B0B0] font-semibold text-sm mt-1">
                      {t.default}
                    </p>
                  )}
                </div>

                {/* Selection Indicator & Delete */}
                <div className="flex items-center gap-3">
                  {selectedPaymentId === method.id && (
                    <div className="w-7 h-7 bg-[#0CAA41] rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" strokeWidth={3} />
                    </div>
                  )}
                  {method.id !== "cash" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(method.id);
                      }}
                      className="w-11 h-11 rounded-full bg-[#DC3545]/10 hover:bg-[#DC3545]/20 flex items-center justify-center transition-colors"
                    >
                      <Trash2 className="w-5 h-5 text-[#DC3545]" strokeWidth={2.5} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Payment Method Button */}
        <button
          onClick={onAddPaymentMethod}
          className="w-full bg-white dark:bg-[#1E1E1E] border-2 border-dashed border-[#0CAA41] rounded-3xl py-7 flex items-center justify-center gap-3 hover:bg-[#0CAA41]/5 transition-colors"
        >
          <Plus className="w-6 h-6 text-[#0CAA41]" strokeWidth={2.5} />
          <span className="text-[#0CAA41] font-bold text-lg">{t.addNew}</span>
        </button>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6">
          <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-8 max-w-sm w-full">
            <h3 className="text-[#1A1A1A] dark:text-white font-bold text-xl mb-6 text-center">
              {t.confirmDelete}
            </h3>
            <div className="space-y-3">
              <button
                onClick={confirmDelete}
                className="w-full bg-[#DC3545] text-white rounded-2xl py-5 font-bold hover:bg-[#c82333] transition-colors"
              >
                {t.remove}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="w-full bg-[#F5F8F3] dark:bg-[#2A2A2A] text-[#1A1A1A] dark:text-white rounded-2xl py-5 font-bold hover:bg-[#E0E0E0] dark:hover:bg-[#3A3A3A] transition-colors"
              >
                {t.cancel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}