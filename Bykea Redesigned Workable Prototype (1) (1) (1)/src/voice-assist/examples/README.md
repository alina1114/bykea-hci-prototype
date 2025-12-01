# Voice Assist - Example Implementations

This folder contains complete, production-ready example implementations demonstrating how to use the Voice Assist system across different screen types.

## 📁 Examples Overview

| Example | Screen Type | Demonstrates |
|---------|-------------|--------------|
| **HomeScreenExample.tsx** | Navigation Hub | Auto-announcements, button clicks, quick selections, navigation |
| **LoginScreenExample.tsx** | Form Input | Input focus, error handling, validation, loading states |
| **VehicleSelectionExample.tsx** | Selection Screen | Item selection with context, pricing announcements, focus events |
| **SettingsScreenExample.tsx** | Settings/Controls | Toggles, sliders, text size, language switching |

---

## 🎯 What Each Example Teaches

### 1. HomeScreenExample.tsx

**Use This When:** Building main navigation screens, dashboards, or landing pages.

**Key Learnings:**
- ✅ Auto-announce screen on mount
- ✅ Quick destination selections
- ✅ Search bar interactions
- ✅ Map control announcements
- ✅ Voice assistant integration
- ✅ Settings navigation
- ✅ Language toggle with announcements

**Voice Assist Patterns:**
```tsx
// Auto-announce on mount
const voiceAssist = useVoiceAssistScreen({
  screenKey: 'home',
  language,
  autoAnnounce: true
});

// Announce selection
const handleDestClick = (dest: string) => {
  voiceAssist.announceSelection(dest);
  navigate('dropoff', dest);
};

// Announce button press
const handleSearch = () => {
  voiceAssist.announceButton('searchBar');
  navigate('pickup');
};
```

---

### 2. LoginScreenExample.tsx

**Use This When:** Building forms, authentication screens, or data entry interfaces.

**Key Learnings:**
- ✅ Input field focus announcements
- ✅ Error announcements with validation
- ✅ Loading state announcements
- ✅ Success/completion announcements
- ✅ ARIA attributes for accessibility
- ✅ Keyboard interaction (Enter key)
- ✅ Real-time error clearing

**Voice Assist Patterns:**
```tsx
// Announce input focus
const handleFocus = () => {
  voiceAssist.announceInputFocus('Phone number', 'Enter eleven digits');
};

// Announce validation errors
if (!validatePhone(phone)) {
  voiceAssist.announceError('invalidPhone');
  return;
}

// Announce action states
voiceAssist.announceAction('Sending verification code');
// ... after API call
voiceAssist.announceAction('Code sent successfully');
```

---

### 3. VehicleSelectionExample.tsx

**Use This When:** Building selection screens, product catalogs, or option pickers.

**Key Learnings:**
- ✅ Selection with additional context (price, ETA)
- ✅ Focus announcements (low priority)
- ✅ Click announcements (high priority)
- ✅ Rich information in announcements
- ✅ Gradient/styled selections
- ✅ Back navigation

**Voice Assist Patterns:**
```tsx
// Announce selection with context
const handleSelect = (vehicle) => {
  voiceAssist.announceSelection(
    vehicle.name,
    `Fare ${vehicle.fare} rupees. ETA ${vehicle.eta} minutes`
  );
  navigate('rideOptions', vehicle.id);
};

// Low-priority focus announcement
const handleFocus = (vehicle) => {
  const info = `${vehicle.name}. ${vehicle.description}. ${vehicle.fare} rupees.`;
  voiceAssist.announceText(info, 'low');
};
```

---

### 4. SettingsScreenExample.tsx

**Use This When:** Building settings pages, preference screens, or control panels.

**Key Learnings:**
- ✅ Toggle announcements (ON/OFF)
- ✅ Slider/range input announcements
- ✅ Text size selection announcements
- ✅ Language switching
- ✅ Debounced slider announcements
- ✅ ARIA switch roles
- ✅ Multiple control types

