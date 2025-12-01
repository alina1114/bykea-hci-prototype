/**
 * VoiceAssistContext - Global Voice Assist (TTS Narrator) System
 * 
 * Provides comprehensive screen narration for visually impaired users:
 * - Automatic screen summaries when navigating
 * - Button and interaction announcements
 * - Persistent ON/OFF state across all screens
 * - Bilingual support (English/Urdu)
 * - Integration with language settings
 */

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

interface VoiceAssistContextType {
  // State
  isActive: boolean;
  language: 'en' | 'ur';
  isSpeaking: boolean;
  
  // Actions
  toggle: () => void;
  setLanguage: (lang: 'en' | 'ur') => void;
  announceScreenChange: (screenName: string, summary: string) => void;
  announceAction: (action: string) => void;
  announceText: (text: string) => void;
  stopSpeaking: () => void;
  
  // Queue management
  queueAnnouncement: (text: string, priority?: 'high' | 'normal' | 'low') => void;
}

const VoiceAssistContext = createContext<VoiceAssistContextType | undefined>(undefined);

interface QueueItem {
  text: string;
  priority: 'high' | 'normal' | 'low';
  timestamp: number;
}

export function VoiceAssistProvider({ children }: { children: React.ReactNode }) {
  const [isActive, setIsActive] = useState(false);
  const [language, setLanguageState] = useState<'en' | 'ur'>('en');
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const queueRef = useRef<QueueItem[]>([]);
  const isProcessingRef = useRef(false);

  // Process announcement queue
  const processQueue = useCallback(() => {
    if (!isActive || isProcessingRef.current || queueRef.current.length === 0) {
      return;
    }

    isProcessingRef.current = true;
    
    // Sort by priority and timestamp
    queueRef.current.sort((a, b) => {
      const priorityWeight = { high: 3, normal: 2, low: 1 };
      const diff = priorityWeight[b.priority] - priorityWeight[a.priority];
      return diff !== 0 ? diff : a.timestamp - b.timestamp;
    });

    const item = queueRef.current.shift();
    
    if (item && window.speechSynthesis) {
      speak(item.text);
    } else {
      isProcessingRef.current = false;
      setIsSpeaking(false);
    }
  }, [isActive]);

  // Core speech function
  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis) {
      console.error('[VoiceAssist] Web Speech API not available');
      setIsSpeaking(false);
      isProcessingRef.current = false;
      return;
    }

    try {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'en' ? 'en-US' : 'ur-PK';
      utterance.rate = 0.9; // Slightly slower for clarity
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        isProcessingRef.current = false;
        utteranceRef.current = null;
        
        // Process next item in queue after a brief pause
        setTimeout(() => {
          processQueue();
        }, 200);
      };

      utterance.onerror = (event) => {
        console.error('[VoiceAssist] Speech error:', event);
        setIsSpeaking(false);
        isProcessingRef.current = false;
        utteranceRef.current = null;
        
        // Try next item
        setTimeout(() => {
          processQueue();
        }, 200);
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      
    } catch (error) {
      console.error('[VoiceAssist] Error speaking:', error);
      setIsSpeaking(false);
      isProcessingRef.current = false;
    }
  }, [language, processQueue]);

  // Queue an announcement
  const queueAnnouncement = useCallback((text: string, priority: 'high' | 'normal' | 'low' = 'normal') => {
    if (!isActive || !text.trim()) return;

    queueRef.current.push({
      text: text.trim(),
      priority,
      timestamp: Date.now()
    });

    processQueue();
  }, [isActive, processQueue]);

  // Announce screen change (high priority)
  const announceScreenChange = useCallback((screenName: string, summary: string) => {
    if (!isActive) return;
    
    const announcement = `${screenName}. ${summary}`;
    console.log(`[VoiceAssist] Screen: ${announcement}`);
    
    // Clear queue for screen changes (high priority)
    queueRef.current = [];
    queueAnnouncement(announcement, 'high');
  }, [isActive, queueAnnouncement]);

  // Announce user action (normal priority)
  const announceAction = useCallback((action: string) => {
    if (!isActive) return;
    
    console.log(`[VoiceAssist] Action: ${action}`);
    queueAnnouncement(action, 'normal');
  }, [isActive, queueAnnouncement]);

  // Announce text (low priority)
  const announceText = useCallback((text: string) => {
    if (!isActive) return;
    
    console.log(`[VoiceAssist] Text: ${text}`);
    queueAnnouncement(text, 'low');
  }, [isActive, queueAnnouncement]);

  // Stop all speech
  const stopSpeaking = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    queueRef.current = [];
    setIsSpeaking(false);
    isProcessingRef.current = false;
    utteranceRef.current = null;
  }, []);

  // Toggle Voice Assist
  const toggle = useCallback(() => {
    const newState = !isActive;
    setIsActive(newState);
    
    if (newState) {
      queueAnnouncement(language === 'en' 
        ? 'Voice Assist turned on.' 
        : 'وائس اسسٹ آن ہے۔', 'high');
    } else {
      stopSpeaking();
    }
    
    console.log(`[VoiceAssist] ${newState ? 'ON' : 'OFF'}`);
  }, [isActive, language, queueAnnouncement, stopSpeaking]);

  // Set language
  const setLanguage = useCallback((lang: 'en' | 'ur') => {
    setLanguageState(lang);
    
    if (isActive) {
      stopSpeaking();
      queueAnnouncement(
        lang === 'en' 
          ? 'Language changed to English.' 
          : 'زبان اردو میں تبدیل ہوئی۔', 
        'high'
      );
    }
  }, [isActive, stopSpeaking, queueAnnouncement]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, [stopSpeaking]);

  const value: VoiceAssistContextType = {
    isActive,
    language,
    isSpeaking,
    toggle,
    setLanguage,
    announceScreenChange,
    announceAction,
    announceText,
    stopSpeaking,
    queueAnnouncement
  };

  return (
    <VoiceAssistContext.Provider value={value}>
      {children}
    </VoiceAssistContext.Provider>
  );
}

export function useVoiceAssist() {
  const context = useContext(VoiceAssistContext);
  if (!context) {
    throw new Error('useVoiceAssist must be used within VoiceAssistProvider');
  }
  return context;
}
