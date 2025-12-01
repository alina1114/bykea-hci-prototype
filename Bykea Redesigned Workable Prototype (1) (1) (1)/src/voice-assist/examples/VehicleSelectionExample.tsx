/**
 * VEHICLE SELECTION SCREEN - Voice Assist Implementation Example
 * 
 * This example demonstrates:
 * - Selection announcements with pricing information
 * - Back button announcements
 * - Detailed vehicle information announcements
 */

import { ArrowLeft, Bike, Car } from "lucide-react";
import { useVoiceAssistScreen } from '../useVoiceAssistScreen';
import { RickshawIcon } from "../../components/icons/RickshawIcon";

interface VehicleSelectionScreenProps {
  onNavigate: (screen: string, vehicleType?: string) => void;
  language: 'en' | 'ur';
}

export function VehicleSelectionExample({ 
  onNavigate, 
  language 
}: VehicleSelectionScreenProps) {
  
  // ============================================
  // VOICE ASSIST INITIALIZATION
  // ============================================
  const voiceAssist = useVoiceAssistScreen({
    screenKey: 'vehicleSelection',
    language,
    autoAnnounce: true,
    autoAnnounceDelay: 500
  });
  
  // Auto-announces on mount:
  // "Select Vehicle Type. Choose your ride type. Options are: Bike, Rickshaw, or Car.
  //  Each option shows the estimated fare."

  // Vehicle data
  const vehicles = [
    {
      id: 'bike',
      name: language === 'en' ? 'Bike' : 'موٹر سائیکل',
      icon: <Bike className="w-10 h-10 text-white" strokeWidth={2.5} />,
      fare: 150,
      eta: '5-7',
      description: language === 'en' 
        ? 'Fast and affordable' 
        : 'تیز اور سستی',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'rickshaw',
      name: language === 'en' ? 'Rickshaw' : 'رکشہ',
      icon: <RickshawIcon className="w-10 h-10 text-white" />,
      fare: 250,
      eta: '8-10',
      description: language === 'en' 
        ? 'Comfortable for short trips' 
        : 'مختصر سفر کے لیے آرام دہ',
      gradient: 'from-green-500 to-green-600'
    },
    {
      id: 'car',
      name: language === 'en' ? 'Car' : 'کار',
      icon: <Car className="w-10 h-10 text-white" strokeWidth={2.5} />,
      fare: 400,
      eta: '10-12',
      description: language === 'en' 
        ? 'Most comfortable option' 
        : 'سب سے زیادہ آرام دہ',
      gradient: 'from-purple-500 to-purple-600'
    }
  ];

  // ============================================
  // VEHICLE SELECTION HANDLER
  // ============================================
  const handleSelectVehicle = (vehicle: typeof vehicles[0]) => {
    // Build detailed announcement with fare information
    const fareText = language === 'en' 
      ? `Fare approximately ${vehicle.fare} rupees` 
      : `کرایہ تقریباً ${vehicle.fare} روپے`;
    
    const etaText = language === 'en'
      ? `Estimated time ${vehicle.eta} minutes`
      : `تخمینہ شدہ وقت ${vehicle.eta} منٹ`;
    
    // Announce selection with additional context
    voiceAssist.announceSelection(
      vehicle.name,
      `${fareText}. ${etaText}`
    );
    // English: "You selected: Bike. Fare approximately 150 rupees. Estimated time 5-7 minutes."
    // Urdu: "آپ نے موٹر سائیکل منتخب کیا۔ کرایہ تقریباً ۱۵۰ روپے۔ تخمینہ شدہ وقت ۵-۷ منٹ۔"
    
    // Navigate to ride options screen
    onNavigate('rideOptions', vehicle.id);
  };

  // ============================================
  // BACK BUTTON HANDLER
  // ============================================
  const handleBack = () => {
    voiceAssist.announceButton('backButton');
    // English: "You pressed: Go back"
    // Urdu: "آپ نے واپس جائیں دبایا"
    
    onNavigate('dropoff');
  };

  // ============================================
  // VEHICLE CARD FOCUS HANDLER
  // (Optional - for additional accessibility)
  // ============================================
  const handleVehicleFocus = (vehicle: typeof vehicles[0]) => {
    // When user tabs to or hovers over vehicle card,
    // announce detailed information
    const info = language === 'en'
      ? `${vehicle.name}. ${vehicle.description}. Fare ${vehicle.fare} rupees.`
      : `${vehicle.name}۔ ${vehicle.description}۔ کرایہ ${vehicle.fare} روپے۔`;
    
    voiceAssist.announceText(info, 'low'); // Low priority
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
        >
          <ArrowLeft className="w-6 h-6 text-[#1A1A1A]" strokeWidth={2.5} />
        </button>
        
        <h1 className="text-[#1A1A1A] font-bold flex-1 text-center">
          {voiceAssist.content.screenName}
        </h1>
        
        <div className="w-11" /> {/* Spacer for centering */}
      </div>

      {/* CONTENT */}
      <div className="flex-1 px-6 py-8 overflow-y-auto">
        
        {/* Instruction Text */}
        <p className="text-center text-[#6B6B6B] mb-8 font-bold">
          {language === 'en' 
            ? 'Select your preferred ride type' 
            : 'اپنی پسندیدہ رائیڈ کی قسم منتخب کریں'}
        </p>

        {/* Vehicle Cards */}
        <div className="space-y-4">
          {vehicles.map((vehicle) => (
            <button
              key={vehicle.id}
              onClick={() => handleSelectVehicle(vehicle)}
              onFocus={() => handleVehicleFocus(vehicle)}
              className={`
                w-full bg-gradient-to-r ${vehicle.gradient} 
                rounded-3xl p-6 flex items-center gap-6 
                hover:shadow-xl transition-all
                focus:ring-4 focus:ring-[#0CAA41]/30
              `}
              aria-label={
                language === 'en'
                  ? `${vehicle.name}. ${vehicle.description}. Fare ${vehicle.fare} rupees.`
                  : `${vehicle.name}۔ ${vehicle.description}۔ کرایہ ${vehicle.fare} روپے۔`
              }
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                {vehicle.icon}
              </div>

              {/* Info */}
              <div className="flex-1 text-left">
                <div className="text-white font-bold mb-1" style={{ fontSize: '20px' }}>
                  {vehicle.name}
                </div>
                <div className="text-white/90 mb-2" style={{ fontSize: '14px' }}>
                  {vehicle.description}
                </div>
                <div className="text-white/90" style={{ fontSize: '14px' }}>
                  {language === 'en' ? 'ETA:' : 'وقت:'} {vehicle.eta} {language === 'en' ? 'min' : 'منٹ'}
                </div>
              </div>

              {/* Fare */}
              <div className="text-right">
                <div className="text-white font-bold" style={{ fontSize: '24px' }}>
                  ₨{vehicle.fare}
                </div>
                <div className="text-white/90" style={{ fontSize: '12px' }}>
                  {language === 'en' ? 'approx' : 'تقریباً'}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Help Text */}
        <div className="mt-8 bg-white rounded-2xl p-6 border-2 border-[#0CAA41]/20">
          <p className="text-[#6B6B6B] text-center" style={{ fontSize: '14px' }}>
            {language === 'en'
              ? 'Prices are estimates and may vary based on traffic and distance'
              : 'قیمتیں تخمینہ ہیں اور ٹریفک اور فاصلے کی بنیاد پر مختلف ہو سکتی ہیں'}
          </p>
        </div>

      </div>
    </div>
  );
}

/*
 * VOICE ASSIST FLOW FOR VEHICLE SELECTION:
 * 
 * 1. Screen Mount:
 *    → Auto-announces: "Select Vehicle Type. Choose your ride type. 
 *       Options are: Bike, Rickshaw, or Car. Each option shows the estimated fare."
 * 
 * 2. User focuses on Bike card (via keyboard or hover):
 *    → Announces: "Bike. Fast and affordable. Fare 150 rupees." (LOW priority)
 * 
 * 3. User clicks Bike:
 *    → Announces: "You selected: Bike. Fare approximately 150 rupees. 
 *       Estimated time 5-7 minutes." (HIGH priority)
 *    → Navigates to Ride Options Screen
 * 
 * 4. User clicks Back:
 *    → Announces: "You pressed: Go back" (HIGH priority)
 *    → Returns to Dropoff Screen
 * 
 * KEY FEATURES:
 * - Detailed fare information in announcements
 * - Focus announcements for keyboard navigation
 * - Context-aware information (price, ETA)
 * - Priority system: Selection (high) vs Focus (low)
 * - Bilingual pricing announcements
 */
