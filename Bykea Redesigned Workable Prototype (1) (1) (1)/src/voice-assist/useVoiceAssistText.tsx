/**
 * useVoiceAssistText
 * 
 * Centralized bilingual text content for all Voice Assist announcements.
 * Contains screen names, summaries, element labels, and error messages
 * in both English and Urdu.
 * 
 * @example
 * ```tsx
 * const content = getVoiceAssistText('home', 'en');
 * console.log(content.screenName); // "Home Screen"
 * console.log(content.elements.searchBar); // "Search for destination"
 * ```
 */

import { ScreenKey } from './useVoiceAssistScreen';

interface VoiceAssistTextContent {
  screenName: string;
  screenSummary: string;
  elements: Record<string, string>;
  errors?: Record<string, string>;
  hints?: string[];
}

type VoiceTextMap = Record<ScreenKey, {
  en: VoiceAssistTextContent;
  ur: VoiceAssistTextContent;
}>;

/**
 * Complete bilingual voice assist text for all screens
 */
const voiceTextMap: VoiceTextMap = {
  splash: {
    en: {
      screenName: 'Welcome',
      screenSummary: 'Bykea ride booking app is loading.',
      elements: {},
    },
    ur: {
      screenName: 'خوش آمدید',
      screenSummary: 'بائیکیا رائیڈ بکنگ ایپ لوڈ ہو رہی ہے۔',
      elements: {},
    }
  },

  login: {
    en: {
      screenName: 'Login Screen',
      screenSummary: 'Enter your phone number to continue. The number should be eleven digits.',
      elements: {
        phoneInput: 'Phone number input field',
        continueButton: 'Continue',
        backButton: 'Go back',
      },
      errors: {
        invalidPhone: 'Invalid phone number. Please enter eleven digits.',
        emptyPhone: 'Phone number is required.',
      }
    },
    ur: {
      screenName: 'لاگ ان سکرین',
      screenSummary: 'جاری رکھنے کے لیے اپنا فون نمبر درج کریں۔ نمبر گیارہ ہندسوں کا ہونا چاہیے۔',
      elements: {
        phoneInput: 'فون نمبر ان پٹ فیلڈ',
        continueButton: 'جاری رکھیں',
        backButton: 'واپس جائیں',
      },
      errors: {
        invalidPhone: 'غلط فون نمبر۔ براہ کرم گیارہ ہندسے درج کریں۔',
        emptyPhone: 'فون نمبر ضروری ہے۔',
      }
    }
  },

  otp: {
    en: {
      screenName: 'O T P Verification',
      screenSummary: 'Enter the six digit code sent to your phone number.',
      elements: {
        otpInput: 'O T P code input',
        verifyButton: 'Verify code',
        resendButton: 'Resend code',
        backButton: 'Go back',
      },
      errors: {
        invalidOtp: 'Invalid verification code.',
        emptyOtp: 'Please enter the code.',
      },
      hints: [
        'The code is six digits long.',
        'Check your messages for the code.',
        'You can request a new code if needed.'
      ]
    },
    ur: {
      screenName: 'او ٹی پی تصدیق',
      screenSummary: 'اپنے فون نمبر پر بھیجا گیا چھ ہندسوں کا کوڈ درج کریں۔',
      elements: {
        otpInput: 'او ٹی پی کوڈ ان پٹ',
        verifyButton: 'کوڈ کی تصدیق کریں',
        resendButton: 'کوڈ دوبارہ بھیجیں',
        backButton: 'واپس جائیں',
      },
      errors: {
        invalidOtp: 'غلط تصدیقی کوڈ۔',
        emptyOtp: 'براہ کرم کوڈ درج کریں۔',
      },
      hints: [
        'کوڈ چھ ہندسوں پر مشتمل ہے۔',
        'کوڈ کے لیے اپنے پیغامات چیک کریں۔',
        'ضرورت پڑنے پر آپ نیا کوڈ طلب کر سکتے ہیں۔'
      ]
    }
  },

  profileSetup: {
    en: {
      screenName: 'Profile Setup',
      screenSummary: 'Complete your profile information. Enter your first name, last name, and email address.',
      elements: {
        firstNameInput: 'First name',
        lastNameInput: 'Last name',
        emailInput: 'Email address',
        completeButton: 'Complete profile',
        skipButton: 'Skip for now',
      },
      errors: {
        invalidEmail: 'Invalid email address.',
        emptyName: 'Name is required.',
      }
    },
    ur: {
      screenName: 'پروفائل سیٹ اپ',
      screenSummary: 'اپنی پروفائل کی معلومات مکمل کریں۔ اپنا پہلا نام، آخری نام، اور ای میل ایڈریس درج کریں۔',
      elements: {
        firstNameInput: 'پہلا نام',
        lastNameInput: 'آخری نام',
        emailInput: 'ای میل ایڈریس',
        completeButton: 'پروفائل مکمل کریں',
        skipButton: 'ابھی چھوڑ دیں',
      },
      errors: {
        invalidEmail: 'غلط ای میل ایڈریس۔',
        emptyName: 'نام ضروری ہے۔',
      }
    }
  },

  home: {
    en: {
      screenName: 'Home Screen',
      screenSummary: 'You are on the Home Screen. Select a destination or choose from Quick Destinations. Use the search bar to find a location.',
      elements: {
        searchBar: 'Search for destination',
        voiceButton: 'Voice Assistant',
        manageDestinations: 'Manage Quick Destinations',
        homeCard: 'Home',
        mosqueCard: 'Mosque',
        hospitalCard: 'Hospital',
        marketCard: 'Market',
        officeCard: 'Office',
        mapZoomIn: 'Zoom in on map',
        mapZoomOut: 'Zoom out on map',
        settingsButton: 'Settings',
      },
      hints: [
        'Select a quick destination to book a ride quickly.',
        'Use voice assistant for hands-free navigation.',
        'Manage your favorite destinations anytime.'
      ]
    },
    ur: {
      screenName: 'ہوم سکرین',
      screenSummary: 'آپ ہوم سکرین پر ہیں۔ منزل منتخب کریں یا فوری منزلوں میں سے انتخاب کریں۔ مقام تلاش کرنے کے لیے سرچ بار استعمال کریں۔',
      elements: {
        searchBar: 'منزل تلاش کریں',
        voiceButton: 'آواز اسسٹنٹ',
        manageDestinations: 'فوری منزلوں کا انتظام',
        homeCard: 'گھر',
        mosqueCard: 'مسجد',
        hospitalCard: 'ہسپتال',
        marketCard: 'بازار',
        officeCard: 'دفتر',
        mapZoomIn: 'نقشے کو بڑا کریں',
        mapZoomOut: 'نقشے کو چھوٹا کریں',
        settingsButton: 'ترتیبات',
      },
      hints: [
        'تیزی سے رائیڈ بک کرنے کے لیے فوری منزل منتخب کریں۔',
        'ہینڈز فری نیویگیشن کے لیے آواز اسسٹنٹ استعمال کریں۔',
        'کسی بھی وقت اپنی پسندیدہ منزلوں کا انتظام کریں۔'
      ]
    }
  },

  manageQuickDestinations: {
    en: {
      screenName: 'Manage Quick Destinations',
      screenSummary: 'Add or remove quick destinations. Select destinations you use frequently for faster booking.',
      elements: {
        backButton: 'Go back',
        addButton: 'Add new destination',
        removeButton: 'Remove',
        saveButton: 'Save changes',
        doneButton: 'Done',
      }
    },
    ur: {
      screenName: 'فوری منزلوں کا انتظام',
      screenSummary: 'فوری منزلیں شامل یا ہٹائیں۔ تیز بکنگ کے لیے اکثر استعمال ہونے والی منزلیں منتخب کریں۔',
      elements: {
        backButton: 'واپس جائیں',
        addButton: 'نئی منزل شامل کریں',
        removeButton: 'ہٹائیں',
        saveButton: 'تبدیلیاں محفوظ کریں',
        doneButton: 'مکمل',
      }
    }
  },

  manageDestinations: {
    en: {
      screenName: 'Manage Saved Destinations',
      screenSummary: 'View and edit your saved destinations.',
      elements: {
        backButton: 'Go back',
        editButton: 'Edit destination',
        deleteButton: 'Delete destination',
        addButton: 'Add destination',
      }
    },
    ur: {
      screenName: 'محفوظ شدہ منزلوں کا انتظام',
      screenSummary: 'اپنی محفوظ شدہ منزلیں دیکھیں اور ان میں ترمیم کریں۔',
      elements: {
        backButton: 'واپس جائیں',
        editButton: 'منزل میں ترمیم کریں',
        deleteButton: 'منزل حذف کریں',
        addButton: 'منزل شامل کریں',
      }
    }
  },

  pickup: {
    en: {
      screenName: 'Set Pickup Location',
      screenSummary: 'Move the map to set your pickup location. The green pin shows where you will be picked up. Press Confirm Pickup when ready.',
      elements: {
        backButton: 'Go back',
        confirmButton: 'Confirm pickup',
        voiceButton: 'Voice search',
        currentLocationButton: 'Use current location',
        searchBar: 'Search pickup location',
        mapPin: 'Pickup location pin',
      },
      hints: [
        'Drag the map to adjust your pickup location.',
        'Use current location for automatic detection.',
        'Search for a specific address if needed.'
      ]
    },
    ur: {
      screenName: 'پک اپ لوکیشن مقرر کریں',
      screenSummary: 'اپنی پک اپ لوکیشن مقرر کرنے کے لیے نقشہ منتقل کریں۔ سبز پن دکھاتا ہے کہ آپ کو کہاں سے اٹھایا جائے گا۔ تیار ہونے پر پک اپ کی تصدیق کریں۔',
      elements: {
        backButton: 'واپس جائیں',
        confirmButton: 'پک اپ کی تصدیق کریں',
        voiceButton: 'آواز سرچ',
        currentLocationButton: 'موجودہ مقام استعمال کریں',
        searchBar: 'پک اپ لوکیشن تلاش کریں',
        mapPin: 'پک اپ لوکیشن پن',
      },
      hints: [
        'اپنی پک اپ لوکیشن ایڈجسٹ کرنے کے لیے نقشہ گھسیٹیں۔',
        'خودکار پتہ لگانے کے لیے موجودہ مقام استعمال کریں۔',
        'ضرورت پڑنے پر مخصوص پتہ تلاش کریں۔'
      ]
    }
  },

  dropoff: {
    en: {
      screenName: 'Set Drop-off Location',
      screenSummary: 'Move the map to set your drop-off location. The red pin shows your destination. Press Confirm Destination when ready.',
      elements: {
        backButton: 'Go back',
        confirmButton: 'Confirm destination',
        voiceButton: 'Voice search',
        searchBar: 'Search destination',
        mapPin: 'Drop-off location pin',
        recentLocations: 'Recent locations',
        savedAddresses: 'Saved addresses',
      },
      hints: [
        'Select from recent locations for quick selection.',
        'Use saved addresses for frequent destinations.'
      ]
    },
    ur: {
      screenName: 'ڈراپ آف لوکیشن مقرر کریں',
      screenSummary: 'اپنی ڈراپ آف لوکیشن مقرر کرنے کے لیے نقشہ منتقل کریں۔ سرخ پن آپ کی منزل دکھاتا ہے۔ تیار ہونے پر منزل کی تصدیق کریں۔',
      elements: {
        backButton: 'واپس جائیں',
        confirmButton: 'منزل کی تصدیق کریں',
        voiceButton: 'آواز سرچ',
        searchBar: 'منزل تلاش کریں',
        mapPin: 'ڈراپ آف لوکیشن پن',
        recentLocations: 'حالیہ مقامات',
        savedAddresses: 'محفوظ شدہ پتے',
      },
      hints: [
        'فوری انتخاب کے لیے حالیہ مقامات میں سے منتخب کریں۔',
        'اکثر آنے والی منزلوں کے لیے محفوظ شدہ پتے استعمال کریں۔'
      ]
    }
  },

  vehicleSelection: {
    en: {
      screenName: 'Select Vehicle Type',
      screenSummary: 'Choose your ride type. Options are: Bike, Rickshaw, or Car. Each option shows the estimated fare.',
      elements: {
        backButton: 'Go back',
        bikeCard: 'Bike',
        rickshawCard: 'Rickshaw',
        carCard: 'Car',
        bikeInfo: 'Bike. Fast and affordable. Fare approximately one hundred fifty rupees.',
        rickshawInfo: 'Rickshaw. Comfortable for short trips. Fare approximately two hundred fifty rupees.',
        carInfo: 'Car. Most comfortable option. Fare approximately four hundred rupees.',
      },
      hints: [
        'Bike is fastest for short distances.',
        'Rickshaw offers protection from weather.',
        'Car provides maximum comfort and space.'
      ]
    },
    ur: {
      screenName: 'گاڑی کی قسم منتخب کریں',
      screenSummary: 'اپنی رائیڈ کی قسم منتخب کریں۔ اختیارات ہیں: موٹر سائیکل، رکشہ، یا کار۔ ہر آپشن تخمینہ شدہ کرایہ دکھاتا ہے۔',
      elements: {
        backButton: 'واپس جائیں',
        bikeCard: 'موٹر سائیکل',
        rickshawCard: 'رکشہ',
        carCard: 'کار',
        bikeInfo: 'موٹر سائیکل۔ تیز اور سستی۔ کرایہ تقریباً ڈیڑھ سو روپے۔',
        rickshawInfo: 'رکشہ۔ مختصر سفر کے لیے آرام دہ۔ کرایہ تقریباً ڈھائی سو روپے۔',
        carInfo: 'کار۔ سب سے زیادہ آرام دہ اختیار۔ کرایہ تقریباً چار سو روپے۔',
      },
      hints: [
        'مختصر فاصلوں کے لیے موٹر سائیکل تیز ترین ہے۔',
        'رکشہ موسم سے تحفظ فراہم کرتا ہے۔',
        'کار زیادہ سے زیادہ آرام اور جگہ فراہم کرتی ہے۔'
      ]
    }
  },

  rideOptions: {
    en: {
      screenName: 'Available Rides',
      screenSummary: 'Select a driver from available options. Each card shows driver name, rating, estimated arrival time, and fare. Scroll to see more drivers.',
      elements: {
        backButton: 'Go back',
        sortByPrice: 'Sort by price',
        sortByRating: 'Sort by rating',
        sortByTime: 'Sort by arrival time',
        driverCard: 'Driver card',
        selectButton: 'Select this driver',
        refreshButton: 'Refresh available drivers',
      },
      hints: [
        'Higher rated drivers are more reliable.',
        'Choose drivers arriving sooner for faster pickup.',
        'Compare fares before selecting.'
      ]
    },
    ur: {
      screenName: 'دستیاب رائیڈز',
      screenSummary: 'دستیاب آپشنز میں سے ڈرائیور منتخب کریں۔ ہر کارڈ ڈرائیور کا نام، ریٹنگ، تخمینہ شدہ آمد کا وقت، اور کرایہ دکھاتا ہے۔ مزید ڈرائیورز دیکھنے کے لیے سکرول کریں۔',
      elements: {
        backButton: 'واپس جائیں',
        sortByPrice: 'قیمت کے لحاظ سے ترتیب دیں',
        sortByRating: 'ریٹنگ کے لحاظ سے ترتیب دیں',
        sortByTime: 'آمد کے وقت کے لحاظ سے ترتیب دیں',
        driverCard: 'ڈرائیور کارڈ',
        selectButton: 'یہ ڈرائیور منتخب کریں',
        refreshButton: 'دستیاب ڈرائیورز ریفریش کریں',
      },
      hints: [
        'اعلیٰ ریٹنگ والے ڈرائیورز زیادہ قابل اعتماد ہوتے ہیں۔',
        'تیز پک اپ کے لیے جلد پہنچنے والے ڈرائیورز منتخب کریں۔',
        'منتخب کرنے سے پہلے کرایوں کا موازنہ کریں۔'
      ]
    }
  },

  confirmRide: {
    en: {
      screenName: 'Confirm Ride',
      screenSummary: 'Review your ride details. Driver name, vehicle type, fare, pickup and drop-off locations are shown. Press Confirm Ride to book.',
      elements: {
        backButton: 'Go back',
        confirmButton: 'Confirm Ride',
        cancelButton: 'Cancel',
        driverName: 'Driver name',
        driverRating: 'Driver rating',
        vehicleInfo: 'Vehicle information',
        fareAmount: 'Fare amount',
        pickupLocation: 'Pickup location',
        dropoffLocation: 'Drop-off location',
        estimatedTime: 'Estimated trip time',
        paymentMethod: 'Payment method',
      },
      hints: [
        'Review all details before confirming.',
        'You can change payment method before confirming.',
        'Driver will be notified after confirmation.'
      ]
    },
    ur: {
      screenName: 'رائیڈ کی تصدیق کریں',
      screenSummary: 'اپنی رائیڈ کی تفصیلات کا جائزہ لیں۔ ڈرائیور کا نام، گاڑی کی قسم، کرایہ، پک اپ اور ڈراپ آف لوکیشن دکھائے گئے ہیں۔ بک کرنے کے لیے رائیڈ کی تصدیق کریں۔',
      elements: {
        backButton: 'واپس جائیں',
        confirmButton: 'رائیڈ کی تصدیق کریں',
        cancelButton: 'منسوخ کریں',
        driverName: 'ڈرائیور کا نام',
        driverRating: 'ڈرائیور ریٹنگ',
        vehicleInfo: 'گاڑی کی معلومات',
        fareAmount: 'کرایہ کی رقم',
        pickupLocation: 'پک اپ لوکیشن',
        dropoffLocation: 'ڈراپ آف لوکیشن',
        estimatedTime: 'تخمینہ شدہ سفر کا وقت',
        paymentMethod: 'ادائیگی کا طریقہ',
      },
      hints: [
        'تصدیق کرنے سے پہلے تمام تفصیلات کا جائزہ لیں۔',
        'تصدیق سے پہلے آپ ادائیگی کا طریقہ تبدیل کر سکتے ہیں۔',
        'تصدیق کے بعد ڈرائیور کو مطلع کیا جائے گا۔'
      ]
    }
  },

  driverOnWay: {
    en: {
      screenName: 'Driver On The Way',
      screenSummary: 'Your driver is coming to pick you up. Track their live location on the map. Estimated arrival time is shown at the top.',
      elements: {
        driverInfo: 'Driver information',
        arrivalTime: 'Estimated arrival time',
        callButton: 'Call driver',
        chatButton: 'Chat with driver',
        cancelButton: 'Cancel ride',
        trackingMap: 'Live tracking map',
        driverLocation: 'Driver current location',
      },
      hints: [
        'You can call or chat with your driver.',
        'Track driver location in real-time.',
        'Be ready at pickup location when driver arrives.'
      ]
    },
    ur: {
      screenName: 'ڈرائیور راستے میں',
      screenSummary: 'آپ کا ڈرائیور آپ کو لینے آ رہا ہے۔ نقشے پر ان کی لائیو لوکیشن ٹریک کریں۔ تخمینہ شدہ آمد کا وقت اوپر دکھایا گیا ہے۔',
      elements: {
        driverInfo: 'ڈرائیور کی معلومات',
        arrivalTime: 'تخمینہ شدہ آمد کا وقت',
        callButton: 'ڈرائیور کو کال کریں',
        chatButton: 'ڈرائیور سے چیٹ کریں',
        cancelButton: 'رائیڈ منسوخ کریں',
        trackingMap: 'لائیو ٹریکنگ نقشہ',
        driverLocation: 'ڈرائیور کی موجودہ لوکیشن',
      },
      hints: [
        'آپ اپنے ڈرائیور کو کال یا چیٹ کر سکتے ہیں۔',
        'ڈرائیور کی لوکیشن کو ریئل ٹائم میں ٹریک کریں۔',
        'ڈرائیور کے پہنچنے پر پک اپ لوکیشن پر تیار رہیں۔'
      ]
    }
  },

  chat: {
    en: {
      screenName: 'Chat with Driver',
      screenSummary: 'Send messages to your driver. Use quick message buttons for common requests.',
      elements: {
        backButton: 'Go back',
        messageInput: 'Type message',
        sendButton: 'Send message',
        quickMessage1: 'I am ready',
        quickMessage2: 'Running late',
        quickMessage3: 'Where are you',
        voiceButton: 'Voice message',
      }
    },
    ur: {
      screenName: 'ڈرائیور سے چیٹ',
      screenSummary: 'اپنے ڈرائیور کو پیغامات بھیجیں۔ عام درخواستوں کے لیے فوری پیغام بٹن استعمال کریں۔',
      elements: {
        backButton: 'واپس جائیں',
        messageInput: 'پیغام ٹائپ کریں',
        sendButton: 'پیغام بھیجیں',
        quickMessage1: 'میں تیار ہوں',
        quickMessage2: 'دیر ہو رہی ہے',
        quickMessage3: 'آپ کہاں ہیں',
        voiceButton: 'آواز کا پیغام',
      }
    }
  },

  rating: {
    en: {
      screenName: 'Rate Your Ride',
      screenSummary: 'How was your experience? Rate your driver from one to five stars. You can also leave a comment.',
      elements: {
        backButton: 'Skip rating',
        submitButton: 'Submit rating',
        star1: 'One star',
        star2: 'Two stars',
        star3: 'Three stars',
        star4: 'Four stars',
        star5: 'Five stars',
        commentInput: 'Additional comments',
        tipDriver: 'Add tip for driver',
      },
      hints: [
        'Your feedback helps improve service.',
        'Rate honestly based on your experience.',
        'You can skip rating if you prefer.'
      ]
    },
    ur: {
      screenName: 'اپنی رائیڈ کی درجہ بندی کریں',
      screenSummary: 'آپ کا تجربہ کیسا رہا؟ اپنے ڈرائیور کو ایک سے پانچ ستاروں تک ریٹ کریں۔ آپ تبصرہ بھی چھوڑ سکتے ہیں۔',
      elements: {
        backButton: 'ریٹنگ چھوڑیں',
        submitButton: 'ریٹنگ جمع کروائیں',
        star1: 'ایک ستارہ',
        star2: 'دو ستارے',
        star3: 'تین ستارے',
        star4: 'چار ستارے',
        star5: 'پانچ ستارے',
        commentInput: 'اضافی تبصرے',
        tipDriver: 'ڈرائیور کے لیے ٹِپ شامل کریں',
      },
      hints: [
        'آپ کی رائے سروس کو بہتر بنانے میں مدد کرتی ہے۔',
        'اپنے تجربے کی بنیاد پر ایمانداری سے ریٹ کریں۔',
        'چاہیں تو آپ ریٹنگ چھوڑ سکتے ہیں۔'
      ]
    }
  },

  payment: {
    en: {
      screenName: 'Payment Screen',
      screenSummary: 'Complete your payment. Select payment method: Cash, Wallet, or Credit Card. The fare amount is shown at the top.',
      elements: {
        backButton: 'Go back',
        confirmPaymentButton: 'Confirm Payment',
        cashOption: 'Cash',
        walletOption: 'Bykea Wallet',
        cardOption: 'Credit or Debit Card',
        fareAmount: 'Total fare',
        addMoneyButton: 'Add money to wallet',
        changePaymentMethod: 'Change payment method',
      },
      hints: [
        'Cash payment to driver on completion.',
        'Wallet payment is fastest and most convenient.',
        'Card payments are secure and instant.'
      ]
    },
    ur: {
      screenName: 'ادائیگی کی سکرین',
      screenSummary: 'اپنی ادائیگی مکمل کریں۔ ادائیگی کا طریقہ منتخب کریں: کیش، والٹ، یا کریڈٹ کارڈ۔ کرایہ کی رقم اوپر دکھائی گئی ہے۔',
      elements: {
        backButton: 'واپس جائیں',
        confirmPaymentButton: 'ادائیگی کی تصدیق کریں',
        cashOption: 'کیش',
        walletOption: 'بائیکیا والٹ',
        cardOption: 'کریڈٹ یا ڈیبٹ کارڈ',
        fareAmount: 'کل کرایہ',
        addMoneyButton: 'والٹ میں رقم شامل کریں',
        changePaymentMethod: 'ادائیگی کا طریقہ تبدیل کریں',
      },
      hints: [
        'مکمل ہونے پر ڈرائیور کو کیش ادائیگی۔',
        'والٹ ادائیگی سب سے تیز اور آسان ہے۔',
        'کارڈ کی ادائیگیاں محفوظ اور فوری ہیں۔'
      ]
    }
  },

  wallet: {
    en: {
      screenName: 'Bykea Wallet',
      screenSummary: 'Manage your wallet balance. Add money, view transaction history, and see your current balance.',
      elements: {
        backButton: 'Go back',
        balance: 'Current wallet balance',
        addMoneyButton: 'Add money',
        transactionHistory: 'Transaction history',
        withdrawButton: 'Withdraw money',
        autoReloadToggle: 'Auto-reload wallet',
      },
      hints: [
        'Add money in advance for faster payments.',
        'View complete transaction history.',
        'Enable auto-reload to never run out of balance.'
      ]
    },
    ur: {
      screenName: 'بائیکیا والٹ',
      screenSummary: 'اپنے والٹ بیلنس کا انتظام کریں۔ رقم شامل کریں، لین دین کی تاریخ دیکھیں، اور اپنا موجودہ بیلنس دیکھیں۔',
      elements: {
        backButton: 'واپس جائیں',
        balance: 'موجودہ والٹ بیلنس',
        addMoneyButton: 'رقم شامل کریں',
        transactionHistory: 'لین دین کی تاریخ',
        withdrawButton: 'رقم نکالیں',
        autoReloadToggle: 'والٹ آٹو ری لوڈ',
      },
      hints: [
        'تیز ادائیگیوں کے لیے پہلے سے رقم شامل کریں۔',
        'مکمل لین دین کی تاریخ دیکھیں۔',
        'بیلنس ختم نہ ہونے کے لیے آٹو ری لوڈ فعال کریں۔'
      ]
    }
  },

  profile: {
    en: {
      screenName: 'Profile',
      screenSummary: 'View and manage your profile. Edit personal information, manage payment methods, and view saved addresses.',
      elements: {
        backButton: 'Go back',
        editProfileButton: 'Edit profile',
        paymentMethodsButton: 'Payment methods',
        savedAddressesButton: 'Saved addresses',
        tripHistoryButton: 'Trip history',
        helpSupportButton: 'Help and support',
        logoutButton: 'Log out',
        profilePicture: 'Profile picture',
        userName: 'User name',
        userPhone: 'Phone number',
        userEmail: 'Email address',
      }
    },
    ur: {
      screenName: 'پروفائل',
      screenSummary: 'اپنی پروفائل دیکھیں اور اس کا انتظام کریں۔ ذاتی معلومات میں ترمیم کریں، ادائیگی کے طریقے منظم کریں، اور محفوظ شدہ پتے دیکھیں۔',
      elements: {
        backButton: 'واپس جائیں',
        editProfileButton: 'پروفائل میں ترمیم کریں',
        paymentMethodsButton: 'ادائیگی کے طریقے',
        savedAddressesButton: 'محفوظ شدہ پتے',
        tripHistoryButton: 'سفر کی تاریخ',
        helpSupportButton: 'مدد اور معاونت',
        logoutButton: 'لاگ آؤٹ',
        profilePicture: 'پروفائل تصویر',
        userName: 'صارف کا نام',
        userPhone: 'فون نمبر',
        userEmail: 'ای میل ایڈریس',
      }
    }
  },

  editProfile: {
    en: {
      screenName: 'Edit Profile',
      screenSummary: 'Update your personal information. Change your name, email, phone number, or profile picture.',
      elements: {
        backButton: 'Go back',
        saveButton: 'Save changes',
        firstNameInput: 'First name',
        lastNameInput: 'Last name',
        emailInput: 'Email address',
        phoneInput: 'Phone number',
        changePhotoButton: 'Change profile photo',
      },
      errors: {
        invalidEmail: 'Invalid email address.',
        invalidPhone: 'Invalid phone number.',
        emptyName: 'Name cannot be empty.',
      }
    },
    ur: {
      screenName: 'پروفائل میں ترمیم',
      screenSummary: 'اپنی ذاتی معلومات اپ ڈیٹ کریں۔ اپنا نام، ای میل، فون نمبر، یا پروفائل تصویر تبدیل کریں۔',
      elements: {
        backButton: 'واپس جائیں',
        saveButton: 'تبدیلیاں محفوظ کریں',
        firstNameInput: 'پہلا نام',
        lastNameInput: 'آخری نام',
        emailInput: 'ای میل ایڈریس',
        phoneInput: 'فون نمبر',
        changePhotoButton: 'پروفائل فوٹو تبدیل کریں',
      },
      errors: {
        invalidEmail: 'غلط ای میل ایڈریس۔',
        invalidPhone: 'غلط فون نمبر۔',
        emptyName: 'نام خالی نہیں ہو سکتا۔',
      }
    }
  },

  paymentMethods: {
    en: {
      screenName: 'Payment Methods',
      screenSummary: 'Manage your payment methods. Add, remove, or set default payment method.',
      elements: {
        backButton: 'Go back',
        addPaymentButton: 'Add payment method',
        removeButton: 'Remove',
        setDefaultButton: 'Set as default',
        cashMethod: 'Cash',
        walletMethod: 'Bykea Wallet',
        cardMethod: 'Credit or Debit Card',
      }
    },
    ur: {
      screenName: 'ادائیگی کے طریقے',
      screenSummary: 'اپنے ادائیگی کے طریقوں کا انتظام کریں۔ ادائیگی کا طریقہ شامل، ہٹائیں، یا ڈیفالٹ مقرر کریں۔',
      elements: {
        backButton: 'واپس جائیں',
        addPaymentButton: 'ادائیگی کا طریقہ شامل کریں',
        removeButton: 'ہٹائیں',
        setDefaultButton: 'ڈیفالٹ کے طور پر مقرر کریں',
        cashMethod: 'کیش',
        walletMethod: 'بائیکیا والٹ',
        cardMethod: 'کریڈٹ یا ڈیبٹ کارڈ',
      }
    }
  },

  addPaymentMethod: {
    en: {
      screenName: 'Add Payment Method',
      screenSummary: 'Add a new payment method. Enter card details or link your bank account.',
      elements: {
        backButton: 'Go back',
        addButton: 'Add payment method',
        cardNumberInput: 'Card number',
        expiryInput: 'Expiry date',
        cvvInput: 'CVV',
        nameInput: 'Cardholder name',
        saveCardToggle: 'Save card for future use',
      },
      errors: {
        invalidCard: 'Invalid card number.',
        invalidExpiry: 'Invalid expiry date.',
        invalidCVV: 'Invalid CVV.',
      }
    },
    ur: {
      screenName: 'ادائیگی کا طریقہ شامل کریں',
      screenSummary: 'نیا ادائیگی کا طریقہ شامل کریں۔ کارڈ کی تفصیلات درج کریں یا اپنا بینک اکاؤنٹ لنک کریں۔',
      elements: {
        backButton: 'واپس جائیں',
        addButton: 'ادائیگی کا طریقہ شامل کریں',
        cardNumberInput: 'کارڈ نمبر',
        expiryInput: 'میعاد ختم ہونے کی تاریخ',
        cvvInput: 'سی وی وی',
        nameInput: 'کارڈ ہولڈر کا نام',
        saveCardToggle: 'مستقبل کے استعمال کے لیے کارڈ محفوظ کریں',
      },
      errors: {
        invalidCard: 'غلط کارڈ نمبر۔',
        invalidExpiry: 'غلط میعاد ختم ہونے کی تاریخ۔',
        invalidCVV: 'غلط سی وی وی۔',
      }
    }
  },

  savedAddresses: {
    en: {
      screenName: 'Saved Addresses',
      screenSummary: 'Manage your saved addresses. Add, edit, or delete addresses for faster booking.',
      elements: {
        backButton: 'Go back',
        addAddressButton: 'Add new address',
        editButton: 'Edit',
        deleteButton: 'Delete',
        homeAddress: 'Home address',
        workAddress: 'Work address',
      }
    },
    ur: {
      screenName: 'محفوظ شدہ پتے',
      screenSummary: 'اپنے محفوظ شدہ پتوں کا انتظام کریں۔ تیز بکنگ کے لیے پتے شامل، ترمیم، یا حذف کریں۔',
      elements: {
        backButton: 'واپس جائیں',
        addAddressButton: 'نیا پتہ شامل کریں',
        editButton: 'ترمیم کریں',
        deleteButton: 'حذف کریں',
        homeAddress: 'گھر کا پتہ',
        workAddress: 'دفتر کا پتہ',
      }
    }
  },

  addAddress: {
    en: {
      screenName: 'Add Address',
      screenSummary: 'Save a new address. Enter address details and give it a label.',
      elements: {
        backButton: 'Go back',
        saveButton: 'Save address',
        labelInput: 'Address label',
        addressInput: 'Full address',
        cityInput: 'City',
        landmarkInput: 'Nearby landmark',
        homeOption: 'Home',
        workOption: 'Work',
        otherOption: 'Other',
      }
    },
    ur: {
      screenName: 'پتہ شامل کریں',
      screenSummary: 'نیا پتہ محفوظ کریں۔ پتے کی تفصیلات درج کریں اور اسے لیبل دیں۔',
      elements: {
        backButton: 'واپس جائیں',
        saveButton: 'پتہ محفوظ کریں',
        labelInput: 'پتہ لیبل',
        addressInput: 'مکمل پتہ',
        cityInput: 'شہر',
        landmarkInput: 'قریبی نشان',
        homeOption: 'گھر',
        workOption: 'دفتر',
        otherOption: 'دیگر',
      }
    }
  },

  trips: {
    en: {
      screenName: 'Trip History',
      screenSummary: 'View your past trips. See trip details, receipts, and ratings.',
      elements: {
        backButton: 'Go back',
        tripCard: 'Trip card',
        viewDetailsButton: 'View details',
        downloadReceiptButton: 'Download receipt',
        repeatTripButton: 'Book again',
        filterButton: 'Filter trips',
      }
    },
    ur: {
      screenName: 'سفر کی تاریخ',
      screenSummary: 'اپنے ماضی کے سفر دیکھیں۔ سفر کی تفصیلات، رسیدیں، اور ریٹنگز دیکھیں۔',
      elements: {
        backButton: 'واپس جائیں',
        tripCard: 'سفر کارڈ',
        viewDetailsButton: 'تفصیلات دیکھیں',
        downloadReceiptButton: 'رسید ڈاؤن لوڈ کریں',
        repeatTripButton: 'دوبارہ بک کریں',
        filterButton: 'سفر فلٹر کریں',
      }
    }
  },

  tripDetails: {
    en: {
      screenName: 'Trip Details',
      screenSummary: 'View complete trip information. Route, fare breakdown, driver details, and payment method are shown.',
      elements: {
        backButton: 'Go back',
        driverName: 'Driver name',
        vehicleInfo: 'Vehicle information',
        routeMap: 'Trip route map',
        fareBreakdown: 'Fare breakdown',
        baseFare: 'Base fare',
        distanceFare: 'Distance fare',
        timeFare: 'Time fare',
        totalFare: 'Total fare',
        downloadReceiptButton: 'Download receipt',
        reportIssueButton: 'Report issue',
      }
    },
    ur: {
      screenName: 'سفر کی تفصیلات',
      screenSummary: 'سفر کی مکمل معلومات دیکھیں۔ راستہ، کرایے کی تفصیل، ڈرائیور کی تفصیلات، اور ادائیگی کا طریقہ دکھایا گیا ہے۔',
      elements: {
        backButton: 'واپس جائیں',
        driverName: 'ڈرائیور کا نام',
        vehicleInfo: 'گاڑی کی معلومات',
        routeMap: 'سفر کے راستے کا نقشہ',
        fareBreakdown: 'کرایے کی تفصیل',
        baseFare: 'بنیادی کرایہ',
        distanceFare: 'فاصلے کا کرایہ',
        timeFare: 'وقت کا کرایہ',
        totalFare: 'کل کرایہ',
        downloadReceiptButton: 'رسید ڈاؤن لوڈ کریں',
        reportIssueButton: 'مسئلہ رپورٹ کریں',
      }
    }
  },

  settings: {
    en: {
      screenName: 'Settings',
      screenSummary: 'Adjust app settings. Change text size, enable bold text, adjust brightness, toggle dark mode, or change language.',
      elements: {
        backButton: 'Go back',
        textSizeLabel: 'Text size',
        textSizeSmall: 'Small',
        textSizeMedium: 'Medium',
        textSizeLarge: 'Large',
        boldTextToggle: 'Bold text',
        brightnessSlider: 'Brightness',
        darkModeToggle: 'Dark mode',
        languageLabel: 'Language',
        englishOption: 'English',
        urduOption: 'Urdu',
        highContrastToggle: 'High contrast',
        voiceGuidanceToggle: 'Voice guidance',
        hapticFeedbackToggle: 'Haptic feedback',
        notificationsToggle: 'Notifications',
      },
      hints: [
        'Adjust text size for comfortable reading.',
        'Enable bold text for better visibility.',
        'Dark mode reduces eye strain in low light.'
      ]
    },
    ur: {
      screenName: 'ترتیبات',
      screenSummary: 'ایپ کی ترتیبات ایڈجسٹ کریں۔ متن کا سائز تبدیل کریں، بولڈ ٹیکسٹ فعال کریں، چمک ایڈجسٹ کریں، ڈارک موڈ ٹوگل کریں، یا زبان تبدیل کریں۔',
      elements: {
        backButton: 'واپس جائیں',
        textSizeLabel: 'متن کا سائز',
        textSizeSmall: 'چھوٹا',
        textSizeMedium: 'درمیانہ',
        textSizeLarge: 'بڑا',
        boldTextToggle: 'بولڈ ٹیکسٹ',
        brightnessSlider: 'چمک',
        darkModeToggle: 'ڈارک موڈ',
        languageLabel: 'زبان',
        englishOption: 'انگریزی',
        urduOption: 'اردو',
        highContrastToggle: 'ہائی کنٹراسٹ',
        voiceGuidanceToggle: 'آواز کی رہنمائی',
        hapticFeedbackToggle: 'ہیپٹک فیڈبیک',
        notificationsToggle: 'اطلاعات',
      },
      hints: [
        'آرام دہ پڑھنے کے لیے متن کا سائز ایڈجسٹ کریں۔',
        'بہتر نمائش کے لیے بولڈ ٹیکسٹ فعال کریں۔',
        'ڈارک موڈ کم روشنی میں آنکھوں کا دباؤ کم کرتا ہے۔'
      ]
    }
  },
};

/**
 * Get voice assist text content for a specific screen
 */
export function getVoiceAssistText(
  screenKey: ScreenKey,
  language: 'en' | 'ur'
): VoiceAssistTextContent {
  const screenContent = voiceTextMap[screenKey];
  
  if (!screenContent) {
    console.warn(`[Voice Assist] No text content found for screen: ${screenKey}`);
    return {
      screenName: screenKey,
      screenSummary: '',
      elements: {},
      errors: {},
      hints: []
    };
  }

  return screenContent[language];
}

/**
 * Get all available screen keys
 */
export function getAllScreenKeys(): ScreenKey[] {
  return Object.keys(voiceTextMap) as ScreenKey[];
}

/**
 * Check if a screen has voice assist content
 */
export function hasVoiceContent(screenKey: ScreenKey): boolean {
  return !!voiceTextMap[screenKey];
}
