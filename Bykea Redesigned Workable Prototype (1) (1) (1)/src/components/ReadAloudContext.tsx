/**
 * ReadAloudContext - Global state management for Text-to-Speech functionality
 * 
 * Manages TTS state across all screens including:
 * - Play/pause/stop state
 * - Language selection (EN/UR)
 * - Speech rate and read depth
 * - Current text being read
 * - Text highlighting sync
 */

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

type ReadAloudState = 'hidden' | 'idle' | 'playing' | 'paused' | 'error';
type SpeechRate = 0.8 | 1.0 | 1.2;
type ReadDepth = 'labels' | 'summary' | 'all';

interface ReadAloudContextType {
  // State
  state: ReadAloudState;
  language: 'en' | 'ur';
  rate: SpeechRate;
  depth: ReadDepth;
  currentText: string;
  currentIndex: number;
  screenName: string;
  
  // Actions
  play: (texts: string[], screenName: string) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  setLanguage: (lang: 'en' | 'ur') => void;
  setRate: (rate: SpeechRate) => void;
  setDepth: (depth: ReadDepth) => void;
  setState: (state: ReadAloudState) => void;
  
  // Options
  showOptions: boolean;
  toggleOptions: () => void;
}

const ReadAloudContext = createContext<ReadAloudContextType | undefined>(undefined);

