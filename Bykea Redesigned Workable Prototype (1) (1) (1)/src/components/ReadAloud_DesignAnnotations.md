# Read-Aloud / TTS System - Design Annotations & Prototype Spec

## Component Variants - Detailed Specs

### 1. ReadAloud Button - Hidden State
**Visibility:** Not rendered  
**Usage:** When TTS should be completely disabled (e.g., during onboarding/splash)

---

### 2. ReadAloud Button - Idle State

**Visual Specs:**
- Size: 48×48 px (actual), 44×44 px minimum touch target
- Shape: Perfect circle (border-radius: 50%)
- Background: 
  - Light mode: `#FFFFFF` (white)
  - Dark mode: `#2A2A2A`
- Shadow: 0 4px 12px rgba(0,0,0,0.15)
- Icon: Volume2 (Lucide), 24×24 px
  - Color: `#374151` (gray-700) in light mode
  - Color: `#D1D5DB` (gray-300) in dark mode

**Language Badge:**
- Position: Absolute, bottom-right (-4px, -4px from button edge)
- Size: 24px min-width × 20px height
- Background: `#0CAA41` (Bykea green)
- Text: "EN" or "UR"
  - Font: Inter/SF Pro, 10px, 600 weight
  - Color: `#FFFFFF` (white)
- Border: 2px solid white (creates separation from button)

**States:**
- Hover: Background changes to `#F9FAFB` (gray-50) in light mode
- Focus: 4px ring, color `rgba(12, 170, 65, 0.3)` (green with 30% opacity)
- Active: Scale to 0.95

**Tooltip:**
- Text (EN): "Read aloud — EN. Tap to start."
- Text (UR): "بلند آواز میں پڑھیں — UR۔ شروع کرنے کے لیے تھپتھپائیں۔"
- Background: `#1F2937` (gray-800)
- Text color: `#FFFFFF`
- Font size: 12px
- Padding: 8px 12px
- Border radius: 8px
- Position: Above button with 8px gap
- Arrow: 4px triangle pointing down

---

### 3. ReadAloud Button - Playing State

**Visual Specs:**
- Size: 48×48 px (same as Idle)
- Background: `#0CAA41` (solid green)
  - Animation: Pulse effect (scale 1.0 → 1.05 → 1.0, duration: 2s, infinite)
- Icon: Pause (Lucide), 24×24 px
  - Color: `#FFFFFF` (white)

**Animated Waveform:**
- Position: Absolute, centered over icon (semi-transparent overlay)
- 3 vertical bars:
  - Bar 1: 2px width × 12px height, delay 0ms
  - Bar 2: 2px width × 16px height, delay 150ms
  - Bar 3: 2px width × 12px height, delay 300ms
- Color: `rgba(255, 255, 255, 0.3-0.4)`
- Animation: Wave (scaleY 1.0 → 1.5 → 1.0, duration: 1s, infinite)

**Language Badge:**
- Same as Idle state
- Background: `#0CAA41` (maintains green)

**Secondary Controls (appears on right):**
1. **Options Button:**
   - Size: 44×44 px
   - Icon: Settings (gear), 20×20 px
   - Background: White/dark mode equivalent
   - Position: 8px gap from main button

2. **Stop Button:**
   - Size: 44×44 px
   - Icon: VolumeX, 20×20 px
   - Background: White/dark mode equivalent
   - Position: 8px gap from Options button

**Animation:**
- Secondary controls slide in from right
- Duration: 200ms
- Easing: ease-out

**Tooltip:**
- Text (EN): "Reading… Tap to pause."
- Text (UR): "پڑھ رہا ہے… روکنے کے لیے تھپتھپائیں۔"

---

### 4. ReadAloud Button - Paused State

**Visual Specs:**
- Size: 48×48 px
- Background: `rgba(12, 170, 65, 0.8)` (green with 80% opacity)
  - NO pulse animation
