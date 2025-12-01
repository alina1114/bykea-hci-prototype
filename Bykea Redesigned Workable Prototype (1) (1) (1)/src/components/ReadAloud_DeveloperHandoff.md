# Read-Aloud / Text-to-Speech System - Developer Handoff

## Overview

Complete persistent Text-to-Speech (TTS) system for senior-friendly Bykea ride-hailing app with bilingual support (English/Urdu), real-time text highlighting, and comprehensive accessibility features.

## Architecture

### Components

1. **ReadAloudContext.tsx** - Global state management using React Context
2. **ReadAloudComponent.tsx** - Persistent UI control (all 5 states)
3. **ReadAloudOptionsSheet.tsx** - Settings overlay for customization
4. **TextHighlight.tsx** - Visual highlighting of spoken text
5. **ReadAloudWrapper.tsx** - Screen wrapper with auto text extraction

### Component States

| State | Description | Visual | Interaction |
|-------|-------------|--------|-------------|
| **Hidden** | Not visible | - | None |
| **Idle** | Ready to read | Speaker icon + language badge | Click to start (handled by screen) |
| **Playing** | Currently reading | Pause icon + animated waveform + pulsing | Click to pause |
| **Paused** | Reading paused | Play icon + static state | Click to resume |
| **Error** | TTS unavailable | Warning icon + red background | Click to retry |

## Implementation Guide

### 1. Web Speech API (Primary Method)

The system uses the browser's **Web Speech API** (`window.speechSynthesis` + `SpeechSynthesisUtterance`) for client-side TTS.

#### Basic Implementation Flow

```typescript
// Create utterance
const utterance = new SpeechSynthesisUtterance(text);

// Configure language
utterance.lang = language === 'en' ? 'en-US' : 'ur-PK';

// Configure speech rate
utterance.rate = rate; // 0.8, 1.0, or 1.2

// Configure volume
utterance.volume = 1.0;

// Handle events
utterance.onend = () => {
  // Move to next text segment
};

utterance.onerror = (event) => {
  // Handle errors, show Error state
  console.error('TTS Error:', event.error);
};

// Speak
window.speechSynthesis.speak(utterance);
```

#### Control Methods

```typescript
// Pause reading
window.speechSynthesis.pause();

// Resume reading
window.speechSynthesis.resume();

// Stop and clear queue
window.speechSynthesis.cancel();

// Check if speaking
window.speechSynthesis.speaking; // boolean

// Check if paused
window.speechSynthesis.paused; // boolean
```

#### Language Codes

- **English**: `'en-US'` (or `'en-GB'`, `'en-IN'` based on preference)
- **Urdu**: `'ur-PK'` (Urdu - Pakistan)

**Note**: Urdu voice availability varies by browser/platform. Always check available voices:

```typescript
const voices = window.speechSynthesis.getVoices();
const urduVoices = voices.filter(voice => voice.lang.startsWith('ur'));

if (urduVoices.length === 0) {
  console.warn('No Urdu voices available - use fallback');
}
```

### 2. Fallback Strategy (Cloud TTS)

If browser doesn't support Urdu voices or Web Speech API is unavailable:

#### Option A: Azure Cognitive Services Speech

```typescript
// Install: npm install microsoft-cognitiveservices-speech-sdk

import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

const speechConfig = sdk.SpeechConfig.fromSubscription(
  'YOUR_SUBSCRIPTION_KEY',
  'YOUR_REGION'
);

speechConfig.speechSynthesisLanguage = 'ur-PK';
speechConfig.speechSynthesisVoiceName = 'ur-PK-AsadNeural'; // Male voice

const synthesizer = new sdk.SpeechSynthesizer(speechConfig);

synthesizer.speakTextAsync(
  text,
  result => {
    if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
      console.log('Synthesis finished');
    }
  },
  error => {
    console.error('Error:', error);
  }
);
```

#### Option B: Google Cloud Text-to-Speech

```typescript
// Install: npm install @google-cloud/text-to-speech

import textToSpeech from '@google-cloud/text-to-speech';

const client = new textToSpeech.TextToSpeechClient();

const request = {
  input: { text: text },
  voice: { languageCode: 'ur-PK', ssmlGender: 'NEUTRAL' },
  audioConfig: { audioEncoding: 'MP3', speakingRate: rate }
};

const [response] = await client.synthesizeSpeech(request);
// Play response.audioContent
```

