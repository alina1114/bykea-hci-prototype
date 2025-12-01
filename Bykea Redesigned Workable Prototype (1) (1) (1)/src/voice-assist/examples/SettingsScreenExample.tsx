/**
 * SETTINGS SCREEN - Voice Assist Implementation Example
 * 
 * This example demonstrates:
 * - Toggle announcements (ON/OFF states)
 * - Text size change announcements
 * - Slider/brightness announcements
 * - Language change integration
 */

import { ArrowLeft, Sun, Volume2 } from "lucide-react";
import { useState } from "react";
import { useVoiceAssistScreen } from '../useVoiceAssistScreen';

interface SettingsScreenProps {
  onBack: () => void;
  language: 'en' | 'ur';
  onLanguageChange: (lang: 'en' | 'ur') => void;
  darkMode: boolean;
  onDarkModeToggle: () => void;
  textSize: 'small' | 'medium' | 'large';
  onTextSizeChange: (size: 'small' | 'medium' | 'large') => void;
  boldText: boolean;
  onBoldTextToggle: () => void;
  brightness: number;
  onBrightnessChange: (value: number) => void;
}

export function SettingsScreenExample({
  onBack,
  language,
  onLanguageChange,
  darkMode,
  onDarkModeToggle,
  textSize,
  onTextSizeChange,
  boldText,
  onBoldTextToggle,
  brightness,
  onBrightnessChange
}: SettingsScreenProps) {
  
  // ============================================
  // VOICE ASSIST INITIALIZATION
  // ============================================
  const voiceAssist = useVoiceAssistScreen({
    screenKey: 'settings',
    language,
    autoAnnounce: true,
    autoAnnounceDelay: 500
  });
  
  // Auto-announces on mount:
  // "Settings. Adjust app settings. Change text size, enable bold text, 
  //  adjust brightness, toggle dark mode, or change language."

  // ============================================
  // BACK BUTTON
  // ============================================
  const handleBack = () => {
    voiceAssist.announceButton('backButton');
    onBack();
  };

  // ============================================
  // DARK MODE TOGGLE
  // ============================================
  const handleDarkModeToggle = () => {
    const newState = !darkMode;
    onDarkModeToggle();
    
    // Announce the new state
    voiceAssist.announceToggle(
      voiceAssist.content.elements.darkModeToggle,
      newState
    );
    // English: "Dark Mode On" or "Dark Mode Off"
    // Urdu: "ڈارک موڈ آن" or "ڈارک موڈ آف"
  };

  // ============================================
  // BOLD TEXT TOGGLE
  // ============================================
  const handleBoldTextToggle = () => {
    const newState = !boldText;
    onBoldTextToggle();
    
    voiceAssist.announceToggle(
      voiceAssist.content.elements.boldTextToggle,
      newState
    );
    // English: "Bold Text On" or "Bold Text Off"
    // Urdu: "بولڈ ٹیکسٹ آن" or "بولڈ ٹیکسٹ آف"
  };

  // ============================================
  // TEXT SIZE CHANGE
  // ============================================
  const handleTextSizeChange = (size: 'small' | 'medium' | 'large') => {
    onTextSizeChange(size);
    
    // Announce the selected size
    const sizeLabel = voiceAssist.content.elements[`textSize${size.charAt(0).toUpperCase() + size.slice(1)}`];
    voiceAssist.announceSelection(
      language === 'en' ? 'Text size' : 'متن کا سائز',
      sizeLabel
    );
    // English: "You selected: Text size. Large"
    // Urdu: "آپ نے متن کا سائز منتخب کیا۔ بڑا"
  };

  // ============================================
  // BRIGHTNESS CHANGE
  // ============================================
  const [isAdjustingBrightness, setIsAdjustingBrightness] = useState(false);
  const [brightnessAnnounceTimer, setBrightnessAnnounceTimer] = useState<NodeJS.Timeout | null>(null);

  const handleBrightnessChange = (value: number) => {
    onBrightnessChange(value);
    setIsAdjustingBrightness(true);
    
    // Clear previous timer
    if (brightnessAnnounceTimer) {
      clearTimeout(brightnessAnnounceTimer);
    }
    
    // Debounce announcement - only announce after user stops adjusting
    const timer = setTimeout(() => {
      voiceAssist.announceAction(
        language === 'en' 
          ? `Brightness set to ${value} percent` 
          : `چمک ${value} فیصد پر مقرر کی گئی`
      );
      setIsAdjustingBrightness(false);
    }, 800); // Wait 800ms after last change
    
    setBrightnessAnnounceTimer(timer);
  };

  // ============================================
  // LANGUAGE CHANGE
  // ============================================
  const handleLanguageChange = (newLang: 'en' | 'ur') => {
    if (newLang === language) return;
    
    onLanguageChange(newLang);
    
    // Language change announcement handled by VoiceAssistContext
    // Automatically announces in the NEW language:
    // "Language changed to English" or "زبان اردو میں تبدیل ہوگئی"
  };

  // ============================================
  // VOICE GUIDANCE TOGGLE
  // (This toggles the global speaker button)
  // ============================================
  const handleVoiceGuidanceToggle = () => {
    // This would typically toggle the global Voice Assist state
    // For this example, we'll just demonstrate the announcement
    
    const isEnabled = voiceAssist.isEnabled;
    
    voiceAssist.announceToggle(
      voiceAssist.content.elements.voiceGuidanceToggle,
      !isEnabled
    );
    // English: "Voice Guidance On" or "Voice Guidance Off"
    // Urdu: "آواز کی رہنمائی آن" or "آواز کی رہنمائی آف"
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="flex flex-col h-screen bg-[#F5F8F3]">
      
      {/* HEADER */}
      <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-[#E0E0E0]">
        <button 
          onClick={handleBack}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-[#F5F8F3]"
          aria-label={voiceAssist.content.elements.backButton}
        >
          <ArrowLeft className="w-6 h-6 text-[#1A1A1A]" strokeWidth={2.5} />
        </button>
        
        <h1 className="text-[#1A1A1A] font-bold flex-1 text-center">
          {voiceAssist.content.screenName}
        </h1>
        
        <div className="w-11" />
      </div>

      {/* CONTENT */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        
        {/* LANGUAGE SECTION */}
        <div className="mb-8">
          <h2 className="text-[#1A1A1A] font-bold mb-4">
            {voiceAssist.content.elements.languageLabel}
          </h2>
          <div className="bg-white rounded-2xl p-4 border border-[#E0E0E0]">
            <div className="flex gap-3">
              <button
                onClick={() => handleLanguageChange('en')}
                className={`
                  flex-1 py-3 px-4 rounded-xl font-bold transition-all
                  ${language === 'en'
                    ? 'bg-[#0CAA41] text-white shadow-lg'
                    : 'bg-[#F5F8F3] text-[#6B6B6B]'}
                `}
                aria-label={voiceAssist.content.elements.englishOption}
                aria-pressed={language === 'en'}
              >
                English
              </button>
              <button
                onClick={() => handleLanguageChange('ur')}
                className={`
                  flex-1 py-3 px-4 rounded-xl font-bold transition-all
                  ${language === 'ur'
                    ? 'bg-[#0CAA41] text-white shadow-lg'
                    : 'bg-[#F5F8F3] text-[#6B6B6B]'}
                `}
                aria-label={voiceAssist.content.elements.urduOption}
                aria-pressed={language === 'ur'}
              >
                اردو
              </button>
            </div>
          </div>
        </div>

        {/* TEXT SIZE SECTION */}
        <div className="mb-8">
          <h2 className="text-[#1A1A1A] font-bold mb-4">
            {voiceAssist.content.elements.textSizeLabel}
          </h2>
          <div className="bg-white rounded-2xl p-4 border border-[#E0E0E0]">
            <div className="flex gap-3">
              {(['small', 'medium', 'large'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => handleTextSizeChange(size)}
                  className={`
                    flex-1 py-3 px-4 rounded-xl font-bold transition-all
                    ${textSize === size
                      ? 'bg-[#0CAA41] text-white shadow-lg'
                      : 'bg-[#F5F8F3] text-[#6B6B6B]'}
                  `}
                  aria-label={voiceAssist.content.elements[`textSize${size.charAt(0).toUpperCase() + size.slice(1)}`]}
                  aria-pressed={textSize === size}
                >
                  {language === 'en'
                    ? size.charAt(0).toUpperCase() + size.slice(1)
                    : size === 'small' ? 'چھوٹا' : size === 'medium' ? 'درمیانہ' : 'بڑا'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* TOGGLES SECTION */}
        <div className="space-y-4 mb-8">
          
          {/* Bold Text Toggle */}
          <div className="bg-white rounded-2xl p-5 border border-[#E0E0E0] flex items-center justify-between">
            <span className="text-[#1A1A1A] font-bold">
              {voiceAssist.content.elements.boldTextToggle}
            </span>
            <button
              onClick={handleBoldTextToggle}
              className={`
                w-14 h-8 rounded-full transition-all relative
                ${boldText ? 'bg-[#0CAA41]' : 'bg-[#D0D0D0]'}
              `}
              aria-label={voiceAssist.content.elements.boldTextToggle}
              aria-pressed={boldText}
              role="switch"
            >
              <div className={`
                w-6 h-6 rounded-full bg-white shadow-md absolute top-1 transition-all
                ${boldText ? 'right-1' : 'left-1'}
              `} />
            </button>
          </div>

          {/* Dark Mode Toggle */}
          <div className="bg-white rounded-2xl p-5 border border-[#E0E0E0] flex items-center justify-between">
            <span className="text-[#1A1A1A] font-bold">
              {voiceAssist.content.elements.darkModeToggle}
            </span>
            <button
              onClick={handleDarkModeToggle}
              className={`
                w-14 h-8 rounded-full transition-all relative
                ${darkMode ? 'bg-[#0CAA41]' : 'bg-[#D0D0D0]'}
              `}
              aria-label={voiceAssist.content.elements.darkModeToggle}
              aria-pressed={darkMode}
              role="switch"
            >
              <div className={`
                w-6 h-6 rounded-full bg-white shadow-md absolute top-1 transition-all
                ${darkMode ? 'right-1' : 'left-1'}
              `} />
            </button>
          </div>
        </div>

        {/* BRIGHTNESS SECTION */}
        <div className="mb-8">
          <h2 className="text-[#1A1A1A] font-bold mb-4 flex items-center gap-2">
            <Sun className="w-5 h-5" strokeWidth={2.5} />
            {voiceAssist.content.elements.brightnessSlider}
          </h2>
          <div className="bg-white rounded-2xl p-5 border border-[#E0E0E0]">
            <input
              type="range"
              min="50"
              max="150"
              step="10"
              value={brightness}
              onChange={(e) => handleBrightnessChange(Number(e.target.value))}
              className="w-full"
              aria-label={`${voiceAssist.content.elements.brightnessSlider}: ${brightness}%`}
              aria-valuemin={50}
              aria-valuemax={150}
              aria-valuenow={brightness}
              aria-valuetext={`${brightness} percent`}
            />
            <div className="text-center mt-3 text-[#6B6B6B] font-bold">
              {brightness}%
            </div>
          </div>
        </div>

        {/* HINT */}
        {voiceAssist.content.hints && (
          <div className="bg-[#E8F5EC] rounded-2xl p-5 border-2 border-[#0CAA41]/20">
            <p className="text-[#0CAA41] text-center font-bold" style={{ fontSize: '14px' }}>
              💡 {voiceAssist.content.hints[0]}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

/*
 * VOICE ASSIST FLOW FOR SETTINGS SCREEN:
 * 
 * 1. Screen Mount:
 *    → Auto-announces: "Settings. Adjust app settings. Change text size, 
 *       enable bold text, adjust brightness, toggle dark mode, or change language."
 * 
 * 2. User toggles Dark Mode ON:
 *    → Announces: "Dark Mode On" (HIGH priority)
 *    → UI updates immediately
 * 
 * 3. User toggles Bold Text OFF:
 *    → Announces: "Bold Text Off" (HIGH priority)
 * 
 * 4. User selects Large text size:
 *    → Announces: "You selected: Text size. Large" (HIGH priority)
 * 
 * 5. User adjusts brightness slider:
 *    → (Silent while dragging)
 *    → After 800ms of no movement, announces: "Brightness set to 120 percent" (NORMAL priority)
 * 
 * 6. User changes language to Urdu:
 *    → Announces: "زبان اردو میں تبدیل ہوگئی" (HIGH priority, in NEW language)
 *    → All future announcements in Urdu
 * 
 * 7. User presses Back:
 *    → Announces: "آپ نے واپس جائیں دبایا" (HIGH priority, in Urdu)
 * 
 * KEY FEATURES:
 * - Toggle announcements with ON/OFF states
 * - Debounced slider announcements (avoid spam)
 * - Text size selection announcements
 * - Language change integration
 * - ARIA attributes for screen readers
 * - Switch role for toggle buttons
 * - Range input with value announcements
 */
