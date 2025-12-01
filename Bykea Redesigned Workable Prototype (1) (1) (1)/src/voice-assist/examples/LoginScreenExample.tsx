/**
 * LOGIN SCREEN - Voice Assist Implementation Example
 * 
 * This example demonstrates:
 * - Input focus announcements
 * - Error announcements
 * - Form validation with voice feedback
 * - Action completion announcements
 */

import { ArrowLeft, Phone } from "lucide-react";
import { useState } from "react";
import { useVoiceAssistScreen } from '../useVoiceAssistScreen';

interface LoginScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  language: 'en' | 'ur';
}

export function LoginScreenExample({ 
  onNavigate, 
  language 
}: LoginScreenProps) {
  
  // ============================================
  // STATE
  // ============================================
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // ============================================
  // VOICE ASSIST INITIALIZATION
  // ============================================
  const voiceAssist = useVoiceAssistScreen({
    screenKey: 'login',
    language,
    autoAnnounce: true,
    autoAnnounceDelay: 500
  });
  
  // Auto-announces on mount:
  // "Login Screen. Enter your phone number to continue. 
  //  The number should be eleven digits."

  // ============================================
  // VALIDATION
  // ============================================
  const validatePhone = (phoneNumber: string): boolean => {
    // Remove spaces and non-digits
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // Should be exactly 11 digits for Pakistan
    return cleaned.length === 11;
  };

  // ============================================
  // INPUT CHANGE HANDLER
  // ============================================
  const handlePhoneChange = (value: string) => {
    setPhone(value);
    
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  // ============================================
  // INPUT FOCUS HANDLER
  // ============================================
  const handlePhoneFocus = () => {
    // Announce field focus with placeholder/hint
    voiceAssist.announceInputFocus(
      voiceAssist.content.elements.phoneInput,
      language === 'en' 
        ? 'Enter eleven digits' 
        : 'گیارہ ہندسے درج کریں'
    );
    // English: "Phone number input field. Enter eleven digits. Double tap to edit."
    // Urdu: "فون نمبر ان پٹ فیلڈ۔ گیارہ ہندسے درج کریں۔ ترمیم کرنے کے لیے دو بار ٹیپ کریں۔"
  };

  // ============================================
  // FORM SUBMIT HANDLER
  // ============================================
  const handleContinue = async () => {
    // Announce button press
    voiceAssist.announceButton('continueButton');
    // English: "You pressed: Continue"
    // Urdu: "آپ نے جاری رکھیں دبایا"

    // Validation: Check if phone is empty
    if (!phone.trim()) {
      setError('emptyPhone');
      voiceAssist.announceError('emptyPhone');
      // English: "Error: Phone number is required."
      // Urdu: "خرابی: فون نمبر ضروری ہے۔"
      return;
    }

    // Validation: Check if phone is valid
    if (!validatePhone(phone)) {
      setError('invalidPhone');
      voiceAssist.announceError('invalidPhone');
      // English: "Error: Invalid phone number. Please enter eleven digits."
      // Urdu: "خرابی: غلط فون نمبر۔ براہ کرم گیارہ ہندسے درج کریں۔"
      return;
    }

    // Show loading state
    setIsLoading(true);
    voiceAssist.announceAction(
      language === 'en' 
        ? 'Sending verification code' 
        : 'تصدیقی کوڈ بھیجا جا رہا ہے'
    );
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Success announcement
      voiceAssist.announceAction(
        language === 'en' 
          ? 'Verification code sent successfully' 
          : 'تصدیقی کوڈ کامیابی سے بھیج دیا گیا'
      );
      
      // Navigate to OTP screen
      voiceAssist.announceNavigation(
        language === 'en' ? 'O T P Verification' : 'او ٹی پی تصدیق'
      );
      
      onNavigate('otp', { phone });
    }, 2000);
  };

  // ============================================
  // BACK BUTTON
  // ============================================
  const handleBack = () => {
    voiceAssist.announceButton('backButton');
    // Navigate back or close app
  };

  // ============================================
  // KEYBOARD SUBMIT (Enter key)
  // ============================================
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleContinue();
    }
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="flex flex-col h-screen bg-[#F5F8F3]">
      
      {/* HEADER */}
      <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-[#E0E0E0]">
        <button 
          onClick={handleBack}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-[#F5F8F3]"
          aria-label={voiceAssist.content.elements.backButton}
          disabled={isLoading}
        >
          <ArrowLeft className="w-6 h-6 text-[#1A1A1A]" strokeWidth={2.5} />
        </button>
        
        <h1 className="text-[#1A1A1A] font-bold flex-1 text-center">
          {voiceAssist.content.screenName}
        </h1>
        
        <div className="w-11" />
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col justify-center px-8">
        
        {/* Logo/Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-[#0CAA41]/10 rounded-full flex items-center justify-center">
            <Phone className="w-12 h-12 text-[#0CAA41]" strokeWidth={2.5} />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-[#1A1A1A] font-bold text-center mb-2" style={{ fontSize: '24px' }}>
          {language === 'en' ? 'Welcome to Bykea' : 'بائیکیا میں خوش آمدید'}
        </h2>

        {/* Subtitle */}
        <p className="text-[#6B6B6B] text-center mb-8" style={{ fontSize: '16px' }}>
          {voiceAssist.content.screenSummary}
        </p>

        {/* Phone Input */}
        <div className="mb-6">
          <label 
            htmlFor="phone-input"
            className="block text-[#1A1A1A] font-bold mb-3"
          >
            {voiceAssist.content.elements.phoneInput}
          </label>
          
          <div className="relative">
            <input
              id="phone-input"
              type="tel"
              value={phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              onFocus={handlePhoneFocus}
              onKeyPress={handleKeyPress}
              placeholder={language === 'en' ? '03001234567' : '۰۳۰۰۱۲۳۴۵۶۷'}
              disabled={isLoading}
              className={`
                w-full px-5 py-4 pr-14 rounded-2xl border-2 
                ${error 
                  ? 'border-red-500 bg-red-50' 
                  : 'border-[#E0E0E0] bg-white'
                }
                focus:border-[#0CAA41] focus:outline-none
                transition-colors font-bold
                disabled:bg-[#F5F5F5] disabled:text-[#B0B0B0]
              `}
              style={{ fontSize: '18px' }}
              maxLength={11}
              inputMode="numeric"
              aria-label={voiceAssist.content.elements.phoneInput}
              aria-describedby={error ? "phone-error" : undefined}
              aria-invalid={!!error}
              aria-required="true"
            />
            
            {/* Phone Icon */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <Phone className="w-6 h-6 text-[#B0B0B0]" strokeWidth={2.5} />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div 
              id="phone-error"
              className="mt-3 flex items-start gap-2"
              role="alert"
              aria-live="assertive"
            >
              <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">!</span>
              </div>
              <p className="text-red-600 font-bold" style={{ fontSize: '14px' }}>
                {voiceAssist.content.errors?.[error] || error}
              </p>
            </div>
          )}

          {/* Character Counter */}
          <p className="mt-2 text-[#B0B0B0] text-right" style={{ fontSize: '14px' }}>
            {phone.length}/11
          </p>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={isLoading}
          className={`
            w-full py-5 rounded-2xl font-bold shadow-lg
            transition-all
            ${isLoading
              ? 'bg-[#B0B0B0] cursor-not-allowed'
              : 'bg-[#0CAA41] hover:bg-[#0a8f37] active:scale-98'}
          `}
          style={{ fontSize: '18px' }}
          aria-label={voiceAssist.content.elements.continueButton}
          aria-busy={isLoading}
        >
          <span className="text-white">
            {isLoading
              ? (language === 'en' ? 'Sending...' : 'بھیجا جا رہا ہے...')
              : (language === 'en' ? 'Continue' : 'جاری رکھیں')}
          </span>
        </button>

        {/* Help Text */}
        <p className="mt-6 text-center text-[#6B6B6B]" style={{ fontSize: '14px' }}>
          {language === 'en'
            ? 'We will send you a verification code'
            : 'ہم آپ کو ایک تصدیقی کوڈ بھیجیں گے'}
        </p>

      </div>
    </div>
  );
}

