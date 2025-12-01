import { Plus, CreditCard, TrendingUp, Car, Wallet as WalletIcon, X } from "lucide-react";
import { BottomNav } from "./BottomNav";
import { GlobalSpeakerButton } from "./GlobalSpeakerButton";
import { useState, useEffect } from "react";
import { AddMoneyModal } from "./AddMoneyModal";
import { useReadAloud } from "./ReadAloudContext";

interface WalletScreenProps {
  onTabChange: (tab: "home" | "trips" | "wallet" | "profile") => void;
  speakerActive: boolean;
  onSpeakerToggle: () => void;
  language: "en" | "ur";
  walletBalance: number;
  onAddMoney: (amount: number) => void;
}

export function WalletScreen({ onTabChange, speakerActive, onSpeakerToggle, language, walletBalance, onAddMoney }: WalletScreenProps) {
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  
  const text = {
    en: {
      title: "My Wallet",
      balance: "Current Balance",
      available: "Available for rides",
      addMoney: "Add Money",
      recent: "Recent Transactions",
      rideTo: "Ride to",
      addedMoney: "Added money",
      mall: "Mall",
      hospital: "Hospital",
      selectAmount: "Select Amount",
      quickAmounts: "Quick Amounts",
      customAmount: "Custom Amount",
      confirm: "Confirm & Add",
      cancel: "Cancel"
    },
    ur: {
      title: "میرا والیٹ",
      balance: "موجودہ بیلنس",
      available: "سواریوں کے لیے دستیاب",
      addMoney: "رقم شامل کریں",
      recent: "حالیہ لین دین",
      rideTo: "سواری",
      addedMoney: "رقم شامل کی گئی",
      mall: "مال",
      hospital: "ہسپتال",
      selectAmount: "رقم منتخب کریں",
      quickAmounts: "فوری رقمیں",
      customAmount: "اپنی رقم",
      confirm: "تصدیق کریں اور شامل کریں",
      cancel: "منسوخ کریں"
    }
  };

  const t = text[language];

  const transactions = [
    {
      id: 1,
      title: language === "en" ? "Ride to Mall" : "مال تک سواری",
      date: language === "en" ? "Today, 2:30 PM" : "آج، 2:30 شام",
      amount: "-250",
      type: "ride",
    },
    {
      id: 2,
      title: t.addedMoney,
      date: language === "en" ? "Today, 1:00 PM" : "آج، 1:00 شام",
      amount: "+500",
      type: "deposit",
    },
    {
      id: 3,
      title: language === "en" ? "Ride to Hospital" : "ہسپتال تک سواری",
      date: language === "en" ? "Yesterday, 4:45 PM" : "کل، 4:45 شام",
      amount: "-180",
      type: "ride",
    },
  ];

  const readAloud = useReadAloud();

  // Text-to-speech when speaker is active
  useEffect(() => {
    if (speakerActive) {
      const ttsTexts = [
        t.title,
        `${t.balance}, ${walletBalance} ${language === 'en' ? 'Rupees' : 'روپے'}`,
        t.addMoney,
        t.recent
      ];
      readAloud.play(ttsTexts, 'Wallet Screen');
    } else {
      readAloud.stop();
    }
  }, [speakerActive]);

  return (
    <div className="flex flex-col h-screen bg-[#F5F8F3] dark:bg-[#121212]">
      {/* Header */}
      <div className="bg-white dark:bg-[#1E1E1E] px-5 py-6 border-b border-[#E0E0E0] dark:border-[#2A2A2A] flex items-center justify-between">
        <h2 className="text-[#1A1A1A] dark:text-white font-bold flex-1 text-center" style={{ fontSize: '24px' }}>
          {t.title}
        </h2>
        <GlobalSpeakerButton isActive={speakerActive} onToggle={onSpeakerToggle} />
      </div>

      {/* Content */}
      <div className="flex-1 px-5 pt-6 pb-28 overflow-y-auto">
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-[#0CAA41] to-[#0a8f37] rounded-3xl p-8 mb-6 shadow-xl">
          <div className="text-white mb-2 font-bold opacity-90" style={{ fontSize: '16px' }}>{t.balance}</div>
          <div className="text-white font-bold mb-4" style={{ fontSize: '48px' }}>Rs {walletBalance}</div>
          <div className="flex items-center gap-2 text-white font-bold">
            <TrendingUp className="w-5 h-5" strokeWidth={2.5} />
            <span style={{ fontSize: '14px' }}>{t.available}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <button 
          className="bg-[#0CAA41] text-white rounded-3xl py-6 px-6 flex items-center justify-center gap-3 hover:bg-[#0a8f37] transition-colors shadow-lg w-full mb-6" 
          onClick={() => setShowAddMoneyModal(true)}
        >
          <Plus className="w-8 h-8" strokeWidth={2.5} />
          <span className="font-bold" style={{ fontSize: '18px' }}>{t.addMoney}</span>
        </button>

        {/* Recent Transactions */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 border border-[#E0E0E0] dark:border-[#2A2A2A]">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#E0E0E0] dark:border-[#2A2A2A]">
            <TrendingUp className="w-6 h-6 text-[#0CAA41]" strokeWidth={2.5} />
            <h3 className="text-[#1A1A1A] dark:text-white font-bold" style={{ fontSize: '20px' }}>{t.recent}</h3>
          </div>

          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between py-4 border-b border-[#E0E0E0] dark:border-[#2A2A2A] last:border-0"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    transaction.type === "ride"
                      ? "bg-[#DC3545]/10"
                      : "bg-[#0CAA41]/10"
                  }`}>
                    {transaction.type === "ride" ? (
                      <Car className="w-6 h-6 text-[#DC3545]" strokeWidth={2.5} />
                    ) : (
                      <WalletIcon className="w-6 h-6 text-[#0CAA41]" strokeWidth={2.5} />
                    )}
                  </div>
                  <div>
                    <div className="text-[#1A1A1A] dark:text-white font-bold mb-1" style={{ fontSize: '16px' }}>
                      {transaction.title}
                    </div>
                    <div className="text-[#6B6B6B] dark:text-[#B0B0B0] font-bold" style={{ fontSize: '12px' }}>
                      {transaction.date}
                    </div>
                  </div>
                </div>
                <div className={`font-bold ${
                  transaction.amount.startsWith("-")
                    ? "text-[#DC3545]"
                    : "text-[#0CAA41]"
                }`} style={{ fontSize: '18px' }}>
                  Rs {transaction.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Money Modal */}
      {showAddMoneyModal && (
        <AddMoneyModal
          onClose={() => setShowAddMoneyModal(false)}
          language={language}
        />
      )}

      {/* Bottom Navigation */}
      <BottomNav activeTab="wallet" onTabChange={onTabChange} language={language} />
    </div>
  );
}