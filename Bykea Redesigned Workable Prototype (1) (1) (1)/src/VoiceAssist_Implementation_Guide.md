# Voice Assist System - Implementation Guide

## Overview

This document provides a comprehensive guide to implementing the Voice Assist (TTS Narrator) system across the Bykea mobile application. The Voice Assist system provides full screen narration for visually impaired users, with automatic screen summaries, interaction announcements, and bilingual support.

## Architecture

### Core Components

1. **VoiceAssistContext** (`/components/VoiceAssistContext.tsx`)
   - Global state management for Voice Assist
   - Speech synthesis queue management
   - Language synchronization
   - Priority-based announcement system

2. **useVoiceAssistText** (`/components/useVoiceAssistText.tsx`)
   - Screen-specific text content repository
   - Bilingual text definitions (English/Urdu)
   - Screen summaries and element labels
   - Template formatting utilities

3. **useVoiceAssistScreen** (`/components/useVoiceAssistScreen.tsx`)
   - Screen-level integration hook
   - Automatic screen announcements
   - Helper functions for common interactions
   - Language synchronization

4. **GlobalSpeakerButton** (`/components/GlobalSpeakerButton.tsx`)
   - Toggle button in top-right corner
   - Grey (OFF) / Green (ON) visual states
   - Persistent state across screens
   - ARIA accessibility attributes

## Visual States

### Speaker Button States

- **OFF (Grey)**: `bg-[#E0E0E0]` or `bg-[#2A2A2A]` (dark mode)
- **ON (Green)**: `bg-[#0CAA41]` with shadow
- **Icon**: Volume2 from lucide-react
- **Position**: Top-right corner (44px × 44px)

## Implementation Steps

### Step 1: Wrap App with VoiceAssistProvider

Already completed in `/App.tsx`:

```tsx
import { VoiceAssistProvider } from "./components/VoiceAssistContext";

return (
  <ReadAloudProvider>
    <VoiceAssistProvider>
      {/* Your app content */}
    </VoiceAssistProvider>
  </ReadAloudProvider>
);
```

### Step 2: Add Voice Assist to a Screen

Example implementation (see `LoginScreen.tsx` and `NewHomeScreen.tsx`):

```tsx
import { useVoiceAssistScreen } from "./useVoiceAssistScreen";

export function YourScreen({ language, ...props }) {
  // Initialize Voice Assist for this screen
  const voiceAssist = useVoiceAssistScreen({
    screenKey: 'yourScreen', // Must match key in useVoiceAssistText
    language,
    autoAnnounce: true // Auto-announce on mount
  });

  // Announce button press
  const handleButtonClick = () => {
    voiceAssist.announceButton('buttonKey', 'Optional custom text');
    // ... your logic
  };

  // Announce selection
  const handleSelect = (item: string) => {
    voiceAssist.announceSelection(item);
    // ... your logic
  };

  // Announce navigation
  const handleNavigate = (destination: string) => {
    voiceAssist.announceNavigation(destination);
    // ... your logic
  };

  return (
    <div>
      {/* Your screen content */}
    </div>
  );
}
```

### Step 3: Add Screen Content to useVoiceAssistText

Add your screen's content to `/components/useVoiceAssistText.tsx`:

```tsx
yourScreen: {
  screenName: language === 'en' ? 'Your Screen Name' : 'آپ کی اسکرین کا نام',
  screenSummary: language === 'en'
    ? 'Screen summary describing its purpose and what users can do.'
    : 'اسکرین کا خلاصہ جو اس کے مقصد اور صارفین کیا کر سکتے ہیں بیان کرتا ہے۔',
  elements: {
    button1: language === 'en' ? 'Button 1 label' : 'بٹن 1 لیبل',
    button2: language === 'en' ? 'Button 2 label' : 'بٹن 2 لیبل',
    inputField: language === 'en' ? 'Input field label' : 'ان پٹ فیلڈ لیبل',
    // ... more elements
  }
}
```

## Helper Functions Reference

### announceButton(buttonKey, customText?)
Announces a button press with "You pressed: [button name]"

```tsx
voiceAssist.announceButton('continueButton');
// English: "You pressed: Continue"
// Urdu: "آپ نے دبایا: جاری رکھیں"
```

### announceSelection(item)
Announces a selection with "You selected: [item]"

```tsx
voiceAssist.announceSelection('Home');
// English: "You selected: Home"
// Urdu: "آپ نے منتخب کیا: گھر"
```

### announceNavigation(destination)
Announces navigation with "Navigating to [destination]"

