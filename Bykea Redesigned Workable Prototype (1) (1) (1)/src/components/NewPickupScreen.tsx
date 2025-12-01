import { Search, ArrowLeft, MapPin, Mic } from "lucide-react";
import { GlobalSpeakerButton } from "./GlobalSpeakerButton";
import { MicButton } from "./MicButton";
import { useState, useEffect } from "react";
import { useReadAloud } from "./ReadAloudContext";
import mapImage from "figma:asset/fb27ce64f85da3f76eb43fb3c35935d92acd9c13.png";

interface NewPickupScreenProps {
  onNavigate: (screen: string) => void;
  onVoiceClick: () => void;
  speakerActive: boolean;
  onSpeakerToggle: () => void;
  language: "en" | "ur";
  onPickupSelect: (location: string, address: string) => void;
}

export function NewPickupScreen({ onNavigate, onVoiceClick, speakerActive, onSpeakerToggle, language, onPickupSelect }: NewPickupScreenProps) {
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const readAloud = useReadAloud();

  const t = {
    en: {
      title: "Select Pickup",
      search: "Search pickup location",
      continue: "CONTINUE",
      step: "Step 1 of 3",
      instruction: "Move map to adjust pin location",
      back: "Cancel"
    },
    ur: {
      title: "پک اپ منتخب کریں",
      search: "پک اپ لوکیشن تلاش کریں",
      continue: "جاری رکھیں",
      step: "مرحلہ 1 از 3",
      instruction: "پن کی جگہ کو اجسٹ کرنے کے لیے نقشہ منتقل کریں",
      back: "منسوخ کریں"
    }
  }[language];

  const commonLocations = [
    { name: "Block 13, Gulistan-e-Jauhar", address: "Gulistan-e-Jauhar, Karachi" },
    { name: "Bahadurabad", address: "Bahadurabad, Karachi" },
    { name: "Tariq Road", address: "Tariq Road, Karachi" },
    { name: "Clifton Block 2", address: "Clifton, Karachi" },
    { name: "DHA Phase 5", address: "Defence Housing Authority, Karachi" },
    { name: "Saddar", address: "Saddar Town, Karachi" },
    { name: "North Nazimabad", address: "North Nazimabad, Karachi" },
    { name: "Malir Cantt", address: "Malir Cantonment, Karachi" },
  ];

  const filteredLocations = inputValue 
    ? commonLocations.filter(loc => 
        loc.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        loc.address.toLowerCase().includes(inputValue.toLowerCase())
      )
    : commonLocations;

  const handleLocationSelect = (name: string, address: string) => {
    setSelectedLocation(name);
    setInputValue(name);
    setShowDropdown(false);
    onPickupSelect(name, address);
  };

  const handleUseCurrentLocation = () => {
    // Simulate getting current location
    const currentLocation = "Block 5, Gulshan-e-Iqbal";
    const currentAddress = "Gulshan-e-Iqbal, Karachi";
    setSelectedLocation(currentLocation);
    setInputValue(currentLocation);
    setShowDropdown(false);
    onPickupSelect(currentLocation, currentAddress);
  };

  const handleContinue = () => {
    if (selectedLocation || inputValue) {
      if (!selectedLocation) {
        // If user typed but didn't select from dropdown, use the typed value
        onPickupSelect(inputValue, inputValue);
      }
      onNavigate("dropoff");
    }
  };

  // Text-to-speech when speaker is active
  useEffect(() => {
    if (speakerActive) {
      const texts = [
        t.step,
        t.title,
        t.search,
        language === 'en' ? 'Use My Current Location' : 'میری موجودہ لوکیشن استعمال کریں',
        t.instruction,
        t.continue
      ];
      readAloud.play(texts, 'Pickup Screen');
    } else {
      readAloud.stop();
    }
  }, [speakerActive]);

  return (
    <div className="flex flex-col h-screen bg-[#F5F8F3] dark:bg-[#121212]">
      {/* Header */}
      <div className="bg-white dark:bg-[#1E1E1E] px-5 py-5 border-b border-[#E0E0E0] dark:border-[#2A2A2A] relative">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => onNavigate("home")}
            className="w-11 h-11 rounded-2xl bg-[#F5F8F3] dark:bg-[#2A2A2A] flex items-center justify-center hover:bg-[#E0E0E0] dark:hover:bg-[#3A3A3A] transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#1A1A1A] dark:text-white" strokeWidth={2.5} />
          </button>
          <div className="flex-1">
            <div className="text-sm text-[#4A4A4A] dark:text-[#B0B0B0] font-semibold">{t.step}</div>
            <h2 className="text-[#1A1A1A] dark:text-white font-bold" style={{ fontSize: '20px' }}>{t.title}</h2>
          </div>
          <GlobalSpeakerButton isActive={speakerActive} onToggle={onSpeakerToggle} />
        </div>

        {/* Search Bar */}
        <div className="relative bg-[#F5F8F3] dark:bg-[#2A2A2A] rounded-2xl p-4 flex items-center gap-3">
          <Search className="w-6 h-6 text-[#4A4A4A] dark:text-[#B0B0B0]" strokeWidth={2.5} />
          <input
            type="text"
            placeholder={t.search}
            className="bg-transparent flex-1 outline-none text-[#1A1A1A] dark:text-white placeholder:text-[#4A4A4A] dark:placeholder:text-[#B0B0B0] font-bold"
            style={{ fontSize: '16px' }}
            value={inputValue}
            onChange={(e) => { setInputValue(e.target.value); setShowDropdown(true); }}
            onFocus={() => setShowDropdown(true)}
          />
          <MicButton onClick={(e) => { e.stopPropagation(); onVoiceClick(); }} />
        </div>

        {/* Use Current Location Button */}
        <button
          className="mt-3 w-full bg-[#0CAA41]/10 border-2 border-[#0CAA41] rounded-2xl py-4 px-5 flex items-center justify-center gap-3 hover:bg-[#0CAA41]/20 transition-colors"
          onClick={handleUseCurrentLocation}
        >
          <MapPin className="w-6 h-6 text-[#0CAA41]" strokeWidth={2.5} />
          <span className="text-[#0CAA41] font-bold" style={{ fontSize: '16px' }}>
            {language === 'en' ? 'Use My Current Location' : 'میری موجودہ لوکیشن استعمال کریں'}
          </span>
        </button>

        {/* Dropdown for Locations */}
        {showDropdown && filteredLocations.length > 0 && (
          <div className="mt-3 bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-xl border-2 border-[#0CAA41] max-h-64 overflow-y-auto z-50">
            {filteredLocations.map((loc, index) => (
              <div
                key={loc.name}
                className={`px-5 py-4 cursor-pointer hover:bg-[#0CAA41]/10 dark:hover:bg-[#0CAA41]/10 transition-colors ${
                  index !== filteredLocations.length - 1 ? 'border-b border-[#E0E0E0] dark:border-[#2A2A2A]' : ''
                }`}
                onClick={() => handleLocationSelect(loc.name, loc.address)}
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#0CAA41]" strokeWidth={2.5} />
                  <div>
                    <div className="text-[#1A1A1A] dark:text-white font-bold" style={{ fontSize: '15px' }}>
                      {loc.name}
                    </div>
                    <div className="text-[#6B6B6B] dark:text-[#B0B0B0] font-semibold" style={{ fontSize: '12px' }}>
                      {loc.address}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Map with Pin */}
      <div className="relative flex-1 flex flex-col">
        {/* Heading above map */}
        <div className="bg-white dark:bg-[#1E1E1E] px-5 py-4 border-b border-[#E0E0E0] dark:border-[#2A2A2A]">
          <p className="text-[#1A1A1A] dark:text-white font-bold text-center" style={{ fontSize: '16px' }}>
            {t.instruction}
          </p>
        </div>
        
        {/* Map */}
        <div className="flex-1 relative">
          <img 
            src={mapImage} 
            alt="Map" 
            className="w-full h-full object-cover"
          />
          
          {/* Centered Pin */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <MapPin className="w-16 h-16 text-[#0CAA41] drop-shadow-lg" strokeWidth={2.5} fill="#0CAA41" />
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="bg-white dark:bg-[#1E1E1E] px-5 py-6 border-t border-[#E0E0E0] dark:border-[#2A2A2A]">
        <button
          onClick={handleContinue}
          disabled={!selectedLocation && !inputValue}
          className={`w-full rounded-3xl py-6 transition-colors shadow-lg font-bold flex items-center justify-center ${
            selectedLocation || inputValue
              ? "bg-[#0CAA41] text-white hover:bg-[#0a8f37] shadow-[#0CAA41]/20"
              : "bg-[#E0E0E0] dark:bg-[#2A2A2A] text-[#4A4A4A] dark:text-[#B0B0B0] cursor-not-allowed"
          }`}
          style={{ fontSize: '20px' }}
        >
          {t.continue}
        </button>
      </div>
    </div>
  );
}