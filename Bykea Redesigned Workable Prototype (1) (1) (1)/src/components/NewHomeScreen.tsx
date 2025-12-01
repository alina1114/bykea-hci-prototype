import { Search, Home, MapPin, Building2, ShoppingBag, Mic, Plus, Minus, Volume2, Settings, Package } from "lucide-react";
import { BottomNav } from "./BottomNav";
import { GlobalSpeakerButton } from "./GlobalSpeakerButton";
import { CompactLanguageToggle } from "./CompactLanguageToggle";
import { TextSizeToggle } from "./TextSizeToggle";
import { MosqueIcon } from "./icons/MosqueIcon";
import { HospitalIcon } from "./icons/HospitalIcon";
import { MicButton } from "./MicButton";
import { useVoiceAssistScreen } from "./useVoiceAssistScreen";
import { useReadAloud } from "./ReadAloudContext";
import { useEffect } from "react";
import bykeaLogo from "figma:asset/6e993e66b6b91b800c74859b180b2d23b6ac3845.png";
import mapImage from "figma:asset/fb27ce64f85da3f76eb43fb3c35935d92acd9c13.png";

interface NewHomeScreenProps {
  onNavigate: (screen: string, destination?: string) => void;
  textSize: "small" | "medium" | "large";
  onTextSizeChange: (size: "small" | "medium" | "large") => void;
  onVoiceClick: () => void;
  onTabChange: (tab: "home" | "trips" | "wallet" | "profile" | "settings") => void;
  speakerActive: boolean;
  onSpeakerToggle: () => void;
  language: "en" | "ur";
  onLanguageChange: (lang: "en" | "ur") => void;
  quickDestinations: string[];
}

interface Destination {
  id: string;
  name: string;
  nameUr: string;
  icon: string;
  gradient: string;
}

