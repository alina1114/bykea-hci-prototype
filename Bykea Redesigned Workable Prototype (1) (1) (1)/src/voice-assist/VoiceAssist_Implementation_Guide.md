# Voice Assist - Implementation Guide

## 🏗️ Architecture Overview

The Voice Assist system is built on three core layers:

```
┌─────────────────────────────────────────────┐
│           Screen Components                  │
│    (HomeScreen, PickupScreen, etc.)         │
└────────────────┬────────────────────────────┘
                 │ uses
┌────────────────▼────────────────────────────┐
│      useVoiceAssistScreen Hook              │
│  (Screen-level voice assist functions)      │
└────────────────┬────────────────────────────┘
                 │ consumes
┌────────────────▼────────────────────────────┐
│        VoiceAssistContext                   │
│   (Global state & announcement queue)       │
└────────────────┬────────────────────────────┘
                 │ references
┌────────────────▼────────────────────────────┐
│       useVoiceAssistText                    │
│     (Bilingual text content)                │
└─────────────────────────────────────────────┘
```

---

## 📦 Core Components

### 1. VoiceAssistContext & Provider

**Purpose:** Global state management for Voice Assist  
**Location:** `/voice-assist/VoiceAssistContext.tsx`

**Key Responsibilities:**
- Manage enabled/disabled state
- Handle announcement queue
- Control priority system
- Manage Web Speech API (in production)
- Coordinate language settings

**State Structure:**
```typescript
interface VoiceAssistContextValue {
  // State
  isEnabled: boolean;
  isSpeaking: boolean;
  language: 'en' | 'ur';
  queueLength: number;
  
  // Control
  setEnabled: (enabled: boolean) => void;
  setLanguage: (lang: 'en' | 'ur') => void;
  
  // Announcements
  announce: (text: string, priority?: AnnouncementPriority) => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
  clearQueue: () => void;
}
```

**Provider Setup:**
```tsx
<VoiceAssistProvider 
  initialEnabled={false} 
  initialLanguage="en"
>
  {children}
</VoiceAssistProvider>
```

---

### 2. useVoiceAssistScreen Hook

**Purpose:** Screen-level voice assist interface  
**Location:** `/voice-assist/useVoiceAssistScreen.tsx`

**Key Features:**
- Auto-announce screen entry
- Context-aware announcements
- Bilingual support
- Type-safe screen keys

**Usage Pattern:**
```tsx
const voiceAssist = useVoiceAssistScreen({
  screenKey: 'home',          // Type-safe screen identifier
  language: 'en',             // Current app language
  autoAnnounce: true,         // Auto-read on mount
  autoAnnounceDelay: 500      // Delay before auto-read
});
```

**Returned API:**
```typescript
interface VoiceAssistAPI {
  // Announcement functions
  announceButton: (elementKey: string, customText?: string) => void;
  announceSelection: (itemName: string, additionalInfo?: string) => void;
  announceNavigation: (destination: string) => void;
  announceInputFocus: (fieldName: string, placeholder?: string) => void;
  announceToggle: (label: string, state: boolean) => void;
  announceError: (errorKey: string, customError?: string) => void;
  announceAction: (actionText: string) => void;
  announceText: (text: string, priority?: AnnouncementPriority) => void;
  
  // Control
  stopSpeaking: () => void;
  pauseSpeaking: () => void;
  resumeSpeaking: () => void;
  
  // Content
  content: VoiceAssistTextContent;
  
  // State
  isEnabled: boolean;
  isSpeaking: boolean;
  language: 'en' | 'ur';
}
```

---

### 3. useVoiceAssistText

**Purpose:** Centralized bilingual content  
**Location:** `/voice-assist/useVoiceAssistText.tsx`

**Structure:**
```typescript
interface VoiceAssistTextContent {
  screenName: string;         // "Home Screen" | "ہوم سکرین"
  screenSummary: string;      // Screen description
  elements: Record<string, string>;  // UI element labels
  errors?: Record<string, string>;   // Error messages
  hints?: string[];           // Optional tips
}
```

**Content Organization:**
```typescript
const voiceTextMap = {
  home: {
    en: {
      screenName: 'Home Screen',
      screenSummary: 'You are on the Home Screen...',
      elements: {
        searchBar: 'Search for destination',
        homeCard: 'Home',
        // ...
      }
    },
    ur: {
      screenName: 'ہوم سکرین',
      screenSummary: 'آپ ہوم سکرین پر ہیں...',
      elements: {
        searchBar: 'منزل تلاش کریں',
        homeCard: 'گھر',
        // ...
      }
    }
  },
  // ... other screens
};
```

