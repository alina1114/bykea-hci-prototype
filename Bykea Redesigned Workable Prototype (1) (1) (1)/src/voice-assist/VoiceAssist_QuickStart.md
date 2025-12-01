# Voice Assist - Quick Start Guide

## 📖 Overview

The Voice Assist system provides comprehensive audio guidance for senior citizens using the Bykea ride-hailing app. This documentation-only system demonstrates best practices for implementing accessible voice features in React/TypeScript applications.

**Key Features:**
- ✅ Fully bilingual (English + Urdu)
- ✅ Priority-based announcement queue
- ✅ Screen-level auto-announcements
- ✅ Context-aware voice guidance
- ✅ Integrated with speaker button control
- ✅ Optimized for senior users

---

## 🚀 Getting Started

### Step 1: Wrap Your App with VoiceAssistProvider

```tsx
// App.tsx
import { VoiceAssistProvider } from './voice-assist/VoiceAssistContext';

export default function App() {
  return (
    <VoiceAssistProvider initialEnabled={false} initialLanguage="en">
      <YourAppContent />
    </VoiceAssistProvider>
  );
}
```

### Step 2: Use Voice Assist in Your Screen

```tsx
// HomeScreen.tsx
import { useVoiceAssistScreen } from './voice-assist/useVoiceAssistScreen';

export function HomeScreen({ language, isVoiceEnabled }) {
  const voiceAssist = useVoiceAssistScreen({
    screenKey: 'home',
    language,
    autoAnnounce: true, // Auto-read screen on mount
    autoAnnounceDelay: 500 // Delay in ms
  });

  return (
    <div>
      <button onClick={() => {
        voiceAssist.announceButton('searchBar');
        navigate('/search');
      }}>
        Search Destination
      </button>
    </div>
  );
}
```

### Step 3: Integrate with Speaker Button

```tsx
// Global Speaker Button Component
export function SpeakerButton({ isActive, onToggle }) {
  const { setEnabled } = useVoiceAssist();

  const handleToggle = () => {
    setEnabled(!isActive);
    onToggle();
  };

  return (
    <button
      onClick={handleToggle}
      className={isActive ? 'bg-green-500' : 'bg-gray-400'}
      aria-label={isActive ? 'Voice Assist On' : 'Voice Assist Off'}
    >
      <Volume2 className="w-6 h-6 text-white" />
    </button>
  );
}
```

---

## 📋 Core Functions

### 1. announceButton(elementKey, customText?)
Announces when a button is pressed.

```tsx
<button onClick={() => {
  voiceAssist.announceButton('confirmButton');
  // Announces: "You pressed: Confirm"
}}>
  Confirm
</button>
```

### 2. announceSelection(itemName, additionalInfo?)
Announces item selection with optional details.

```tsx
<button onClick={() => {
  voiceAssist.announceSelection('Bike', 'Fare one hundred fifty rupees');
  // Announces: "You selected: Bike. Fare one hundred fifty rupees."
}}>
  Select Bike
</button>
```

### 3. announceNavigation(destination)
Announces navigation to another screen.

```tsx
const handleNavigate = () => {
  voiceAssist.announceNavigation('Payment Screen');
  navigate('/payment');
};
```

### 4. announceInputFocus(fieldName, placeholder?)
Announces when input field receives focus.

```tsx
<input
  onFocus={() => {
    voiceAssist.announceInputFocus('Phone number', 'Enter eleven digits');
  }}
  placeholder="Phone number"
/>
```

### 5. announceToggle(label, state)
Announces toggle state changes.

```tsx
<Switch
  checked={darkMode}
  onChange={(checked) => {
    setDarkMode(checked);
    voiceAssist.announceToggle('Dark Mode', checked);
    // Announces: "Dark Mode On" or "Dark Mode Off"
  }}
/>
```

### 6. announceError(errorKey, customError?)
Announces error messages.

```tsx
if (!isValidPhone(phone)) {
  voiceAssist.announceError('invalidPhone');
  // Announces: "Error: Invalid phone number."
}
```

### 7. announceAction(actionText)
Announces action completion.

```tsx
const handleSave = async () => {
  await saveProfile();
  voiceAssist.announceAction('Profile saved successfully');
};
```

### 8. announceText(text, priority?)
Announces custom text with priority level.

```tsx
voiceAssist.announceText('Driver arriving in two minutes', 'high');
```

### 9. stopSpeaking()
Stops all current and queued announcements.

```tsx
<button onClick={() => voiceAssist.stopSpeaking()}>
  Stop Voice
</button>
```

---

## 🎯 Priority System

Voice Assist uses a 3-level priority queue:

| Priority | Usage | Example |
|----------|-------|---------|
| **high** | Critical information, errors, immediate actions | Button presses, errors, confirmations |
| **normal** | General navigation, selections | Screen changes, item selections |
| **low** | Background information, hints | Tips, suggestions, help text |

**Example:**

```tsx
// High priority - plays immediately
voiceAssist.announceText('Payment failed', 'high');

// Normal priority - plays after high priority items
voiceAssist.announceText('Navigating to home', 'normal');

// Low priority - plays last
voiceAssist.announceText('Tip: You can save addresses', 'low');
```