- Icon: Play (Lucide), 24×24 px
  - Position: Slightly offset right (+2px) for visual balance
  - Color: `#FFFFFF` (white)

**Language Badge:**
- Same as Playing state

**Secondary Controls:**
- Remain visible (same as Playing state)

**Tooltip:**
- Text (EN): "Paused. Tap to resume."
- Text (UR): "رکا ہوا۔ جاری رکھنے کے لیے تھپتھپائیں۔"

---

### 5. ReadAloud Button - Error State

**Visual Specs:**
- Size: 48×48 px
- Background: `#EF4444` (red-500)
- Icon: AlertCircle (Lucide), 24×24 px
  - Color: `#FFFFFF` (white)

**Language Badge:**
- Background: `#4B5563` (gray-700) instead of green
- Border: 2px solid white

**Animation:**
- Subtle shake animation on error occurrence
- Duration: 400ms, runs once

**Tooltip:**
- Text (EN): "Audio unavailable. Tap to retry."
- Text (UR): "آڈیو دستیاب نہیں۔ دوبارہ کوشش کریں۔"

---

## Component Placement Rules

### Default Position (Top-Right)
**Screens:** Home, Vehicle Selection, Ride Options, Confirm Ride, Payment, Profile, Trips, Wallet, Settings

**Position Specs:**
- Top: 16px from screen top
- Right: 16px from screen right
- Z-index: 50 (above content, below modals)

**Safe Area:**
- Minimum 16px from any screen edge
- Minimum 8px from any other floating UI elements
- Does NOT overlap navigation elements

### Alternative Position (Bottom-Right)
**Screens:** Pickup (map), Dropoff (map), Driver On Way (map tracking)

**Position Specs:**
- Bottom: 96px from screen bottom (to avoid bottom nav at 80px)
- Right: 16px from screen right
- Z-index: 50

**Avoids:**
- Map zoom controls (usually bottom-right, but lower)
- Floating mic button (usually bottom-center)
- Any map overlay controls

---

## Text Highlighting Specs

### Highlight Visual Style

**Light Mode:**
- Background: `rgba(254, 240, 138, 0.6)` (yellow-200 with 60% opacity)
- Border radius: 4px
- Padding: Horizontal 4px, creates visual "box" around text
- Margin: Horizontal -4px (to compensate for padding)

**Dark Mode:**
- Background: `rgba(113, 63, 18, 0.4)` (yellow-900 with 40% opacity)
- Border radius: 4px
- Padding/margin: Same as light mode

**Transition:**
- Property: all
- Duration: 300ms
- Easing: ease-in-out

**Contrast Check:**
- Yellow bg + black text: 8.5:1 (AAA) ✓
- Dark yellow bg + white text: 7.2:1 (AAA) ✓

### Highlight Timing (Mock for Prototype)

**Sample timings for Demo Screen:**

| Text Segment | Start (sec) | Duration (sec) | Length (chars) |
|--------------|-------------|----------------|----------------|
| "Read-Aloud Demo" | 0.0 | 1.5 | 16 |
| "Test the Text-to-Speech..." | 1.5 | 2.5 | 38 |
| "This is an important alert" | 4.0 | 2.0 | 31 |
| "Booking Details" | 6.0 | 1.5 | 16 |
| "Pickup: Johar Town, Lahore" | 7.5 | 2.0 | 28 |
| "Dropoff: Liberty Market..." | 9.5 | 2.5 | 35 |
| "Estimated arrival: 5 minutes" | 12.0 | 2.0 | 30 |
| ... | ... | ... | ... |

**Calculation:**
- Average: ~80-100 words per minute (conversational speed)
- 1.0x rate: Use calculated timings
- 0.8x rate: Multiply durations by 1.25
- 1.2x rate: Multiply durations by 0.83

---

## Options Sheet Specs

### Sheet Structure

**Dimensions:**
- Height: 480px
- Width: 100% of screen (max 448px on desktop)
- Border radius: Top 24px (bottom corners square)

