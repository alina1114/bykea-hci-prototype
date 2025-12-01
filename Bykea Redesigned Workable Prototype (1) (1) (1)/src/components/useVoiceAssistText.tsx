/**
 * useVoiceAssistText - Screen-specific Voice Assist text and announcements
 * 
 * Provides bilingual screen summaries, button labels, and announcements
 * for each screen in the application
 */

export interface VoiceAssistTextContent {
  screenName: string;
  screenSummary: string;
  elements: Record<string, string>;
}

export function useVoiceAssistText(language: 'en' | 'ur') {
  const content: Record<string, VoiceAssistTextContent> = {
    splash: {
      screenName: language === 'en' ? 'Splash Screen' : 'خوش آمدید اسکرین',
      screenSummary: language === 'en' 
        ? 'Welcome to Bykea. Loading...'
        : 'بائیکیا میں خوش آمدید۔ لوڈ ہو رہا ہے...',
      elements: {}
    },

    login: {
      screenName: language === 'en' ? 'Login Screen' : 'لاگ ان اسکرین',
      screenSummary: language === 'en'
        ? 'Login Screen. Enter your phone number to continue.'
        : 'لاگ ان اسکرین۔ جاری رکھنے کے لیے اپنا فون نمبر درج کریں۔',
      elements: {
        phoneInput: language === 'en' ? 'Phone number input field' : 'فون نمبر ان پٹ فیلڈ',
        continueButton: language === 'en' ? 'Continue button' : 'جاری رکھیں بٹن',
        sendingCode: language === 'en' ? 'Sending verification code.' : 'تصدیقی کوڈ بھیجا جا رہا ہے۔'
      }
    },

    otp: {
      screenName: language === 'en' ? 'OTP Verification' : 'او ٹی پی تصدیق',
      screenSummary: language === 'en'
        ? 'Enter the 4-digit OTP code sent to your phone.'
        : 'اپنے فون پر بھیجے گئے 4 ہندسوں کا او ٹی پی کوڈ درج کریں۔',
      elements: {
        otpInput: language === 'en' ? 'OTP code input' : 'او ٹی پی کوڈ ان پٹ',
        verifyButton: language === 'en' ? 'Verify button' : 'تصدیق کریں بٹن',
        resendButton: language === 'en' ? 'Resend OTP button' : 'او ٹی پی دوبارہ بھیجیں بٹن',
        verified: language === 'en' ? 'Login successful. Redirecting to Home Screen.' : 'لاگ ان کامیاب۔ ہوم اسکرین پر جا رہے ہیں۔'
      }
    },

    home: {
      screenName: language === 'en' ? 'Home Screen' : 'ہوم اسکرین',
      screenSummary: language === 'en'
        ? 'Home Screen. Choose a destination, use the map, or open Quick Destinations.'
        : 'ہوم اسکرین۔ منزل منتخب کریں، نقشہ استعمال کریں، یا فوری منزلیں کھولیں۔',
      elements: {
        searchBar: language === 'en' ? 'Where would you like to go?' : 'آپ کہاں جانا چاہیں گے؟',
        quickDestinations: language === 'en' ? 'Quick Destinations' : 'فوری منزلیں',
        home: language === 'en' ? 'Selected: Home' : 'منتخب: گھر',
        mosque: language === 'en' ? 'Selected: Mosque' : 'منتخب: مسجد',
        hospital: language === 'en' ? 'Selected: Hospital' : 'منتخب: ہسپتال',
        market: language === 'en' ? 'Selected: Market' : 'منتخب: مارکیٹ',
        manageDestinations: language === 'en' ? 'Manage Destinations button' : 'منزلوں کا انتظام بٹن'
      }
    },

    manageQuickDestinations: {
      screenName: language === 'en' ? 'Manage Quick Destinations' : 'فوری منزلوں کا انتظام',
      screenSummary: language === 'en'
        ? 'Manage Quick Destinations. Add, remove, or reorder locations.'
        : 'فوری منزلوں کا انتظام۔ مقامات شامل کریں، ہٹائیں، یا دوبارہ ترتیب دیں۔',
      elements: {
        removed: language === 'en' ? 'Destination removed.' : 'منزل ہٹا دی گئی۔',
        added: language === 'en' ? 'Destination added.' : 'منزل شامل کی گئی۔',
        editLabel: language === 'en' ? 'Edit label.' : 'لیبل میں ترمیم کریں۔'
      }
    },

    pickup: {
      screenName: language === 'en' ? 'Pickup Screen' : 'پک اپ اسکرین',
      screenSummary: language === 'en'
        ? 'You are on Pickup Screen. Move the map to set your pickup location.'
        : 'آپ پک اپ اسکرین پر ہیں۔ اپنے پک اپ مقام کو سیٹ کرنے کے لیے نقشہ منتقل کریں۔',
      elements: {
        searchPickup: language === 'en' ? 'Search Pickup Location' : 'پک اپ مقام تلاش کریں',
        confirmPickup: language === 'en' ? 'Confirm Pickup Location' : 'پک اپ مقام کی تصدیق کریں',
        goBack: language === 'en' ? 'Go Back' : 'واپس جائیں',
        mapZoomIn: language === 'en' ? 'Map zoom in' : 'نقشہ زوم ان',
        mapZoomOut: language === 'en' ? 'Map zoom out' : 'نقشہ زوم آؤٹ'
      }
    },

    dropoff: {
      screenName: language === 'en' ? 'Destination Screen' : 'منزل کی اسکرین',
      screenSummary: language === 'en'
        ? 'Destination Screen. Select where you want to go.'
        : 'منزل کی اسکرین۔ منتخب کریں کہ آپ کہاں جانا چاہتے ہیں۔',
      elements: {
        searchDestination: language === 'en' ? 'Search Destination' : 'منزل تلاش کریں',
        selected: language === 'en' ? 'Selected' : 'منتخب',
        continue: language === 'en' ? 'Continue' : 'جاری رکھیں'
      }
    },

    vehicleSelection: {
      screenName: language === 'en' ? 'Select Vehicle Type' : 'گاڑی کی قسم منتخب کریں',
      screenSummary: language === 'en'
        ? 'Select Vehicle Type. Options include Bike, Rickshaw, and Car.'
        : 'گاڑی کی قسم منتخب کریں۔ اختیارات میں بائیک، رکشہ، اور کار شامل ہیں۔',
      elements: {
        bike: language === 'en' 
          ? 'Bike. Quick and affordable. Starting from one hundred fifty rupees.'
          : 'بائیک۔ تیز اور سستی۔ ڈیڑھ سو روپے سے شروع۔',
        rickshaw: language === 'en'
          ? 'Rickshaw. Comfortable short trips.'
          : 'رکشہ۔ آرام دہ مختصر سفر۔',
        car: language === 'en'
          ? 'Car. Premium travel experience.'
          : 'کار۔ پریمیم سفر کا تجربہ۔'
      }
    },

    rideOptions: {
      screenName: language === 'en' ? 'Available Rides' : 'دستیاب سواریاں',
      screenSummary: language === 'en'
        ? 'Available Rides. Choose a driver.'
        : 'دستیاب سواریاں۔ ڈرائیور منتخب کریں۔',
      elements: {
        driverCard: language === 'en' 
          ? 'Driver: {name}. Rating {rating} stars. Arrives in {time} minutes. Fare: {fare} rupees.'
          : 'ڈرائیور: {name}۔ ریٹنگ {rating} ستارے۔ {time} منٹ میں پہنچیں گے۔ کرایہ: {fare} روپے۔'
      }
    },

    confirmRide: {
      screenName: language === 'en' ? 'Confirm Ride Screen' : 'سواری کی تصدیق اسکرین',
      screenSummary: language === 'en'
        ? 'Confirm Ride Screen. Review your trip details.'
        : 'سواری کی تصدیق اسکرین۔ اپنے سفر کی تفصیلات کا جائزہ لیں۔',
      elements: {
        pickup: language === 'en' ? 'Pickup' : 'پک اپ',
        destination: language === 'en' ? 'Destination' : 'منزل',
        driver: language === 'en' ? 'Driver' : 'ڈرائیور',
        confirmButton: language === 'en' ? 'Press Confirm Ride to continue.' : 'جاری رکھنے کے لیے سواری کی تصدیق دبائیں۔'
      }
    },

    driverOnWay: {
      screenName: language === 'en' ? 'Driver Arriving' : 'ڈرائیور آ رہا ہے',
      screenSummary: language === 'en'
        ? 'Driver arriving. Track your ride in real-time.'
        : 'ڈرائیور آ رہا ہے۔ اپنی سواری کو حقیقی وقت میں ٹریک کریں۔',
      elements: {
        arriving: language === 'en' ? 'Estimated arrival: {time} minutes.' : 'تخمینی آمد: {time} منٹ۔',
        callDriver: language === 'en' ? 'Call Driver' : 'ڈرائیور کو کال کریں',
        sendMessage: language === 'en' ? 'Send Message' : 'پیغام بھیجیں',
        tripInProgress: language === 'en' ? 'Trip status: In progress.' : 'سفر کی حالت: جاری ہے۔'
      }
    },

    chat: {
      screenName: language === 'en' ? 'Chat Screen' : 'چیٹ اسکرین',
      screenSummary: language === 'en'
        ? 'Chat with driver. Send and receive messages.'
        : 'ڈرائیور کے ساتھ چیٹ کریں۔ پیغامات بھیجیں اور وصول کریں۔',
      elements: {
        incoming: language === 'en' ? 'Message from driver' : 'ڈرائیور کا پیغام',
        outgoing: language === 'en' ? 'You said' : 'آپ نے کہا',
        sendButton: language === 'en' ? 'Send message' : 'پیغام بھیجیں'
      }
    },

    rating: {
      screenName: language === 'en' ? 'Rate Your Ride' : 'اپنی سواری کی درجہ بندی کریں',
      screenSummary: language === 'en'
        ? 'Rate Your Ride. Share your experience.'
        : 'اپنی سواری کی درجہ بندی کریں۔ اپنا تجربہ شیئر کریں۔',
      elements: {
        question: language === 'en' ? 'How was your experience?' : 'آپ کا تجربہ کیسا رہا؟',
        starSelected: language === 'en' ? 'You selected {stars} stars.' : 'آپ نے {stars} ستارے منتخب کیے۔',
        submitButton: language === 'en' ? 'Submit Rating' : 'درجہ بندی جمع کروائیں'
      }
    },

    payment: {
      screenName: language === 'en' ? 'Payment Screen' : 'ادائیگی اسکرین',
      screenSummary: language === 'en'
        ? 'Payment Screen. Complete your payment.'
        : 'ادائیگی اسکرین۔ اپنی ادائیگی مکمل کریں۔',
      elements: {
        totalFare: language === 'en' ? 'Total Fare: {amount} rupees.' : 'کل کرایہ: {amount} روپے۔',
        selectMethod: language === 'en' ? 'Select Payment Method: Cash or Digital Payment.' : 'ادائیگی کا طریقہ منتخب کریں: نقد یا ڈیجیٹل ادائیگی۔',
        completePayment: language === 'en' ? 'Complete Payment' : 'ادائیگی مکمل کریں',
        success: language === 'en' ? 'Payment Successful. Thank you for riding with Bykea.' : 'ادائیگی کامیاب۔ بائیکیا کے ساتھ سفر کرنے کا شکریہ۔'
      }
    },

    wallet: {
      screenName: language === 'en' ? 'Wallet Screen' : 'والیٹ اسکرین',
      screenSummary: language === 'en'
        ? 'Wallet Screen. Current balance available for rides.'
        : 'والیٹ اسکرین۔ سواریوں کے لیے موجودہ بیلنس دستیاب ہے۔',
      elements: {
        addMoney: language === 'en' ? 'Add Money. Redirecting to secure gateway.' : 'رقم شامل کریں۔ محفوظ گیٹ وے پر جا رہے ہیں۔',
        transactions: language === 'en' ? 'Recent Transactions' : 'حالیہ لین دین'
      }
    },

    profile: {
      screenName: language === 'en' ? 'Profile Screen' : 'پروفائل اسکرین',
      screenSummary: language === 'en'
        ? 'Profile Screen. View and edit your information.'
        : 'پروفائل اسکرین۔ اپنی معلومات دیکھیں اور ترمیم کریں۔',
      elements: {
        editProfile: language === 'en' ? 'Edit Profile' : 'پروفائل میں ترمیم',
        savedAddresses: language === 'en' ? 'Saved Addresses' : 'محفوظ پتے',
        addAddress: language === 'en' ? 'Add address' : 'پتہ شامل کریں',
        removeAddress: language === 'en' ? 'Remove address' : 'پتہ ہٹائیں'
      }
    },

    trips: {
      screenName: language === 'en' ? 'Trips Screen' : 'سفروں کی اسکرین',
      screenSummary: language === 'en'
        ? 'Trips Screen. View your ride history.'
        : 'سفروں کی اسکرین۔ اپنی سواریوں کی تاریخ دیکھیں۔',
      elements: {
        upcoming: language === 'en' ? 'Upcoming trips' : 'آنے والے سفر',
        past: language === 'en' ? 'Past trips' : 'گزشتہ سفر',
        viewDetails: language === 'en' ? 'View Details' : 'تفصیلات دیکھیں'
      }
    },

    settings: {
      screenName: language === 'en' ? 'Settings' : 'ترتیبات',
      screenSummary: language === 'en'
        ? 'Settings. Customize your app experience.'
        : 'ترتیبات۔ اپنی ایپ کا تجربہ اپنی مرضی کے مطابق بنائیں۔',
      elements: {
        darkMode: language === 'en' ? 'Dark Mode' : 'ڈارک موڈ',
        textSize: language === 'en' ? 'Text Size. Small, Medium, or Large.' : 'متن کا سائز۔ چھوٹا، درمیانہ، یا بڑا۔',
        boldText: language === 'en' ? 'Bold Text' : 'موٹا متن',
        brightness: language === 'en' ? 'Screen Brightness' : 'اسکرین کی چمک',
        voiceGuidance: language === 'en' ? 'Voice Guidance' : 'صوتی رہنمائی',
        language: language === 'en' ? 'Language. English or Urdu.' : 'زبان۔ انگریزی یا اردو۔'
      }
    },

    navigation: {
      screenName: '',
      screenSummary: '',
      elements: {
        navigatingTo: language === 'en' ? 'Navigating to {screen}' : '{screen} پر جا رہے ہیں',
        goingBack: language === 'en' ? 'Going back' : 'واپس جا رہے ہیں',
        opening: language === 'en' ? 'Opening {screen}' : '{screen} کھول رہے ہیں'
      }
    },

    errors: {
      screenName: '',
      screenSummary: '',
      elements: {
        invalidPhone: language === 'en' ? 'Invalid phone number.' : 'غلط فون نمبر۔',
        tryAgain: language === 'en' ? 'Please try again.' : 'براہ کرم دوبارہ کوشش کریں۔',
        locationNotFound: language === 'en' ? 'Location not found.' : 'مقام نہیں ملا۔',
        connectionError: language === 'en' ? 'Connection error. Please check your internet.' : 'کنکشن کی خرابی۔ براہ کرم اپنا انٹرنیٹ چیک کریں۔'
      }
    }
  };

  return content;
}

/**
 * Helper function to get screen content
 */
export function getScreenContent(screenKey: string, language: 'en' | 'ur'): VoiceAssistTextContent {
  const content = useVoiceAssistText(language);
  return content[screenKey] || content.home;
}

/**
 * Helper function to format dynamic text
 */
export function formatVoiceText(template: string, values: Record<string, string>): string {
  let result = template;
  Object.keys(values).forEach(key => {
    result = result.replace(`{${key}}`, values[key]);
  });
  return result;
}