---

## 🌍 Bilingual Support

Voice Assist automatically handles English and Urdu based on the language setting.

```tsx
// English
voiceAssist.announceButton('confirmButton');
// "You pressed: Confirm"

// Urdu (when language='ur')
voiceAssist.announceButton('confirmButton');
// "آپ نے تصدیق کریں دبایا"
```

All text is centralized in `useVoiceAssistText.tsx` for easy updates.

---

## 📱 Screen Integration Checklist

When adding Voice Assist to a screen:

- [ ] Import `useVoiceAssistScreen` hook
- [ ] Pass correct `screenKey` matching your screen
- [ ] Pass current `language` prop
- [ ] Enable `autoAnnounce: true` for auto-read on mount
- [ ] Add `announceButton()` to all interactive buttons
- [ ] Add `announceSelection()` to selectable items
- [ ] Add `announceInputFocus()` to form inputs
- [ ] Add `announceToggle()` to switches/toggles
- [ ] Add `announceError()` to validation errors
- [ ] Test with speaker button ON and OFF

---

## 🎨 Example: Complete Screen Implementation

```tsx
import { useVoiceAssistScreen } from '../voice-assist/useVoiceAssistScreen';

interface VehicleSelectionScreenProps {
  onNavigate: (screen: string, vehicleType: string) => void;
  language: 'en' | 'ur';
}

export function VehicleSelectionScreen({ 
  onNavigate, 
  language 
}: VehicleSelectionScreenProps) {
  // Initialize Voice Assist
  const voiceAssist = useVoiceAssistScreen({
    screenKey: 'vehicleSelection',
    language,
    autoAnnounce: true
  });

  const handleSelectVehicle = (vehicleType: string, fare: number) => {
    // Announce selection
    voiceAssist.announceSelection(
      vehicleType,
      `Fare ${fare} rupees`
    );
    
    // Navigate
    onNavigate('rideOptions', vehicleType);
  };

  const handleBack = () => {
    voiceAssist.announceButton('backButton');
    onNavigate('dropoff');
  };

  return (
    <div className="screen">
      <header>
        <button onClick={handleBack}>
          Back
        </button>
        <h1>{voiceAssist.content.screenName}</h1>
      </header>

      <main>
        <button
          onClick={() => handleSelectVehicle('Bike', 150)}
          aria-label={voiceAssist.content.elements.bikeInfo}
        >
          <div>Bike</div>
          <div>Rs. 150</div>
        </button>

        <button
          onClick={() => handleSelectVehicle('Rickshaw', 250)}
          aria-label={voiceAssist.content.elements.rickshawInfo}
        >
          <div>Rickshaw</div>
          <div>Rs. 250</div>
        </button>

        <button
          onClick={() => handleSelectVehicle('Car', 400)}
          aria-label={voiceAssist.content.elements.carInfo}
        >
          <div>Car</div>
          <div>Rs. 400</div>
        </button>
      </main>
    </div>
  );
}
```

---

## 🔧 Troubleshooting

### Issue: Voice Assist not speaking

**Solution:**
1. Check if speaker button is enabled (green)
2. Verify `VoiceAssistProvider` wraps your app
3. Ensure `isEnabled` is true in context
4. Check browser console for errors

### Issue: Wrong language announcements

**Solution:**
1. Verify `language` prop is correctly passed
2. Check that language matches app state ('en' or 'ur')
3. Ensure text exists for that screen in `useVoiceAssistText.tsx`

### Issue: Announcements are cut off

**Solution:**
1. Use priority system - set critical announcements to 'high'
2. Avoid rapid successive announcements
3. Call `stopSpeaking()` before important announcements if needed

---

## 💡 Best Practices

### 1. Keep Announcements Concise
✅ **Good:** "You selected: Bike"  
❌ **Bad:** "You have successfully selected the bike vehicle type which costs one hundred fifty rupees"

### 2. Use Appropriate Priority
✅ **Good:** Errors and confirmations = high priority  
❌ **Bad:** Everything as high priority

### 3. Auto-Announce Screen Entry
✅ **Good:** Enable `autoAnnounce: true` for all screens  
❌ **Bad:** User has to manually trigger each announcement

### 4. Provide Context in Selections
✅ **Good:** "Bike. Fare one hundred fifty rupees"  
❌ **Bad:** "Bike"

### 5. Test with Real Users
- Test with seniors aged 55-80
- Verify Urdu pronunciation is correct
- Ensure speaking rate is appropriate (slower for comprehension)
- Confirm announcements aren't overwhelming

---

## 📚 Next Steps

1. Read [Implementation Guide](./VoiceAssist_Implementation_Guide.md) for architecture details
2. Check [Summary](./VoiceAssist_Summary.md) for feature overview
3. Review example screens in `/voice-assist/examples/`
4. Test with accessibility tools (screen readers, etc.)

---

## 🆘 Support

For questions or issues:
1. Check the Implementation Guide
2. Review example screens
3. Test with browser console open to see Voice Assist logs
4. Verify all prerequisites are met

---

**Last Updated:** November 2024  
**Version:** 1.0.0  
**Status:** Documentation Only - Not Executable Code
