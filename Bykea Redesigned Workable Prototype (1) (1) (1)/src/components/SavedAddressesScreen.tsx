import { ArrowLeft, Home, MapPin, Building2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { GlobalSpeakerButton } from "./GlobalSpeakerButton";

interface SavedAddress {
  id: string;
  title: string;
  address: string;
  icon: "home" | "work" | "location";
}

interface SavedAddressesScreenProps {
  onBack: () => void;
  onAddAddress: () => void;
  speakerActive: boolean;
  onSpeakerToggle: () => void;
  language: "en" | "ur";
  savedAddresses: SavedAddress[];
  onRemoveAddress: (id: string) => void;
}

export function SavedAddressesScreen({
  onBack,
  onAddAddress,
  speakerActive,
  onSpeakerToggle,
  language,
  savedAddresses,
  onRemoveAddress
}: SavedAddressesScreenProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const text = {
    en: {
      title: "Saved Addresses",
      noAddresses: "No saved addresses yet",
      addNew: "Add New Address",
      confirmDelete: "Remove this address?",
      remove: "Remove",
      cancel: "Cancel"
    },
    ur: {
      title: "محفوظ شدہ پتے",
      noAddresses: "ابھی تک کوئی محفوظ شدہ پتہ نہیں",
      addNew: "نیا پتہ شامل کریں",
      confirmDelete: "یہ پتہ ہٹائیں؟",
      remove: "ہٹائیں",
      cancel: "منسوخ کریں"
    }
  };

  const t = text[language];

  const getIcon = (icon: string) => {
    switch (icon) {
      case "home":
        return <Home className="w-7 h-7 text-[#0CAA41]" strokeWidth={2.5} />;
      case "work":
        return <Building2 className="w-7 h-7 text-[#0CAA41]" strokeWidth={2.5} />;
      default:
        return <MapPin className="w-7 h-7 text-[#0CAA41]" strokeWidth={2.5} />;
    }
  };

  const handleDelete = (id: string) => {
    setShowDeleteConfirm(id);
  };

  const confirmDelete = () => {
    if (showDeleteConfirm) {
      onRemoveAddress(showDeleteConfirm);
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
        {savedAddresses.length === 0 ? (
          <div className="text-center py-20">
            <MapPin className="w-20 h-20 text-[#E0E0E0] dark:text-[#2A2A2A] mx-auto mb-4" strokeWidth={1.5} />
            <p className="text-[#4A4A4A] dark:text-[#B0B0B0] font-bold text-lg">
              {t.noAddresses}
            </p>
          </div>
        ) : (
          <div className="space-y-4 mb-6">
            {savedAddresses.map((address) => (
              <div
                key={address.id}
                className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 border border-[#E0E0E0] dark:border-[#2A2A2A] hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="w-14 h-14 bg-[#0CAA41]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    {getIcon(address.icon)}
                  </div>

                  {/* Address Details */}
                  <div className="flex-1">
                    <h3 className="text-[#1A1A1A] dark:text-white font-bold text-lg mb-2">
                      {address.title}
                    </h3>
                    <p className="text-[#4A4A4A] dark:text-[#B0B0B0] font-semibold">
                      {address.address}
                    </p>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(address.id)}
                    className="w-11 h-11 rounded-full bg-[#DC3545]/10 hover:bg-[#DC3545]/20 flex items-center justify-center transition-colors flex-shrink-0"
                  >
                    <Trash2 className="w-5 h-5 text-[#DC3545]" strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add New Address Button */}
        <button
          onClick={onAddAddress}
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