**Colors:**
- Background (light): `#FFFFFF`
- Background (dark): `#1E1E1E`
- Dividers: `#E5E7EB` / `#374151` (light/dark)

**Padding:**
- Horizontal: 20px
- Top: 24px
- Bottom: 24px (+ safe area)

### Header Section

**Layout:**
- Flex row, space-between
- Align items: start

**Left Side:**
1. Icon Container:
   - Size: 48×48 px
   - Background: `rgba(12, 170, 65, 0.1)` (green 10% opacity)
   - Border radius: 50% (circle)
   - Icon: Volume2, 24×24 px, color `#0CAA41`

2. Text:
   - Title: "Reading Options" / "پڑھنے کے اختیارات"
     - Font size: 20px
     - Font weight: 600
     - Line height: 28px
   - Subtitle: "Customize how content is read aloud" / "مواد کو بلند آواز میں پڑھنے کی ترتیبات"
     - Font size: 16px
     - Color: `#6B7280` (gray-500)

**Right Side:**
- Close button (X icon)
- Size: 44×44 px
- Rounded-full

### Speech Rate Section

**Section Title:**
- Icon: Gauge (20×20 px, gray-600)
- Text: "Speech Rate" / "تقریر کی رفتار"
- Font size: 18px, weight 600
- Margin bottom: 16px

**Radio Options:**
- 3 options, each:
  - Radio button: 24×24 px touch target
  - Label: 18px font
  - Vertical padding: 12px
  - Full-width clickable

**Labels:**
1. "Slow (0.8×)" / "سست (0.8×)"
2. "Normal (1.0×)" / "عام (1.0×)" [DEFAULT]
3. "Fast (1.2×)" / "تیز (1.2×)"

**Spacing:**
- Gap between options: 12px

### Read Depth Section

**Section Title:**
- Icon: Layers (20×20 px)
- Text: "Read Depth" / "پڑھنے کی گہرائی"
- Same styling as Speech Rate title

**Radio Options:**
- 3 options with sub-descriptions

**Option 1:**
- Label: "Labels Only" / "صرف لیبلز"
- Description: "Read only field labels and headers" / "صرف فیلڈ لیبلز اور ہیڈرز پڑھیں"
  - Font size: 14px
  - Color: gray-600

**Option 2:**
- Label: "Screen Summary" / "اسکرین کا خلاصہ" [DEFAULT]
- Description: "Read key information (recommended)" / "اہم معلومات پڑھیں (تجویز کردہ)"

**Option 3:**
- Label: "Read All" / "سب پڑھیں"
- Description: "Read all content including details" / "تفصیلات سمیت تمام مواد پڑھیں"

### Stop Button

**Specs:**
- Width: 100% (full width)
- Height: 56px
- Background: `#EF4444` (red-500)
- Hover: `#DC2626` (red-600)
- Text: "Stop Reading" / "پڑھنا بند کریں"
- Font size: 18px
- Font weight: 600
- Color: White
- Border radius: 12px
- Margin top: 32px

---

## Prototype Interactions

### Interaction 1: Play from Idle
**Trigger:** Tap "Start Reading Demo" button on Demo Screen  
**Actions:**
1. ReadAloud button changes to Playing state (200ms transition)
2. First text segment highlights (yellow bg fades in, 300ms)
3. Simulated speech begins (show progress through highlights)
4. Secondary controls slide in from right (200ms)

### Interaction 2: Pause
**Trigger:** Tap main button while Playing  
**Actions:**
1. Icon changes to Play (200ms)
2. Pulse animation stops
3. Current highlight remains (no fade out)
4. Secondary controls remain visible

### Interaction 3: Resume
**Trigger:** Tap main button while Paused  
**Actions:**
1. Returns to Playing state (200ms)
2. Pulse animation resumes
3. Highlighting continues from same position
4. Simulated speech resumes

