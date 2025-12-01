/**
 * HOME SCREEN - Voice Assist Implementation Example
 * 
 * This example demonstrates how to implement Voice Assist on the Home Screen.
 * Shows: Auto-announcement, button announcements, selection announcements, navigation
 */

import { Search, Home, MapPin, ShoppingBag, Mic, Plus, Minus, Settings } from "lucide-react";
import { useVoiceAssistScreen } from '../useVoiceAssistScreen';
import { MosqueIcon } from "../../components/icons/MosqueIcon";
import { HospitalIcon } from "../../components/icons/HospitalIcon";

interface HomeScreenProps {
  onNavigate: (screen: string, destination?: string) => void;
  onTabChange: (tab: string) => void;
  language: 'en' | 'ur';
  onLanguageChange: (lang: 'en' | 'ur') => void;
  onVoiceClick: () => void;
}

export function HomeScreenExample({ 
  onNavigate, 
  onTabChange,
  language,
  onLanguageChange,
  onVoiceClick
}: HomeScreenProps) {
  
  // ============================================
  // VOICE ASSIST INITIALIZATION
  // ============================================
  const voiceAssist = useVoiceAssistScreen({
    screenKey: 'home',          // Identifies this screen for text content
    language,                    // Current app language (en or ur)
    autoAnnounce: true,         // Automatically read screen summary on mount
    autoAnnounceDelay: 500      // Wait 500ms before auto-announcement
  });
  
  // When screen mounts, automatically announces:
  // "Home Screen. You are on the Home Screen. Select a destination or 
  //  choose from Quick Destinations. Use the search bar to find a location."

  // ============================================
  // QUICK DESTINATION SELECTION
  // ============================================
  const handleQuickDestClick = (destination: string) => {
    // Get display name from content
    const destName = voiceAssist.content.elements[`${destination}Card`];
    
    // Announce the selection
    voiceAssist.announceSelection(destName);
    // English: "You selected: Home"
    // Urdu: "آپ نے گھر منتخب کیا"
    
    // Navigate to dropoff screen with pre-selected destination
    onNavigate("dropoff", destination);
  };

  // ============================================
  // SEARCH BAR CLICK
  // ============================================
  const handleSearchClick = () => {
    // Announce button press using element key from content
    voiceAssist.announceButton('searchBar', voiceAssist.content.elements.searchBar);
    // English: "You pressed: Search for destination"
    // Urdu: "آپ نے منزل تلاش کریں دبایا"
    
    // Navigate to pickup screen
    onNavigate("pickup");
  };

  // ============================================
  // VOICE ASSISTANT BUTTON
  // ============================================
  const handleVoiceAssistantClick = () => {
    // Announce voice button activation
    voiceAssist.announceButton('voiceButton', 'Voice Assistant');
    // English: "You pressed: Voice Assistant"
    // Urdu: "آپ نے آواز اسسٹنٹ دبایا"
    
    // Open voice assistant modal
    onVoiceClick();
  };

  // ============================================
  // MAP ZOOM CONTROLS
  // ============================================
  const handleZoomIn = () => {
    // Announce map action
    voiceAssist.announceAction(voiceAssist.content.elements.mapZoomIn);
    // English: "Zoom in on map"
    // Urdu: "نقشے کو بڑا کریں"
  };

  const handleZoomOut = () => {
    voiceAssist.announceAction(voiceAssist.content.elements.mapZoomOut);
    // English: "Zoom out on map"
    // Urdu: "نقشے کو چھوٹا کریں"
  };

  // ============================================
  // SETTINGS NAVIGATION
  // ============================================
  const handleSettingsClick = () => {
    // Announce navigation
    voiceAssist.announceNavigation(
      language === 'en' ? 'Settings' : 'ترتیبات'
    );
    // English: "Navigating to Settings"
    // Urdu: "ترتیبات کی طرف جا رہے ہیں"
    
    onTabChange("settings");
  };

  // ============================================
  // MANAGE DESTINATIONS
  // ============================================
  const handleManageDestinations = () => {
    voiceAssist.announceButton(
      'manageDestinations',
      voiceAssist.content.elements.manageDestinations
    );
    // English: "You pressed: Manage Quick Destinations"
    // Urdu: "آپ نے فوری منزلوں کا انتظام دبایا"
    
    onNavigate("manageQuickDestinations");
  };

  // ============================================
  // LANGUAGE TOGGLE
  // ============================================
  const handleLanguageChange = (newLang: 'en' | 'ur') => {
    onLanguageChange(newLang);
    
    // Language change is announced automatically by VoiceAssistContext
    // English: "Language changed to English"
    // Urdu: "زبان اردو میں تبدیل ہوگئی"
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="flex flex-col h-screen bg-[#F5F8F3]">
      
      {/* HEADER */}
      <div className="bg-white px-5 py-4 border-b border-[#E0E0E0]">
        <div className="flex items-center justify-between">
          
          {/* Settings Button */}
          <button 
            onClick={handleSettingsClick}
            className="w-11 h-11 rounded-full bg-[#F5F8F3] flex items-center justify-center"
            aria-label={voiceAssist.content.elements.settingsButton}
          >
            <Settings className="w-6 h-6 text-[#1A1A1A]" strokeWidth={2.5} />
          </button>

          {/* Logo */}
          <img src="/bykea-logo.png" alt="Bykea" className="h-14" />

          {/* Speaker Button (passed as prop, managed globally) */}
          <div className="w-11 h-11" /> {/* Placeholder */}
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white px-5 pb-5 pt-4 border-b border-[#E0E0E0]">
        
        {/* Language Toggle */}
        <div className="flex justify-center mb-3">
          <div className="inline-flex rounded-full bg-[#F5F8F3] p-1">
            <button
              onClick={() => handleLanguageChange('en')}
              className={`px-4 py-2 rounded-full transition-colors ${
                language === 'en' 
                  ? 'bg-[#0CAA41] text-white' 
                  : 'text-[#6B6B6B]'
              }`}
              aria-label="English"
            >
              English
            </button>
            <button
              onClick={() => handleLanguageChange('ur')}
              className={`px-4 py-2 rounded-full transition-colors ${
                language === 'ur' 
                  ? 'bg-[#0CAA41] text-white' 
                  : 'text-[#6B6B6B]'
              }`}
              aria-label="اردو"
            >
              اردو
            </button>
          </div>
        </div>
        
        {/* Search Button */}
        <div className="relative">
          <button
            onClick={handleSearchClick}
            className="w-full bg-[#F5F8F3] rounded-2xl p-5 flex items-center gap-4"
            aria-label={voiceAssist.content.elements.searchBar}
          >
            <Search className="w-6 h-6 text-[#4A4A4A]" strokeWidth={2.5} />
            <span className="text-[#4A4A4A] font-bold">
              {language === 'en' 
                ? 'Where would you like to go?' 
                : 'آپ کہاں جانا چاہیں گے؟'}
            </span>
          </button>
          
          {/* Voice Assistant Button */}
          <div 
            onClick={handleVoiceAssistantClick}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#0CAA41] rounded-full flex items-center justify-center cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label="Voice Search"
          >
            <Mic className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
        </div>
      </div>

      {/* MAP SECTION */}
      <div className="relative h-[35vh] bg-[#E8EDE6]">
        <img 
          src="/map-placeholder.png" 
          alt="Map" 
          className="w-full h-full object-cover"
        />
        
        {/* Zoom Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-3">
          <button 
            onClick={handleZoomIn}
            className="w-14 h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center"
            aria-label={voiceAssist.content.elements.mapZoomIn}
          >
            <Plus className="w-6 h-6 text-[#1A1A1A]" strokeWidth={2.5} />
          </button>
          <button 
            onClick={handleZoomOut}
            className="w-14 h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center"
            aria-label={voiceAssist.content.elements.mapZoomOut}
          >
            <Minus className="w-6 h-6 text-[#1A1A1A]" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* QUICK DESTINATIONS */}
      <div className="flex-1 px-5 pt-6 pb-28 overflow-y-auto">
        <h2 className="mb-5 text-[#1A1A1A] font-bold">
          {language === 'en' ? 'Quick Destinations' : 'فوری منزلیں'}
        </h2>
        
        {/* Destination Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          
          {/* Home */}
          <button
            onClick={() => handleQuickDestClick("home")}
            className="bg-white rounded-3xl p-6 flex flex-col items-center gap-4"
            aria-label={voiceAssist.content.elements.homeCard}
          >
            <div className="w-14 h-14 bg-[#0CAA41]/10 rounded-2xl flex items-center justify-center">
              <Home className="w-7 h-7 text-[#0CAA41]" strokeWidth={2.5} />
            </div>
            <div className="text-[#1A1A1A] font-bold">
              {language === 'en' ? 'Home' : 'گھر'}
            </div>
          </button>

          {/* Mosque */}
          <button
            onClick={() => handleQuickDestClick("mosque")}
            className="bg-white rounded-3xl p-6 flex flex-col items-center gap-4"
            aria-label={voiceAssist.content.elements.mosqueCard}
          >
            <div className="w-14 h-14 bg-[#0CAA41]/10 rounded-2xl flex items-center justify-center">
              <MosqueIcon className="w-7 h-7 text-[#0CAA41]" />
            </div>
            <div className="text-[#1A1A1A] font-bold">
              {language === 'en' ? 'Mosque' : 'مسجد'}
            </div>
          </button>

          {/* Hospital */}
          <button
            onClick={() => handleQuickDestClick("hospital")}
            className="bg-white rounded-3xl p-6 flex flex-col items-center gap-4"
            aria-label={voiceAssist.content.elements.hospitalCard}
          >
            <div className="w-14 h-14 bg-[#0CAA41]/10 rounded-2xl flex items-center justify-center">
              <HospitalIcon className="w-7 h-7 text-[#0CAA41]" />
            </div>
            <div className="text-[#1A1A1A] font-bold">
              {language === 'en' ? 'Hospital' : 'ہسپتال'}
            </div>
          </button>

          {/* Market */}
          <button
            onClick={() => handleQuickDestClick("market")}
            className="bg-white rounded-3xl p-6 flex flex-col items-center gap-4"
            aria-label={voiceAssist.content.elements.marketCard}
          >
            <div className="w-14 h-14 bg-[#0CAA41]/10 rounded-2xl flex items-center justify-center">
              <ShoppingBag className="w-7 h-7 text-[#0CAA41]" strokeWidth={2.5} />
            </div>
            <div className="text-[#1A1A1A] font-bold">
              {language === 'en' ? 'Market' : 'بازار'}
            </div>
          </button>
        </div>

        {/* Manage Destinations Button */}
        <button
          onClick={handleManageDestinations}
          className="w-full bg-white rounded-3xl py-4 px-6 flex items-center justify-center gap-3 mb-6"
          aria-label={voiceAssist.content.elements.manageDestinations}
        >
          <MapPin className="w-5 h-5 text-[#0CAA41]" strokeWidth={2.5} />
          <span className="text-[#1A1A1A] font-bold">
            {language === 'en' ? 'Manage Destinations' : 'منزلوں کا انتظام'}
          </span>
        </button>

        {/* Voice Help Card */}
        <button
          onClick={handleVoiceAssistantClick}
          className="w-full bg-[#E8F5EC] rounded-3xl p-6 flex items-center justify-center gap-3"
        >
          <Mic className="w-6 h-6 text-[#0CAA41]" strokeWidth={2.5} />
          <span className="text-[#0CAA41] font-bold">
            {language === 'en' 
              ? 'Need Help? Use Voice Assistant' 
              : 'مدد چاہیے؟ آواز اسسٹنٹ استعمال کریں'}
          </span>
        </button>
      </div>

    </div>
  );
}

/*
 * VOICE ASSIST FLOW FOR HOME SCREEN:
 * 
 * 1. Screen Mount:
 *    → Auto-announces: "Home Screen. You are on the Home Screen..."
 * 
 * 2. User taps Search Bar:
 *    → Announces: "You pressed: Search for destination"
 *    → Navigates to Pickup Screen
 * 
 * 3. User taps Home quick destination:
 *    → Announces: "You selected: Home"
 *    → Navigates to Dropoff Screen
 * 
 * 4. User taps Manage Destinations:
 *    → Announces: "You pressed: Manage Quick Destinations"
 *    → Navigates to Manage Screen
 * 
 * 5. User taps Settings:
 *    → Announces: "Navigating to Settings"
 *    → Navigates to Settings Screen
 * 
 * 6. User changes language to Urdu:
 *    → Announces: "زبان اردو میں تبدیل ہوگئی"
 *    → All future announcements in Urdu
 */