**Voice Assist Patterns:**
```tsx
// Announce toggle
const handleToggle = () => {
  const newState = !darkMode;
  setDarkMode(newState);
  voiceAssist.announceToggle('Dark Mode', newState);
  // Announces: "Dark Mode On" or "Dark Mode Off"
};

// Debounced slider announcement
const handleSlider = (value) => {
  setValue(value);
  clearTimeout(timer);
  timer = setTimeout(() => {
    voiceAssist.announceAction(`Brightness set to ${value} percent`);
  }, 800);
};

// Text size selection
const handleSize = (size) => {
  setTextSize(size);
  voiceAssist.announceSelection('Text size', size);
};
```

---

## 🛠️ How to Use These Examples

### Step 1: Review the Example

Choose the example that matches your screen type:
- Navigation/Hub → **HomeScreenExample.tsx**
- Form/Input → **LoginScreenExample.tsx**
- Selection → **VehicleSelectionExample.tsx**
- Settings → **SettingsScreenExample.tsx**

### Step 2: Copy the Pattern

Copy the relevant Voice Assist patterns from the example:

```tsx
// Basic pattern from any example
import { useVoiceAssistScreen } from '../voice-assist/useVoiceAssistScreen';

export function YourScreen({ language }) {
  const voiceAssist = useVoiceAssistScreen({
    screenKey: 'yourScreen', // Add to useVoiceAssistText.tsx
    language,
    autoAnnounce: true
  });

  // Use announcement functions as shown in examples
  return (/* your JSX */);
}
```

### Step 3: Add Your Screen Text

Add your screen's text content to `/voice-assist/useVoiceAssistText.tsx`:

```typescript
yourScreen: {
  en: {
    screenName: 'Your Screen',
    screenSummary: 'Description of your screen',
    elements: {
      button1: 'Button label',
      input1: 'Input label',
      // ...
    },
    errors: {
      error1: 'Error message',
      // ...
    }
  },
  ur: {
    screenName: 'آپ کی سکرین',
    screenSummary: 'آپ کی سکرین کی تفصیل',
    elements: {
      button1: 'بٹن لیبل',
      input1: 'ان پٹ لیبل',
      // ...
    },
    errors: {
      error1: 'خرابی کا پیغام',
      // ...
    }
  }
}
```

### Step 4: Test

Test your implementation with:
- ✅ Speaker button ON
- ✅ Speaker button OFF
- ✅ Both languages (EN/UR)
- ✅ All interactions
- ✅ Error cases
- ✅ Loading states

---

## 📋 Common Patterns Reference

### Pattern: Button Click
```tsx
const handleClick = () => {
  voiceAssist.announceButton('buttonKey');
  // Announces: "You pressed: Button Label"
  doAction();
};
```

### Pattern: Item Selection
```tsx
const handleSelect = (item) => {
  voiceAssist.announceSelection(item.name, item.details);
  // Announces: "You selected: Item Name. Details"
  navigate('next', item);
};
```

### Pattern: Input Focus
```tsx
const handleFocus = () => {
  voiceAssist.announceInputFocus('Field Name', 'Hint');
  // Announces: "Field Name. Hint. Double tap to edit."
};
```

### Pattern: Toggle Switch
```tsx
const handleToggle = (newState) => {
  setState(newState);
  voiceAssist.announceToggle('Toggle Label', newState);
  // Announces: "Toggle Label On" or "Toggle Label Off"
};
```

### Pattern: Error Display
```tsx
if (hasError) {
  voiceAssist.announceError('errorKey');
  // Announces: "Error: Error message from content"
  setError(errorKey);
}
```

### Pattern: Action Completion
```tsx
const handleSave = async () => {
  await saveData();
  voiceAssist.announceAction('Data saved successfully');
  // Announces: "Data saved successfully"
};
```

### Pattern: Navigation
```tsx
const handleNavigate = () => {
  voiceAssist.announceNavigation('Next Screen');
  // Announces: "Navigating to Next Screen"
  navigate('next');
};
```

### Pattern: Custom Announcement
```tsx
voiceAssist.announceText('Custom message', 'high');
// Announces: "Custom message" with HIGH priority
```

---

## 🎨 Styling Patterns from Examples

