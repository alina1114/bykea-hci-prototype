/**
 * useVoiceAssistScreen Hook
 * 
 * Core hook for implementing Voice Assist on any screen.
 * Provides announcement functions and auto-announcement capabilities.
 * 
 * @example
 * ```tsx
 * const voiceAssist = useVoiceAssistScreen({
 *   screenKey: 'home',
 *   language: 'en',
 *   autoAnnounce: true
 * });
 * 
 * // Announce button press
 * voiceAssist.announceButton('confirmButton');
 * 
 * // Announce selection
 * voiceAssist.announceSelection('Bike');
 * ```
 */

import { useEffect, useCallback, useContext } from 'react';
import { VoiceAssistContext } from './VoiceAssistContext';
import { getVoiceAssistText } from './useVoiceAssistText';

export type AnnouncementPriority = 'high' | 'normal' | 'low';
export type ScreenKey = 
  | 'splash'
  | 'login' 
  | 'otp'
  | 'profileSetup'
  | 'home'
  | 'manageQuickDestinations'
  | 'manageDestinations'
  | 'pickup'
  | 'dropoff'
  | 'vehicleSelection'
  | 'rideOptions'
  | 'confirmRide'
  | 'driverOnWay'
  | 'chat'
  | 'rating'
  | 'payment'
  | 'wallet'
  | 'profile'
  | 'editProfile'
  | 'paymentMethods'
  | 'addPaymentMethod'
  | 'savedAddresses'
  | 'addAddress'
  | 'trips'
  | 'tripDetails'
  | 'settings';

interface UseVoiceAssistScreenOptions {
  screenKey: ScreenKey;
  language: 'en' | 'ur';
  autoAnnounce?: boolean;
  autoAnnounceDelay?: number;
}

interface VoiceAssistAPI {
  // Core announcement functions
  announceButton: (elementKey: string, customText?: string) => void;
  announceSelection: (itemName: string, additionalInfo?: string) => void;
  announceNavigation: (destination: string) => void;
  announceInputFocus: (fieldName: string, placeholder?: string) => void;
  announceToggle: (label: string, state: boolean) => void;
  announceError: (errorKey: string, customError?: string) => void;
  announceAction: (actionText: string) => void;
  announceText: (text: string, priority?: AnnouncementPriority) => void;
  announceCustom: (text: string, priority?: AnnouncementPriority) => void;
  
  // Control functions
  stopSpeaking: () => void;
  pauseSpeaking: () => void;
  resumeSpeaking: () => void;
  
  // Screen content
  content: ReturnType<typeof getVoiceAssistText>;
  
  // State
  isEnabled: boolean;
  isSpeaking: boolean;
  language: 'en' | 'ur';
}

/**
 * Main Voice Assist hook for screens
 */