export function NewHomeScreen({ 
  onNavigate, 
  textSize, 
  onTextSizeChange, 
  onVoiceClick, 
  onTabChange,
  speakerActive,
  onSpeakerToggle,
  language,
  onLanguageChange,
  quickDestinations
}: NewHomeScreenProps) {
  const voiceAssist = useVoiceAssistScreen({
    screenKey: 'home',
    language,
    autoAnnounce: true
  });

  const readAloud = useReadAloud();

  const text = {
    en: {
      search: "Where would you like to go?",
      quickDest: "Quick Destinations",
      manage: "Manage Destinations",
      home: "Home",
      office: "Office",
      mosque: "Mosque",
      market: "Market",
      hospital: "Hospital",
      school: "School",
      gym: "Gym",
      restaurant: "Restaurant",
      voiceHelp: "Need Help? Use Voice Assistant"
    },
    ur: {
      search: "آپ کہاں جانا چاہیں گے؟",
      quickDest: "فوری منزلیں",
      manage: "منزلوں کا انتظام",
      home: "گھر",
      office: "دفتر",
      mosque: "مسجد",
      market: "بازار",
      hospital: "ہسپتال",
      school: "سکول",
      gym: "جم",
      restaurant: "ریسٹورنٹ",
      voiceHelp: "مدد چاہیے؟ آواز اسسٹنٹ استعمال کریں"
    }
  };

  const t = text[language];

  // Text-to-speech when speaker is active
  useEffect(() => {
    if (speakerActive) {
      const texts = [
        t.search,
        t.quickDest,
        ...quickDestinations.map(id => {
          const dest = allDestinations.find(d => d.id === id);
          return language === 'en' ? (dest?.name || '') : (dest?.nameUr || '');
        }),
        t.manage
      ].filter(Boolean);
      readAloud.play(texts, 'Home Screen');
    } else {
      readAloud.stop();
    }
  }, [speakerActive]);

  const allDestinations: Destination[] = [
    { id: "home", name: "Home", nameUr: "گھر", icon: "home", gradient: "from-blue-500 to-blue-600" },
    { id: "mosque", name: "Mosque", nameUr: "مسجد", icon: "mosque", gradient: "from-emerald-500 to-emerald-600" },
    { id: "hospital", name: "Hospital", nameUr: "ہسپتال", icon: "hospital", gradient: "from-red-500 to-red-600" },
    { id: "market", name: "Market", nameUr: "بازار", icon: "market", gradient: "from-amber-500 to-amber-600" },
    { id: "office", name: "Office", nameUr: "دفتر", icon: "office", gradient: "from-violet-500 to-violet-600" },
    { id: "school", name: "School", nameUr: "سکول", icon: "school", gradient: "from-indigo-500 to-indigo-600" },
    { id: "gym", name: "Gym", nameUr: "جم", icon: "gym", gradient: "from-orange-500 to-orange-600" },
    { id: "restaurant", name: "Restaurant", nameUr: "ریسٹورنٹ", icon: "restaurant", gradient: "from-pink-500 to-pink-600" },
  ];

  const getIcon = (iconName: string, isActive: boolean = false) => {
    const className = isActive ? "w-5 h-5 text-white" : "w-5 h-5 text-[#0CAA41]";
    const strokeWidth = 2.5;
    
    switch (iconName) {
      case "home": return <Home className={className} strokeWidth={strokeWidth} />;
      case "mosque": return <MosqueIcon className={className} />;
      case "hospital": return <HospitalIcon className={className} />;
      case "market": return <ShoppingBag className={className} strokeWidth={strokeWidth} />;
      case "office": return <Building2 className={className} strokeWidth={strokeWidth} />;
      case "school": return <Building2 className={className} strokeWidth={strokeWidth} />;
      case "gym": return <Building2 className={className} strokeWidth={strokeWidth} />;
      case "restaurant": return <ShoppingBag className={className} strokeWidth={strokeWidth} />;
      default: return <MapPin className={className} strokeWidth={strokeWidth} />;
    }
  };

  const activeDestinations = allDestinations.filter(dest => quickDestinations.includes(dest.id));

  const handleQuickDestClick = (dest: Destination) => {
    voiceAssist.announceSelection(language === "en" ? dest.name : dest.nameUr);
    // Navigate to pickup first, with destination pre-selected
    onNavigate("pickup", dest.id);
  };

  const handleSearchClick = () => {
    voiceAssist.announceButton('searchBar', voiceAssist.content.elements.searchBar);
    onNavigate("pickup");
  };

  const handleZoomIn = () => {
    voiceAssist.announceText(voiceAssist.content.elements.mapZoomIn);
  };

  const handleZoomOut = () => {
    voiceAssist.announceText(voiceAssist.content.elements.mapZoomOut);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-[#F5F8F3] to-[#E8F5EC] dark:from-[#121212] dark:to-[#0a0a0a]">
      {/* Top Header - Logo centered, Speaker & Settings */}
      <div className="bg-white dark:bg-[#1E1E1E] px-4 py-2.5 shadow-sm">
        <div className="flex items-center justify-between">
          {/* Settings Icon - Left */}
          <button 
            onClick={() => {
              voiceAssist.announceNavigation(language === 'en' ? 'Settings' : 'ترتیبات');
              onTabChange("settings");
            }}
            className="w-9 h-9 rounded-full bg-gradient-to-br from-[#F5F8F3] to-[#E8F5EC] dark:from-[#2A2A2A] dark:to-[#1E1E1E] flex items-center justify-center hover:shadow-md transition-all"
            aria-label={language === 'en' ? 'Settings' : 'ترتیبات'}
          >
            <Settings className="w-5 h-5 text-[#1A1A1A] dark:text-white" strokeWidth={2.5} />
          </button>

          {/* Bykea Logo - Center */}
          <img src={bykeaLogo} alt="Bykea" className="h-9" />

          {/* Speaker Button - Right */}
          <GlobalSpeakerButton isActive={speakerActive} onToggle={onSpeakerToggle} />
        </div>
      </div>

      {/* Search Bar Section */}
      <div className="bg-white dark:bg-[#1E1E1E] px-4 pb-3 pt-2 shadow-md">
        {/* Language Toggle */}
        <div className="flex justify-center mb-2">
          <CompactLanguageToggle language={language} onLanguageChange={onLanguageChange} />
        </div>
        
        <div className="relative">
          <button
            onClick={handleSearchClick}
            className="w-full bg-gradient-to-r from-[#F5F8F3] to-[#E8F5EC] dark:from-[#2A2A2A] dark:to-[#1E1E1E] rounded-2xl p-3 flex items-center gap-3 hover:shadow-lg transition-all border-2 border-transparent hover:border-[#0CAA41]/20"
            aria-label={t.search}
          >
            <div className="w-9 h-9 bg-[#0CAA41]/10 rounded-xl flex items-center justify-center">
              <Search className="w-5 h-5 text-[#0CAA41]" strokeWidth={2.5} />
            </div>
            <span className="text-[#4A4A4A] dark:text-[#B0B0B0] font-bold flex-1 text-left" style={{ fontSize: '14px' }}>{t.search}</span>
          </button>
          
          {/* Mic button positioned absolutely on top */}
          <div 
            onClick={(e) => { 
              e.stopPropagation(); 
              voiceAssist.announceButton('voiceButton', 'Voice Assistant');
              onVoiceClick(); 
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 bg-gradient-to-br from-[#0CAA41] to-[#0a8f37] rounded-full flex items-center justify-center cursor-pointer hover:shadow-xl hover:scale-105 transition-all z-10"
            role="button"
            tabIndex={0}
            aria-label="Voice Search"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                voiceAssist.announceButton('voiceButton', 'Voice Assistant');
                onVoiceClick();
              }
            }}
          >
            <Mic className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
        </div>
      </div>

      {/* Map Section with Enhanced Visuals */}
      <div className="relative h-[28vh] bg-[#E8EDE6] dark:bg-[#2A2A2A] shadow-inner">
        <img 
          src={mapImage} 
          alt="Map" 
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5 dark:to-black/20 pointer-events-none" />
        
        {/* Zoom Controls with modern design */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button 
            onClick={handleZoomIn}
            className="w-9 h-9 bg-white/95 dark:bg-[#1E1E1E]/95 backdrop-blur-sm rounded-xl shadow-lg flex items-center justify-center hover:bg-[#0CAA41] hover:text-white dark:hover:bg-[#0CAA41] transition-all group"
            aria-label="Zoom in"
          >
            <Plus className="w-4 h-4 text-[#1A1A1A] dark:text-white group-hover:text-white" strokeWidth={2.5} />
          </button>
          <button 
            onClick={handleZoomOut}
            className="w-9 h-9 bg-white/95 dark:bg-[#1E1E1E]/95 backdrop-blur-sm rounded-xl shadow-lg flex items-center justify-center hover:bg-[#0CAA41] hover:text-white dark:hover:bg-[#0CAA41] transition-all group"
            aria-label="Zoom out"
          >
            <Minus className="w-4 h-4 text-[#1A1A1A] dark:text-white group-hover:text-white" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 px-4 pt-3 pb-20 overflow-y-auto">
        {/* Quick Destinations Header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[#1A1A1A] dark:text-white font-bold" style={{ fontSize: '16px' }}>{t.quickDest}</h2>
          <div className="w-10 h-0.5 bg-gradient-to-r from-[#0CAA41] to-[#0CAA41]/20 rounded-full" />
        </div>

        {/* Quick Destinations Grid */}
        {activeDestinations.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 mb-3">
            {activeDestinations.map((dest) => (
              <button
                key={dest.id}
                onClick={() => handleQuickDestClick(dest)}
                className="group relative bg-white dark:bg-[#1E1E1E] rounded-2xl p-4 flex flex-col items-center gap-2 hover:shadow-xl transition-all h-[110px] justify-center border border-[#E0E0E0] dark:border-[#2A2A2A] overflow-hidden hover:scale-105 hover:-translate-y-1"
                aria-label={language === "en" ? dest.name : dest.nameUr}
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${dest.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-[#0CAA41]/10 group-hover:bg-white/20 rounded-xl flex items-center justify-center transition-all group-hover:scale-110 shadow-sm">
                    {getIcon(dest.icon, false)}
                    <div className="absolute inset-0 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      {getIcon(dest.icon, true)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-[#1A1A1A] dark:text-white group-hover:text-white font-bold transition-colors" style={{ fontSize: '14px' }}>
                      {language === "en" ? dest.name : dest.nameUr}
                    </div>
                  </div>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 mb-3 border border-[#E0E0E0] dark:border-[#2A2A2A] text-center">
            <MapPin className="w-10 h-10 text-[#B0B0B0] mx-auto mb-2" strokeWidth={2} />
            <p className="text-[#6B6B6B] dark:text-[#B0B0B0] font-bold" style={{ fontSize: '14px' }}>
              {language === "en" ? "No quick destinations yet" : "ابھی کوئی فوری منزلیں نہیں"}
            </p>
            <p className="text-[#6B6B6B] dark:text-[#B0B0B0] text-sm mt-1">
              {language === "en" ? "Add destinations below to get started" : "شروع کرنے کے لیے نیچے منزلیں شامل کریں"}
            </p>
          </div>
        )}

        {/* Manage Destinations Button */}
        <button
          onClick={() => {
            voiceAssist.announceButton('manageDestinations', voiceAssist.content.elements.manageDestinations);
            onNavigate("manageQuickDestinations");
          }}
          className="w-full bg-gradient-to-r from-white to-[#F5F8F3] dark:from-[#1E1E1E] dark:to-[#2A2A2A] rounded-2xl py-3.5 px-5 flex items-center justify-center gap-3 hover:shadow-xl transition-all border-2 border-[#0CAA41]/20 hover:border-[#0CAA41] group"
          aria-label={t.manage}
        >
          <div className="w-9 h-9 bg-[#0CAA41]/10 group-hover:bg-[#0CAA41] rounded-xl flex items-center justify-center transition-all">
            <MapPin className="w-4 h-4 text-[#0CAA41] group-hover:text-white transition-colors" strokeWidth={2.5} />
          </div>
          <span className="text-[#1A1A1A] dark:text-white font-bold" style={{ fontSize: '14px' }}>{t.manage}</span>
        </button>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab="home" onTabChange={onTabChange} language={language} />
    </div>
  );
}