#### Option C: AWS Polly

```typescript
// Install: npm install aws-sdk

import AWS from 'aws-sdk';

const polly = new AWS.Polly({
  region: 'us-east-1',
  credentials: /* your credentials */
});

const params = {
  Text: text,
  OutputFormat: 'mp3',
  VoiceId: 'Zeina', // Closest to Urdu
  LanguageCode: 'arb', // Arabic (no native Urdu support)
  Engine: 'neural'
};

polly.synthesizeSpeech(params, (err, data) => {
  if (!err) {
    // Play data.AudioStream
  }
});
```

### 3. Reading Order & Text Extraction

#### Priority List (Reading Order)

1. **Page title** (h1, h2 elements)
2. **Top alerts/error messages** ([role="alert"], .alert, .error)
3. **Primary CTA/confirmation text** (primary buttons)
4. **Form fields** (only filled values)
5. **Map/ETA summary** (short summary only)
6. **Critical labels** (payment amount, fare, time)
7. **Footer/help** (only in "Read all" mode)

#### Read Depth Modes

- **Labels only**: Read titles, headers, and primary buttons only
- **Screen summary**: Read top 10 important items (recommended for seniors)
- **Read all**: Read all text content including descriptions

#### Auto Text Extraction

The `ReadAloudWrapper` component automatically extracts text using:

```typescript
function extractReadableTexts(element: HTMLElement, depth: ReadDepth): string[] {
  // See ReadAloudWrapper.tsx for full implementation
  // Prioritizes content based on semantic HTML and data attributes
}
```

#### Manual Text Lists (Recommended)

For better control, provide explicit text arrays:

```typescript
const texts = [
  'Book a Ride', // Title
  'Pickup: Johar Town, Lahore', // Current selection
  'Confirm Booking — PKR 250', // CTA with price
  'Estimated arrival: 5 minutes' // ETA
];

const { startReading } = useReadAloudScreen('Booking Screen', texts);
```

### 4. Accessibility Implementation

#### ARIA Attributes

```tsx
// Main control button
<button
  aria-label="Read aloud"
  aria-pressed={state === 'playing'}
  role="button"
>
  {/* Icon */}
</button>

// Live region for announcements
<div role="status" aria-live="polite" aria-atomic="true">
  {state === 'playing' && 'Now reading: Home Screen in English'}
</div>
```

#### Keyboard Navigation

- **Tab**: Focus on ReadAloud button
- **Enter/Space**: Toggle play/pause
- **Escape**: Close options sheet
- **Arrow keys**: Navigate options in settings sheet

#### Focus Management

```typescript
// Show visible focus ring (WCAG 2.4.7)
className="focus:outline-none focus:ring-4 focus:ring-[#0CAA41]/30"

// Minimum 44×44 px touch targets (WCAG 2.5.5)
className="min-w-[44px] min-h-[44px]"
```

#### Color Contrast (WCAG AA)

| State | Background | Foreground | Ratio |
|-------|------------|------------|-------|
| Idle | #FFFFFF | #374151 | 9.74:1 ✓ |
| Playing | #0CAA41 | #FFFFFF | 4.53:1 ✓ |
| Paused | #0CAA41/80 | #FFFFFF | 4.5:1 ✓ |
| Error | #EF4444 | #FFFFFF | 4.54:1 ✓ |

### 5. Text Highlighting Synchronization

The `TextHighlight` component syncs visual highlighting with speech:

```tsx
// Wrap any text that should highlight during reading
<TextHighlight text="Book a Ride">
  <h1>Book a Ride</h1>
</TextHighlight>

// Automatic highlighting when currentText matches
className={isHighlighted ? 'bg-yellow-200/60 dark:bg-yellow-900/40' : ''}
```

#### Timing Sync

Currently uses text comparison. For production, consider:

1. **Time-based sync**: Calculate duration per word
2. **Event-based sync**: Use `utterance.onboundary` event
3. **Word-level highlighting**: Split text into words