export function ReadAloudProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ReadAloudState>('idle');
  const [language, setLanguageState] = useState<'en' | 'ur'>('en');
  const [rate, setRate] = useState<SpeechRate>(1.0);
  const [depth, setDepth] = useState<ReadDepth>('summary');
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [screenName, setScreenName] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  
  const textsRef = useRef<string[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const voicesLoadedRef = useRef(false);

  // Wait for voices to be loaded
  useEffect(() => {
    if (window.speechSynthesis) {
      // Load voices
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          voicesLoadedRef.current = true;
          console.log('[TTS] Voices loaded:', voices.length);
        }
      };

      // Try loading immediately
      loadVoices();

      // Also listen for the voiceschanged event
      window.speechSynthesis.onvoiceschanged = loadVoices;

      return () => {
        window.speechSynthesis.onvoiceschanged = null;
      };
    }
  }, []);

  // Analytics event emitter (mock for prototype)
  const emitAnalyticsEvent = useCallback((eventName: string, data?: any) => {
    console.log(`[Analytics] ${eventName}`, data);
    // In production: send to analytics service
  }, []);

  // Clean up function
  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  // Stop reading
  const stop = useCallback(() => {
    cleanup();
    setState('idle');
    setCurrentText('');
    setCurrentIndex(0);
    textsRef.current = [];
    emitAnalyticsEvent('readaloud_stop', { screenName });
  }, [cleanup, emitAnalyticsEvent, screenName]);

  // Play text-to-speech
  const play = useCallback((texts: string[], screen: string) => {
    cleanup();
    
    if (!texts || texts.length === 0) {
      setState('error');
      return;
    }

    textsRef.current = texts;
    setScreenName(screen);
    setCurrentIndex(0);
    setState('playing');
    
    // ARIA announcement
    const announcement = `Now reading: ${screen} in ${language === 'en' ? 'English' : 'Urdu'}`;
    console.log(`[ARIA Live] ${announcement}`);
    
    emitAnalyticsEvent('readaloud_play', { 
      screenName: screen, 
      language,
      textCount: texts.length 
    });

    // Start reading first text
    const readText = (index: number) => {
      if (index >= textsRef.current.length) {
        stop();
        return;
      }

      const text = textsRef.current[index];
      setCurrentText(text);
      setCurrentIndex(index);

      // Check if Web Speech API is available
      if (!window.speechSynthesis) {
        console.error('[TTS] Web Speech API not available');
        setState('error');
        emitAnalyticsEvent('readaloud_error', { 
          error: 'Web Speech API not available',
          fallback: 'Use cloud TTS provider (Azure/Google/AWS)'
        });
        return;
      }

      try {
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Get available voices
        const voices = window.speechSynthesis.getVoices();
        
        // Try to find a voice for the selected language
        let selectedVoice = null;
        if (language === 'en') {
          // Find English voice
          selectedVoice = voices.find(v => v.lang.startsWith('en-')) || voices[0];
          utterance.lang = 'en-US';
        } else {
          // Find Urdu voice (fallback to English if not available)
          selectedVoice = voices.find(v => v.lang.startsWith('ur-')) || 
                          voices.find(v => v.lang.startsWith('hi-')) || // Hindi as fallback
                          voices.find(v => v.lang.startsWith('en-')) || 
                          voices[0];
          
          // Use appropriate language code
          if (selectedVoice?.lang.startsWith('ur-')) {
            utterance.lang = 'ur-PK';
          } else if (selectedVoice?.lang.startsWith('hi-')) {
            utterance.lang = 'hi-IN';
            console.log('[TTS] Using Hindi voice as Urdu fallback');
          } else {
            utterance.lang = 'en-US';
            console.log('[TTS] Using English voice as Urdu fallback');
          }
        }
        
        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }
        
        utterance.rate = rate;
        utterance.volume = 1.0;
        utterance.pitch = 1.0;

        utterance.onend = () => {
          // Move to next text after delay
          timeoutRef.current = setTimeout(() => {
            readText(index + 1);
          }, 300);
        };

        utterance.onerror = (event) => {
          // Better error handling
          const errorType = event.error || 'unknown';
          console.error('[TTS] Speech synthesis error:', {
            error: errorType,
            message: event.message || 'No message',
            text: text.substring(0, 50)
          });
          
          // Don't set error state for certain non-critical errors
          if (errorType === 'canceled' || errorType === 'interrupted') {
            console.log('[TTS] Speech was canceled or interrupted, continuing...');
            // Try next text
            timeoutRef.current = setTimeout(() => {
              readText(index + 1);
            }, 100);
          } else {
            // For critical errors, log but continue
            console.warn('[TTS] Skipping text due to error, moving to next');
            timeoutRef.current = setTimeout(() => {
              readText(index + 1);
            }, 100);
          }
        };

        utteranceRef.current = utterance;
        
        // Add small delay before speaking to ensure stability
        setTimeout(() => {
          if (window.speechSynthesis && utteranceRef.current === utterance) {
            window.speechSynthesis.speak(utterance);
          }
        }, 50);
        
      } catch (error) {
        console.error('[TTS] Error creating utterance:', error);
        // Don't set error state, just skip this text
        console.warn('[TTS] Skipping text due to error, moving to next');
        timeoutRef.current = setTimeout(() => {
          readText(index + 1);
        }, 100);
      }
    };

    readText(0);
  }, [language, rate, cleanup, stop, emitAnalyticsEvent]);

  // Pause reading
  const pause = useCallback(() => {
    if (state === 'playing' && window.speechSynthesis) {
      window.speechSynthesis.pause();
      setState('paused');
      emitAnalyticsEvent('readaloud_pause', { screenName, currentIndex });
    }
  }, [state, emitAnalyticsEvent, screenName, currentIndex]);

  // Resume reading
  const resume = useCallback(() => {
    if (state === 'paused' && window.speechSynthesis) {
      window.speechSynthesis.resume();
      setState('playing');
      emitAnalyticsEvent('readaloud_resume', { screenName, currentIndex });
    }
  }, [state, emitAnalyticsEvent, screenName, currentIndex]);

  // Set language
  const setLanguage = useCallback((lang: 'en' | 'ur') => {
    setLanguageState(lang);
    emitAnalyticsEvent('readaloud_lang_change', { language: lang });
    
    // If currently playing, restart with new language
    if (state === 'playing' || state === 'paused') {
      const currentTexts = textsRef.current;
      const currentScreen = screenName;
      stop();
      // Small delay before restarting
      setTimeout(() => {
        play(currentTexts, currentScreen);
      }, 100);
    }
  }, [state, screenName, stop, play, emitAnalyticsEvent]);

  // Set speech rate
  const setRateCallback = useCallback((newRate: SpeechRate) => {
    setRate(newRate);
    emitAnalyticsEvent('readaloud_rate_change', { rate: newRate });
    
    // If currently playing, restart with new rate
    if (state === 'playing' || state === 'paused') {
      const currentTexts = textsRef.current;
      const currentScreen = screenName;
      const currentIdx = currentIndex;
      stop();
      // Restart from current position
      setTimeout(() => {
        play(currentTexts.slice(currentIdx), currentScreen);
      }, 100);
    }
  }, [state, screenName, currentIndex, stop, play, emitAnalyticsEvent]);

  // Set read depth
  const setDepthCallback = useCallback((newDepth: ReadDepth) => {
    setDepth(newDepth);
    emitAnalyticsEvent('readaloud_depth_change', { depth: newDepth });
  }, [emitAnalyticsEvent]);

  // Toggle options sheet
  const toggleOptions = useCallback(() => {
    setShowOptions(prev => !prev);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  const value: ReadAloudContextType = {
    state,
    language,
    rate,
    depth,
    currentText,
    currentIndex,
    screenName,
    play,
    pause,
    resume,
    stop,
    setLanguage,
    setRate: setRateCallback,
    setDepth: setDepthCallback,
    setState,
    showOptions,
    toggleOptions
  };

  return (
    <ReadAloudContext.Provider value={value}>
      {children}
    </ReadAloudContext.Provider>
  );
}

export function useReadAloud() {
  const context = useContext(ReadAloudContext);
  if (!context) {
    throw new Error('useReadAloud must be used within ReadAloudProvider');
  }
  return context;
}