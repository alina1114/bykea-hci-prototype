# Voice Assist - Quick Start Guide

## 🚀 Add Voice Assist to Your Screen in 3 Steps

### Step 1: Import the Hook
```tsx
import { useVoiceAssistScreen } from "./useVoiceAssistScreen";
```

### Step 2: Initialize in Your Component
```tsx
export function YourScreen({ language, ...props }) {
  const voiceAssist = useVoiceAssistScreen({
    screenKey: 'yourScreen',  // Must match key in useVoiceAssistText
    language,                   // 'en' or 'ur'
    autoAnnounce: true          // Announces screen on mount
  });

  // Your component code...
}
```

### Step 3: Add Announcements to Interactions
```tsx
// Button press
<button onClick={() => {
  voiceAssist.announceButton('submitButton');
  handleSubmit();
}}>
  Submit
</button>

// Selection
<button onClick={() => {
  voiceAssist.announceSelection('Home');
  selectDestination('home');
}}>
  Home
</button>

// Navigation
<button onClick={() => {
  voiceAssist.announceNavigation('Settings');
  navigate('settings');
}}>
  Settings
</button>

// Input focus
<input
  onFocus={() => voiceAssist.announceInputFocus('Phone number')}
  placeholder="Enter phone"
/>

// Toggle
<Switch
  checked={darkMode}
  onCheckedChange={(checked) => {
    voiceAssist.announceToggle('Dark Mode', checked);
    setDarkMode(checked);
  }}
/>

// Error
if (!valid) {
  voiceAssist.announceError('invalidPhone');
}
```

## 📝 Add Screen Content

Edit `/components/useVoiceAssistText.tsx` and add your screen:

```tsx
yourScreen: {
  screenName: language === 'en' ? 'Your Screen' : 'آپ کی اسکرین',
  screenSummary: language === 'en'
    ? 'Description of what user can do on this screen.'
    : 'اس اسکرین پر صارف کیا کر سکتا ہے کی تفصیل۔',
  elements: {
    submitButton: language === 'en' ? 'Submit' : 'جمع کروائیں',
    cancelButton: language === 'en' ? 'Cancel' : 'منسوخ',
    nameInput: language === 'en' ? 'Name' : 'نام',
    // Add all interactive elements
  }
}
```

## 🎯 Common Patterns

### Pattern 1: Button with Custom Announcement
```tsx
const handleAction = () => {
  voiceAssist.announceButton('actionBtn', 'Custom announcement text');
  performAction();
};
```

### Pattern 2: Dynamic Selection Announcement
```tsx
const vehicles = ['Bike', 'Rickshaw', 'Car'];

vehicles.map(vehicle => (
  <button onClick={() => {
    voiceAssist.announceSelection(vehicle);
    selectVehicle(vehicle);
  }}>
    {vehicle}
  </button>
))
```

### Pattern 3: Form Field with Error
```tsx
const handleSubmit = () => {
  if (!isValid(phoneNumber)) {
    voiceAssist.announceError('invalidPhone');
    return;
  }
  
  voiceAssist.announceButton('submit', 'Submitting form');
  submitForm();
};
```

### Pattern 4: List with Individual Announcements
```tsx
drivers.map(driver => (
  <button onClick={() => {
    const announcement = language === 'en'
      ? `Driver: ${driver.name}. Rating ${driver.rating} stars. Fare ${driver.fare} rupees.`
      : `ڈرائیور: ${driver.name}۔ ریٹنگ ${driver.rating} ستارے۔ کرایہ ${driver.fare} روپے۔`;
    
    voiceAssist.announceSelection(announcement);
    selectDriver(driver);
  }}>
    {driver.name}
  </button>
))
```

### Pattern 5: Navigation with Bilingual Support
```tsx
const navigateToSettings = () => {
  const destination = language === 'en' ? 'Settings' : 'ترتیبات';
  voiceAssist.announceNavigation(destination);
  navigate('settings');
};
```

## ✅ Checklist for Each Screen

- [ ] Import useVoiceAssistScreen
- [ ] Initialize with correct screenKey
- [ ] Pass language prop
- [ ] Add screen content to useVoiceAssistText
- [ ] Add announcements to all buttons
- [ ] Add announcements to all selections
- [ ] Add announcements to navigation actions
- [ ] Add input focus announcements
- [ ] Add toggle state announcements
- [ ] Add error announcements
- [ ] Add ARIA labels to elements
- [ ] Test with Voice Assist ON
- [ ] Test with Voice Assist OFF
- [ ] Test in both English and Urdu
- [ ] Test screen change announcement

## 🎨 Available Helper Functions

| Function | Purpose | Example |
|----------|---------|---------|
| `announceButton` | Button press | "You pressed: Continue" |
| `announceSelection` | Item selection | "You selected: Home" |
| `announceNavigation` | Screen navigation | "Navigating to Settings" |
| `announceInputFocus` | Input focus | "Phone number field. Double tap to edit." |
| `announceToggle` | Toggle state | "Dark Mode On" |
| `announceError` | Error message | "Invalid phone number." |
| `announceText` | Custom text | Any custom announcement |
| `stopSpeaking` | Stop all speech | Immediately stops |

## 🔊 Priority Levels

Announcements are queued with priorities:

- **HIGH**: Screen changes, critical alerts (clears queue)
- **NORMAL**: User interactions (buttons, selections)
- **LOW**: Supporting information (text, descriptions)

Use `voiceAssist.queueAnnouncement(text, 'high' | 'normal' | 'low')` for custom priority.

## 🎯 Best Practices

### DO ✅
- Announce every interactive element
- Use clear, descriptive language
- Provide bilingual support
- Test with Voice Assist ON and OFF
- Use ARIA attributes
- Announce screen changes
- Announce errors and success states
- Keep announcements concise

### DON'T ❌
- Mix languages in announcements
- Announce decorative elements
- Overload with too many announcements
- Use technical jargon
- Forget to test in both languages
- Announce during animations
- Queue too many low-priority items
- Forget ARIA labels

## 🧪 Quick Test

```tsx
// Test Voice Assist in your screen:

1. Toggle speaker button to GREEN
2. Navigate to your screen
   → Should hear: "Screen Name. Screen Summary."

3. Tap a button
   → Should hear: "You pressed: Button Name"

4. Select an item
   → Should hear: "You selected: Item Name"

5. Navigate away
   → Should hear: "Navigating to Destination"

6. Toggle speaker to GREY
7. Repeat actions
   → Should hear: Nothing (OFF state)

8. Switch to Urdu
9. Toggle speaker to GREEN
10. Repeat actions
    → Should hear: All announcements in Urdu
```

## 🐛 Troubleshooting

**Voice Assist not speaking?**
- Check speaker button is GREEN
- Check browser console for errors
- Verify Web Speech API: `console.log(window.speechSynthesis)`

**Wrong language?**
- Verify language prop is correct
- Check useVoiceAssistText has content for both languages

**Announcements overlapping?**
- Reduce announcement frequency
- Use appropriate priorities
- Check queue is processing

## 📚 Need More Help?

See full documentation:
- `/VoiceAssist_Implementation_Guide.md` - Comprehensive guide
- `/components/VoiceAssistContext.tsx` - Core context
- `/components/useVoiceAssistScreen.tsx` - Screen hook
- `/components/useVoiceAssistText.tsx` - Text content

## 🔗 Example Screens

Reference these completed implementations:
- `SplashScreen.tsx` - Basic integration
- `LoginScreen.tsx` - Input fields and errors
- `NewHomeScreen.tsx` - Full interactions and selections

---

**Quick Start Version**: 1.0  
**Ready to implement!** 🚀