---

## 🔄 Announcement Queue System

### Priority Queue Implementation

The system uses a priority-based queue where announcements are processed based on urgency:

```typescript
interface Announcement {
  id: string;
  text: string;
  priority: 'high' | 'normal' | 'low';
  timestamp: number;
}
```

**Queue Processing Logic:**
1. New announcements are added to queue
2. Queue is sorted by priority (high → normal → low)
3. Within same priority, FIFO (First In, First Out)
4. One announcement speaks at a time
5. Next announcement starts after 300ms delay

**Example Flow:**
```
User clicks button → announceButton() → 
  Add to queue (high priority) → 
  Sort queue → 
  Speak if not currently speaking → 
  On complete, process next
```

---

## 🗣️ Speech Synthesis Integration

### Production Implementation (Web Speech API)

```typescript
// In VoiceAssistContext.tsx (production code)
const utterance = new SpeechSynthesisUtterance(text);

// Configuration for senior users
utterance.lang = language === 'en' ? 'en-US' : 'ur-PK';
utterance.rate = 0.9;      // Slightly slower for comprehension
utterance.pitch = 1.0;     // Normal pitch
utterance.volume = 1.0;    // Maximum volume

// Event handlers
utterance.onend = () => {
  // Move to next announcement
  handleAnnouncementComplete();
};

utterance.onerror = (event) => {
  console.error('Speech error:', event);
  handleAnnouncementComplete(); // Skip to next
};

// Speak
window.speechSynthesis.speak(utterance);
```

### Language-Specific Configuration

**English (en-US):**
- Rate: 0.9 (slightly slower)
- Voices: Prefer female voices (typically clearer)
- Fallback: System default

**Urdu (ur-PK):**
- Rate: 0.85 (slower due to script complexity)
- Voices: Use Google Urdu voices if available
- Fallback: ur-IN (Indian Urdu)

---

## 🎯 Auto-Announcement System

### Screen Entry Announcements

When a screen mounts with `autoAnnounce: true`:

```typescript
useEffect(() => {
  if (autoAnnounce && isEnabled) {
    const timer = setTimeout(() => {
      const announcement = `${content.screenName}. ${content.screenSummary}`;
      announce(announcement, 'high');
    }, autoAnnounceDelay);

    return () => clearTimeout(timer);
  }
}, [screenKey, language, isEnabled, autoAnnounce]);
```

**Why the delay?**
- Allows screen transition animations to complete
- Prevents audio collision with previous screen
- Gives user moment to orient themselves
- Default: 500ms (configurable)

---

## 🌐 Bilingual Implementation

### Language Switching Flow

```
User changes language in Settings →
  Context.setLanguage('ur') →
  Announce language change →
  All screens re-read content →
  Future announcements in new language
```

### Text Content Updates

All text is centralized in `useVoiceAssistText.tsx`:

```typescript
// Adding new screen content
const voiceTextMap = {
  newScreen: {
    en: {
      screenName: 'New Screen',
      screenSummary: 'Description in English',
      elements: {
        button1: 'Button One',
        // ...
      }
    },
    ur: {
      screenName: 'نئی سکرین',
      screenSummary: 'اردو میں تفصیل',
      elements: {
        button1: 'بٹن ایک',
        // ...
      }
    }
  }
};
```

---

## 🔌 Speaker Button Integration

### Global State Management

The speaker button controls Voice Assist globally:

```tsx
// App.tsx or root component
const [speakerActive, setSpeakerActive] = useState(false);

const handleSpeakerToggle = () => {
  const newState = !speakerActive;
  setSpeakerActive(newState);
  
  // Update Voice Assist context
  voiceAssistContext.setEnabled(newState);
};
```

### Visual States