### Pattern: Focus States
```tsx
className={`
  focus:ring-4 focus:ring-[#0CAA41]/30
  focus:border-[#0CAA41]
  focus:outline-none
`}
```

### Pattern: Error States
```tsx
className={`
  ${error 
    ? 'border-red-500 bg-red-50' 
    : 'border-[#E0E0E0] bg-white'
  }
`}
```

### Pattern: Disabled States
```tsx
className={`
  disabled:bg-[#F5F5F5] 
  disabled:text-[#B0B0B0]
  disabled:cursor-not-allowed
`}
```

### Pattern: Active/Selected States
```tsx
className={`
  ${isSelected
    ? 'bg-[#0CAA41] text-white shadow-lg'
    : 'bg-[#F5F8F3] text-[#6B6B6B]'}
`}
```

---

## ♿ Accessibility Patterns from Examples

### Pattern: Button with ARIA
```tsx
<button
  onClick={handleClick}
  aria-label={voiceAssist.content.elements.buttonKey}
  aria-pressed={isPressed}
>
  Button
</button>
```

### Pattern: Input with ARIA
```tsx
<input
  onFocus={handleFocus}
  aria-label="Field label"
  aria-describedby={hasError ? "error-id" : undefined}
  aria-invalid={hasError}
  aria-required={isRequired}
/>
```

### Pattern: Toggle Switch with ARIA
```tsx
<button
  onClick={handleToggle}
  role="switch"
  aria-label="Toggle label"
  aria-checked={isChecked}
>
  Toggle
</button>
```

### Pattern: Error Message with ARIA
```tsx
<div
  id="error-id"
  role="alert"
  aria-live="assertive"
>
  {errorMessage}
</div>
```

### Pattern: Loading State with ARIA
```tsx
<button
  disabled={isLoading}
  aria-busy={isLoading}
  aria-label="Action label"
>
  {isLoading ? 'Loading...' : 'Action'}
</button>
```

---

## 🔍 Debugging Tips

### 1. Check Console Logs
Voice Assist logs all announcements:
```
[Voice Assist] Queued (high): You pressed: Continue
[Voice Assist] Speaking (high): You pressed: Continue
```

### 2. Verify Screen Key
Ensure your screen key matches `useVoiceAssistText.tsx`:
```tsx
const voiceAssist = useVoiceAssistScreen({
  screenKey: 'home', // Must exist in voiceTextMap
  language,
  autoAnnounce: true
});
```

### 3. Check Speaker Button
Verify speaker button is ON (green):
```tsx
if (!voiceAssist.isEnabled) {
  console.log('Voice Assist is disabled');
}
```

### 4. Test Priority Queue
High priority announcements play first:
```tsx
voiceAssist.announceText('Low priority', 'low');
voiceAssist.announceText('High priority', 'high');
// High priority plays first
```

---

## 📚 Additional Resources

- **[Quick Start Guide](../VoiceAssist_QuickStart.md)** - Get started in 5 minutes
- **[Implementation Guide](../VoiceAssist_Implementation_Guide.md)** - Deep dive into architecture
- **[Summary Document](../VoiceAssist_Summary.md)** - System overview

---

## 🤝 Contributing New Examples

To add a new example:

1. Create a new file: `YourScreenExample.tsx`
2. Follow the existing structure:
   - Import `useVoiceAssistScreen`
   - Initialize with correct screen key
   - Add comprehensive comments
   - Include Voice Assist flow documentation at bottom
3. Add your screen to `useVoiceAssistText.tsx`
4. Update this README with your example
5. Test thoroughly

---

## ✅ Example Checklist

When reviewing examples, ensure:

- [ ] Voice Assist hook is initialized
- [ ] Auto-announce is enabled (where appropriate)
- [ ] All buttons have announcements
- [ ] All selections have announcements
- [ ] All inputs have focus announcements
- [ ] All toggles have state announcements
- [ ] All errors have announcements
- [ ] Navigation changes are announced
- [ ] ARIA attributes are present
- [ ] Both languages are supported
- [ ] Comments explain the flow
- [ ] Code is production-ready

---

## 🎯 Quick Reference

| Need to announce... | Use this function |
|---------------------|-------------------|
| Button press | `announceButton()` |
| Item selection | `announceSelection()` |
| Screen change | `announceNavigation()` |
| Input focus | `announceInputFocus()` |
| Toggle state | `announceToggle()` |
| Error | `announceError()` |
| Action complete | `announceAction()` |
| Custom message | `announceText()` |
| Stop speech | `stopSpeaking()` |

---

**Last Updated:** November 2024  
**Version:** 1.0.0  
**Status:** Documentation Only
