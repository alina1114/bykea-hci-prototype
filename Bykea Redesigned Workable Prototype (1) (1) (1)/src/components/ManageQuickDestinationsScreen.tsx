import { ArrowLeft, Home, MapPin, Building2, ShoppingBag, X, Plus, Check } from "lucide-react";
import { GlobalSpeakerButton } from "./GlobalSpeakerButton";
import { MosqueIcon } from "./icons/MosqueIcon";
import { HospitalIcon } from "./icons/HospitalIcon";
import { useState } from "react";

interface Destination {
  id: string;
  name: string;
  nameUr: string;
  icon: string;
}

interface ManageQuickDestinationsScreenProps {
  onBack: () => void;
  speakerActive: boolean;
  onSpeakerToggle: () => void;
  language: "en" | "ur";
  activeDestinations: string[];
  onDestinationsChange: (destinations: string[]) => void;
}

export function ManageQuickDestinationsScreen({ 
  onBack, 
  speakerActive, 
  onSpeakerToggle, 
  language,
  activeDestinations,
  onDestinationsChange
}: ManageQuickDestinationsScreenProps) {
  const [showAddMenu, setShowAddMenu] = useState(false);

  const allDestinations: Destination[] = [
    { id: "home", name: "Home", nameUr: "گھر", icon: "home" },
    { id: "mosque", name: "Mosque", nameUr: "مسجد", icon: "mosque" },
    { id: "hospital", name: "Hospital", nameUr: "ہسپتال", icon: "hospital" },
    { id: "market", name: "Market", nameUr: "بازار", icon: "market" },
    { id: "office", name: "Office", nameUr: "دفتر", icon: "office" },
    { id: "school", name: "School", nameUr: "سکول", icon: "school" },
    { id: "gym", name: "Gym", nameUr: "جم", icon: "gym" },
    { id: "restaurant", name: "Restaurant", nameUr: "ریسٹورنٹ", icon: "restaurant" },
  ];

  const text = {
    en: {
      title: "Manage Quick Destinations",
      current: "Current Quick Destinations",
      add: "Add New Destination",
      remove: "Remove",
      available: "Available Destinations",
      select: "Select destinations to add",
      done: "Done"
    },
    ur: {
      title: "فوری منزلوں کا انتظام",
      current: "موجودہ فوری منزلیں",
      add: "نئی منزل شامل کریں",
      remove: "ہٹائیں",
      available: "دستیاب منزلیں",
      select: "شامل کرنے کے لیے منزلیں منتخب کریں",
      done: "مکمل"
    }
  };

  const t = text[language];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "home": return <Home className="w-6 h-6 text-[#0CAA41]" strokeWidth={2.5} />;
      case "mosque": return <MosqueIcon className="w-6 h-6 text-[#0CAA41]" />;
      case "hospital": return <HospitalIcon className="w-6 h-6 text-[#0CAA41]" />;
      case "market": return <ShoppingBag className="w-6 h-6 text-[#0CAA41]" strokeWidth={2.5} />;
      case "office": return <Building2 className="w-6 h-6 text-[#0CAA41]" strokeWidth={2.5} />;
      case "school": return <Building2 className="w-6 h-6 text-[#0CAA41]" strokeWidth={2.5} />;
      case "gym": return <Building2 className="w-6 h-6 text-[#0CAA41]" strokeWidth={2.5} />;
      case "restaurant": return <ShoppingBag className="w-6 h-6 text-[#0CAA41]" strokeWidth={2.5} />;
      default: return <MapPin className="w-6 h-6 text-[#0CAA41]" strokeWidth={2.5} />;
    }
  };

  const handleRemove = (id: string) => {
    const updated = activeDestinations.filter(d => d !== id);
    onDestinationsChange(updated);
  };

  const handleAdd = (id: string) => {
    if (!activeDestinations.includes(id)) {
      onDestinationsChange([...activeDestinations, id]);
    }
    setShowAddMenu(false);
  };

  const activeDestList = allDestinations.filter(d => activeDestinations.includes(d.id));
  const availableDestList = allDestinations.filter(d => !activeDestinations.includes(d.id));

  return (
    <div className="flex flex-col h-screen bg-[#F5F8F3] dark:bg-[#121212]">
      {/* Header */}
      <div className="bg-white dark:bg-[#1E1E1E] px-6 py-4 flex items-center justify-between border-b border-[#E0E0E0] dark:border-[#2A2A2A]">
        <button 
          onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-[#F5F8F3] dark:hover:bg-[#2A2A2A] transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-[#1A1A1A] dark:text-white" strokeWidth={2.5} />
        </button>
        <h1 className="text-[#1A1A1A] dark:text-white font-bold flex-1 text-center px-4" style={{ fontSize: '20px' }}>
          {t.title}
        </h1>
        <GlobalSpeakerButton isActive={speakerActive} onToggle={onSpeakerToggle} />
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        {/* Current Destinations */}
        <h2 className="text-[#1A1A1A] dark:text-white font-bold mb-4" style={{ fontSize: '18px' }}>
          {t.current}
        </h2>

        <div className="space-y-3 mb-6">
          {activeDestList.length === 0 ? (
            <div className="text-center py-8 bg-white dark:bg-[#1E1E1E] rounded-2xl border border-[#E0E0E0] dark:border-[#2A2A2A]">
              <p className="text-[#6B6B6B] dark:text-[#B0B0B0] font-bold" style={{ fontSize: '14px' }}>
                {language === "en" ? "No quick destinations yet" : "ابھی کوئی فوری منزلیں نہیں"}
              </p>
            </div>
          ) : (
            activeDestList.map((dest) => (
              <div
                key={dest.id}
                className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-4 flex items-center justify-between border border-[#E0E0E0] dark:border-[#2A2A2A]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#0CAA41]/10 rounded-2xl flex items-center justify-center">
                    {getIcon(dest.icon)}
                  </div>
                  <span className="text-[#1A1A1A] dark:text-white font-bold" style={{ fontSize: '16px' }}>
                    {language === "en" ? dest.name : dest.nameUr}
                  </span>
                </div>
                <button
                  onClick={() => handleRemove(dest.id)}
                  className="w-10 h-10 bg-[#DC3545]/10 rounded-full flex items-center justify-center hover:bg-[#DC3545]/20 transition-colors"
                >
                  <X className="w-5 h-5 text-[#DC3545]" strokeWidth={2.5} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Add New Button */}
        <button
          onClick={() => setShowAddMenu(!showAddMenu)}
          className="w-full bg-[#0CAA41] text-white rounded-2xl py-4 px-6 flex items-center justify-center gap-3 hover:bg-[#0a8f37] transition-colors shadow-lg font-bold mb-6"
          style={{ fontSize: '16px' }}
        >
          <Plus className="w-5 h-5" strokeWidth={2.5} />
          <span>{t.add}</span>
        </button>

        {/* Add Menu */}
        {showAddMenu && (
          <div className="space-y-3">
            <h3 className="text-[#1A1A1A] dark:text-white font-bold mb-3" style={{ fontSize: '16px' }}>
              {t.available}
            </h3>
            {availableDestList.length === 0 ? (
              <div className="text-center py-8 bg-white dark:bg-[#1E1E1E] rounded-2xl border border-[#E0E0E0] dark:border-[#2A2A2A]">
                <p className="text-[#6B6B6B] dark:text-[#B0B0B0] font-bold" style={{ fontSize: '14px' }}>
                  {language === "en" ? "All destinations added" : "تمام منزلیں شامل ہیں"}
                </p>
              </div>
            ) : (
              availableDestList.map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => handleAdd(dest.id)}
                  className="w-full bg-white dark:bg-[#1E1E1E] rounded-2xl p-4 flex items-center justify-between border border-[#E0E0E0] dark:border-[#2A2A2A] hover:border-[#0CAA41] hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#0CAA41]/10 rounded-2xl flex items-center justify-center">
                      {getIcon(dest.icon)}
                    </div>
                    <span className="text-[#1A1A1A] dark:text-white font-bold" style={{ fontSize: '16px' }}>
                      {language === "en" ? dest.name : dest.nameUr}
                    </span>
                  </div>
                  <div className="w-8 h-8 border-2 border-[#0CAA41] rounded-full flex items-center justify-center">
                    <Plus className="w-4 h-4 text-[#0CAA41]" strokeWidth={3} />
                  </div>
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
