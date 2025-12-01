import { Phone, MessageCircle, Star, Bike, Volume2 } from "lucide-react";
import mapWithRoute from "figma:asset/395f5f37763abbb36d16df03a64b12ed3a5408e7.png";
import { GlobalSpeakerButton } from "./GlobalSpeakerButton";
import { RickshawIcon } from "./icons/RickshawIcon";
import { CarIcon } from "./icons/CarIcon";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CancellationDialog } from "./CancellationDialog";
import { useState, useEffect } from "react";
import { useReadAloud } from "./ReadAloudContext";

interface NewDriverOnWayScreenProps {
  onNavigate: (screen: string) => void;
  riderData?: any;
  speakerActive: boolean;
  onSpeakerToggle: () => void;
  language: "en" | "ur";
  onCallDriver: () => void;
  onChat: () => void;
}

export function NewDriverOnWayScreen({ 
  onNavigate, 
  riderData,
  speakerActive,
  onSpeakerToggle,
  language,
  onCallDriver,
  onChat
}: NewDriverOnWayScreenProps) {
  const driverName = riderData?.driverName || "Ahmed Khan";
  const vehicleType = riderData?.name || "Bike";
  const vehicleNumber = riderData?.vehicle || "ABC-1234";
  const rating = riderData?.rating || 4.8;
  const fare = riderData?.fare || "Rs. 150";
  const icon = riderData?.icon || "bike";
  const photo = riderData?.photo || "https://images.unsplash.com/photo-1656339504243-2df4c5ebf1c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBmYWNlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYzODA0Njc4fDA&ixlib=rb-4.1.0&q=80&w=1080";
  const readAloud = useReadAloud();

  const text = {
    en: {
      arriving: "Driver Arriving",
      minutes: "minutes",
      call: "Call Driver",
      message: "Send Message",
      tripStatus: "Trip Status",
      inProgress: "In Progress",
      complete: "Complete Ride",
      cancel: "Cancel Ride"
    },
    ur: {
      arriving: "ڈرائیور آ رہا ہے",
      minutes: "منٹ",
      call: "ڈرائیور کو کال کریں",
      message: "پیغام بھیجیں",
      tripStatus: "سفر کی حالت",
      inProgress: "جاری ہے",
      complete: "سفر مکمل کریں",
      cancel: "سفر منسوخ کریں"
    }
  };

  const t = text[language];

  // Text-to-speech when speaker is active
  useEffect(() => {
    if (speakerActive) {
      const ttsTexts = [
        t.arriving,
        `4 ${t.minutes}`,
        driverName,
        vehicleType,
        vehicleNumber,
        `${language === 'en' ? 'Rating' : 'درجہ بندی'} ${rating}`,
        t.call,
        t.message
      ];
      readAloud.play(ttsTexts, 'Driver On Way Screen');
    } else {
      readAloud.stop();
    }
  }, [speakerActive]);

  const playAudio = (text: string) => {
    console.log(`Playing audio: ${text}`);
  };

  const [isCancellationDialogOpen, setCancellationDialogOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-[#F5F8F3] dark:bg-[#121212] relative">
      {/* Map Background with Route - Zoomed Out */}
      <div className="absolute inset-0">
        <img 
          src={mapWithRoute} 
          alt="Route Map" 
          className="w-full h-full object-cover scale-75 origin-top"
        />
      </div>

      {/* Status Banner with Speaker Button */}
      <div className="relative z-10 bg-[#0CAA41] text-white px-6 py-5 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="w-11"></div> {/* Spacer */}
          <div></div> {/* Empty for centering */}
          {/* Speaker Button - Top Right */}
          <GlobalSpeakerButton isActive={speakerActive} onToggle={onSpeakerToggle} />
        </div>
        <div className="text-center">
          <h3 className="mb-1 font-bold text-xl">{t.arriving}</h3>
          <p className="text-2xl font-bold">4 {t.minutes}</p>
        </div>
      </div>

      {/* Spacer to show map */}
      <div className="relative z-0 flex-1 min-h-[200px]"></div>

      {/* Driver Info Drawer */}
      <div className="relative z-10 bg-white dark:bg-[#1E1E1E] rounded-t-[2rem] border-t border-[#E0E0E0] dark:border-[#2A2A2A] shadow-2xl max-h-[65vh] overflow-hidden">
        <div className="px-6 pt-7 pb-7 overflow-y-auto max-h-[65vh]">
          {/* Driver Card */}
          <div className="bg-[#F5F8F3] dark:bg-[#2A2A2A] rounded-3xl p-6 mb-5 border border-[#E0E0E0] dark:border-[#3A3A3A]">
            <div className="flex items-center gap-5 mb-5">
              {/* Driver Photo */}
              <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-[#0CAA41]/20">
                <ImageWithFallback
                  src={photo}
                  alt={driverName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-[#1A1A1A] dark:text-white mb-2 font-bold text-xl">{driverName}</h3>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-[#FFB800] text-[#FFB800]" />
                  <span className="text-[#1A1A1A] dark:text-white font-bold">{rating}</span>
                </div>
              </div>
            </div>

            {/* Vehicle & Fare */}
            <div className="flex items-center justify-between bg-white dark:bg-[#1E1E1E] rounded-2xl p-5 border border-[#E0E0E0] dark:border-[#2A2A2A]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#0CAA41]/10 rounded-xl flex items-center justify-center">
                  {icon === "bike" && <Bike className="w-7 h-7 text-[#0CAA41]" strokeWidth={2.5} />}
                  {icon === "rickshaw" && <RickshawIcon className="w-8 h-8 text-[#0CAA41]" />}
                  {icon === "car" && <CarIcon className="w-7 h-7 text-[#0CAA41]" />}
                </div>
                <div>
                  <div className="text-[#1A1A1A] dark:text-white mb-1 font-bold">{vehicleType}</div>
                  <div className="text-[#4A4A4A] dark:text-[#B0B0B0] font-bold">{vehicleNumber}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-[#4A4A4A] dark:text-[#B0B0B0] mb-1 font-bold">Fare</div>
                <div className="text-[#0CAA41] text-xl font-bold">{fare}</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 mb-5">
            <button 
              onClick={onCallDriver}
              className="w-full bg-[#0CAA41] text-white rounded-3xl py-6 flex items-center justify-center gap-3 hover:bg-[#0a8f37] transition-colors shadow-lg shadow-[#0CAA41]/20"
            >
              <Phone className="w-6 h-6" strokeWidth={2.5} />
              <span className="font-bold text-xl">{t.call}</span>
            </button>
            
            <button 
              onClick={onChat}
              className="w-full bg-white dark:bg-[#1E1E1E] border-2 border-[#E0E0E0] dark:border-[#2A2A2A] text-[#1A1A1A] dark:text-white rounded-3xl py-6 flex items-center justify-center gap-3 hover:bg-[#F5F8F3] dark:hover:bg-[#2A2A2A] transition-colors"
            >
              <MessageCircle className="w-6 h-6" strokeWidth={2.5} />
              <span className="font-bold text-xl">{t.message}</span>
            </button>
          </div>

          {/* Progress */}
          <div className="bg-[#E8F5EC] dark:bg-[#0CAA41]/10 rounded-2xl p-5 border border-[#0CAA41]/20 mb-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[#4A4A4A] dark:text-[#B0B0B0] font-bold">{t.tripStatus}</span>
              <span className="text-[#0CAA41] font-bold">{t.inProgress}</span>
            </div>
            <div className="w-full h-3 bg-white dark:bg-[#1E1E1E] rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-[#0CAA41] rounded-full transition-all duration-500"></div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="space-y-3">
            <button
              onClick={() => onNavigate("rating")}
              className="w-full bg-[#0CAA41] text-white rounded-3xl py-7 hover:bg-[#0a8f37] transition-colors shadow-lg shadow-[#0CAA41]/20 font-bold text-2xl flex items-center justify-center"
            >
              {t.complete}
            </button>
            
            <button 
              onClick={() => setCancellationDialogOpen(true)}
              className="w-full bg-white dark:bg-[#1E1E1E] border-2 border-[#DC3545] text-[#DC3545] rounded-3xl py-5 hover:bg-[#FFF5F5] dark:hover:bg-[#DC3545]/10 transition-colors font-bold text-lg flex items-center justify-center"
            >
              {t.cancel}
            </button>
          </div>
        </div>
      </div>

      {/* Cancellation Dialog */}
      <CancellationDialog
        isOpen={isCancellationDialogOpen}
        onClose={() => setCancellationDialogOpen(false)}
        onConfirm={() => onNavigate("home")}
        language={language}
      />
    </div>
  );
}