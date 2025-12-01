/**
 * ReadAloudWrapper - Wrapper component for screens with TTS functionality
 * 
 * Provides:
 * - Automatic text extraction from screen
 * - Reading order management
 * - Integration with ReadAloudContext
 * - Play button for starting TTS
 */

import React, { useCallback, useEffect } from 'react';
import { useReadAloud } from './ReadAloudContext';

interface ReadAloudWrapperProps {
  children: React.ReactNode;
  screenName: string;
  readableTexts?: string[];
  autoExtract?: boolean;
  placement?: 'top-right' | 'bottom-right';
}

/**
 * Extracts readable text from screen in priority order:
 * 1. Page title
 * 2. Alert/error messages
 * 3. Primary CTA/confirmation text
 * 4. Form fields (filled values)
 * 5. Map/ETA summary
 * 6. Critical labels
 * 7. Footer/help
 */
function extractReadableTexts(element: HTMLElement, depth: 'labels' | 'summary' | 'all'): string[] {
  const texts: string[] = [];
  
  // Priority 1: Titles (h1, h2)
  const titles = element.querySelectorAll('h1, h2, [role="heading"]');
  titles.forEach(title => {
    const text = title.textContent?.trim();
    if (text) texts.push(text);
  });
  
  // Priority 2: Alerts
  const alerts = element.querySelectorAll('[role="alert"], .alert, .error, .warning');
  alerts.forEach(alert => {
    const text = alert.textContent?.trim();
    if (text) texts.push(text);
  });
  
  // Priority 3: Primary buttons/CTAs
  const primaryButtons = element.querySelectorAll('button[class*="primary"], button[class*="confirm"], a[class*="primary"]');
  primaryButtons.forEach(button => {
    const text = button.textContent?.trim();
    if (text && !texts.includes(text)) texts.push(text);
  });
  
  if (depth === 'labels') {
    return texts;
  }
  
  // Priority 4: Important info (summary mode)
  const importantInfo = element.querySelectorAll('[data-tts-important], .fare, .eta, .price, .amount');
  importantInfo.forEach(info => {
    const text = info.textContent?.trim();
    if (text && !texts.includes(text)) texts.push(text);
  });
  
  // Priority 5: Form labels
  const labels = element.querySelectorAll('label, [role="label"]');
  labels.forEach(label => {
    const text = label.textContent?.trim();
    if (text && !texts.includes(text)) texts.push(text);
  });
  
  if (depth === 'summary') {
    return texts.slice(0, 10); // Limit to top 10 items for summary
  }
  
  // Priority 6: All readable text (for "read all" mode)
  const allText = element.querySelectorAll('p, span[class*="text"], div[class*="description"]');
  allText.forEach(el => {
    const text = el.textContent?.trim();
    if (text && !texts.includes(text) && text.length > 3) {
      texts.push(text);
    }
  });
  
  return texts;
}

export function ReadAloudWrapper({ 
  children, 
  screenName,
  readableTexts,
  autoExtract = true,
  placement = 'top-right'
}: ReadAloudWrapperProps) {
  const { play, depth, stop, state } = useReadAloud();
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Extract texts when screen mounts or depth changes
  const getTexts = useCallback(() => {
    if (readableTexts) {
      return readableTexts;
    }
    
    if (autoExtract && containerRef.current) {
      return extractReadableTexts(containerRef.current, depth);
    }
    
    return [];
  }, [readableTexts, autoExtract, depth]);

  // Auto-start reading when component mounts (optional)
  useEffect(() => {
    // Stop any previous reading when navigating to new screen
    if (state === 'playing' || state === 'paused') {
      stop();
    }
  }, [screenName]); // Only run when screen changes

  // Provide imperative method to start reading
  const startReading = useCallback(() => {
    const texts = getTexts();
    if (texts.length > 0) {
      play(texts, screenName);
    }
  }, [getTexts, play, screenName]);

  // Expose startReading to parent via ref (if needed)
  React.useImperativeHandle(
    React.useRef<{ startReading: () => void }>(null),
    () => ({ startReading }),
    [startReading]
  );

  return (
    <div ref={containerRef} data-screen-name={screenName}>
      {children}
    </div>
  );
}

/**
 * useReadAloudScreen - Hook to enable TTS for a screen
 * 
 * Usage in a screen component:
 * const { startReading } = useReadAloudScreen('Home Screen', [
 *   'Welcome to Bykea',
 *   'Where would you like to go?',
 *   'Book a ride'
 * ]);
 */
export function useReadAloudScreen(screenName: string, texts: string[]) {
  const { play, stop } = useReadAloud();
  
  const startReading = useCallback(() => {
    play(texts, screenName);
  }, [play, texts, screenName]);
  
  // Auto-stop when unmounting
  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);
  
  return { startReading };
}