```tsx
voiceAssist.announceNavigation('Settings');
// English: "Navigating to Settings"
// Urdu: "ترتیبات پر جا رہے ہیں"
```

### announceInputFocus(label)
Announces input field focus with "Field name. Double tap to edit."

```tsx
voiceAssist.announceInputFocus('Phone number');
// English: "Phone number field. Double tap to edit."
// Urdu: "فون نمبر فیلڈ۔ ترمیم کرنے کے لیے دو بار ٹیپ کریں۔"
```

### announceToggle(label, isOn)
Announces toggle state changes

```tsx
voiceAssist.announceToggle('Dark Mode', true);
// English: "Dark Mode On"
// Urdu: "ڈارک موڈ آن"
```

### announceError(errorKey)
Announces error messages from predefined error content

```tsx
voiceAssist.announceError('invalidPhone');
// English: "Invalid phone number."
// Urdu: "غلط فون نمبر۔"
```

### announceText(text)
Announces custom text (low priority)

```tsx
voiceAssist.announceText('Your custom announcement');
```

## Screen-by-Screen Implementation Checklist

### ✅ Completed Screens
- [x] SplashScreen - Basic voice assist integration
- [x] LoginScreen - Input focus, button announcements, error handling
- [x] NewHomeScreen - Full interaction announcements, selections, navigation

### 🔄 Screens to Implement

#### High Priority (Core Flow)
- [ ] OTPScreen - Input field announcements, resend button, verification success
- [ ] ProfileSetupScreen - Form field announcements
- [ ] NewPickupScreen - Map interaction announcements
- [ ] NewDropoffScreen - Destination selection announcements
- [ ] VehicleSelectionScreen - Vehicle option announcements
- [ ] NewRideOptionsScreen - Driver card announcements with dynamic data
- [ ] NewConfirmRideScreen - Trip details narration
- [ ] NewDriverOnWayScreen - Real-time status updates, arrival time
- [ ] RatingScreen - Star selection announcements
- [ ] NewPaymentScreen - Payment method and success announcements

#### Medium Priority (Supporting Screens)
- [ ] ManageQuickDestinationsScreen - Add/remove announcements
- [ ] ChatScreen - Message reading (incoming/outgoing)
- [ ] SettingsScreen - Toggle state announcements
- [ ] ProfileScreen - Profile data reading
- [ ] TripsScreen - Trip list narration
- [ ] WalletScreen - Balance and transaction announcements
- [ ] TripDetailsScreen - Trip detail narration

## Announcement Priorities

The system uses 3 priority levels:

1. **HIGH** - Screen changes, critical alerts
   - Clears announcement queue
   - Plays immediately
   - Example: Screen summaries, navigation

2. **NORMAL** - User interactions
   - Queued after high priority
   - Example: Button presses, selections

3. **LOW** - Supporting information
   - Queued after normal priority
   - Example: Helper text, descriptions

## Accessibility Best Practices

### ARIA Attributes
Always add ARIA attributes to interactive elements:

```tsx
<button
  onClick={handleClick}
  aria-label="Descriptive label"
  aria-pressed={isActive}
>
  Button Text
</button>

<input
  type="text"
  aria-label="Input field description"
  onFocus={() => voiceAssist.announceInputFocus('Field name')}
/>
```

### Touch Targets
- Minimum size: 55px × 55px (already implemented)
- Voice Assist should describe the purpose clearly
- Use clear, non-ambiguous language

### Bilingual Support
- All announcements must support both English and Urdu
- No mixing of languages within a single announcement
- Language switches should be announced

## Testing Checklist

### Functional Testing
- [ ] Speaker button toggles ON/OFF correctly
- [ ] Green (ON) / Grey (OFF) states visible
- [ ] State persists across screen navigation
- [ ] Screen summaries announce on each new screen
- [ ] Button presses are announced
- [ ] Selections are announced
- [ ] Navigation is announced
- [ ] Errors are announced
- [ ] Input field focus is announced

### Language Testing
- [ ] English mode speaks only English
- [ ] Urdu mode speaks only Urdu
- [ ] Language toggle updates Voice Assist language
- [ ] Language change is announced
- [ ] All screens have bilingual content

### Priority Testing
- [ ] Screen changes interrupt lower priority announcements
- [ ] High priority announcements play immediately
- [ ] Queue processes in correct priority order
- [ ] Multiple announcements don't overlap

### Edge Cases
- [ ] Voice Assist OFF: No announcements play
- [ ] Web Speech API unavailable: Graceful degradation
- [ ] Rapid screen changes: Queue clears appropriately
- [ ] Rapid button taps: Announcements queue properly
- [ ] Language switch mid-speech: Speech stops and restarts