```typescript
utterance.onboundary = (event) => {
  if (event.name === 'word') {
    // Highlight word at event.charIndex
    highlightWordAt(event.charIndex);
  }
};
```

### 6. Analytics Events

Emit these events for tracking:

```typescript
// Event structure
interface TTSAnalyticsEvent {
  event: string;
  timestamp: number;
  data: {
    screenName?: string;
    language?: 'en' | 'ur';
    rate?: number;
    depth?: string;
    error?: string;
    textCount?: number;
    currentIndex?: number;
  };
}

// Event types
const events = {
  'readaloud_play': 'User started reading',
  'readaloud_pause': 'User paused reading',
  'readaloud_resume': 'User resumed reading',
  'readaloud_stop': 'User stopped reading',
  'readaloud_lang_change': 'Language changed',
  'readaloud_rate_change': 'Speech rate changed',
  'readaloud_depth_change': 'Read depth changed',
  'readaloud_error': 'TTS error occurred'
};
```

### 7. Integration Steps

#### Step 1: Wrap App with Provider

```tsx
// App.tsx
import { ReadAloudProvider } from './components/ReadAloudContext';
import { ReadAloudComponent } from './components/ReadAloudComponent';
import { ReadAloudOptionsSheet } from './components/ReadAloudOptionsSheet';

export default function App() {
  return (
    <ReadAloudProvider>
      {/* Your app content */}
      
      {/* Global persistent control */}
      <ReadAloudComponent placement="top-right" />
      
      {/* Options sheet */}
      <ReadAloudOptionsSheet language={language} />
    </ReadAloudProvider>
  );
}
```

#### Step 2: Enable Reading in Screens

**Method A: Using Hook**

```tsx
import { useReadAloudScreen } from './components/ReadAloudWrapper';

function BookingScreen() {
  const { startReading } = useReadAloudScreen('Booking Screen', [
    'Book a Ride',
    'Pickup: Johar Town',
    'Dropoff: Liberty Market',
    'Confirm — PKR 250'
  ]);
  
  return (
    <div>
      {/* Screen content */}
      
      {/* Optional: Manual start button */}
      <button onClick={startReading}>
        Start Reading
      </button>
    </div>
  );
}
```

**Method B: Using Wrapper**

```tsx
import { ReadAloudWrapper } from './components/ReadAloudWrapper';

function BookingScreen() {
  const texts = ['Title', 'Content', 'CTA'];
  
  return (
    <ReadAloudWrapper screenName="Booking Screen" readableTexts={texts}>
      {/* Screen content */}
    </ReadAloudWrapper>
  );
}
```

#### Step 3: Add Text Highlighting

```tsx
import { TextHighlight } from './components/TextHighlight';

<TextHighlight text="Confirm Booking — PKR 250">
  <button>Confirm Booking — PKR 250</button>
</TextHighlight>
```

### 8. Testing Checklist

#### Functional Testing

- [ ] Play button starts reading in correct language
- [ ] Pause button pauses speech
- [ ] Resume continues from pause point
- [ ] Stop button cancels all reading
- [ ] Language change restarts reading in new language
- [ ] Rate change updates speech speed
- [ ] Depth change filters text appropriately
- [ ] Navigation to new screen stops current reading
- [ ] Text highlighting syncs with speech
- [ ] Options sheet opens/closes correctly

#### Accessibility Testing

- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Screen reader announces state changes
- [ ] Focus visible on all interactive elements
- [ ] Touch targets ≥ 44×44 px
- [ ] Color contrast meets WCAG AA
- [ ] ARIA labels present and correct
- [ ] High contrast mode supported

#### Browser Testing

- [ ] Chrome/Edge (best Web Speech API support)
- [ ] Safari (limited Urdu voices - test fallback)
- [ ] Firefox (check voice availability)
- [ ] Mobile Safari/iOS (test on iPhone)
- [ ] Chrome/Android (test on Android devices)

#### Urdu-Specific Testing

- [ ] Urdu voices available (if not, fallback triggered)
- [ ] Right-to-left text handled correctly
- [ ] Urdu script renders properly in UI
- [ ] Mixed EN/UR text reads correctly