### Interaction 4: Stop
**Trigger:** Tap Stop button in secondary controls  
**Actions:**
1. All audio stops (immediate)
2. Highlighting fades out (300ms)
3. Secondary controls slide out to right (200ms)
4. Main button returns to Idle state (200ms)

### Interaction 5: Open Options
**Trigger:** Tap Options button (gear icon)  
**Actions:**
1. Bottom sheet slides up (400ms, ease-out)
2. Backdrop overlay fades in (200ms, 40% opacity black)
3. Reading continues in background (if playing)
4. Focus moves to sheet content

### Interaction 6: Change Rate
**Trigger:** Select a different speech rate in options  
**Actions:**
1. Radio button selection animates (200ms)
2. Reading restarts from current position with new rate
3. Visual: brief pause (500ms) then resume with new timing
4. Console: Log "readaloud_rate_change" event

### Interaction 7: Change Language
**Trigger:** Change app language in Settings  
**Actions:**
1. If currently reading: stop immediately
2. Language badge updates (EN ↔ UR)
3. All UI text switches language
4. Next reading session uses new language voice

### Interaction 8: Navigate Between Screens
**Trigger:** Navigate from Screen A to Screen B  
**Actions:**
1. If reading on Screen A: stop reading (immediate)
2. Highlighting disappears (300ms fade)
3. ReadAloud button persists on Screen B
4. Position may change (top-right vs bottom-right) with 200ms transition
5. Returns to Idle state

---

## Annotated Screen Examples

### Screen A: Home Screen
**Reading Order Annotation:**
```
1. [H1] "Book a Ride" (title)
2. [Alert] "Welcome back, Ahmed!" (greeting)
3. [Quick Actions] "Home", "Hospital", "Mosque", "Market" (buttons - read as list)
4. [CTA] "Where would you like to go?" (input prompt)
5. [Bottom Nav] Skip navigation labels in summary mode
```

**Timing (1.0x rate):**
- Total duration: ~15 seconds
- Average per segment: 2.5 seconds

**ReadAloud Placement:** Top-right, 16px from edges

---

### Screen B: Booking Form (Pickup + Dropoff)
**Reading Order Annotation:**
```
1. [H1] "Book a Ride"
2. [Form Label] "Pickup Location"
3. [Form Value] "Johar Town, Lahore" (if filled)
4. [Form Label] "Dropoff Location"
5. [Form Value] "Liberty Market, Gulberg" (if filled)
6. [CTA] "Continue to Vehicle Selection"
7. [Helper] Map instructions (only in "Read All" mode)
```

**Urdu Variant:**
```
1. "سفر بک کریں"
2. "پک اپ مقام"
3. "جوہر ٹاؤن، لاہور"
4. "ڈراپ آف مقام"
5. "لبرٹی مارکیٹ، گلبرگ"
6. "گاڑی کے انتخاب کی طرف جاری رکھیں"
```

**ReadAloud Placement:** Bottom-right (map visible), 96px from bottom

---

### Screen C: Confirmation (Driver Details)
**Reading Order Annotation:**
```
1. [H1] "Confirm Your Ride"
2. [Alert] "Ahmed Khan is on the way" (status)
3. [Info] "Estimated arrival: 5 minutes" (ETA - important!)
4. [Info] "Honda CD 70 - ABC 123" (vehicle)
5. [Info] "Rating: 4.8 stars" (rating)
6. [Price] "Total Fare: PKR 250" (critical!)
7. [CTA] "Confirm Booking"
8. [CTA Secondary] "Cancel"
```

**Highlight Sync Timings:**
- 0-1.5s: Title
- 1.5-4s: Alert
- 4-6s: ETA (auto-scroll to this element)
- 6-7.5s: Vehicle
- 7.5-9s: Rating
- 9-11s: Fare (highlight with emphasis - maybe bold)
- 11-13s: Confirm button
- 13-14.5s: Cancel button

---

