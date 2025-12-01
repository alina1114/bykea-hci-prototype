/**
 * TextHighlight - Visual highlighting component for currently spoken text
 * 
 * Features:
 * - Highlights text being read with soft yellow background
 * - Smooth transition animations
 * - Syncs with TTS playback
 * - WCAG AA compliant colors
 */

import React, { useEffect, useRef } from 'react';
import { useReadAloud } from './ReadAloudContext';

interface TextHighlightProps {
  text: string;
  isActive?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function TextHighlight({ 
  text, 
  isActive = false,
  className = '',
  children 
}: TextHighlightProps) {
  const { state, currentText } = useReadAloud();
  const elementRef = useRef<HTMLSpanElement>(null);

  // Check if this text is currently being read
  const isHighlighted = state === 'playing' && currentText === text;

  // Scroll into view when highlighted
  useEffect(() => {
    if (isHighlighted && elementRef.current) {
      elementRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      });
    }
  }, [isHighlighted]);

  return (
    <span
      ref={elementRef}
      className={`
        ${className}
        ${isHighlighted ? 'bg-yellow-200/60 dark:bg-yellow-900/40 rounded px-1 -mx-1' : ''}
        transition-all duration-300 ease-in-out
      `}
      data-tts-text={text}
    >
      {children || text}
    </span>
  );
}

/**
 * HighlightableText - Component that wraps text to make it highlightable during TTS
 * 
 * Usage:
 * <HighlightableText>Your text here</HighlightableText>
 */
interface HighlightableTextProps {
  children: React.ReactNode;
  className?: string;
}

export function HighlightableText({ children, className = '' }: HighlightableTextProps) {
  const textContent = typeof children === 'string' ? children : '';
  
  return (
    <TextHighlight text={textContent} className={className}>
      {children}
    </TextHighlight>
  );
}
