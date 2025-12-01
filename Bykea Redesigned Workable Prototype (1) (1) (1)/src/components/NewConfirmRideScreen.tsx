import { Star, ArrowLeft, Bike, AlertCircle, Volume2 } from "lucide-react";
import { FloatingMicButton } from "./FloatingMicButton";
import { RickshawIcon } from "./icons/RickshawIcon";
import { CarIcon } from "./icons/CarIcon";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { GlobalSpeakerButton } from "./GlobalSpeakerButton";
import { useReadAloud } from "./ReadAloudContext";
import { useEffect } from "react";

interface NewConfirmRideScreenProps {
  onNavigate: (screen: string) => void;
  onVoiceClick: () => void;
  riderData?: any;
  speakerActive: boolean;
  onSpeakerToggle: () => void;
  language: "en" | "ur";
}

export function NewConfirmRideScreen({ onNavigate, onVoiceClick, riderData, speakerActive, onSpeakerToggle, language }: NewConfirmRideScreenProps) {
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
      title: "Confirm Your Ride",
      pickup: "Pickup",
      destination: "Destination",
      currentLocation: "Your Current Location",
      destinationText: "Safari Park, University Road",
      totalFare: "Total Fare",
      confirmButton: "Confirm Ride",
      cancelButton: "Cancel",
      rides: "rides"
    },
    ur: {
      title: "اپنی سواری کی تصدیق کریں",
      pickup: "پک اپ",
      destination: "منزل",
      currentLocation: "آپ کا موجودہ مقام",
      destinationText: "سفاری پارک، یونیورسٹی روڈ",
      totalFare: "کل کرایہ",
      confirmButton: "سواری کی تصدیق کریں",
      cancelButton: "منسوخ کریں",
      rides: "سواریاں"
    }
  };

  const t = text[language];

  // Text-to-speech when speaker is active
  useEffect(() => {
    if (speakerActive) {
      const ttsTexts = [
        t.title,
        driverName,
        vehicleType,
        vehicleNumber,
        `${language === 'en' ? 'Rating' : 'درجہ بندی'} ${rating}`,
        t.totalFare,
        fare,
        t.confirmButton
      ];
      readAloud.play(ttsTexts, 'Confirm Ride Screen');
    } else {
      readAloud.stop();
    }
  }, [speakerActive]);

  const playAudio = (text: string) => {
    console.log(`Playing audio: ${text}`);
  };

  return (
    <div className="flex flex-col h-screen bg-[#F5F8F3] dark:bg-[#121212]">
      {/* Header */}
      <div className="bg-white dark:bg-[#1E1E1E] px-5 py-5 border-b border-[#E0E0E0] dark:border-[#2A2A2A]">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => onNavigate("rideOptions")}
            className="w-11 h-11 rounded-2xl bg-[#F5F8F3] dark:bg-[#2A2A2A] flex items-center justify-center hover:bg-[#E0E0E0] dark:hover:bg-[#3A3A3A] transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#1A1A1A] dark:text-white" strokeWidth={2.5} />
          </button>
          <h2 className="text-[#1A1A1A] dark:text-white font-bold text-xl flex-1 text-center">{t.title}</h2>
          {/* Speaker Button - Top Right */}
          <GlobalSpeakerButton isActive={speakerActive} onToggle={onSpeakerToggle} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 pt-6 pb-6 overflow-y-auto space-y-5">
        {/* Driver Card */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 border border-[#E0E0E0] dark:border-[#2A2A2A]">
          <div className="flex items-center gap-5 mb-6">
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
                <span className="text-[#4A4A4A] dark:text-[#B0B0B0] font-semibold">(245 {t.rides})</span>
              </div>
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="bg-[#F5F8F3] dark:bg-[#2A2A2A] rounded-2xl p-5 mb-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white dark:bg-[#1E1E1E] rounded-2xl flex items-center justify-center">
                {icon === "bike" && <Bike className="w-7 h-7 text-[#0CAA41]" strokeWidth={2.5} />}
                {icon === "rickshaw" && <RickshawIcon className="w-8 h-8 text-[#0CAA41]" />}
                {icon === "car" && <CarIcon className="w-7 h-7 text-[#0CAA41]" />}
              </div>
              <div className="flex-1">
                <div className="text-[#1A1A1A] dark:text-white mb-1 font-bold">{vehicleType}</div>
                <div className="text-[#4A4A4A] dark:text-[#B0B0B0] font-bold">{vehicleNumber}</div>
              </div>
            </div>
          </div>

          {/* Trip Details */}
          <div className="space-y-4 pb-5 border-b border-[#E0E0E0] dark:border-[#2A2A2A]">
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 rounded-full bg-[#0CAA41] mt-2"></div>
              <div className="flex-1">
                <div className="text-sm text-[#4A4A4A] dark:text-[#B0B0B0] mb-1 font-semibold">{t.pickup}</div>
                <div className="text-[#1A1A1A] dark:text-white font-bold">{t.currentLocation}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 rounded-full bg-[#DC3545] mt-2"></div>
              <div className="flex-1">
                <div className="text-sm text-[#4A4A4A] dark:text-[#B0B0B0] mb-1 font-semibold">{t.destination}</div>
                <div className="text-[#1A1A1A] dark:text-white font-bold">{t.destinationText}</div>
              </div>
            </div>
          </div>

          {/* Fare */}
          <div className="pt-5">
            <div className="flex items-center justify-between">
              <span className="text-[#4A4A4A] dark:text-[#B0B0B0] font-bold">{t.totalFare}</span>
              <span className="text-[#0CAA41] text-3xl font-bold">{fare}</span>
            </div>
          </div>
        </div>

        {/* Warning Notice */}
        <div className="bg-[#FFF9E6] dark:bg-[#FFB800]/10 border-2 border-[#FFB800]/30 rounded-2xl p-5 flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-[#FFB800] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
          <p className="text-[#1A1A1A] dark:text-white font-bold">
            Please verify the driver name and vehicle number before getting in
          </p>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="bg-white dark:bg-[#1E1E1E] px-5 py-6 space-y-3 border-t border-[#E0E0E0] dark:border-[#2A2A2A]">
        <button
          onClick={() => onNavigate("driverOnWay")}
          className="w-full bg-[#0CAA41] text-white rounded-3xl py-7 hover:bg-[#0a8f37] transition-colors shadow-lg shadow-[#0CAA41]/20 font-bold text-2xl flex items-center justify-center"
        >
          {t.confirmButton}
        </button>
        <button
          onClick={() => onNavigate("rideOptions")}
          className="w-full bg-white dark:bg-[#1E1E1E] border-2 border-[#DC3545] text-[#DC3545] rounded-3xl py-5 hover:bg-[#FFF5F5] dark:hover:bg-[#DC3545]/10 transition-colors font-bold text-lg flex items-center justify-center"
        >
          {t.cancelButton}
        </button>
      </div>

      <FloatingMicButton onClick={onVoiceClick} />
    </div>
  );
}