import { User, ChevronRight, LogOut, Edit3, Volume2 } from "lucide-react";
import { BottomNav } from "./BottomNav";
import { GlobalSpeakerButton } from "./GlobalSpeakerButton";
import { useReadAloud } from "./ReadAloudContext";
import { useEffect } from "react";

interface ProfileScreenProps {
  onTabChange: (tab: "home" | "trips" | "wallet" | "profile") => void;
  onNavigate: (screen: string) => void;
  speakerActive: boolean;
  onSpeakerToggle: () => void;
  language: "en" | "ur";
  userProfile: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

export function ProfileScreen({ onTabChange, onNavigate, speakerActive, onSpeakerToggle, language, userProfile }: ProfileScreenProps) {
  const text = {
    en: {
      title: "My Profile",
      edit: "Edit Profile",
      accountInfo: "Account Information",
      fullName: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      savedAddresses: "Saved Addresses",
      paymentMethods: "Payment Methods",
      logout: "Log Out",
      rideHistory: "Ride History"
    },
    ur: {
      title: "میری پروفائل",
      edit: "پروفائل میں ترمیم کریں",
      accountInfo: "اکاؤنٹ کی معلومات",
      fullName: "مکمل نام",
      email: "ای میل ایڈریس",
      phone: "فون نمبر",
      savedAddresses: "محفوظ شدہ پتے",
      paymentMethods: "ادائیگی کے طریقے",
      logout: "لاگ آؤٹ",
      rideHistory: "رائڈ ہسٹری"
    }
  };

  const t = text[language];
  const fullName = `${userProfile.firstName} ${userProfile.lastName}`.trim() || "User";

  const readAloud = useReadAloud();

  // Text-to-speech when speaker is active
  useEffect(() => {
    if (speakerActive) {
      const ttsTexts = [
        t.title,
        fullName,
        t.edit,
        t.accountInfo,
        t.rideHistory,
        t.savedAddresses,
        t.paymentMethods,
        t.logout
      ];
      readAloud.play(ttsTexts, 'Profile Screen');
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
        {/* Profile Card */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 mb-6 border border-[#E0E0E0] dark:border-[#2A2A2A]">
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-[#0CAA41]/20 to-[#0CAA41]/10 rounded-3xl flex items-center justify-center border-2 border-[#0CAA41]/20 mb-4">
              <User className="w-12 h-12 text-[#0CAA41]" strokeWidth={2.5} />
            </div>
            <h3 className="text-[#1A1A1A] dark:text-white font-bold mb-1" style={{ fontSize: '20px' }}>
              {fullName}
            </h3>
            <p className="text-[#4A4A4A] dark:text-[#B0B0B0] font-bold" style={{ fontSize: '16px' }}>
              {userProfile.phone || "+92 300 0000000"}
            </p>
          </div>

          <button 
            onClick={() => onNavigate("editProfile")}
            className="w-full bg-[#0CAA41] text-white rounded-3xl py-6 flex items-center justify-center gap-3 hover:bg-[#0a8f37] transition-colors shadow-lg font-bold" style={{ fontSize: '18px' }}>
            <Edit3 className="w-5 h-5" strokeWidth={2.5} />
            <span>{t.edit}</span>
          </button>
        </div>

        {/* Account Info */}
        <h2 className="mb-4 text-[#1A1A1A] dark:text-white font-bold" style={{ fontSize: '18px' }}>
          {t.accountInfo}
        </h2>

        <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl overflow-hidden border border-[#E0E0E0] dark:border-[#2A2A2A] mb-6">
          <div className="p-5 border-b border-[#E0E0E0] dark:border-[#2A2A2A]">
            <div className="text-[#4A4A4A] dark:text-[#B0B0B0] mb-2 font-bold" style={{ fontSize: '14px' }}>{t.fullName}</div>
            <div className="text-[#1A1A1A] dark:text-white font-bold" style={{ fontSize: '16px' }}>{fullName}</div>
          </div>
          <div className="p-5 border-b border-[#E0E0E0] dark:border-[#2A2A2A]">
            <div className="text-[#4A4A4A] dark:text-[#B0B0B0] mb-2 font-bold" style={{ fontSize: '14px' }}>{t.phone}</div>
            <div className="text-[#1A1A1A] dark:text-white font-bold" style={{ fontSize: '16px' }}>{userProfile.phone || "+92 300 0000000"}</div>
          </div>
          <div className="p-5">
            <div className="text-[#4A4A4A] dark:text-[#B0B0B0] mb-2 font-bold" style={{ fontSize: '14px' }}>{t.email}</div>
            <div className="text-[#1A1A1A] dark:text-white font-bold" style={{ fontSize: '16px' }}>{userProfile.email || "user@example.com"}</div>
          </div>
        </div>

        {/* Menu Options */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl overflow-hidden border border-[#E0E0E0] dark:border-[#2A2A2A] mb-6">
          <button 
            onClick={() => onNavigate("trips")}
            className="w-full p-5 flex items-center justify-between border-b border-[#E0E0E0] dark:border-[#2A2A2A] hover:bg-[#F5F8F3] dark:hover:bg-[#2A2A2A] transition-colors">
            <span className="text-[#1A1A1A] dark:text-white font-bold" style={{ fontSize: '16px' }}>{t.rideHistory}</span>
            <ChevronRight className="w-5 h-5 text-[#4A4A4A] dark:text-[#B0B0B0]" strokeWidth={2.5} />
          </button>

          <button 
            onClick={() => onNavigate("savedAddresses")}
            className="w-full p-5 flex items-center justify-between border-b border-[#E0E0E0] dark:border-[#2A2A2A] hover:bg-[#F5F8F3] dark:hover:bg-[#2A2A2A] transition-colors">
            <span className="text-[#1A1A1A] dark:text-white font-bold" style={{ fontSize: '16px' }}>{t.savedAddresses}</span>
            <ChevronRight className="w-5 h-5 text-[#4A4A4A] dark:text-[#B0B0B0]" strokeWidth={2.5} />
          </button>

          <button 
            onClick={() => onNavigate("paymentMethods")}
            className="w-full p-5 flex items-center justify-between hover:bg-[#F5F8F3] dark:hover:bg-[#2A2A2A] transition-colors">
            <span className="text-[#1A1A1A] dark:text-white font-bold" style={{ fontSize: '16px' }}>{t.paymentMethods}</span>
            <ChevronRight className="w-5 h-5 text-[#4A4A4A] dark:text-[#B0B0B0]" strokeWidth={2.5} />
          </button>
        </div>

        {/* Logout Button */}
        <button className="w-full bg-white dark:bg-[#1E1E1E] text-[#DC3545] rounded-3xl py-6 flex items-center justify-center gap-3 hover:bg-[#FFF5F5] dark:hover:bg-[#2A2A2A] transition-colors font-bold border border-[#E0E0E0] dark:border-[#2A2A2A]" style={{ fontSize: '18px' }}>
          <LogOut className="w-5 h-5" strokeWidth={2.5} />
          <span>{t.logout}</span>
        </button>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab="profile" onTabChange={onTabChange} language={language} />
    </div>
  );
}