### Screen D: Tracking (Map with Driver)
**Reading Order Annotation:**
```
1. [H1] "Driver is on the way"
2. [ETA] "Arriving in 3 minutes" (important, updates)
3. [Driver] "Ahmed Khan" (name)
4. [Vehicle] "Honda CD 70 - ABC 123"
5. [Actions] "Call Driver" (button - read label only)
6. [Actions] "Chat" (button)
7. [Map] Skip map visual, read summary: "Driver is 1.2 km away"
```

**Special Notes:**
- ReadAloud position: Bottom-right (critical - map occupies most of screen)
- Avoid reading map controls
- ETA updates: Don't auto-restart reading on every update

**ReadAloud Placement:** Bottom-right, 96px from bottom, 16px from right  
**Avoids:** Map zoom controls (bottom-right corner), floating chat/call buttons

---

### Screen E: Payment Summary
**Reading Order Annotation:**
```
1. [H1] "Payment Summary"
2. [Label] "Base Fare"
3. [Value] "PKR 200"
4. [Label] "Service Fee"
5. [Value] "PKR 30"
6. [Label] "Discount"
7. [Value] "- PKR 20"
8. [Divider] Skip visual divider
9. [Label] "Total"
10. [Value] "PKR 250" (emphasized)
11. [Payment Method] "Cash" or "JazzCash"
12. [CTA] "Confirm Payment"
```

**Summary Mode (Depth=Summary):**
- Skip individual line items
- Read: "Total: PKR 250, Payment Method: Cash, Confirm Payment"

---

### Screen F: Help/FAQ
**Reading Order Annotation:**
```
1. [H1] "Help & Support"
2. [Search] "How can we help you?" (input label)
3. [FAQ 1] "How do I book a ride?" (question - expand for answer in "Read All")
4. [FAQ 2] "How do I pay?" (question)
5. [FAQ 3] "How do I cancel?" (question)
6. [CTA] "Contact Support"
7. [Details] Phone number, email (only in "Read All")
```

**Read Depth Comparison:**
- **Labels Only:** Title + CTA only (2 items)
- **Summary:** Title + top 3 FAQ questions + CTA (5 items)
- **Read All:** Everything including answers and contact details (15+ items)

---

## Color Tokens

### Primary Colors
```css
--tts-green-primary: #0CAA41;
--tts-green-hover: #0a8f37;
--tts-green-light: rgba(12, 170, 65, 0.1);

--tts-red-error: #EF4444;
--tts-red-hover: #DC2626;

--tts-yellow-highlight-light: rgba(254, 240, 138, 0.6);
--tts-yellow-highlight-dark: rgba(113, 63, 18, 0.4);
```

### Neutral Colors (Light Mode)
```css
--tts-bg-light: #FFFFFF;
--tts-bg-hover-light: #F9FAFB;
--tts-icon-light: #374151;
--tts-text-light: #111827;
--tts-text-muted-light: #6B7280;
```

### Neutral Colors (Dark Mode)
```css
--tts-bg-dark: #2A2A2A;
--tts-bg-hover-dark: #333333;
--tts-icon-dark: #D1D5DB;
--tts-text-dark: #F9FAFB;
--tts-text-muted-dark: #9CA3AF;
```

---

## Typography

**Headings:**
- H1: 20px, weight 600, line-height 28px
- H2: 18px, weight 600, line-height 26px

**Body:**
- Primary: 16px, weight 400, line-height 24px
- Secondary: 14px, weight 400, line-height 20px
- Small: 12px, weight 400, line-height 16px

**Buttons:**
- Primary CTA: 18px, weight 600
- Secondary CTA: 16px, weight 600

**Language Badge:**
- 10px, weight 600, uppercase

**Tooltips:**
- 12px, weight 400

---

## Accessibility Annotations

