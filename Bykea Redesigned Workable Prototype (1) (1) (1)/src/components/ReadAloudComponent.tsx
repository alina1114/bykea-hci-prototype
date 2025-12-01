/**
 * ReadAloudComponent - Persistent TTS UI control
 * 
 * Variants:
 * - Hidden: not visible
 * - Idle: speaker icon + language badge (EN/UR)
 * - Playing: animated waveform + pause icon + progress
 * - Paused: play icon + paused state
 * - Error: warning icon + retry action
 * 
 * Touch target: minimum 44×44 px
 * Placement: top-right default, bottom-right for map screens
 * WCAG AA contrast compliant
 */

import React from 'react';
import { Volume2, VolumeX, Play, Pause, AlertCircle, Settings } from 'lucide-react';
import { useReadAloud } from './ReadAloudContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface ReadAloudComponentProps {
  placement?: 'top-right' | 'bottom-right';
  className?: string;
}

export function ReadAloudComponent({ 
  placement = 'top-right',
  className = '' 
}: ReadAloudComponentProps) {
  const { 
    state, 
    language, 
    pause, 
    resume, 
    stop,
    toggleOptions 
  } = useReadAloud();

  // Don't render if hidden
  if (state === 'hidden') {
    return null;
  }

  // Position classes
  const positionClasses = placement === 'top-right' 
    ? 'top-4 right-4' 
    : 'bottom-24 right-4';

  // Get tooltip text based on state
  const getTooltipText = () => {
    switch (state) {
      case 'idle':
        return language === 'en' 
          ? `Read aloud — ${language.toUpperCase()}. Tap to start.`
          : `بلند آواز میں پڑھیں — ${language.toUpperCase()}۔ شروع کرنے کے لیے تھپتھپائیں۔`;
      case 'playing':
        return language === 'en' 
          ? 'Reading… Tap to pause.'
          : 'پڑھ رہا ہے… روکنے کے لیے تھپتھپائیں۔';
      case 'paused':
        return language === 'en' 
          ? 'Paused. Tap to resume.'
          : 'رکا ہوا۔ جاری رکھنے کے لیے تھپتھپائیں۔';
      case 'error':
        return language === 'en' 
          ? 'Audio unavailable. Tap to retry.'
          : 'آڈیو دستیاب نہیں۔ دوبارہ کوشش کریں۔';
      default:
        return '';
    }
  };

  // Get ARIA label based on state
  const getAriaLabel = () => {
    switch (state) {
      case 'idle':
        return 'Read aloud';
      case 'playing':
        return 'Pause reading';
      case 'paused':
        return 'Resume reading';
      case 'error':
        return 'Retry read aloud';
      default:
        return 'Read aloud control';
    }
  };

  // Handle main button click
  const handleMainClick = () => {
    if (state === 'playing') {
      pause();
    } else if (state === 'paused') {
      resume();
    } else if (state === 'error') {
      // Retry - could trigger a re-read
      console.log('[ReadAloud] Retry requested');
    }
    // Idle state is handled by individual screens triggering play
  };

  // Handle long press for options
  const handleLongPress = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    toggleOptions();
  };

  return (
    <div 
      className={`fixed ${positionClasses} z-50 flex flex-col items-end gap-2 ${className}`}
      role="region"
      aria-label="Text-to-speech controls"
    >
      {/* Main control button */}
      <div className="relative group">
        <Button
          onClick={handleMainClick}
          onContextMenu={handleLongPress}
          aria-label={getAriaLabel()}
          title={getTooltipText()}
          className={`
            min-w-[48px] min-h-[48px] w-12 h-12
            rounded-full shadow-lg
            flex items-center justify-center
            transition-all duration-200
            focus:outline-none focus:ring-4 focus:ring-[#0CAA41]/30
            ${state === 'idle' ? 'bg-white dark:bg-[#2A2A2A] hover:bg-gray-50 dark:hover:bg-[#333333]' : ''}
            ${state === 'playing' ? 'bg-[#0CAA41] hover:bg-[#0a8f37] animate-pulse' : ''}
            ${state === 'paused' ? 'bg-[#0CAA41]/80 hover:bg-[#0CAA41]' : ''}
            ${state === 'error' ? 'bg-red-500 hover:bg-red-600' : ''}
          `}
        >
          {/* Icon based on state */}
          {state === 'idle' && (
            <Volume2 className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          )}
          {state === 'playing' && (
            <>
              <Pause className="w-6 h-6 text-white" />
              {/* Animated waveform indicator */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex gap-0.5">
                  <div className="w-0.5 h-3 bg-white/30 animate-wave" style={{ animationDelay: '0ms' }} />
                  <div className="w-0.5 h-4 bg-white/40 animate-wave" style={{ animationDelay: '150ms' }} />
                  <div className="w-0.5 h-3 bg-white/30 animate-wave" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </>
          )}
          {state === 'paused' && (
            <Play className="w-6 h-6 text-white ml-0.5" />
          )}
          {state === 'error' && (
            <AlertCircle className="w-6 h-6 text-white" />
          )}
          
          {/* Language badge */}
          <Badge 
            className={`
              absolute -bottom-1 -right-1 
              min-w-[24px] h-5 px-1.5
              text-[10px] 
              border-2 border-white dark:border-[#1E1E1E]
              ${state === 'error' ? 'bg-gray-700' : 'bg-[#0CAA41]'}
              text-white
              pointer-events-none
            `}
          >
            {language.toUpperCase()}
          </Badge>
        </Button>

        {/* Tooltip on hover */}
        <div className="
          absolute bottom-full right-0 mb-2
          invisible group-hover:visible
          max-w-[200px] px-3 py-2
          bg-gray-900 dark:bg-gray-800 text-white
          text-xs rounded-lg
          shadow-lg
          pointer-events-none
          whitespace-normal
          transition-opacity duration-200
          opacity-0 group-hover:opacity-100
        ">
          {getTooltipText()}
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-800" />
        </div>
      </div>

      {/* Secondary controls (visible when playing/paused) */}
      {(state === 'playing' || state === 'paused') && (
        <div className="flex gap-2 animate-in fade-in slide-in-from-right duration-200">
          {/* Options button */}
          <Button
            onClick={toggleOptions}
            aria-label="Reading options"
            title={language === 'en' ? 'Reading options' : 'پڑھنے کے اختیارات'}
            className="
              min-w-[44px] min-h-[44px] w-11 h-11
              rounded-full shadow-md
              bg-white dark:bg-[#2A2A2A]
              hover:bg-gray-50 dark:hover:bg-[#333333]
              flex items-center justify-center
              focus:outline-none focus:ring-4 focus:ring-[#0CAA41]/30
            "
          >
            <Settings className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          </Button>

          {/* Stop button */}
          <Button
            onClick={stop}
            aria-label="Stop reading"
            title={language === 'en' ? 'Stop reading' : 'پڑھنا بند کریں'}
            className="
              min-w-[44px] min-h-[44px] w-11 h-11
              rounded-full shadow-md
              bg-white dark:bg-[#2A2A2A]
              hover:bg-gray-50 dark:hover:bg-[#333333]
              flex items-center justify-center
              focus:outline-none focus:ring-4 focus:ring-[#0CAA41]/30
            "
          >
            <VolumeX className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          </Button>
        </div>
      )}

      {/* ARIA live region for announcements */}
      <div 
        role="status" 
        aria-live="polite" 
        aria-atomic="true"
        className="sr-only"
      >
        {state === 'playing' && `Now reading in ${language === 'en' ? 'English' : 'Urdu'}`}
        {state === 'paused' && 'Reading paused'}
        {state === 'error' && 'Audio unavailable'}
      </div>
    </div>
  );
}

// Add animation keyframes via inline style (can also be added to globals.css)
const style = document.createElement('style');
style.textContent = `
  @keyframes wave {
    0%, 100% { transform: scaleY(1); }
    50% { transform: scaleY(1.5); }
  }
  .animate-wave {
    animation: wave 1s ease-in-out infinite;
  }
`;
if (typeof document !== 'undefined') {
  document.head.appendChild(style);
}
