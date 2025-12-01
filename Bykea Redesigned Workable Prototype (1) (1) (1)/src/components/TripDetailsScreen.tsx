import { ArrowLeft, MapPin, Calendar, DollarSign, Star, Bike } from "lucide-react";
import { GlobalSpeakerButton } from "./GlobalSpeakerButton";

interface TripDetailsScreenProps {
  onBack: () => void;
  speakerActive: boolean;
  onSpeakerToggle: () => void;
  language: "en" | "ur";
  tripData?: any;
}

export function TripDetailsScreen({ 
  onBack, 
  speakerActive, 
  onSpeakerToggle,
  language,
  tripData 
}: TripDetailsScreenProps) {
  const text = {
    en: {
      title: "Trip Details",
      pickup: "Pickup",
      dropoff: "Dropoff",
      date: "Date & Time",
      fare: "Total Fare",
      driver: "Driver",
      vehicle: "Vehicle",
      rating: "Your Rating",
      download: "Download Receipt"
    },
    ur: {
      title: "سفر کی تفصیلات",
      pickup: "پک اپ",
      dropoff: "ڈراپ آف",
      date: "تاریخ اور وقت",
      fare: "کل کرایہ",
      driver: "ڈرائیور",
      vehicle: "گاڑی",
      rating: "آپ کی درجہ بندی",
      download: "رسید ڈاؤن لوڈ کریں"
    }
  };

  const t = text[language];

  return (
    <div className="flex flex-col h-screen bg-[#F5F8F3] dark:bg-[#121212]">
      {/* Header */}
      <div className="bg-white dark:bg-[#1E1E1E] px-6 py-4 flex items-center justify-between border-b border-[#E0E0E0] dark:border-[#2A2A2A]">
        <button 
          onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-[#F5F8F3] dark:hover:bg-[#2A2A2A] transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-[#1A1A1A] dark:text-white" strokeWidth={2.5} />
        </button>
        <h1 className="text-[#1A1A1A] dark:text-white font-bold flex-1 text-center" style={{ fontSize: '20px' }}>
          {t.title}
        </h1>
        <GlobalSpeakerButton isActive={speakerActive} onToggle={onSpeakerToggle} />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {/* Trip ID */}
        <div className="bg-[#0CAA41] text-white rounded-2xl p-5 text-center">
          <p className="text-sm mb-1 opacity-90">Trip ID</p>
          <p className="font-bold" style={{ fontSize: '20px' }}>
            BK-2024-789456
          </p>
        </div>

        {/* Locations */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-5 border border-[#E0E0E0] dark:border-[#2A2A2A]">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-[#0CAA41]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-[#0CAA41]" strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <p className="text-[#6B6B6B] dark:text-[#B0B0B0] mb-1" style={{ fontSize: '14px' }}>{t.pickup}</p>
                <p className="text-[#1A1A1A] dark:text-white font-bold" style={{ fontSize: '16px' }}>
                  Clifton Block 5, Karachi
                </p>
              </div>
            </div>
            
            <div className="h-px bg-[#E0E0E0] dark:bg-[#2A2A2A]"></div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-[#DC3545]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-[#DC3545]" strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <p className="text-[#6B6B6B] dark:text-[#B0B0B0] mb-1" style={{ fontSize: '14px' }}>{t.dropoff}</p>
                <p className="text-[#1A1A1A] dark:text-white font-bold" style={{ fontSize: '16px' }}>
                  DHA Phase 6, Karachi
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Date & Time */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-5 border border-[#E0E0E0] dark:border-[#2A2A2A] flex items-center gap-4">
          <Calendar className="w-6 h-6 text-[#0CAA41]" strokeWidth={2.5} />
          <div className="flex-1">
            <p className="text-[#6B6B6B] dark:text-[#B0B0B0] mb-1" style={{ fontSize: '14px' }}>{t.date}</p>
            <p className="text-[#1A1A1A] dark:text-white font-bold" style={{ fontSize: '16px' }}>
              Nov 23, 2025 • 2:30 PM
            </p>
          </div>
        </div>

        {/* Driver Info */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-5 border border-[#E0E0E0] dark:border-[#2A2A2A]">
          <p className="text-[#6B6B6B] dark:text-[#B0B0B0] mb-3" style={{ fontSize: '14px' }}>{t.driver}</p>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#0CAA41]/10 rounded-full flex items-center justify-center">
              <span className="text-[#0CAA41] font-bold" style={{ fontSize: '18px' }}>AK</span>
            </div>
            <div className="flex-1">
              <h3 className="text-[#1A1A1A] dark:text-white font-bold mb-1" style={{ fontSize: '18px' }}>
                Ahmed Khan
              </h3>
              <div className="flex items-center gap-2">
                <Bike className="w-4 h-4 text-[#6B6B6B] dark:text-[#B0B0B0]" strokeWidth={2.5} />
                <span className="text-[#6B6B6B] dark:text-[#B0B0B0] font-bold" style={{ fontSize: '14px' }}>
                  ABC-1234
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-[#FFB800] text-[#FFB800]" />
              <span className="text-[#1A1A1A] dark:text-white font-bold" style={{ fontSize: '16px' }}>4.8</span>
            </div>
          </div>
        </div>

        {/* Fare */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-5 border border-[#E0E0E0] dark:border-[#2A2A2A]">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[#6B6B6B] dark:text-[#B0B0B0] font-bold" style={{ fontSize: '16px' }}>Base Fare</span>
            <span className="text-[#1A1A1A] dark:text-white font-bold" style={{ fontSize: '16px' }}>Rs. 120</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-[#6B6B6B] dark:text-[#B0B0B0] font-bold" style={{ fontSize: '16px' }}>Service Fee</span>
            <span className="text-[#1A1A1A] dark:text-white font-bold" style={{ fontSize: '16px' }}>Rs. 30</span>
          </div>
          <div className="h-px bg-[#E0E0E0] dark:bg-[#2A2A2A] my-3"></div>
          <div className="flex justify-between items-center">
            <span className="text-[#1A1A1A] dark:text-white font-bold" style={{ fontSize: '18px' }}>{t.fare}</span>
            <span className="text-[#0CAA41] font-bold" style={{ fontSize: '24px' }}>Rs. 150</span>
          </div>
        </div>

        {/* Download Button */}
        <button
          className="w-full bg-[#0CAA41] text-white rounded-2xl py-4 font-bold hover:bg-[#0a8f37] transition-colors shadow-lg shadow-[#0CAA41]/20"
          style={{ fontSize: '18px', height: '56px' }}
        >
          {t.download}
        </button>
      </div>
    </div>
  );
}