export function useVoiceAssistScreen(options: UseVoiceAssistScreenOptions): VoiceAssistAPI {
  const {
    screenKey,
    language,
    autoAnnounce = false,
    autoAnnounceDelay = 500
  } = options;

  // Get voice assist context
  const context = useContext(VoiceAssistContext);
  
  if (!context) {
    throw new Error('useVoiceAssistScreen must be used within VoiceAssistProvider');
  }

  const {
    isEnabled,
    isSpeaking,
    announce,
    stop,
    pause,
    resume
  } = context;

  // Get text content for this screen
  const content = getVoiceAssistText(screenKey, language);

  /**
   * Auto-announce screen on mount
   */
  useEffect(() => {
    if (autoAnnounce && isEnabled) {
      const timer = setTimeout(() => {
        announceScreenEntry();
      }, autoAnnounceDelay);

      return () => clearTimeout(timer);
    }
  }, [screenKey, language, isEnabled, autoAnnounce]);

  /**
   * Announce screen entry with summary
   */
  const announceScreenEntry = useCallback(() => {
    if (!isEnabled) return;

    const announcement = `${content.screenName}. ${content.screenSummary}`;
    announce(announcement, 'high');
  }, [content, isEnabled, announce]);

  /**
   * Announce button press
   */
  const announceButton = useCallback((elementKey: string, customText?: string) => {
    if (!isEnabled) return;

    const buttonText = customText || content.elements[elementKey] || elementKey;
    const announcement = language === 'en'
      ? `You pressed: ${buttonText}`
      : `آپ نے ${buttonText} دبایا`;
    
    announce(announcement, 'high');
  }, [isEnabled, content, language, announce]);

  /**
   * Announce item selection
   */
  const announceSelection = useCallback((itemName: string, additionalInfo?: string) => {
    if (!isEnabled) return;

    let announcement = language === 'en'
      ? `You selected: ${itemName}`
      : `آپ نے ${itemName} منتخب کیا`;
    
    if (additionalInfo) {
      announcement += language === 'en' ? `. ${additionalInfo}` : `۔ ${additionalInfo}`;
    }
    
    announce(announcement, 'high');
  }, [isEnabled, language, announce]);

  /**
   * Announce navigation to another screen
   */
  const announceNavigation = useCallback((destination: string) => {
    if (!isEnabled) return;

    const announcement = language === 'en'
      ? `Navigating to ${destination}`
      : `${destination} کی طرف جا رہے ہیں`;
    
    announce(announcement, 'normal');
  }, [isEnabled, language, announce]);

  /**
   * Announce input field focus
   */
  const announceInputFocus = useCallback((fieldName: string, placeholder?: string) => {
    if (!isEnabled) return;

    let announcement = language === 'en'
      ? `${fieldName} field`
      : `${fieldName} فیلڈ`;
    
    if (placeholder) {
      announcement += language === 'en'
        ? `. ${placeholder}. Double tap to edit`
        : `۔ ${placeholder}۔ ترمیم کرنے کے لیے دو بار ٹیپ کریں`;
    } else {
      announcement += language === 'en'
        ? `. Double tap to edit`
        : `۔ ترمیم کرنے کے لیے دو بار ٹیپ کریں`;
    }
    
    announce(announcement, 'high');
  }, [isEnabled, language, announce]);

  /**
   * Announce toggle state change
   */
  const announceToggle = useCallback((label: string, state: boolean) => {
    if (!isEnabled) return;

    const stateText = language === 'en'
      ? (state ? 'On' : 'Off')
      : (state ? 'آن' : 'آف');
    
    const announcement = language === 'en'
      ? `${label} ${stateText}`
      : `${label} ${stateText}`;
    
    announce(announcement, 'high');
  }, [isEnabled, language, announce]);

  /**
   * Announce error message
   */
  const announceError = useCallback((errorKey: string, customError?: string) => {
    if (!isEnabled) return;

    const errorText = customError || content.errors?.[errorKey] || errorKey;
    const announcement = language === 'en'
      ? `Error: ${errorText}`
      : `خرابی: ${errorText}`;
    
    announce(announcement, 'high');
  }, [isEnabled, content, language, announce]);

  /**
   * Announce action completion
   */
  const announceAction = useCallback((actionText: string) => {
    if (!isEnabled) return;
    announce(actionText, 'normal');
  }, [isEnabled, announce]);

  /**
   * Announce custom text with priority
   */
  const announceText = useCallback((text: string, priority: AnnouncementPriority = 'normal') => {
    if (!isEnabled) return;
    announce(text, priority);
  }, [isEnabled, announce]);

  /**
   * Announce custom text (alias for announceText)
   */
  const announceCustom = useCallback((text: string, priority: AnnouncementPriority = 'normal') => {
    if (!isEnabled) return;
    announce(text, priority);
  }, [isEnabled, announce]);

  /**
   * Stop all speech
   */
  const stopSpeaking = useCallback(() => {
    stop();
  }, [stop]);

  /**
   * Pause speech
   */
  const pauseSpeaking = useCallback(() => {
    pause();
  }, [pause]);

  /**
   * Resume speech
   */
  const resumeSpeaking = useCallback(() => {
    resume();
  }, [resume]);

  return {
    announceButton,
    announceSelection,
    announceNavigation,
    announceInputFocus,
    announceToggle,
    announceError,
    announceAction,
    announceText,
    announceCustom,
    stopSpeaking,
    pauseSpeaking,
    resumeSpeaking,
    content,
    isEnabled,
    isSpeaking,
    language
  };
}
