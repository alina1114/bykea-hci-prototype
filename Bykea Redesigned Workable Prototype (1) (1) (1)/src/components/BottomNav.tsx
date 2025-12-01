import { Home, Car, User, Wallet } from "lucide-react";

interface BottomNavProps {
  activeTab: "home" | "trips" | "wallet" | "profile";
  onTabChange: (tab: "home" | "trips" | "wallet" | "profile") => void;
  language?: "en" | "ur";
}

export function BottomNav({ activeTab, onTabChange, language = "en" }: BottomNavProps) {
  const text = {
    en: {
      home: "Home",
      trips: "My Trips",
      wallet: "Wallet",
      profile: "Profile"
    },
    ur: {
      home: "ہوم",
      trips: "میرے سفر",
      wallet: "والیٹ",
      profile: "پروفائل"
    }
  };

  const t = text[language];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1E1E1E] border-t border-[#E0E0E0] dark:border-[#2A2A2A] mx-auto max-w-md shadow-lg z-50">
      <div className="grid grid-cols-4 h-16">
        <button
          onClick={() => onTabChange("home")}
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            activeTab === "home"
              ? "text-[#0CAA41]"
              : "text-[#4A4A4A] dark:text-[#B0B0B0]"
          }`}
        >
          <Home className="w-5 h-5" strokeWidth={2.5} />
          <span className="font-bold" style={{ fontSize: '11px' }}>{t.home}</span>
        </button>
        
        <button
          onClick={() => onTabChange("trips")}
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            activeTab === "trips"
              ? "text-[#0CAA41]"
              : "text-[#4A4A4A] dark:text-[#B0B0B0]"
          }`}
        >
          <Car className="w-5 h-5" strokeWidth={2.5} />
          <span className="font-bold" style={{ fontSize: '11px' }}>{t.trips}</span>
        </button>
        
        <button
          onClick={() => onTabChange("wallet")}
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            activeTab === "wallet"
              ? "text-[#0CAA41]"
              : "text-[#4A4A4A] dark:text-[#B0B0B0]"
          }`}
        >
          <Wallet className="w-5 h-5" strokeWidth={2.5} />
          <span className="font-bold" style={{ fontSize: '11px' }}>{t.wallet}</span>
        </button>
        
        <button
          onClick={() => onTabChange("profile")}
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            activeTab === "profile"
              ? "text-[#0CAA41]"
              : "text-[#4A4A4A] dark:text-[#B0B0B0]"
          }`}
        >
          <User className="w-5 h-5" strokeWidth={2.5} />
          <span className="font-bold" style={{ fontSize: '11px' }}>{t.profile}</span>
        </button>
      </div>
    </div>
  );
}