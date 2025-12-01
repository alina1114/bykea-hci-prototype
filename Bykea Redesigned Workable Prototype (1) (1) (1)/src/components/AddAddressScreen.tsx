import { ArrowLeft, Home, MapPin, Building2, Save } from "lucide-react";
import { useState } from "react";
import { GlobalSpeakerButton } from "./GlobalSpeakerButton";

interface AddAddressScreenProps {
  onBack: () => void;
  onAddressAdd: (address: { id: string; title: string; address: string; icon: "home" | "work" | "location" }) => void;
  speakerActive: boolean;
  onSpeakerToggle: () => void;
  language: "en" | "ur";
}

export function AddAddressScreen({
  onBack,
  onAddressAdd,
  speakerActive,
  onSpeakerToggle,
  language
}: AddAddressScreenProps) {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<"home" | "work" | "location">("location");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const text = {
    en: {
      title: "Add New Address",
      addressTitle: "Address Title",
      addressLine: "Full Address",
      selectIcon: "Select Icon",
      home: "Home",
      work: "Work",
      location: "Other",
      save: "Save Address",
      cancel: "Cancel",
      success: "Address saved successfully!",
      required: "This field is required",
      placeholderTitle: "e.g., Home, Office, Gym",
      placeholderAddress: "Enter full address"
    },
    ur: {
      title: "نیا پتہ شامل کریں",
      addressTitle: "پتے کا عنوان",
      addressLine: "مکمل پتہ",
      selectIcon: "آئیکن منتخب کریں",
      home: "گھر",
      work: "دفتر",
      location: "دیگر",
      save: "پتہ محفوظ کریں",
      cancel: "منسوخ کریں",
      success: "پتہ کامیابی سے محفوظ ہو گیا!",
      required: "یہ فیلڈ ضروری ہے",
      placeholderTitle: "مثال: گھر، دفتر، جم",
      placeholderAddress: "مکمل پتہ درج کریں"
    }
  };

  const t = text[language];

  const iconOptions = [
    { value: "home" as const, icon: Home, label: t.home },
    { value: "work" as const, icon: Building2, label: t.work },
    { value: "location" as const, icon: MapPin, label: t.location }
  ];

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) newErrors.title = t.required;
    if (!address.trim()) newErrors.address = t.required;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onAddressAdd({ id: Date.now().toString(), title, address, icon: selectedIcon });
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
        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 bg-[#E8F5EC] dark:bg-[#0CAA41]/10 border-2 border-[#0CAA41] rounded-2xl p-5 text-center">
            <p className="text-[#0CAA41] font-bold text-lg">{t.success}</p>
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Icon Selection */}
          <div>
            <label className="block text-[#1A1A1A] dark:text-white font-bold mb-4">
              {t.selectIcon}
            </label>
            <div className="grid grid-cols-3 gap-3">
              {iconOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() => setSelectedIcon(option.value)}
                    className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all ${
                      selectedIcon === option.value
                        ? "border-[#0CAA41] bg-[#0CAA41]/5 shadow-md"
                        : "border-[#E0E0E0] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]"
                    }`}
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                        selectedIcon === option.value
                          ? "bg-[#0CAA41]/20"
                          : "bg-[#F5F8F3] dark:bg-[#2A2A2A]"
                      }`}
                    >
                      <IconComponent
                        className={`w-7 h-7 ${
                          selectedIcon === option.value
                            ? "text-[#0CAA41]"
                            : "text-[#4A4A4A] dark:text-[#B0B0B0]"
                        }`}
                        strokeWidth={2.5}
                      />
                    </div>
                    <span
                      className={`font-bold text-sm ${
                        selectedIcon === option.value
                          ? "text-[#0CAA41]"
                          : "text-[#4A4A4A] dark:text-[#B0B0B0]"
                      }`}
                    >
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Address Title */}
          <div>
            <label className="block text-[#1A1A1A] dark:text-white font-bold mb-3">
              {t.addressTitle}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-6 py-5 rounded-2xl border-2 ${
                errors.title
                  ? "border-[#DC3545] bg-[#FFF5F5] dark:bg-[#DC3545]/10"
                  : "border-[#E0E0E0] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]"
              } text-[#1A1A1A] dark:text-white focus:outline-none focus:border-[#0CAA41] transition-colors`}
              placeholder={t.placeholderTitle}
            />
            {errors.title && (
              <p className="mt-2 text-[#DC3545] text-sm font-bold">{errors.title}</p>
            )}
          </div>

          {/* Full Address */}
          <div>
            <label className="block text-[#1A1A1A] dark:text-white font-bold mb-3">
              {t.addressLine}
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={4}
              className={`w-full px-6 py-5 rounded-2xl border-2 ${
                errors.address
                  ? "border-[#DC3545] bg-[#FFF5F5] dark:bg-[#DC3545]/10"
                  : "border-[#E0E0E0] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]"
              } text-[#1A1A1A] dark:text-white focus:outline-none focus:border-[#0CAA41] transition-colors resize-none`}
              placeholder={t.placeholderAddress}
            />
            {errors.address && (
              <p className="mt-2 text-[#DC3545] text-sm font-bold">{errors.address}</p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="bg-white dark:bg-[#1E1E1E] px-6 py-6 space-y-3 border-t border-[#E0E0E0] dark:border-[#2A2A2A]">
        <button
          onClick={handleSave}
          className="w-full bg-[#0CAA41] text-white rounded-3xl py-7 hover:bg-[#0a8f37] transition-colors shadow-lg shadow-[#0CAA41]/20 font-bold text-xl flex items-center justify-center gap-3"
        >
          <Save className="w-6 h-6" strokeWidth={2.5} />
          {t.save}
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