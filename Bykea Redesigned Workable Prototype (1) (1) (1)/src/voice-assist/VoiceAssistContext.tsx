/**
 * VoiceAssistContext & VoiceAssistProvider
 * 
 * Global context for managing Voice Assist state across the application.
 * Handles the announcement queue, priority system, and speaker button state.
 * 
 * @example
 * ```tsx
 * // In App.tsx
 * <VoiceAssistProvider>
 *   <YourApp />
 * </VoiceAssistProvider>
 * ```
 */

import React, { createContext, useState, useCallback, useRef, useEffect } from 'react';

export type AnnouncementPriority = 'high' | 'normal' | 'low';

interface Announcement {
  id: string;
  text: string;
  priority: AnnouncementPriority;
  timestamp: number;
}

interface VoiceAssistContextValue {
  // State
  isEnabled: boolean;
  isSpeaking: boolean;
  language: 'en' | 'ur';
  
  // Control functions
  setEnabled: (enabled: boolean) => void;
  setLanguage: (lang: 'en' | 'ur') => void;
  
  // Announcement functions
  announce: (text: string, priority?: AnnouncementPriority) => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
  clearQueue: () => void;
  
  // Queue state
  queueLength: number;
}

export const VoiceAssistContext = createContext<VoiceAssistContextValue | null>(null);

interface VoiceAssistProviderProps {
  children: React.ReactNode;
  initialEnabled?: boolean;
  initialLanguage?: 'en' | 'ur';
}

/**
 * Voice Assist Provider Component
 * 
 * Manages global voice assist state and announcement queue.
 * Uses Web Speech API for text-to-speech (in production).
 */
