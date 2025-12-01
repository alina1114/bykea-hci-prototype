import { Search, ArrowLeft, MapPin, Navigation, Mic } from "lucide-react";
import { FloatingMicButton } from "./FloatingMicButton";
import { MicButton } from "./MicButton";
import { GlobalSpeakerButton } from "./GlobalSpeakerButton";
import { useState, useEffect } from "react";
import { useReadAloud } from "./ReadAloudContext";
import mapImage from "figma:asset/fb27ce64f85da3f76eb43fb3c35935d92acd9c13.png";

interface NewDropoffScreenProps {
  onNavigate: (screen: string) => void;
  onVoiceClick: () => void;
  selectedDestination?: string;
  speakerActive: boolean;
  onSpeakerToggle: () => void;
  language: "en" | "ur";
  pickupLocation: { name: string, address: string };
}

export function NewDropoffScreen({ onNavigate, onVoiceClick, selectedDestination, speakerActive, onSpeakerToggle, language, pickupLocation }: NewDropoffScreenProps) {
  const [inputValue, setInputValue] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const readAloud = useReadAloud();

  const t = {
    en: {
      step: "Step 2 of 3",
      title: "Select Destination",
      search: "Search destination",
      pickupLocation: "Pickup Location",
      continue: "Continue"
    },
    ur: {
      step: "مرحلہ 2 از 3",
      title: "منزل منتخب کریں",
      search: "منزل تلاش کریں",
      pickupLocation: "پک اپ لوکیشن",
      continue: "جاری رکھیں"
    }
  };

  const texts = t[language];

  const commonLocations = [
    { name: "Safari Park", address: "University Road, Karachi" },
    { name: "Bahadurabad Market", address: "Block 3, Bahadurabad, Karachi" },
    { name: "Clifton Block 2", address: "Clifton, Karachi" },
    { name: "DHA Phase 5", address: "Defence Housing Authority, Karachi" },
    { name: "Saddar", address: "Saddar Town, Karachi" },
    { name: "Masjid-e-Tooba", address: "Defence Phase 2, Karachi" },
    { name: "Aga Khan Hospital", address: "Stadium Road, Karachi" },
    { name: "Tariq Road", address: "Tariq Road, Karachi" },
  ];

  // Quick destination mapping
  const destinationMap: { [key: string]: { name: string, address: string } } = {
    home: { name: "123 Main Street", address: "Gulshan-e-Iqbal, Karachi" },
    mosque: { name: "Masjid-e-Tooba", address: "Defence Phase 2, Karachi" },
    hospital: { name: "Aga Khan Hospital", address: "Stadium Road, Karachi" },
    market: { name: "Bahadurabad Market", address: "Block 3, Bahadurabad, Karachi" },
    office: { name: "Business Center", address: "Clifton, Karachi" },
    school: { name: "City School", address: "PECHS, Karachi" },
    gym: { name: "Fitness First", address: "DHA Phase 5, Karachi" },
    restaurant: { name: "Kolachi Restaurant", address: "DO Darya, Karachi" },
  };

  // Set initial value if destination is pre-selected
  useEffect(() => {
    if (selectedDestination && destinationMap[selectedDestination]) {
      const dest = destinationMap[selectedDestination];
      setInputValue(dest.name);
      setSelectedLocation(dest.name);
    }
  }, [selectedDestination]);

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
  };

  const handleContinue = () => {
    if (selectedLocation || inputValue) {
      onNavigate("vehicleSelection");
    }
  };

  // Text-to-speech when speaker is active
  useEffect(() => {
    if (speakerActive) {
      const ttsTexts = [
        texts.step,
        texts.title,
        texts.search,
        texts.pickupLocation,
        pickupLocation.name,
        texts.continue
      ];
      readAloud.play(ttsTexts, 'Dropoff Screen');
    } else {
      readAloud.stop();
    }
  }, [speakerActive]);

  return (
    <div className="flex flex-col h-screen bg-[#F5F8F3] dark:bg-[#121212]">
      {/* Header */}
      <div className="bg-white dark:bg-[#1E1E1E] px-5 py-5 border-b border-[#E0E0E0] dark:border-[#2A2A2A]">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => onNavigate("pickup")}
            className="w-11 h-11 rounded-2xl bg-[#F5F8F3] dark:bg-[#2A2A2A] flex items-center justify-center hover:bg-[#E0E0E0] dark:hover:bg-[#3A3A3A] transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#1A1A1A] dark:text-white" strokeWidth={2.5} />
          </button>
          <div className="flex-1">
            <div className="text-sm text-[#4A4A4A] dark:text-[#B0B0B0] font-semibold">{texts.step}</div>
            <h2 className="text-[#1A1A1A] dark:text-white font-bold" style={{ fontSize: '20px' }}>{texts.title}</h2>
          </div>
          <GlobalSpeakerButton isActive={speakerActive} onToggle={onSpeakerToggle} />
        </div>

        {/* Search Bar */}
        <div className="bg-[#F5F8F3] dark:bg-[#2A2A2A] rounded-2xl p-4 flex items-center gap-3 mb-4">
          <Search className="w-6 h-6 text-[#4A4A4A] dark:text-[#B0B0B0]" strokeWidth={2.5} />
          <input
            type="text"
            placeholder={texts.search}
            value={inputValue}
            className="bg-transparent flex-1 outline-none text-[#1A1A1A] dark:text-white placeholder:text-[#4A4A4A] dark:placeholder:text-[#B0B0B0] font-bold"
            onChange={(e) => { setInputValue(e.target.value); setShowDropdown(true); }}
            onFocus={() => setShowDropdown(true)}
          />
          <MicButton onClick={(e) => { e.stopPropagation(); onVoiceClick(); }} />
        </div>

        {/* Pickup Location Card */}
        {pickupLocation.name && (
          <div className="bg-[#0CAA41]/10 border-2 border-[#0CAA41] rounded-2xl p-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#0CAA41]"></div>
              <div className="flex-1">
                <div className="text-xs text-[#0CAA41] font-bold mb-1">
                  {texts.pickupLocation}
                </div>
                <div className="text-[#1A1A1A] dark:text-white font-bold" style={{ fontSize: '14px' }}>
                  {pickupLocation.name}
                </div>
                {pickupLocation.address && (
                  <div className="text-xs text-[#4A4A4A] dark:text-[#B0B0B0] font-semibold mt-1">
                    {pickupLocation.address}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Dropdown for Search Results */}
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
      <div className="relative flex-1">
        <img 
          src={mapImage} 
          alt="Map" 
          className="w-full h-full object-cover"
        />
        
        {/* Centered Pin */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <MapPin className="w-16 h-16 text-[#DC3545] drop-shadow-lg" strokeWidth={2.5} fill="#DC3545" />
        </div>
      </div>

      {/* Bottom Action */}
      <div className="bg-white dark:bg-[#1E1E1E] px-5 py-6 border-t border-[#E0E0E0] dark:border-[#2A2A2A]">
        <button
          onClick={handleContinue}
          disabled={!selectedLocation && !inputValue}
          className={`w-full rounded-3xl py-6 transition-colors shadow-lg font-bold text-xl flex items-center justify-center ${
            selectedLocation || inputValue
              ? "bg-[#0CAA41] text-white hover:bg-[#0a8f37] shadow-[#0CAA41]/20"
              : "bg-[#E0E0E0] dark:bg-[#2A2A2A] text-[#4A4A4A] dark:text-[#B0B0B0] cursor-not-allowed"
          }`}
        >
          {texts.continue}
        </button>
      </div>

      <FloatingMicButton onClick={onVoiceClick} />
    </div>
  );
}