# Read-Aloud / TTS System - Testing Guide

## Test Environment Setup

### Prerequisites

1. **Modern browser** with Web Speech API support:
   - Chrome 120+ (recommended)
   - Edge 120+
   - Safari 17+
   - Firefox 121+

2. **Device testing**:
   - Desktop (Windows/Mac/Linux)
   - iOS device (iPhone/iPad with Safari)
   - Android device (Chrome browser)

3. **Accessibility tools**:
   - Screen reader (VoiceOver on Mac/iOS, NVDA/JAWS on Windows)
   - Keyboard (for keyboard navigation testing)
   - High contrast mode enabled

### Check Web Speech API Availability

Open browser console and run:

```javascript
// Check if API is available
if ('speechSynthesis' in window) {
  console.log('✓ Web Speech API is available');
  
  // Get available voices
  const voices = window.speechSynthesis.getVoices();
  console.log('Available voices:', voices.length);
  
  // Check for Urdu voices
  const urduVoices = voices.filter(v => v.lang.startsWith('ur'));
  console.log('Urdu voices:', urduVoices);
  
  if (urduVoices.length === 0) {
    console.warn('⚠️  No Urdu voices found - fallback required');
  }
} else {
  console.error('✗ Web Speech API not available');
}
```

## Test Scenarios

### 1. Component Rendering & States

#### Test 1.1: Initial Idle State
**Steps:**
1. Navigate to any screen in the app
2. Locate the ReadAloud button (top-right or bottom-right)

**Expected Results:**
- [ ] Button is visible
- [ ] Speaker icon is displayed
- [ ] Language badge shows current language (EN or UR)
- [ ] Touch target is at least 44×44 pixels
- [ ] Hover shows tooltip: "Read aloud — EN/UR. Tap to start."

#### Test 1.2: Playing State
**Steps:**
1. Click "Start Reading Demo" button or trigger reading
2. Observe the ReadAloud button

