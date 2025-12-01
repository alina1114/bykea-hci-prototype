import { ArrowLeft, Bike } from "lucide-react";
import { FloatingMicButton } from "./FloatingMicButton";
import { GlobalSpeakerButton } from "./GlobalSpeakerButton";
import { RickshawIcon } from "./icons/RickshawIcon";
import { CarIcon } from "./icons/CarIcon";
import { useReadAloud } from "./ReadAloudContext";
import { useEffect } from "react";

interface VehicleSelectionScreenProps {
  onNavigate: (screen: string, vehicleType?: string) => void;
  onVoiceClick: () => void;
  speakerActive: boolean;
  onSpeakerToggle: () => void;
  language: "en" | "ur";
}

export function VehicleSelectionScreen({ onNavigate, onVoiceClick, speakerActive, onSpeakerToggle, language }: VehicleSelectionScreenProps) {
  const readAloud = useReadAloud();

  const t = {
    en: {
      step: "Step 3 of 3",
      title: "Select Vehicle Type",
      subtitle: "Choose your ride",
      bike: "Bike",
      bikeDesc: "Quick & affordable rides",
      bikePrice: "From Rs. 150",
      rickshaw: "Rickshaw",
      rickshawDesc: "Comfortable short trips",
      rickshawPrice: "From Rs. 280",
      car: "Car",
      carDesc: "Premium travel experience",
      carPrice: "From Rs. 450"
    },
    ur: {
      step: "مرحلہ 3 از 3",
      title: "گاڑی کی قسم منتخب کریں",
      subtitle: "اپنی سواری منتخب کریں",
      bike: "بائیک",
      bikeDesc: "تیز اور سستی سواری",
      bikePrice: "150 روپے سے",
      rickshaw: "رکشہ",
      rickshawDesc: "آرام دہ مختصر سفر",
      rickshawPrice: "280 روپے سے",
      car: "کار",
      carDesc: "پریمیم سفر کا تجربہ",
      carPrice: "450 روپے سے"
    }
  };

  const texts = t[language];

  // Text-to-speech when speaker is active
  useEffect(() => {
    if (speakerActive) {
      const ttsTexts = [
        texts.step,
        texts.title,
        texts.subtitle,
        texts.bike,
        texts.bikeDesc,
        texts.bikePrice,
        texts.rickshaw,
        texts.rickshawDesc,
        texts.rickshawPrice,
        texts.car,
        texts.carDesc,
        texts.carPrice
      ];
      readAloud.play(ttsTexts, 'Vehicle Selection Screen');
    } else {
      readAloud.stop();
    }
  }, [speakerActive]);

  return (
    <div className="flex flex-col h-screen bg-[#F5F8F3] dark:bg-[#121212]">
      {/* Header */}
      <div className="bg-white dark:bg-[#1E1E1E] px-5 py-5 border-b border-[#E0E0E0] dark:border-[#2A2A2A]">
        <div className="flex items-center gap-4 mb-3">
          <button
            onClick={() => onNavigate("dropoff")}
            className="w-11 h-11 rounded-2xl bg-[#F5F8F3] dark:bg-[#2A2A2A] flex items-center justify-center hover:bg-[#E0E0E0] dark:hover:bg-[#3A3A3A] transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#1A1A1A] dark:text-white" strokeWidth={2.5} />
          </button>
          <div className="flex-1">
            <div className="text-sm text-[#4A4A4A] dark:text-[#B0B0B0] font-semibold">{texts.step}</div>
            <h2 className="text-[#1A1A1A] dark:text-white font-bold" style={{ fontSize: '20px' }}>{texts.title}</h2>
          </div>
          <GlobalSpeakerButton isActive={speakerActive} onToggle={onSpeakerToggle} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 pt-8 pb-6 overflow-y-auto">
        <h3 className="mb-6 text-[#1A1A1A] dark:text-white font-bold" style={{ fontSize: '18px' }}>{texts.subtitle}</h3>
        
        <div className="space-y-5">
          {/* Bike Option */}
          <button
            onClick={() => onNavigate("rideOptions", "bike")}
            className="w-full bg-white dark:bg-[#1E1E1E] rounded-3xl p-8 hover:shadow-xl transition-all border-2 border-transparent hover:border-[#0CAA41]"
          >
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-[#0CAA41]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Bike className="w-11 h-11 text-[#0CAA41]" strokeWidth={2.5} />
              </div>
              
              <div className="flex-1 text-left">
                <h3 className="text-[#1A1A1A] dark:text-white font-bold" style={{ fontSize: '22px' }}>{texts.bike}</h3>
                <p className="text-[#4A4A4A] dark:text-[#B0B0B0] font-semibold" style={{ fontSize: '16px' }}>{texts.bikeDesc}</p>
                <p className="text-[#0CAA41] font-bold" style={{ fontSize: '16px' }}>{texts.bikePrice}</p>
              </div>
            </div>
          </button>

          {/* Rickshaw Option */}
          <button
            onClick={() => onNavigate("rideOptions", "rickshaw")}
            className="w-full bg-white dark:bg-[#1E1E1E] rounded-3xl p-8 hover:shadow-xl transition-all border-2 border-transparent hover:border-[#0CAA41]"
          >
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-[#0CAA41]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <RickshawIcon className="w-12 h-12 text-[#0CAA41]" />
              </div>
              
              <div className="flex-1 text-left">
                <h3 className="text-[#1A1A1A] dark:text-white font-bold" style={{ fontSize: '22px' }}>{texts.rickshaw}</h3>
                <p className="text-[#4A4A4A] dark:text-[#B0B0B0] font-semibold" style={{ fontSize: '16px' }}>{texts.rickshawDesc}</p>
                <p className="text-[#0CAA41] font-bold" style={{ fontSize: '16px' }}>{texts.rickshawPrice}</p>
              </div>
            </div>
          </button>

          {/* Car Option */}
          <button
            onClick={() => onNavigate("rideOptions", "car")}
            className="w-full bg-white dark:bg-[#1E1E1E] rounded-3xl p-8 hover:shadow-xl transition-all border-2 border-transparent hover:border-[#0CAA41]"
          >
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-[#0CAA41]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <CarIcon className="w-11 h-11 text-[#0CAA41]" />
              </div>
              
              <div className="flex-1 text-left">
                <h3 className="text-[#1A1A1A] dark:text-white font-bold" style={{ fontSize: '22px' }}>{texts.car}</h3>
                <p className="text-[#4A4A4A] dark:text-[#B0B0B0] font-semibold" style={{ fontSize: '16px' }}>{texts.carDesc}</p>
                <p className="text-[#0CAA41] font-bold" style={{ fontSize: '16px' }}>{texts.carPrice}</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      <FloatingMicButton onClick={onVoiceClick} />
    </div>
  );
}