### For Designers
1. **All touch targets ≥ 44×44 px** (WCAG 2.5.5)
2. **Color contrast ≥ 4.5:1** for all text (WCAG 1.4.3)
3. **Focus indicators visible** (4px ring, WCAG 2.4.7)
4. **No color-only information** (icon + color, WCAG 1.4.1)
5. **Animation can be reduced** (respect prefers-reduced-motion, WCAG 2.3.3)

### For Developers
1. **ARIA labels on all buttons**
2. **ARIA live region for announcements** (aria-live="polite")
3. **Keyboard navigation support** (Tab, Enter, Escape)
4. **Screen reader announcements** on state changes
5. **Semantic HTML** (buttons, headings, roles)

---

## Sample Microcopy (Copy-Paste Ready)

### English
```json
{
  "idle_tooltip": "Read aloud — EN. Tap to start.",
  "playing_tooltip": "Reading… Tap to pause.",
  "paused_tooltip": "Paused. Tap to resume.",
  "error_tooltip": "Audio unavailable. Tap to retry.",
  
  "aria_label_idle": "Read aloud",
  "aria_label_playing": "Pause reading",
  "aria_label_paused": "Resume reading",
  "aria_label_error": "Retry read aloud",
  "aria_label_options": "Reading options",
  "aria_label_stop": "Stop reading",
  
  "aria_announce_playing": "Now reading: {screenName} in English",
  "aria_announce_paused": "Reading paused",
  "aria_announce_stopped": "Reading stopped",
  "aria_announce_error": "Audio unavailable",
  
  "options_title": "Reading Options",
  "options_subtitle": "Customize how content is read aloud",
  "options_rate_title": "Speech Rate",
  "options_rate_slow": "Slow (0.8×)",
  "options_rate_normal": "Normal (1.0×)",
  "options_rate_fast": "Fast (1.2×)",
  "options_depth_title": "Read Depth",
  "options_depth_labels": "Labels Only",
  "options_depth_labels_desc": "Read only field labels and headers",
  "options_depth_summary": "Screen Summary",
  "options_depth_summary_desc": "Read key information (recommended)",
  "options_depth_all": "Read All",
  "options_depth_all_desc": "Read all content including details",
  "options_stop_button": "Stop Reading"
}
```

### Urdu
```json
{
  "idle_tooltip": "بلند آواز میں پڑھیں — UR۔ شروع کرنے کے لیے تھپتھپائیں۔",
  "playing_tooltip": "پڑھ رہا ہے… روکنے کے لیے تھپتھپائیں۔",
  "paused_tooltip": "رکا ہوا۔ جاری رکھنے کے لیے تھپتھپائیں۔",
  "error_tooltip": "آڈیو دستیاب نہیں۔ دوبارہ کوشش کریں۔",
  
  "aria_announce_playing": "اردو میں پڑھ رہا ہے: {screenName}",
  
  "options_title": "پڑھنے کے اختیارات",
  "options_subtitle": "مواد کو بلند آواز میں پڑھنے کی ترتیبات",
  "options_rate_title": "تقریر کی رفتار",
  "options_rate_slow": "سست (0.8×)",
  "options_rate_normal": "عام (1.0×)",
  "options_rate_fast": "تیز (1.2×)",
  "options_depth_title": "پڑھنے کی گہرائی",
  "options_depth_labels": "صرف لیبلز",
  "options_depth_labels_desc": "صرف فیلڈ لیبلز اور ہیڈرز پڑھیں",
  "options_depth_summary": "اسکرین کا خلاصہ",
  "options_depth_summary_desc": "اہم معلومات پڑھیں (تجویز کردہ)",
  "options_depth_all": "سب پڑھیں",
  "options_depth_all_desc": "تفصیلات سمیت تمام مواد پڑھیں",
  "options_stop_button": "پڑھنا بند کریں"
}
```

---

**Document Version:** 1.0.0  
**Last Updated:** November 23, 2025  
**For:** Bykea Senior-Friendly App - Read-Aloud/TTS System  
**Status:** Ready for Figma prototype creation
