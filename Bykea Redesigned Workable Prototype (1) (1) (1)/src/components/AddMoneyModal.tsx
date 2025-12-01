import { X, Wallet, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface AddMoneyModalProps {
  onClose: () => void;
  language: "en" | "ur";
}

export function AddMoneyModal({ onClose, language }: AddMoneyModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const text = {
    en: {
      title: "Add Money to Wallet",
      selectAmount: "Select Amount",
      customAmount: "Custom Amount",
      addMoney: "Add Money",
      processing: "Processing...",
      success: "Money Added Successfully!",
      done: "Done"
    },
    ur: {
      title: "والیٹ میں رقم شامل کریں",
      selectAmount: "رقم منتخب کریں",
      customAmount: "حسب ضرورت رقم",
      addMoney: "رقم شامل کریں",
      processing: "پروسیسنگ...",
      success: "رقم کامیابی سے شامل ہو گئی!",
      done: "مکمل"
    }
  };

  const t = text[language];

  const presetAmounts = [500, 1000, 2000, 5000];

  const handleAddMoney = () => {
    const amount = selectedAmount || parseInt(customAmount);
    if (amount) {
      setIsProcessing(true);
      // Simulate processing
      setTimeout(() => {
        setIsProcessing(false);
        setIsSuccess(true);
        setTimeout(() => {
          onClose();
        }, 2000);
      }, 2000);
    }
  };

  const totalAmount = selectedAmount || (customAmount ? parseInt(customAmount) : 0);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-end justify-center z-50 animate-fadeIn">
      <div className="bg-white dark:bg-[#1E1E1E] rounded-t-[2.5rem] w-full max-w-2xl max-h-[85vh] overflow-y-auto animate-slideUp">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-[#1E1E1E] px-6 py-5 border-b border-[#E0E0E0] dark:border-[#2A2A2A] flex items-center justify-between">
          <h2 className="text-[#1A1A1A] dark:text-white font-bold text-xl">{t.title}</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#F5F8F3] dark:bg-[#2A2A2A] flex items-center justify-center hover:bg-[#E0E0E0] dark:hover:bg-[#3A3A3A] transition-colors"
          >
            <X className="w-6 h-6 text-[#1A1A1A] dark:text-white" strokeWidth={2.5} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {isSuccess ? (
            /* Success State */
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-[#0CAA41]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-16 h-16 text-[#0CAA41]" strokeWidth={2.5} />
              </div>
              <h3 className="text-[#0CAA41] font-bold text-2xl mb-3">{t.success}</h3>
              <p className="text-[#1A1A1A] dark:text-white font-bold text-3xl">
                Rs. {totalAmount.toLocaleString()}
              </p>
            </div>
          ) : isProcessing ? (
            /* Processing State */
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-[#0CAA41]/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Wallet className="w-16 h-16 text-[#0CAA41]" strokeWidth={2} />
              </div>
              <h3 className="text-[#1A1A1A] dark:text-white font-bold text-2xl">{t.processing}</h3>
            </div>
          ) : (
            /* Selection State */
            <>
              {/* Preset Amounts */}
              <div className="mb-6">
                <label className="block text-[#1A1A1A] dark:text-white font-bold mb-4">
                  {t.selectAmount}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {presetAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount("");
                      }}
                      className={`py-6 rounded-2xl border-2 font-bold text-xl transition-all ${
                        selectedAmount === amount
                          ? "border-[#0CAA41] bg-[#0CAA41]/5 text-[#0CAA41] shadow-md"
                          : "border-[#E0E0E0] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] text-[#1A1A1A] dark:text-white"
                      }`}
                    >
                      Rs. {amount.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div className="mb-8">
                <label className="block text-[#1A1A1A] dark:text-white font-bold mb-3">
                  {t.customAmount}
                </label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[#4A4A4A] dark:text-[#B0B0B0] font-bold text-lg">
                    Rs.
                  </span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                    className="w-full pl-16 pr-6 py-6 rounded-2xl border-2 border-[#E0E0E0] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] text-[#1A1A1A] dark:text-white focus:outline-none focus:border-[#0CAA41] transition-colors font-bold text-xl"
                    placeholder="Enter amount"
                    min="0"
                  />
                </div>
              </div>

              {/* Total Display */}
              {totalAmount > 0 && (
                <div className="bg-[#E8F5EC] dark:bg-[#0CAA41]/10 rounded-2xl p-6 mb-6 border-2 border-[#0CAA41]/30">
                  <div className="flex items-center justify-between">
                    <span className="text-[#1A1A1A] dark:text-white font-bold text-lg">
                      Total Amount:
                    </span>
                    <span className="text-[#0CAA41] font-bold text-3xl">
                      Rs. {totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              )}

              {/* Add Money Button */}
              <button
                onClick={handleAddMoney}
                disabled={totalAmount === 0}
                className={`w-full rounded-3xl py-7 font-bold text-xl flex items-center justify-center gap-3 transition-all ${
                  totalAmount > 0
                    ? "bg-[#0CAA41] text-white hover:bg-[#0a8f37] shadow-lg shadow-[#0CAA41]/20"
                    : "bg-[#E0E0E0] dark:bg-[#2A2A2A] text-[#4A4A4A] dark:text-[#B0B0B0] cursor-not-allowed"
                }`}
              >
                <Wallet className="w-6 h-6" strokeWidth={2.5} />
                {t.addMoney}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