/*
 * VOICE ASSIST FLOW FOR LOGIN SCREEN:
 * 
 * 1. Screen Mount:
 *    → Auto-announces: "Login Screen. Enter your phone number to continue. 
 *       The number should be eleven digits." (HIGH priority)
 * 
 * 2. User taps phone input field:
 *    → Announces: "Phone number input field. Enter eleven digits. 
 *       Double tap to edit." (HIGH priority)
 * 
 * 3. User starts typing:
 *    → (Silent - user is entering data)
 *    → Error clears if previously shown
 * 
 * 4. User presses Continue with empty field:
 *    → Announces: "You pressed: Continue" (HIGH priority)
 *    → Then announces: "Error: Phone number is required." (HIGH priority)
 *    → Visual error displayed with ARIA live region
 * 
 * 5. User enters invalid phone (e.g., "0300"):
 *    → Announces: "You pressed: Continue" (HIGH priority)
 *    → Then announces: "Error: Invalid phone number. Please enter eleven digits." (HIGH priority)
 * 
 * 6. User enters valid phone "03001234567":
 *    → Announces: "You pressed: Continue" (HIGH priority)
 *    → Then announces: "Sending verification code" (NORMAL priority)
 *    → After 2 seconds, announces: "Verification code sent successfully" (NORMAL priority)
 *    → Then announces: "Navigating to O T P Verification" (NORMAL priority)
 *    → Navigates to OTP screen
 * 
 * KEY FEATURES:
 * - Input focus announcements with hints
 * - Error announcements with ARIA live regions
 * - Loading state announcements
 * - Success announcements
 * - Navigation announcements
 * - Keyboard accessibility (Enter to submit)
 * - Visual error states synchronized with voice
 * - Character counter for visual feedback
 * - Disabled state handling
 * - ARIA attributes for screen readers
 */
