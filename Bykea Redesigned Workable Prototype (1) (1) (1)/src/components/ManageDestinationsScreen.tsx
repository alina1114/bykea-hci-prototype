import { ArrowLeft, Home, MapPin, Building2, ShoppingBag, X, Plus } from "lucide-react";
import { useState } from "react";
import { GlobalSpeakerButton } from "./GlobalSpeakerButton";
import { MosqueIcon } from "./icons/MosqueIcon";

interface ManageDestinationsScreenProps {
  onBack: () => void;
  speakerActive: boolean;
  onSpeakerToggle: () => void;
  language: "en" | "ur";
}

interface Destination {
  id: string;
  label: string;
  address: string;
  icon: string;
}

export function ManageDestinationsScreen({ 
  onBack, 
  speakerActive, 
  onSpeakerToggle,
  language 
}: ManageDestinationsScreenProps) {
  const [destinations, setDestinations] = useState<Destination[]>([
    { id: "1", label: "Home", address: "123 Main Street, Karachi", icon: "home" },
    { id: "2", label: "Office", address: "456 Business Ave, Karachi", icon: "building" },
    { id: "3", label: "Mosque", address: "Masjid Al-Noor, Block 5", icon: "mosque" },
    { id: "4", label: "Mall", address: "Lucky One Mall, Rashid Minhas Rd", icon: "mall" }
  ]);

  const [isAdding, setIsAdding] = useState(false);

  const text = {
    en: {
      title: "Manage Destinations",
      add: "Add New Destination",
      remove: "Remove",
      edit: "Edit",
      saved: "Quick Destinations"
    },
    ur: {
      title: "منزلوں کا انتظام",
      add: "نئی منزل شامل کریں",
      remove: "ہٹائیں",
      edit: "ترمیم",
      saved: "فوری منزلیں"
    }
  };

  const t = text[language];

  const getIcon = (iconName: string) => {
    switch(iconName) {
      case "home": return <Home className="w-6 h-6 text-[#0CAA41]" strokeWidth={2.5} />;
      case "building": return <Building2 className="w-6 h-6 text-[#0CAA41]" strokeWidth={2.5} />;
      case "mosque": return <MosqueIcon className="w-6 h-6 text-[#0CAA41]" />;
      case "mall": return <ShoppingBag className="w-6 h-6 text-[#0CAA41]" strokeWidth={2.5} />;
      default: return <MapPin className="w-6 h-6 text-[#0CAA41]" strokeWidth={2.5} />;
    }
  };

  const handleRemove = (id: string) => {
    setDestinations(destinations.filter(d => d.id !== id));
  };

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
        <h1 className="text-[#1A1A1A] dark:text-white font-bold flex-1 text-center" style={{ fontSize: '20px' }}>
          {t.title}
        </h1>
        <GlobalSpeakerButton isActive={speakerActive} onToggle={onSpeakerToggle} />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <p className="text-[#6B6B6B] dark:text-[#B0B0B0] mb-6 font-bold" style={{ fontSize: '16px' }}>
          {t.saved}
        </p>

        {/* Destinations List */}
        <div className="space-y-3 mb-6">
          {destinations.map((dest) => (
            <div 
              key={dest.id}
              className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-5 border border-[#E0E0E0] dark:border-[#2A2A2A] flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-[#E8F5EC] dark:bg-[#0CAA41]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                {getIcon(dest.icon)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[#1A1A1A] dark:text-white font-bold mb-1" style={{ fontSize: '18px' }}>
                  {dest.label}
                </h3>
                <p className="text-[#6B6B6B] dark:text-[#B0B0B0] truncate" style={{ fontSize: '14px' }}>
                  {dest.address}
                </p>
              </div>
              <button
                onClick={() => handleRemove(dest.id)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#FFF5F5] dark:hover:bg-[#DC3545]/10 transition-colors"
              >
                <X className="w-5 h-5 text-[#DC3545]" strokeWidth={2.5} />
              </button>
            </div>
          ))}
        </div>

        {/* Add Button */}
        <button
          onClick={() => setIsAdding(true)}
          className="w-full bg-[#0CAA41] text-white rounded-2xl py-4 flex items-center justify-center gap-3 font-bold hover:bg-[#0a8f37] transition-colors shadow-lg shadow-[#0CAA41]/20"
          style={{ fontSize: '18px', height: '56px' }}
        >
          <Plus className="w-6 h-6" strokeWidth={2.5} />
          {t.add}
        </button>
      </div>
    </div>
  );
}