| State | Color | Icon | Announcement |
|-------|-------|------|--------------|
| OFF | Grey (#6B6B6B) | Volume2 | None |
| ON | Green (#0CAA41) | Volume2 | "Voice Assist Enabled" |

### Implementation Example

```tsx
export function GlobalSpeakerButton({ isActive, onToggle }) {
  const { setEnabled } = useVoiceAssist();
  
  const handleClick = () => {
    const newState = !isActive;
    setEnabled(newState);
    onToggle();
  };
  
  return (
    <button
      onClick={handleClick}
      className={`
        w-11 h-11 rounded-full flex items-center justify-center
        ${isActive 
          ? 'bg-[#0CAA41] shadow-lg' 
          : 'bg-[#6B6B6B]'
        }
      `}
      aria-label={isActive ? 'Voice Assist On' : 'Voice Assist Off'}
      aria-pressed={isActive}
    >
      <Volume2 className="w-6 h-6 text-white" strokeWidth={2.5} />
    </button>
  );
}
```

---

## 📱 Screen Integration Patterns

### Pattern 1: Simple Screen

```tsx
export function SimpleScreen({ language, onNavigate }) {
  const voiceAssist = useVoiceAssistScreen({
    screenKey: 'simple',
    language,
    autoAnnounce: true
  });

  return (
    <div>
      <button onClick={() => {
        voiceAssist.announceButton('confirmButton');
        onNavigate('next');
      }}>
        {voiceAssist.content.elements.confirmButton}
      </button>
    </div>
  );
}
```

### Pattern 2: Form Screen

```tsx
export function FormScreen({ language }) {
  const voiceAssist = useVoiceAssistScreen({
    screenKey: 'form',
    language,
    autoAnnounce: true
  });

  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!isValidPhone(phone)) {
      setError('Invalid phone');
      voiceAssist.announceError('invalidPhone');
      return;
    }
    
    voiceAssist.announceAction('Form submitted successfully');
    // Submit...
  };

  return (
    <form>
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        onFocus={() => {
          voiceAssist.announceInputFocus(
            'Phone number',
            'Enter eleven digits'
          );
        }}
      />
      {error && <div role="alert">{error}</div>}
      <button onClick={handleSubmit}>Submit</button>
    </form>
  );
}
```

### Pattern 3: Selection Screen

```tsx
export function SelectionScreen({ language, onNavigate }) {
  const voiceAssist = useVoiceAssistScreen({
    screenKey: 'selection',
    language,
    autoAnnounce: true
  });

  const handleSelect = (item: string, price: number) => {
    voiceAssist.announceSelection(
      item,
      `Price ${price} rupees`
    );
    onNavigate('next', item);
  };

  return (
    <div>
      <button onClick={() => handleSelect('Bike', 150)}>
        Bike - Rs. 150
      </button>
      <button onClick={() => handleSelect('Car', 400)}>
        Car - Rs. 400
      </button>
    </div>
  );
}
```

### Pattern 4: Settings Screen

```tsx
export function SettingsScreen({ language }) {
  const voiceAssist = useVoiceAssistScreen({
    screenKey: 'settings',
    language,
    autoAnnounce: true
  });

  const [darkMode, setDarkMode] = useState(false);

  const handleToggle = (checked: boolean) => {
    setDarkMode(checked);
    voiceAssist.announceToggle('Dark Mode', checked);
  };

  return (
    <div>
      <Switch
        checked={darkMode}
        onChange={handleToggle}
        aria-label="Dark Mode"
      />
    </div>
  );
}
```

---

## 🎨 Accessibility Best Practices

### 1. ARIA Labels

Always provide descriptive ARIA labels:

```tsx
<button
  onClick={handleAction}
  aria-label={voiceAssist.content.elements.actionButton}
>
  Icon
</button>
```

### 2. Role Attributes

Use appropriate roles for dynamic content:

```tsx
<div role="alert" aria-live="assertive">
  {errorMessage}
</div>
```

### 3. Focus Management

Announce focus changes:

```tsx
<input
  onFocus={() => {
    voiceAssist.announceInputFocus('Field name');
  }}
/>
```

### 4. Loading States

Announce loading states:

```tsx
useEffect(() => {
  if (isLoading) {
    voiceAssist.announceText('Loading data', 'normal');
  }
}, [isLoading]);
```

---

## 🧪 Testing Strategies

### Unit Testing

```typescript
describe('useVoiceAssistScreen', () => {
  it('should announce button press', () => {
    const { result } = renderHook(() => 
      useVoiceAssistScreen({
        screenKey: 'home',
        language: 'en',
        autoAnnounce: false
      })
    );
    
    act(() => {
      result.current.announceButton('confirmButton');
    });
    
    expect(mockAnnounce).toHaveBeenCalledWith(
      'You pressed: Confirm',
      'high'
    );
  });
});
```

### Integration Testing

```typescript
describe('Voice Assist Integration', () => {
  it('should announce in correct language', () => {
    render(
      <VoiceAssistProvider initialLanguage="ur">
        <HomeScreen />
      </VoiceAssistProvider>
    );
    
    const button = screen.getByRole('button', { name: /home/i });
    fireEvent.click(button);
    
    expect(mockAnnounce).toHaveBeenCalledWith(
      expect.stringContaining('آپ نے'),
      'high'
    );
  });
});
```

### Manual Testing Checklist

- [ ] Test with speaker button ON
- [ ] Test with speaker button OFF
- [ ] Test language switching (EN ↔ UR)
- [ ] Test priority queue (multiple announcements)
- [ ] Test auto-announce on screen mount
- [ ] Test all button announcements
- [ ] Test error announcements
- [ ] Test with real screen reader
- [ ] Test with senior users (55-80 years)

---

## 🔧 Performance Optimization

### 1. Debounce Rapid Announcements

```typescript
const debouncedAnnounce = useMemo(
  () => debounce((text: string) => {
    voiceAssist.announceText(text);
  }, 300),
  [voiceAssist]
);
```

### 2. Cleanup on Unmount

```typescript
useEffect(() => {
  return () => {
    voiceAssist.stopSpeaking();
  };
}, []);
```

### 3. Conditional Announcements

```typescript
// Only announce if voice is enabled
if (voiceAssist.isEnabled) {
  voiceAssist.announceButton('confirmButton');
}
```

---

## 🚨 Error Handling

### Graceful Degradation

```typescript
try {
  voiceAssist.announceText('Important message');
} catch (error) {
  console.error('[Voice Assist] Failed:', error);
  // App continues to function without voice
}
```

### Web Speech API Fallbacks

```typescript
if (!('speechSynthesis' in window)) {
  console.warn('[Voice Assist] Speech API not supported');
  // Disable voice assist UI
  return null;
}
```

---

## 📊 Analytics & Logging

### Event Tracking

```typescript
// Log voice assist usage
voiceAssist.announceButton('confirmButton');
analytics.track('voice_assist_announcement', {
  type: 'button',
  elementKey: 'confirmButton',
  language,
  screenKey: 'home'
});
```

### Debug Logging

```typescript
// In development
console.log('[Voice Assist] Queued:', text, priority);
console.log('[Voice Assist] Speaking:', text);
console.log('[Voice Assist] Queue length:', queueLength);
```

---

## 🎓 Advanced Patterns

### Dynamic Content Announcements

```typescript
// Announce dynamic driver availability
useEffect(() => {
  if (drivers.length === 0) {
    voiceAssist.announceText(
      'No drivers available. Searching...',
      'high'
    );
  } else {
    voiceAssist.announceText(
      `${drivers.length} drivers found`,
      'normal'
    );
  }
}, [drivers]);
```

### Interrupt Previous Announcements

```typescript
const handleEmergency = () => {
  voiceAssist.stopSpeaking(); // Clear queue
  voiceAssist.announceText('Emergency: Please confirm', 'high');
};
```

### Context-Aware Hints

```typescript
// Announce hints after inactivity
useEffect(() => {
  const timer = setTimeout(() => {
    if (voiceAssist.content.hints) {
      voiceAssist.announceText(
        voiceAssist.content.hints[0],
        'low'
      );
    }
  }, 10000); // After 10 seconds

  return () => clearTimeout(timer);
}, []);
```

---

## 📝 Summary

The Voice Assist system provides:

✅ **Complete bilingual support** (EN/UR)  
✅ **Priority-based queue** for smart announcement ordering  
✅ **Auto-announcement** on screen entry  
✅ **Type-safe screen keys** for better DX  
✅ **Centralized content** for easy updates  
✅ **Speaker button integration** for global control  
✅ **Accessibility best practices** built-in  
✅ **Senior-friendly** design (slower rate, clear language)

---

**Next Steps:**
1. Review [Quick Start Guide](./VoiceAssist_QuickStart.md)
2. Check [Summary Document](./VoiceAssist_Summary.md)
3. Explore example screens
4. Implement in your screens

---

**Last Updated:** November 2024  
**Version:** 1.0.0  
**Status:** Documentation Only
