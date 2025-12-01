/**
 * useVoiceAssistScreen - Custom hook for screen-level Voice Assist integration
 * 
 * Automatically announces screen changes and provides helper functions
 * for announcing interactions within a screen
 */

import { useEffect, useCallback } from 'react';
import { useVoiceAssist } from './VoiceAssistContext';
import { useVoiceAssistText } from './useVoiceAssistText';

interface UseVoiceAssistScreenOptions {
  screenKey: string;
  language: 'en' | 'ur';
  autoAnnounce?: boolean; // Auto-announce screen on mount
}

export function useVoiceAssistScreen({ 
  screenKey, 
  language, 
  autoAnnounce = true 
}: UseVoiceAssistScreenOptions) {
  const voiceAssist = useVoiceAssist();
  const screenContent = useVoiceAssistText(language);
  
  const content = screenContent[screenKey] || screenContent.home;

  // Announce screen change on mount
  useEffect(() => {
    if (autoAnnounce && voiceAssist.isActive) {
      voiceAssist.announceScreenChange(
        content.screenName,
        content.screenSummary
      );
    }
  }, [screenKey]); // Only re-run when screen changes

  // Sync language with Voice Assist
  useEffect(() => {
    if (voiceAssist.language !== language) {
      voiceAssist.setLanguage(language);
    }
  }, [language]);

  // Helper: Announce a button press
  const announceButton = useCallback((buttonKey: string, customText?: string) => {
    const text = customText || content.elements[buttonKey] || buttonKey;
    const announcement = language === 'en' 
      ? `You pressed: ${text}`
      : `آپ نے دبایا: ${text}`;
    voiceAssist.announceAction(announcement);
  }, [voiceAssist, content, language]);

  // Helper: Announce a selection
  const announceSelection = useCallback((item: string) => {
    const announcement = language === 'en' 
      ? `You selected: ${item}`
      : `آپ نے منتخب کیا: ${item}`;
    voiceAssist.announceAction(announcement);
  }, [voiceAssist, language]);

  // Helper: Announce navigation
  const announceNavigation = useCallback((destination: string) => {
    const announcement = language === 'en' 
      ? `Navigating to ${destination}`
      : `${destination} پر جا رہے ہیں`;
    voiceAssist.announceAction(announcement);
  }, [voiceAssist, language]);

  // Helper: Announce error
  const announceError = useCallback((errorKey: string) => {
    const errorContent = screenContent.errors;
    const text = errorContent.elements[errorKey] || errorKey;
    voiceAssist.announceAction(text);
  }, [voiceAssist, screenContent, language]);

  // Helper: Announce custom text
  const announceText = useCallback((text: string) => {
    voiceAssist.announceText(text);
  }, [voiceAssist]);

  // Helper: Announce input focus
  const announceInputFocus = useCallback((label: string) => {
    const announcement = language === 'en'
      ? `${label} field. Double tap to edit.`
      : `${label} فیلڈ۔ ترمیم کرنے کے لیے دو بار ٹیپ کریں۔`;
    voiceAssist.announceAction(announcement);
  }, [voiceAssist, language]);

  // Helper: Announce toggle state
  const announceToggle = useCallback((label: string, isOn: boolean) => {
    const state = isOn 
      ? (language === 'en' ? 'On' : 'آن')
      : (language === 'en' ? 'Off' : 'آف');
    const announcement = `${label} ${state}`;
    voiceAssist.announceAction(announcement);
  }, [voiceAssist, language]);

  return {
    // State
    isActive: voiceAssist.isActive,
    isSpeaking: voiceAssist.isSpeaking,
    
    // Content
    content,
    screenName: content.screenName,
    screenSummary: content.screenSummary,
    
    // Actions
    announceButton,
    announceSelection,
    announceNavigation,
    announceError,
    announceText,
    announceInputFocus,
    announceToggle,
    stopSpeaking: voiceAssist.stopSpeaking
  };
}