## Browser Compatibility

### Web Speech API Support
- ✅ Chrome/Edge (Desktop & Mobile)
- ✅ Safari (Desktop & Mobile)
- ⚠️ Firefox (Desktop only, limited mobile support)
- ❌ Opera Mini

### Fallback Strategy
If Web Speech API is not available:
1. Log error to console with fallback suggestion
2. Continue normal app functionality
3. Consider cloud TTS providers (Azure, Google, AWS)

## Performance Considerations

1. **Speech Queue Management**
   - Maximum queue size: Unlimited (clears on high priority)
   - Timeout between announcements: 200ms
   - Speech rate: 0.9 (slightly slower for clarity)

2. **Memory Management**
   - Cancel ongoing speech on unmount
   - Clear queue references
   - Clean up event listeners

3. **Network**
   - Web Speech API uses device TTS (no network)
   - No additional network overhead

## Production Deployment

### Required Changes for Production

1. **Replace Web Speech API with Cloud TTS**
   - Implement Azure Cognitive Services Speech SDK
   - Add Google Cloud Text-to-Speech
   - Configure AWS Polly
   - Better Urdu language support
   - More natural voices

2. **Analytics Integration**
   - Track Voice Assist usage
   - Monitor announcement errors
   - Measure user engagement
   - A/B test announcement strategies

3. **User Preferences**
   - Save Voice Assist state to local storage
   - Allow custom speech rate
   - Voice selection (male/female)
   - Announcement verbosity levels

4. **Testing**
   - Screen reader compatibility testing
   - Accessibility audit (WCAG 2.1 AA compliance)
   - User testing with visually impaired users
   - Multilingual testing

## Example Implementation: VehicleSelectionScreen

```tsx
import { useVoiceAssistScreen } from "./useVoiceAssistScreen";
import { CarIcon } from "./icons/CarIcon";
import { RickshawIcon } from "./icons/RickshawIcon";
import { BikeIcon } from "lucide-react";

export function VehicleSelectionScreen({ language, onNavigate }) {
  const voiceAssist = useVoiceAssistScreen({
    screenKey: 'vehicleSelection',
    language,
    autoAnnounce: true
  });

  const handleVehicleSelect = (vehicle: 'bike' | 'rickshaw' | 'car') => {
    // Announce the selection with vehicle details
    const announcement = voiceAssist.content.elements[vehicle];
    voiceAssist.announceSelection(announcement);
    
    // Navigate to next screen
    onNavigate('rideOptions', vehicle);
  };

  return (
    <div className="screen">
      <h1>{voiceAssist.screenName}</h1>
      
      <button 
        onClick={() => handleVehicleSelect('bike')}
        aria-label={voiceAssist.content.elements.bike}
      >
        <BikeIcon />
        <span>Bike</span>
        <span>Rs. 150+</span>
      </button>

      <button 
        onClick={() => handleVehicleSelect('rickshaw')}
        aria-label={voiceAssist.content.elements.rickshaw}
      >
        <RickshawIcon />
        <span>Rickshaw</span>
        <span>Rs. 200+</span>
      </button>

      <button 
        onClick={() => handleVehicleSelect('car')}
        aria-label={voiceAssist.content.elements.car}
      >
        <CarIcon />
        <span>Car</span>
        <span>Rs. 300+</span>
      </button>
    </div>
  );
}
```

## Support & Troubleshooting

### Common Issues

**Issue**: Voice Assist not speaking
- Check if speaker button is green (ON)
- Verify Web Speech API is available: `window.speechSynthesis`
- Check browser console for errors
- Test with different voice/language

**Issue**: Wrong language speaking
- Verify language prop matches Voice Assist language
- Check useVoiceAssistText returns correct language
- Ensure language sync in useVoiceAssistScreen

**Issue**: Announcements overlapping
- Check priority settings
- Verify queue is processing correctly
- Reduce announcement frequency

**Issue**: Urdu not speaking properly
- Web Speech API has limited Urdu support
- Consider cloud TTS providers
- Test with `ur-PK` locale

## Next Steps

1. Implement Voice Assist in remaining screens (checklist above)
2. Add screen-specific content to useVoiceAssistText
3. Test thoroughly with each screen
4. Conduct user testing with target audience
5. Prepare for production deployment with cloud TTS

## Resources

- Web Speech API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
- WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- Azure Speech SDK: https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/
- Google Cloud TTS: https://cloud.google.com/text-to-speech
- AWS Polly: https://aws.amazon.com/polly/

---

**Document Version**: 1.0  
**Last Updated**: November 2025  
**Status**: Implementation In Progress