export function VoiceAssistProvider({
  children,
  initialEnabled = false,
  initialLanguage = 'en'
}: VoiceAssistProviderProps) {
  // State
  const [isEnabled, setIsEnabled] = useState(initialEnabled);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ur'>(initialLanguage);
  
  // Queue management
  const [queue, setQueue] = useState<Announcement[]>([]);
  const queueRef = useRef<Announcement[]>([]);
  const isProcessingRef = useRef(false);
  const currentAnnouncementRef = useRef<string | null>(null);
  
  // Speech synthesis references (would be Web Speech API in production)
  const synthRef = useRef<any>(null);
  const utteranceRef = useRef<any>(null);

  /**
   * Initialize speech synthesis
   */
  useEffect(() => {
    // In production, this would initialize the Web Speech API
    // synthRef.current = window.speechSynthesis;
    console.log('[Voice Assist] Provider initialized');
    
    return () => {
      // Cleanup
      stop();
    };
  }, []);

  /**
   * Update queue ref when queue state changes
   */
  useEffect(() => {
    queueRef.current = queue;
  }, [queue]);

  /**
   * Sort queue by priority
   */
  const sortQueueByPriority = (announcements: Announcement[]): Announcement[] => {
    const priorityOrder = { high: 0, normal: 1, low: 2 };
    
    return [...announcements].sort((a, b) => {
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return a.timestamp - b.timestamp; // If same priority, sort by time
    });
  };

  /**
   * Process the announcement queue
   */
  const processQueue = useCallback(() => {
    if (isProcessingRef.current || queueRef.current.length === 0 || !isEnabled) {
      return;
    }

    isProcessingRef.current = true;
    setIsSpeaking(true);

    // Sort queue by priority
    const sortedQueue = sortQueueByPriority(queueRef.current);
    const nextAnnouncement = sortedQueue[0];

    if (!nextAnnouncement) {
      isProcessingRef.current = false;
      setIsSpeaking(false);
      return;
    }

    currentAnnouncementRef.current = nextAnnouncement.id;

    console.log(`[Voice Assist] Speaking (${nextAnnouncement.priority}): ${nextAnnouncement.text}`);

    // In production, this would use Web Speech API:
    // const utterance = new SpeechSynthesisUtterance(nextAnnouncement.text);
    // utterance.lang = language === 'en' ? 'en-US' : 'ur-PK';
    // utterance.rate = 0.9; // Slightly slower for seniors
    // utterance.pitch = 1.0;
    // utterance.volume = 1.0;
    
    // utterance.onend = () => {
    //   handleAnnouncementComplete(nextAnnouncement.id);
    // };
    
    // utterance.onerror = (event) => {
    //   console.error('[Voice Assist] Speech error:', event);
    //   handleAnnouncementComplete(nextAnnouncement.id);
    // };
    
    // synthRef.current.speak(utterance);
    // utteranceRef.current = utterance;

    // Simulate speech duration
    const estimatedDuration = calculateSpeechDuration(nextAnnouncement.text);
    setTimeout(() => {
      handleAnnouncementComplete(nextAnnouncement.id);
    }, estimatedDuration);

  }, [isEnabled, language]);

  /**
   * Calculate estimated speech duration (in ms)
   */
  const calculateSpeechDuration = (text: string): number => {
    // Average speaking rate: ~150 words per minute for seniors
    // Slower rate for better comprehension
    const wordsPerMinute = 130;
    const words = text.split(' ').length;
    const minutes = words / wordsPerMinute;
    const milliseconds = minutes * 60 * 1000;
    
    // Add padding
    return Math.max(milliseconds, 1000); // Minimum 1 second
  };

  /**
   * Handle announcement completion
   */
  const handleAnnouncementComplete = useCallback((announcementId: string) => {
    // Remove completed announcement from queue
    setQueue(prev => prev.filter(a => a.id !== announcementId));
    
    currentAnnouncementRef.current = null;
    isProcessingRef.current = false;
    
    // Process next in queue
    setTimeout(() => {
      if (queueRef.current.length > 0) {
        processQueue();
      } else {
        setIsSpeaking(false);
      }
    }, 300); // Small delay between announcements
  }, [processQueue]);

  /**
   * Add announcement to queue
   */
  const announce = useCallback((text: string, priority: AnnouncementPriority = 'normal') => {
    if (!isEnabled || !text.trim()) return;

    const announcement: Announcement = {
      id: `${Date.now()}-${Math.random()}`,
      text: text.trim(),
      priority,
      timestamp: Date.now()
    };

    console.log(`[Voice Assist] Queued (${priority}): ${text}`);

    setQueue(prev => [...prev, announcement]);

    // Start processing if not already processing
    if (!isProcessingRef.current) {
      setTimeout(processQueue, 100);
    }
  }, [isEnabled, processQueue]);

  /**
   * Stop all speech immediately
   */
  const stop = useCallback(() => {
    console.log('[Voice Assist] Stopping speech');
    
    // In production: synthRef.current?.cancel();
    
    setQueue([]);
    queueRef.current = [];
    currentAnnouncementRef.current = null;
    isProcessingRef.current = false;
    setIsSpeaking(false);
  }, []);

  /**
   * Pause speech
   */
  const pause = useCallback(() => {
    console.log('[Voice Assist] Pausing speech');
    
    // In production: synthRef.current?.pause();
    
    setIsSpeaking(false);
  }, []);

  /**
   * Resume speech
   */
  const resume = useCallback(() => {
    console.log('[Voice Assist] Resuming speech');
    
    // In production: synthRef.current?.resume();
    
    setIsSpeaking(true);
  }, []);

  /**
   * Clear announcement queue
   */
  const clearQueue = useCallback(() => {
    console.log('[Voice Assist] Clearing queue');
    
    setQueue([]);
    queueRef.current = [];
  }, []);

  /**
   * Enable/disable voice assist
   */
  const setEnabled = useCallback((enabled: boolean) => {
    console.log(`[Voice Assist] ${enabled ? 'Enabled' : 'Disabled'}`);
    
    setIsEnabled(enabled);
    
    if (!enabled) {
      stop();
    } else {
      // Announce that voice assist is enabled
      setTimeout(() => {
        const enabledText = language === 'en' 
          ? 'Voice Assist Enabled' 
          : 'آواز اسسٹنٹ فعال ہے';
        announce(enabledText, 'high');
      }, 200);
    }
  }, [language, announce, stop]);

  /**
   * Change language
   */
  const handleSetLanguage = useCallback((lang: 'en' | 'ur') => {
    console.log(`[Voice Assist] Language changed to ${lang}`);
    setLanguage(lang);
    
    // Announce language change
    if (isEnabled) {
      const text = lang === 'en' 
        ? 'Language changed to English' 
        : 'زبان اردو میں تبدیل ہوگئی';
      announce(text, 'high');
    }
  }, [isEnabled, announce]);

  const contextValue: VoiceAssistContextValue = {
    isEnabled,
    isSpeaking,
    language,
    setEnabled,
    setLanguage: handleSetLanguage,
    announce,
    stop,
    pause,
    resume,
    clearQueue,
    queueLength: queue.length
  };

  return (
    <VoiceAssistContext.Provider value={contextValue}>
      {children}
    </VoiceAssistContext.Provider>
  );
}

/**
 * Hook to access Voice Assist context
 */
export function useVoiceAssist() {
  const context = React.useContext(VoiceAssistContext);
  
  if (!context) {
    throw new Error('useVoiceAssist must be used within VoiceAssistProvider');
  }
  
  return context;
}