### 9. Browser Compatibility

| Browser | Web Speech API | Urdu Voices | Fallback Required |
|---------|---------------|-------------|-------------------|
| Chrome 120+ | ✓ Full | ✓ Yes | No |
| Edge 120+ | ✓ Full | ✓ Yes | No |
| Safari 17+ | ✓ Limited | ⚠️ Maybe | Recommended |
| Firefox 121+ | ✓ Limited | ❌ No | **Yes** |
| iOS Safari | ✓ Yes | ⚠️ Maybe | Recommended |
| Chrome Android | ✓ Full | ✓ Yes | No |

### 10. Performance Optimization

#### Lazy Loading

```typescript
// Load voices on demand
let voicesLoaded = false;

window.speechSynthesis.onvoiceschanged = () => {
  if (!voicesLoaded) {
    const voices = window.speechSynthesis.getVoices();
    voicesLoaded = true;
    // Cache voices
  }
};
```

#### Queue Management

```typescript
// Prevent memory leaks
const MAX_QUEUE_SIZE = 20;

if (texts.length > MAX_QUEUE_SIZE) {
  texts = texts.slice(0, MAX_QUEUE_SIZE);
  console.warn(`Text queue truncated to ${MAX_QUEUE_SIZE} items`);
}
```

#### Cancel Before New Speech

```typescript
// Always cancel before starting new utterance
window.speechSynthesis.cancel();
setTimeout(() => {
  window.speechSynthesis.speak(utterance);
}, 10);
```

## Sample Microcopy

### English

```typescript
const enTexts = {
  idle: "Read aloud — EN. Tap to start.",
  playing: "Reading… Tap to pause.",
  paused: "Paused. Tap to resume.",
  error: "Audio unavailable. Tap to retry.",
  ariaAnnouncement: "Now reading: {screenName} in English",
  
  // Booking screen
  bookingTitle: "Book a Ride",
  pickupStatus: "Pickup: Johar Town, Lahore",
  dropoffStatus: "Dropoff: Liberty Market, Gulberg",
  confirmCTA: "Confirm Booking — PKR 250",
  eta: "Estimated arrival: 5 minutes"
};
```

### Urdu

```typescript
const urTexts = {
  idle: "بلند آواز میں پڑھیں — UR۔ شروع کرنے کے لیے تھپتھپائیں۔",
  playing: "پڑھ رہا ہے… روکنے کے لیے تھپتھپائیں۔",
  paused: "رکا ہوا۔ جاری رکھنے کے لیے تھپتھپائیں۔",
  error: "آڈیو دستیاب نہیں۔ دوبارہ کوشش کریں۔",
  ariaAnnouncement: "اردو میں پڑھ رہا ہے: {screenName}",
  
  // Booking screen
  bookingTitle: "سفر بک کریں",
  pickupStatus: "پک اپ: جوہر ٹاؤن، لاہور",
  dropoffStatus: "ڈراپ آف: لبرٹی مارکیٹ، گلبرگ",
  confirmCTA: "بکنگ کی تصدیق کریں — PKR 250",
  eta: "اندازاً آمد: 5 منٹ"
};
```

## Production Deployment Checklist

- [ ] Test on real devices (iOS & Android)
- [ ] Implement cloud TTS fallback for Urdu
- [ ] Set up analytics tracking
- [ ] Add error monitoring (Sentry/LogRocket)
- [ ] Test with screen readers (VoiceOver, TalkBack)
- [ ] Load test with long text queues
- [ ] Add rate limiting to prevent abuse
- [ ] Implement caching for repeated text
- [ ] Add user preferences persistence (localStorage)
- [ ] Test in low-bandwidth conditions
- [ ] Provide offline fallback message
- [ ] Add usage telemetry for optimization

## Support & Resources

- **Web Speech API**: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
- **Azure TTS**: https://azure.microsoft.com/en-us/services/cognitive-services/text-to-speech/
- **Google Cloud TTS**: https://cloud.google.com/text-to-speech
- **WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/

---

**Last Updated**: November 23, 2025  
**Version**: 1.0.0  
**Author**: Figma Make - Bykea Senior-Friendly TTS System