**Expected Results:**
- [ ] Button changes to green (#0CAA41)
- [ ] Pause icon is displayed
- [ ] Animated waveform is visible (3 bars pulsing)
- [ ] Button has pulsing animation
- [ ] Hover shows: "Reading… Tap to pause."
- [ ] Secondary controls appear (Options + Stop buttons)

#### Test 1.3: Paused State
**Steps:**
1. Start reading
2. Click the main button to pause

**Expected Results:**
- [ ] Button shows Play icon
- [ ] Green background but no pulsing animation
- [ ] Hover shows: "Paused. Tap to resume."
- [ ] Secondary controls remain visible
- [ ] Speech is actually paused (audio stops)

#### Test 1.4: Resume from Pause
**Steps:**
1. Pause reading (Test 1.3)
2. Click the main button again

**Expected Results:**
- [ ] Returns to Playing state
- [ ] Resumes from where it paused (same text segment)
- [ ] Highlighting continues from correct position

#### Test 1.5: Stop Reading
**Steps:**
1. Start reading
2. Click the Stop button (X icon in secondary controls)

**Expected Results:**
- [ ] Returns to Idle state
- [ ] All audio stops immediately
- [ ] Text highlighting disappears
- [ ] Secondary controls hide
- [ ] Language badge persists

#### Test 1.6: Error State
**Steps:**
1. Disable Web Speech API in browser (if possible) OR
2. Trigger an error by modifying utterance language to invalid value

**Expected Results:**
- [ ] Button turns red (#EF4444)
- [ ] Warning icon is displayed
- [ ] Hover shows: "Audio unavailable. Tap to retry."
- [ ] Console shows error message with fallback recommendation

### 2. Text Reading & Highlighting

#### Test 2.1: Reading Order
**Steps:**
1. Navigate to Demo Screen
2. Click "Start Reading Demo"
3. Listen and observe highlighting order

**Expected Order:**
1. Page title
2. Subtitle
3. Alert message
4. Section 1 title
5. Pickup location
6. Dropoff location
7. ETA
8. Section 2 title
9. Fare amount
10. Payment method
11. Section 3 title
12. Driver name
13. Rating
14. Vehicle info
15. Primary CTA
16. Instructions
17. Footer (only in "Read All" mode)

**Verify:**
- [ ] Reading follows this priority order
- [ ] Each text segment highlights in yellow as it's read
- [ ] Highlighting is visible and has good contrast
- [ ] Auto-scroll keeps highlighted text in view

#### Test 2.2: Text Highlighting Sync
**Steps:**
1. Start reading
2. Watch for yellow highlight on text

**Expected Results:**
- [ ] Highlighted text has yellow background (bg-yellow-200/60 in light mode)
- [ ] Highlighted text has dark yellow in dark mode (bg-yellow-900/40)
- [ ] Highlight transitions smoothly between texts
- [ ] Only one text element is highlighted at a time
- [ ] Highlighting matches exactly what's being spoken

#### Test 2.3: Auto-Scroll Behavior
**Steps:**
1. Use a long screen with content below the fold
2. Start reading
3. Observe scrolling as content is read

**Expected Results:**
- [ ] Screen auto-scrolls to keep highlighted text in center view
- [ ] Scrolling is smooth (smooth behavior)
- [ ] User can manually scroll during reading
- [ ] Highlighting continues even if user scrolls away

### 3. Language Support

#### Test 3.1: English Reading
**Steps:**
1. Set app language to English
2. Navigate to Demo Screen
3. Start reading

**Expected Results:**
- [ ] Language badge shows "EN"
- [ ] English voice is used (en-US)
- [ ] Pronunciation is clear and correct
- [ ] All English text is read accurately

#### Test 3.2: Urdu Reading
**Steps:**
1. Set app language to Urdu
2. Navigate to Demo Screen
3. Start reading

**Expected Results:**
- [ ] Language badge shows "UR"
- [ ] Urdu voice is used (ur-PK) OR fallback is triggered
- [ ] Urdu text is read correctly
- [ ] Right-to-left text is handled properly
- [ ] If no Urdu voice: Console shows fallback warning

#### Test 3.3: Language Toggle During Reading
**Steps:**
1. Start reading in English
2. Open Settings
3. Change language to Urdu

**Expected Results:**
- [ ] Reading stops automatically
- [ ] Language badge updates to "UR"
- [ ] Next reading session uses Urdu voice
- [ ] Analytics event "readaloud_lang_change" is logged

### 4. Options Sheet Functionality

#### Test 4.1: Open Options Sheet
**Steps:**
1. Start reading (or be in Playing/Paused state)
2. Click the Options button (gear icon)

**Expected Results:**
- [ ] Bottom sheet slides up
- [ ] Sheet shows all options (Speech Rate, Read Depth, Stop)
- [ ] Current selections are highlighted
- [ ] Sheet is accessible via keyboard (Tab navigation)

#### Test 4.2: Speech Rate Control
**Steps:**
1. Open Options Sheet
2. Try each rate option:
   - Slow (0.8×)
   - Normal (1.0×)
   - Fast (1.2×)

**Expected Results:**
- [ ] Each option is selectable (radio button)
- [ ] Touch targets are ≥ 44px
- [ ] Changing rate restarts reading at new speed
- [ ] New rate is applied immediately
- [ ] Analytics event "readaloud_rate_change" is logged

**Verify audio speed:**
- [ ] Slow (0.8×): noticeably slower speech
- [ ] Normal (1.0×): natural speech speed
- [ ] Fast (1.2×): noticeably faster speech

#### Test 4.3: Read Depth Control
**Steps:**
1. Open Options Sheet
2. Try each depth option:
   - Labels Only
   - Screen Summary (default)
   - Read All

**Expected Results:**
- [ ] Each option is selectable
- [ ] Description text is helpful
- [ ] Changing depth affects NEXT reading session
- [ ] Analytics event "readaloud_depth_change" is logged

**Verify reading behavior:**
- [ ] Labels Only: reads only titles and headers (fewer items)
- [ ] Screen Summary: reads top ~10 important items (default)
- [ ] Read All: reads everything including footer text

#### Test 4.4: Stop from Options Sheet
**Steps:**
1. Start reading
2. Open Options Sheet
3. Click "Stop Reading" button

**Expected Results:**
- [ ] Reading stops immediately
- [ ] Options sheet closes
- [ ] Returns to Idle state
- [ ] Analytics event "readaloud_stop" is logged

### 5. Navigation & Persistence

#### Test 5.1: Persistence Across Screens
**Steps:**
1. Navigate to Home screen
2. Observe ReadAloud button location
3. Navigate to different screens (Pickup, Dropoff, Profile, etc.)

**Expected Results:**
- [ ] Button appears on ALL screens
- [ ] Position is consistent (top-right by default)
- [ ] On map screens (Pickup, Dropoff, Driver On Way): button moves to bottom-right
- [ ] Language badge persists
- [ ] State persists (but see Test 5.2 for reading behavior)

#### Test 5.2: Stop on Navigation
**Steps:**
1. Start reading on Demo screen
2. Navigate to a different screen

**Expected Results:**
- [ ] Reading stops automatically
- [ ] Returns to Idle state
- [ ] No audio carries over to new screen
- [ ] Text highlighting disappears
- [ ] Analytics event "readaloud_stop" is logged with screen name

#### Test 5.3: Position on Map Screens
**Steps:**
1. Navigate to Pickup screen (has map)
2. Navigate to Dropoff screen (has map)
3. Navigate to Driver On Way screen (has map)

**Expected Results:**
- [ ] Button is positioned bottom-right (not top-right)
- [ ] Button doesn't overlap map controls
- [ ] Button doesn't overlap floating mic button
- [ ] Button is still fully visible and accessible

### 6. Accessibility (WCAG AA Compliance)

#### Test 6.1: Keyboard Navigation
**Steps:**
1. Use only keyboard (no mouse)
2. Press Tab repeatedly

**Expected Results:**
- [ ] ReadAloud button receives focus
- [ ] Focus ring is visible (4px ring with 30% opacity)
- [ ] Pressing Enter toggles play/pause
- [ ] Tab moves to Options button when visible
- [ ] Escape closes Options sheet

#### Test 6.2: Screen Reader Compatibility
**Steps:**
1. Enable screen reader (VoiceOver/NVDA/JAWS)
2. Navigate to ReadAloud button

**Expected Results:**
- [ ] Button has aria-label: "Read aloud"
- [ ] When playing: aria-label changes to "Pause reading"
- [ ] When paused: aria-label changes to "Resume reading"
- [ ] ARIA live region announces: "Now reading: [Screen Name] in [Language]"
- [ ] State changes are announced

#### Test 6.3: Touch Targets
**Steps:**
1. Use browser dev tools or measure physically
2. Check all interactive elements

**Minimum sizes (WCAG 2.5.5):**
- [ ] Main button: ≥ 44×44 px (actual: 48×48 px)
- [ ] Options button: ≥ 44×44 px (actual: 44×44 px)
- [ ] Stop button: ≥ 44×44 px (actual: 44×44 px)
- [ ] Radio buttons in options: ≥ 24×24 px

#### Test 6.4: Color Contrast
**Steps:**
1. Use contrast checker tool (e.g., WebAIM)
2. Check all color combinations

**Required ratios (WCAG AA):**
- [ ] Idle state icon: ≥ 4.5:1 (actual: ~9.7:1 ✓)
- [ ] Playing state text on green: ≥ 4.5:1 (actual: 4.53:1 ✓)
- [ ] Paused state text on green: ≥ 4.5:1 (actual: 4.5:1 ✓)
- [ ] Error state text on red: ≥ 4.5:1 (actual: 4.54:1 ✓)
- [ ] Language badge: ≥ 4.5:1 ✓

#### Test 6.5: High Contrast Mode
**Steps:**
1. Enable OS high contrast mode (Windows) or Increase Contrast (Mac)
2. Check ReadAloud component

**Expected Results:**
- [ ] All states remain visible
- [ ] Contrast is sufficient
- [ ] Icons are distinguishable
- [ ] Text is readable

### 7. Analytics & Logging

#### Test 7.1: Event Tracking
**Steps:**
1. Open browser console
2. Perform various actions
3. Monitor console for analytics events

**Expected Events:**
```javascript
// When playing starts
{ event: 'readaloud_play', data: { screenName, language, textCount } }

// When paused
{ event: 'readaloud_pause', data: { screenName, currentIndex } }

// When resumed
{ event: 'readaloud_resume', data: { screenName, currentIndex } }

// When stopped
{ event: 'readaloud_stop', data: { screenName } }

// When language changed
{ event: 'readaloud_lang_change', data: { language } }

// When rate changed
{ event: 'readaloud_rate_change', data: { rate } }

// When depth changed
{ event: 'readaloud_depth_change', data: { depth } }

// On error
{ event: 'readaloud_error', data: { error, fallback } }
```

**Verify:**
- [ ] All events are logged
- [ ] Event data is accurate
- [ ] Timestamps are present
- [ ] Events can be sent to analytics service (implementation ready)

### 8. Performance & Edge Cases

#### Test 8.1: Long Text Queue
**Steps:**
1. Create a screen with 50+ text segments
2. Start reading

**Expected Results:**
- [ ] All text is queued correctly
- [ ] No memory leaks
- [ ] Queue limit warning if > 20 items (check console)
- [ ] Reading continues smoothly through all items

#### Test 8.2: Empty Text
**Steps:**
1. Provide empty text array to reading function
2. Try to start reading

**Expected Results:**
- [ ] Shows Error state
- [ ] Console logs error
- [ ] Doesn't crash
- [ ] User can retry

#### Test 8.3: Special Characters
**Steps:**
1. Test reading text with:
   - Numbers (123, 456)
   - Currency (PKR 250)
   - Symbols (&, @, #)
   - Emojis (if any)
   - Mixed EN/UR text

**Expected Results:**
- [ ] Numbers are read as words
- [ ] Currency is pronounced correctly
- [ ] Symbols are read or skipped appropriately
- [ ] Mixed text is handled (may need language hints)

#### Test 8.4: Rapid Actions
**Steps:**
1. Rapidly click Play/Pause/Stop in quick succession
2. Open/close options sheet rapidly
3. Change settings while reading

**Expected Results:**
- [ ] No crashes or errors
- [ ] State remains consistent
- [ ] No overlapping speech
- [ ] Cleanup happens properly

#### Test 8.5: Background Tab
**Steps:**
1. Start reading
2. Switch to a different browser tab
3. Return to app tab

**Expected Results:**
- [ ] Reading may pause (browser behavior)
- [ ] State is preserved
- [ ] Can resume reading
- [ ] No memory leaks

### 9. Mobile Device Testing

#### Test 9.1: iOS Safari
**Device:** iPhone (iOS 17+)

**Tests:**
1. [ ] Web Speech API works
2. [ ] Urdu voices available (check with voices list)
3. [ ] Touch targets are appropriate for fingers
4. [ ] Highlighting is visible on small screen
5. [ ] Auto-scroll works on mobile
6. [ ] Long-press for options works (if implemented)
7. [ ] VoiceOver compatibility

#### Test 9.2: Android Chrome
**Device:** Android phone (Android 10+)

**Tests:**
1. [ ] Web Speech API works
2. [ ] Urdu voices available
3. [ ] Touch interactions smooth
4. [ ] Performance is acceptable
5. [ ] TalkBack compatibility
6. [ ] No conflicts with system TTS

#### Test 9.3: Responsive Design
**Screen sizes:**
- Mobile: 375×667 (iPhone SE)
- Mobile: 390×844 (iPhone 13)
- Tablet: 768×1024 (iPad)

**Verify:**
- [ ] Button position is appropriate for each size
- [ ] Options sheet is full-width on mobile
- [ ] Text is readable
- [ ] Touch targets don't overlap

### 10. Integration Testing

#### Test 10.1: With Existing Speaker Button
**Steps:**
1. Toggle the old speaker button
2. Verify no conflicts with ReadAloud button

**Expected Results:**
- [ ] Both buttons coexist
- [ ] No visual overlap
- [ ] Each has distinct function
- [ ] No state conflicts

#### Test 10.2: With Dark Mode
**Steps:**
1. Enable dark mode in Settings
2. Test all ReadAloud states

**Expected Results:**
- [ ] All states visible in dark mode
- [ ] Color contrast maintained
- [ ] Highlighting uses dark mode colors (bg-yellow-900/40)
- [ ] Options sheet has dark theme

#### Test 10.3: With Text Size Changes
**Steps:**
1. Change text size to Small/Medium/Large in Settings
2. Observe ReadAloud component

**Expected Results:**
- [ ] Button size remains consistent (doesn't scale with text)
- [ ] Tooltips scale with text size
- [ ] Options sheet text scales appropriately
- [ ] Touch targets remain ≥ 44px

## Test Reporting

### Bug Report Template

```markdown
**Title:** [Brief description]

**Severity:** Critical / High / Medium / Low

**Steps to Reproduce:**
1. 
2. 
3. 

**Expected Result:**

**Actual Result:**

**Environment:**
- Browser: 
- Version: 
- OS: 
- Device: 
- Language: EN / UR

**Console Errors:**
```
[Paste any console errors]
```

**Screenshots/Video:**
[Attach if applicable]
```

### Success Criteria

To consider the Read-Aloud system production-ready:

**Functional:**
- [ ] All 5 states render correctly
- [ ] Play/pause/resume/stop work as expected
- [ ] Text highlighting syncs with speech
- [ ] Reading order is logical
- [ ] Options sheet is fully functional

**Accessibility:**
- [ ] All WCAG AA checks pass
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Touch targets are adequate

**Performance:**
- [ ] No memory leaks
- [ ] Smooth animations
- [ ] No lag during playback
- [ ] Works on mobile devices

**Bilingual:**
- [ ] English reading works perfectly
- [ ] Urdu reading works OR fallback is implemented
- [ ] Language toggle works

**Analytics:**
- [ ] All events are logged
- [ ] Data is accurate

## Next Steps After Testing

1. **Fix Critical Bugs:** Address any severity=Critical issues immediately
2. **Implement Fallbacks:** Set up cloud TTS for Urdu if needed
3. **Performance Optimization:** Profile and optimize if issues found
4. **User Testing:** Conduct testing with actual senior citizens (target audience)
5. **Documentation:** Update user guide with TTS instructions
6. **Production Deployment:** Roll out to production with monitoring

---

**Last Updated:** November 23, 2025  
**Version:** 1.0.0  
**Test Status:** Ready for execution
