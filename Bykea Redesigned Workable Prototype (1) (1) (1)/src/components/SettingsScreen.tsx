import { Moon, Sun, Volume2, Type, Eye, HelpCircle, ArrowLeft, Gauge, Layers } from "lucide-react";
import { useState, useEffect } from "react";
import { useVoiceAssistScreen } from "./useVoiceAssistScreen";
import { useVoiceAssist } from "./VoiceAssistContext";
import { useReadAloud } from "./ReadAloudContext";
import bykeaLogo from "figma:asset/6e993e66b6b91b800c74859b180b2d23b6ac3845.png";

interface SettingsScreenProps {
  onTabChange: (tab: "home" | "trips" | "wallet" | "profile") => void;
  darkMode: boolean;
  onDarkModeToggle: () => void;
  textSize: "small" | "medium" | "large";
  onTextSizeChange: (size: "small" | "medium" | "large") => void;
  boldText: boolean;
  onBoldTextToggle: () => void;
  brightness: number;
  onBrightnessChange: (brightness: number) => void;
  language: "en" | "ur";
  onLanguageChange: (lang: "en" | "ur") => void;
  speakerActive: boolean;
  onSpeakerToggle: () => void;
}

export function SettingsScreen({
  onTabChange,
  darkMode,
  onDarkModeToggle,
  textSize,
  onTextSizeChange,
  boldText,
  onBoldTextToggle,
  brightness,
  onBrightnessChange,
  language,
  onLanguageChange,
  speakerActive,
  onSpeakerToggle,
}: SettingsScreenProps) {
  const voiceAssist = useVoiceAssistScreen({
    screenKey: 'settings',
    language,
    autoAnnounce: true
  });
  
  const [contrast, setContrast] = useState(50);
  const readAloud = useReadAloud();
  const [showReadingOptions, setShowReadingOptions] = useState(false);

  // Text-to-speech when speaker is active
  useEffect(() => {
    if (speakerActive) {
      const ttsTexts = [
        language === 'en' ? 'Settings' : 'ترتیبات',
        language === 'en' ? 'Appearance' : 'ظاہری شکل',
        language === 'en' ? 'Dark Mode' : 'ڈارک موڈ',
        language === 'en' ? 'Text Size' : 'متن کا سائز',
        language === 'en' ? 'Bold Text' : 'موٹا متن',
        language === 'en' ? 'Accessibility' : 'رسائی',
        language === 'en' ? 'Voice Guidance' : 'صوتی رہنمائی'
      ];
      readAloud.play(ttsTexts, 'Settings Screen');
    } else {
      readAloud.stop();
    }
  }, [speakerActive]);

  const handleDarkModeToggle = () => {
    const newState = !darkMode;
    voiceAssist.announceToggle(voiceAssist.content.elements.darkMode, newState);
    onDarkModeToggle();
  };

  const handleTextSizeChange = (size: "small" | "medium" | "large") => {
    const sizeText = size === 'small' ? 'Small' : size === 'medium' ? 'Medium' : 'Large';
    voiceAssist.announceSelection(`Text size: ${sizeText}`);
    onTextSizeChange(size);
  };

  const handleBoldTextToggle = () => {
    const newState = !boldText;
    voiceAssist.announceToggle(voiceAssist.content.elements.boldText, newState);
    onBoldTextToggle();
  };

  const handleVoiceGuidanceToggle = () => {
    onSpeakerToggle();
  };

  const rateLabels = {
    en: { "0.8": "Slow", "1.0": "Normal", "1.2": "Fast" },
    ur: { "0.8": "آہستہ", "1.0": "عام", "1.2": "تیز" }
  };

  const depthLabels = {
    en: { 
      "labels": "Labels Only", 
      "summary": "Summary", 
      "all": "Full Content" 
    },
    ur: { 
      "labels": "صرف لیبلز", 
      "summary": "خلاصہ", 
      "all": "مکمل مواد" 
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#F5F8F3] dark:bg-[#121212]">
      {/* Header */}
      <div className="bg-white dark:bg-[#1E1E1E] px-5 py-5 border-b border-[#E0E0E0] dark:border-[#2A2A2A]">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => {
              voiceAssist.announceNavigation(language === 'en' ? 'Home' : 'ہوم');
              onTabChange("home");
            }}
            className="w-11 h-11 rounded-2xl bg-[#F5F8F3] dark:bg-[#2A2A2A] flex items-center justify-center hover:bg-[#E0E0E0] dark:hover:bg-[#3A3A3A] transition-colors"
            aria-label={language === 'en' ? 'Go back' : 'واپس جائیں'}
          >
            <ArrowLeft className="w-6 h-6 text-[#1A1A1A] dark:text-white" strokeWidth={2.5} />
          </button>
          <h2 className="text-[#1A1A1A] dark:text-white font-bold text-xl">
            {language === 'en' ? 'Settings' : 'ترتیبات'}
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 pt-6 pb-28 overflow-y-auto">
        {/* Preview Box */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 mb-6 border-2 border-[#0CAA41]/20">
          <div className="text-center">
            <h3 className="mb-3 text-[#1A1A1A] dark:text-white">
              {language === 'en' ? 'Preview' : 'پیش نظارہ'}
            </h3>
            <p className="text-[#4A4A4A] dark:text-[#B0B0B0] mb-2">
              {language === 'en' 
                ? 'This is how your text will appear'
                : 'یہ ہے کہ آپ کا متن کیسا نظر آئے گا'}
            </p>
            <div className="text-[#0CAA41] font-bold text-xl">Bykea</div>
          </div>
        </div>

        {/* Appearance Settings */}
        <h2 className="mb-4 text-[#1A1A1A] dark:text-white font-bold">
          {language === 'en' ? 'Appearance' : 'ظاہری شکل'}
        </h2>

        <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl overflow-hidden border border-[#E0E0E0] dark:border-[#2A2A2A] mb-6">
          {/* Dark Mode */}
          <div className="flex items-center justify-between p-5 border-b border-[#E0E0E0] dark:border-[#2A2A2A]">
            <div className="flex items-center gap-4">
              {darkMode ? (
                <Moon className="w-6 h-6 text-[#0CAA41]" strokeWidth={2.5} />
              ) : (
                <Sun className="w-6 h-6 text-[#0CAA41]" strokeWidth={2.5} />
              )}
              <span className="text-[#1A1A1A] dark:text-white font-bold">
                {language === 'en' ? 'Dark Mode' : 'ڈارک موڈ'}
              </span>
            </div>
            <button
              onClick={handleDarkModeToggle}
              className={`w-16 h-9 rounded-full transition-colors relative ${
                darkMode ? "bg-[#0CAA41]" : "bg-[#E0E0E0] dark:bg-[#2A2A2A]"
              }`}
              aria-label={`${language === 'en' ? 'Dark Mode' : 'ڈارک موڈ'} ${darkMode ? (language === 'en' ? 'On' : 'آن') : (language === 'en' ? 'Off' : 'آف')}`}
              aria-pressed={darkMode}
            >
              <div
                className={`w-7 h-7 bg-white rounded-full absolute top-1 transition-transform ${
                  darkMode ? "translate-x-8" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Text Size Slider */}
          <div className="p-5 border-b border-[#E0E0E0] dark:border-[#2A2A2A]">
            <div className="flex items-center gap-4 mb-5">
              <Type className="w-6 h-6 text-[#0CAA41]" strokeWidth={2.5} />
              <span className="text-[#1A1A1A] dark:text-white font-bold">
                {language === 'en' ? 'Text Size' : 'متن کا سائز'}
              </span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleTextSizeChange("small")}
                className={`flex-1 py-5 rounded-2xl transition-all font-bold ${
                  textSize === "small"
                    ? "bg-[#0CAA41] text-white shadow-lg"
                    : "bg-[#F5F8F3] dark:bg-[#2A2A2A] text-[#1A1A1A] dark:text-white"
                }`}
                aria-label={language === 'en' ? 'Small text size' : 'چھوٹا متن سائز'}
              >
                {language === 'en' ? 'Small (S)' : 'چھوٹا (S)'}
              </button>
              <button
                onClick={() => handleTextSizeChange("medium")}
                className={`flex-1 py-5 rounded-2xl transition-all font-bold ${
                  textSize === "medium"
                    ? "bg-[#0CAA41] text-white shadow-lg"
                    : "bg-[#F5F8F3] dark:bg-[#2A2A2A] text-[#1A1A1A] dark:text-white"
                }`}
                aria-label={language === 'en' ? 'Medium text size' : 'درمیانہ متن سائز'}
              >
                {language === 'en' ? 'Medium (M)' : 'درمیانہ (M)'}
              </button>
              <button
                onClick={() => handleTextSizeChange("large")}
                className={`flex-1 py-5 rounded-2xl transition-all font-bold ${
                  textSize === "large"
                    ? "bg-[#0CAA41] text-white shadow-lg"
                    : "bg-[#F5F8F3] dark:bg-[#2A2A2A] text-[#1A1A1A] dark:text-white"
                }`}
                aria-label={language === 'en' ? 'Large text size' : 'بڑا متن سائز'}
              >
                {language === 'en' ? 'Large (L)' : 'بڑا (L)'}
              </button>
            </div>
          </div>

          {/* Bold Text */}
          <div className="flex items-center justify-between p-5 border-b border-[#E0E0E0] dark:border-[#2A2A2A]">
            <div className="flex items-center gap-4">
              <Type className="w-6 h-6 text-[#0CAA41]" strokeWidth={2.5} />
              <span className="text-[#1A1A1A] dark:text-white font-bold">
                {language === 'en' ? 'Bold Text' : 'موٹا متن'}
              </span>
            </div>
            <button
              onClick={handleBoldTextToggle}
              className={`w-16 h-9 rounded-full transition-colors relative ${
                boldText ? "bg-[#0CAA41]" : "bg-[#E0E0E0] dark:bg-[#2A2A2A]"
              }`}
              aria-label={`${language === 'en' ? 'Bold Text' : 'موٹا متن'} ${boldText ? (language === 'en' ? 'On' : 'آن') : (language === 'en' ? 'Off' : 'آف')}`}
              aria-pressed={boldText}
            >
              <div
                className={`w-7 h-7 bg-white rounded-full absolute top-1 transition-transform ${
                  boldText ? "translate-x-8" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Screen Visibility */}
          <div className="p-5">
            <div className="flex items-center gap-4 mb-5">
              <Eye className="w-6 h-6 text-[#0CAA41]" strokeWidth={2.5} />
              <span className="text-[#1A1A1A] dark:text-white font-bold">
                {language === 'en' ? 'Screen Brightness' : 'اسکرین کی چمک'}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={brightness}
              onChange={(e) => onBrightnessChange(parseInt(e.target.value))}
              className="w-full h-3 bg-[#E0E0E0] dark:bg-[#2A2A2A] rounded-full appearance-none cursor-pointer accent-[#0CAA41]"
              style={{
                background: `linear-gradient(to right, #0CAA41 0%, #0CAA41 ${brightness}%, #E0E0E0 ${brightness}%, #E0E0E0 100%)`,
              }}
              aria-label={language === 'en' ? 'Screen brightness slider' : 'اسکرین ی چمک سلائیڈر'}
            />
            <div className="flex justify-between mt-2">
              <span className="text-sm text-[#4A4A4A] dark:text-[#B0B0B0] font-semibold">
                {language === 'en' ? 'Low' : 'کم'}
              </span>
              <span className="text-sm text-[#4A4A4A] dark:text-[#B0B0B0] font-semibold">
                {language === 'en' ? 'High' : 'زیادہ'}
              </span>
            </div>
          </div>
        </div>

        {/* Accessibility Settings */}
        <h2 className="mb-4 text-[#1A1A1A] dark:text-white font-bold">
          {language === 'en' ? 'Accessibility' : 'رسائی'}
        </h2>

        <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl overflow-hidden border border-[#E0E0E0] dark:border-[#2A2A2A] mb-6">
          {/* Voice Guidance */}
          <div className="flex items-center justify-between p-5 border-b border-[#E0E0E0] dark:border-[#2A2A2A]">
            <div className="flex items-center gap-4">
              <Volume2 className="w-6 h-6 text-[#0CAA41]" strokeWidth={2.5} />
              <span className="text-[#1A1A1A] dark:text-white font-bold">
                {language === 'en' ? 'Voice Guidance' : 'صوتی رہنمائی'}
              </span>
            </div>
            <button 
              onClick={handleVoiceGuidanceToggle}
              className={`w-16 h-9 rounded-full transition-colors relative ${
                speakerActive ? "bg-[#0CAA41]" : "bg-[#E0E0E0] dark:bg-[#2A2A2A]"
              }`}
              aria-label={`${language === 'en' ? 'Voice Guidance' : 'صوتی رہنمائی'} ${speakerActive ? (language === 'en' ? 'On' : 'آن') : (language === 'en' ? 'Off' : 'آف')}`}
              aria-pressed={speakerActive}
            >
              <div 
                className={`w-7 h-7 bg-white rounded-full absolute top-1 transition-transform ${
                  speakerActive ? "translate-x-8" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Reading Options Button */}
          {speakerActive && (
            <button 
              onClick={() => setShowReadingOptions(!showReadingOptions)}
              className="w-full flex items-center justify-between p-5 hover:bg-[#F5F8F3] dark:hover:bg-[#2A2A2A] transition-colors border-b border-[#E0E0E0] dark:border-[#2A2A2A]"
              aria-label={language === 'en' ? 'Reading Options' : 'پڑھنے کے اختیارات'}
            >
              <div className="flex items-center gap-4">
                <Layers className="w-6 h-6 text-[#0CAA41]" strokeWidth={2.5} />
                <span className="text-[#1A1A1A] dark:text-white font-bold">
                  {language === 'en' ? 'Reading Options' : 'پڑھنے کے اختیارات'}
                </span>
              </div>
              <div className="w-10 h-10 bg-[#0CAA41]/10 rounded-full flex items-center justify-center">
                <Gauge className="w-5 h-5 text-[#0CAA41]" strokeWidth={2.5} />
              </div>
            </button>
          )}

          {/* Reading Options Panel */}
          {speakerActive && showReadingOptions && (
            <div className="p-5 bg-[#F5F8F3] dark:bg-[#2A2A2A] border-b border-[#E0E0E0] dark:border-[#2A2A2A]">
              {/* Reading Speed */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Gauge className="w-5 h-5 text-[#0CAA41]" strokeWidth={2.5} />
                  <span className="text-[#1A1A1A] dark:text-white font-bold">
                    {language === 'en' ? 'Reading Speed' : 'پڑھنے کی رفتار'}
                  </span>
                </div>
                <div className="flex gap-3">
                  {([0.8, 1.0, 1.2] as const).map((rate) => (
                    <button
                      key={rate}
                      onClick={() => readAloud.setRate(rate)}
                      className={`flex-1 py-4 rounded-2xl transition-all font-bold ${
                        readAloud.rate === rate
                          ? "bg-[#0CAA41] text-white shadow-lg"
                          : "bg-white dark:bg-[#1E1E1E] text-[#1A1A1A] dark:text-white border border-[#E0E0E0] dark:border-[#2A2A2A]"
                      }`}
                      aria-label={`${language === 'en' ? 'Speed' : 'رفتار'} ${rate}x`}
                    >
                      {rateLabels[language][rate.toString() as keyof typeof rateLabels['en']]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reading Depth */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Layers className="w-5 h-5 text-[#0CAA41]" strokeWidth={2.5} />
                  <span className="text-[#1A1A1A] dark:text-white font-bold">
                    {language === 'en' ? 'Reading Detail' : 'تفصیل کی سطح'}
                  </span>
                </div>
                <div className="space-y-3">
                  {(["labels", "summary", "all"] as const).map((depth) => (
                    <button
                      key={depth}
                      onClick={() => readAloud.setDepth(depth)}
                      className={`w-full py-4 px-5 rounded-2xl transition-all font-bold text-left flex items-center justify-between ${
                        readAloud.depth === depth
                          ? "bg-[#0CAA41] text-white shadow-lg"
                          : "bg-white dark:bg-[#1E1E1E] text-[#1A1A1A] dark:text-white border border-[#E0E0E0] dark:border-[#2A2A2A]"
                      }`}
                      aria-label={depthLabels[language][depth]}
                    >
                      {depthLabels[language][depth]}
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        readAloud.depth === depth
                          ? "border-white"
                          : "border-[#E0E0E0] dark:border-[#2A2A2A]"
                      }`}>
                        {readAloud.depth === depth && (
                          <div className="w-3 h-3 rounded-full bg-white"></div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview Message */}
              <div className="bg-[#E8F5EC] dark:bg-[#0CAA41]/10 border-2 border-[#0CAA41]/30 rounded-2xl p-4">
                <p className="text-[#1A1A1A] dark:text-white font-semibold text-sm text-center">
                  {language === 'en' 
                    ? `Reading at ${rateLabels[language][readAloud.rate.toString() as keyof typeof rateLabels['en']]} speed with ${depthLabels[language][readAloud.depth]} detail`
                    : `${rateLabels[language][readAloud.rate.toString() as keyof typeof rateLabels['ur']]} رفتار سے ${depthLabels[language][readAloud.depth]} کے ساتھ پڑھنا`}
                </p>
              </div>
            </div>
          )}

          {/* Help Tutorial */}
          <button 
            onClick={() => {
              voiceAssist.announceButton('voiceTutorial', 
                language === 'en' 
                  ? 'Voice Tutorial. Learn how to use voice features.'
                  : 'صوتی ٹیوٹوریل۔ صوتی خصوصیات استعمال کرنا سیکھیں۔'
              );
            }}
            className="w-full flex items-center justify-between p-5 hover:bg-[#F5F8F3] dark:hover:bg-[#2A2A2A] transition-colors"
            aria-label={language === 'en' ? 'Voice Tutorial' : 'صوتی ٹیوٹوریل'}
          >
            <div className="flex items-center gap-4">
              <HelpCircle className="w-6 h-6 text-[#0CAA41]" strokeWidth={2.5} />
              <span className="text-[#1A1A1A] dark:text-white font-bold">
                {language === 'en' ? 'Voice Tutorial' : 'صوتی ٹیوٹوریل'}
              </span>
            </div>
            <div className="w-10 h-10 bg-[#0CAA41]/10 rounded-full flex items-center justify-center">
              <Volume2 className="w-5 h-5 text-[#0CAA41]" strokeWidth={2.5} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}