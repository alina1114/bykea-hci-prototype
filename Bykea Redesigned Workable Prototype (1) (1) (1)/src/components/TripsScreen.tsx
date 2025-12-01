import { Calendar, MapPin, Clock, Bike, DollarSign, ArrowLeft } from "lucide-react";
import { BottomNav } from "./BottomNav";
import { RickshawIcon } from "./icons/RickshawIcon";
import { CarIcon } from "./icons/CarIcon";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { GlobalSpeakerButton } from "./GlobalSpeakerButton";
import { useReadAloud } from "./ReadAloudContext";
import { useEffect } from "react";

interface TripsScreenProps {
  onTabChange: (tab: "home" | "trips" | "wallet" | "profile") => void;
  speakerActive: boolean;
  onSpeakerToggle: () => void;
  language: "en" | "ur";
  onNavigate?: (screen: string) => void;
}

export function TripsScreen({ onTabChange, speakerActive, onSpeakerToggle, language, onNavigate }: TripsScreenProps) {
  const text = {
    en: {
      title: "My Trips",
      completed: "Completed",
      from: "From",
      to: "To"
    },
    ur: {
      title: "میرے سفر",
      completed: "مکمل",
      from: "سے",
      to: "تک"
    }
  };

  const t = text[language];

  const trips = [
    {
      id: 1,
      date: "Today, 2:30 PM",
      from: "Block 13, Gulistan-e-Jauhar",
      to: "Safari Park, University Road",
      fare: "Rs. 150",
      type: "Bike",
      status: "Completed",
      icon: "bike",
      riderName: "Ahmed Khan",
      riderPhoto: "https://i.pravatar.cc/150?img=12",
      rating: 4.8,
    },
    {
      id: 2,
      date: "Yesterday, 10:15 AM",
      from: "Bahadurabad",
      to: "Jauhar Market",
      fare: "Rs. 120",
      type: "Bike",
      status: "Completed",
      icon: "bike",
      riderName: "Hassan Ali",
      riderPhoto: "https://i.pravatar.cc/150?img=33",
      rating: 4.9,
    },
    {
      id: 3,
      date: "Nov 6, 4:45 PM",
      from: "Tariq Road",
      to: "Saddar",
      fare: "Rs. 280",
      type: "Rickshaw",
      status: "Completed",
      icon: "rickshaw",
      riderName: "Muhammad Rizwan",
      riderPhoto: "https://i.pravatar.cc/150?img=51",
      rating: 4.7,
    },
    {
      id: 4,
      date: "Nov 5, 9:20 AM",
      from: "Clifton",
      to: "DHA Phase 5",
      fare: "Rs. 450",
      type: "Car",
      status: "Completed",
      icon: "car",
      riderName: "Imran Ahmed",
      riderPhoto: "https://i.pravatar.cc/150?img=68",
      rating: 5.0,
    },
  ];

  const readAloud = useReadAloud();

  // Text-to-speech when speaker is active
  useEffect(() => {
    if (speakerActive) {
      const ttsTexts = [
        t.title,
        ...trips.slice(0, 2).map(trip => 
          `${trip.type}, ${t.from} ${trip.from}, ${t.to} ${trip.to}, ${trip.fare}`
        )
      ];
      readAloud.play(ttsTexts, 'Trips Screen');
    } else {
      readAloud.stop();
    }
  }, [speakerActive]);

  return (
    <div className="flex flex-col h-screen bg-[#F5F8F3] dark:bg-[#121212]">
      {/* Header */}
      <div className="bg-white dark:bg-[#1E1E1E] px-5 py-6 border-b border-[#E0E0E0] dark:border-[#2A2A2A] relative">
        <GlobalSpeakerButton 
          isActive={speakerActive} 
          onToggle={onSpeakerToggle}
          language={language}
        />
        <h2 className="text-center text-[#1A1A1A] dark:text-white font-bold text-2xl">{t.title}</h2>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 pt-6 pb-28 overflow-y-auto">
        <div className="space-y-4">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 border border-[#E0E0E0] dark:border-[#2A2A2A] hover:shadow-lg transition-all"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-[#E0E0E0] dark:border-[#2A2A2A]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#0CAA41]/10 rounded-2xl flex items-center justify-center">
                    {trip.icon === "bike" && <Bike className="w-6 h-6 text-[#0CAA41]" strokeWidth={2.5} />}
                    {trip.icon === "rickshaw" && <RickshawIcon className="w-7 h-7 text-[#0CAA41]" />}
                    {trip.icon === "car" && <CarIcon className="w-6 h-6 text-[#0CAA41]" />}
                  </div>
                  <div>
                    <div className="text-[#1A1A1A] dark:text-white font-bold text-lg">{trip.type}</div>
                    <div className="text-sm text-[#4A4A4A] dark:text-[#B0B0B0] font-semibold">{trip.date}</div>
                  </div>
                </div>
                <div className="px-4 py-2 bg-[#E8F5EC] dark:bg-[#0CAA41]/10 rounded-full">
                  <span className="text-[#0CAA41] text-sm font-bold">{trip.status}</span>
                </div>
              </div>

              {/* Rider Information */}
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#E0E0E0] dark:border-[#2A2A2A]">
                <img 
                  src={trip.riderPhoto} 
                  alt={trip.riderName}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#0CAA41]"
                />
                <div className="flex-1">
                  <div className="text-[#1A1A1A] dark:text-white font-bold" style={{ fontSize: '16px' }}>
                    {trip.riderName}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-[#FFB800]">★</span>
                    <span className="text-[#4A4A4A] dark:text-[#B0B0B0] font-bold" style={{ fontSize: '14px' }}>
                      {trip.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Route */}
              <div className="space-y-4 mb-5">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#0CAA41] mt-2"></div>
                  <div className="flex-1">
                    <div className="text-sm text-[#4A4A4A] dark:text-[#B0B0B0] mb-1 font-semibold">{t.from}</div>
                    <div className="text-[#1A1A1A] dark:text-white font-bold">{trip.from}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#DC3545] mt-2"></div>
                  <div className="flex-1">
                    <div className="text-sm text-[#4A4A4A] dark:text-[#B0B0B0] mb-1 font-semibold">{t.to}</div>
                    <div className="text-[#1A1A1A] dark:text-white font-bold">{trip.to}</div>
                  </div>
                </div>
              </div>

              {/* Fare */}
              <div className="pt-4 border-t border-[#E0E0E0] dark:border-[#2A2A2A] flex items-center justify-between">
                <span className="text-[#4A4A4A] dark:text-[#B0B0B0] font-bold">Total Fare</span>
                <span className="text-[#0CAA41] text-xl font-bold">{trip.fare}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab="trips" onTabChange={onTabChange} language={language} />
    </div>
  );
}