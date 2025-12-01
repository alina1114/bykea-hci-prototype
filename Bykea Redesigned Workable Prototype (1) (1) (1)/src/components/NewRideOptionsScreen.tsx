import { Bike, ArrowLeft, Star } from "lucide-react";
import { GlobalSpeakerButton } from "./GlobalSpeakerButton";
import { RickshawIcon } from "./icons/RickshawIcon";
import { CarIcon } from "./icons/CarIcon";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useReadAloud } from "./ReadAloudContext";

interface NewRideOptionsScreenProps {
  onNavigate: (screen: string, riderData?: any) => void;
  onVoiceClick: () => void;
  vehicleType?: string;
  speakerActive: boolean;
  onSpeakerToggle: () => void;
  language: "en" | "ur";
}

interface Rider {
  id: string;
  name: string;
  driverName: string;
  rating: number;
  vehicle: string;
  fare: string;
  time: string;
  icon: string;
  timer: number;
  photo: string;
}

export function NewRideOptionsScreen({ 
  onNavigate, 
  onVoiceClick, 
  vehicleType = "bike",
  speakerActive,
  onSpeakerToggle,
  language 
}: NewRideOptionsScreenProps) {
  const allRiders: Rider[] = [
    {
      id: "bike1",
      name: "Bike",
      driverName: "Ahmed Khan",
      rating: 4.8,
      vehicle: "CD 70",
      fare: "Rs. 150",
      time: "4–6 min",
      icon: "bike",
      timer: 45,
      photo: "https://images.unsplash.com/photo-1656339504243-2df4c5ebf1c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBmYWNlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYzODA0Njc4fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: "bike2",
      name: "Bike",
      driverName: "Ali Raza",
      rating: 4.9,
      vehicle: "Honda 125",
      fare: "Rs. 160",
      time: "5–7 min",
      icon: "bike",
      timer: 30,
      photo: "https://images.unsplash.com/photo-1633177188754-980c2a6b6266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMG1hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2Mzg4NDAxM3ww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: "bike3",
      name: "Bike",
      driverName: "Hassan Ali",
      rating: 4.6,
      vehicle: "CD 70",
      fare: "Rs. 155",
      time: "6–8 min",
      icon: "bike",
      timer: 60,
      photo: "https://images.unsplash.com/photo-1762286801642-15824347594b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWRkbGUlMjBlYXN0ZXJuJTIwbWFuJTIwZmFjZXxlbnwxfHx8fDE3NjM5MDAxODl8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: "rickshaw1",
      name: "Rickshaw",
      driverName: "Imran Siddiqui",
      rating: 4.7,
      vehicle: "KHI-1234",
      fare: "Rs. 280",
      time: "6–8 min",
      icon: "rickshaw",
      timer: 50,
      photo: "https://images.unsplash.com/photo-1707311074290-0cf35829db86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWtpc3RhbmklMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjM5MDAxODl8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: "rickshaw2",
      name: "Rickshaw",
      driverName: "Zahid Hussain",
      rating: 4.6,
      vehicle: "KHI-5678",
      fare: "Rs. 290",
      time: "8–10 min",
      icon: "rickshaw",
      timer: 40,
      photo: "https://images.unsplash.com/photo-1626560167217-bd5e9aebb32e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3V0aCUyMGFzaWFuJTIwbWFuJTIwZmFjZXxlbnwxfHx8fDE3NjM5MDAxOTB8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: "rickshaw3",
      name: "Rickshaw",
      driverName: "Rashid Khan",
      rating: 4.8,
      vehicle: "KHI-9012",
      fare: "Rs. 275",
      time: "5–7 min",
      icon: "rickshaw",
      timer: 35,
      photo: "https://images.unsplash.com/photo-1649433658557-54cf58577c68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtYW4lMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjM4OTY1MTN8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: "car1",
      name: "Car",
      driverName: "Shahid Malik",
      rating: 4.9,
      vehicle: "Civic ABC-123",
      fare: "Rs. 450",
      time: "5–7 min",
      icon: "car",
      timer: 55,
      photo: "https://images.unsplash.com/photo-1656339504243-2df4c5ebf1c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBmYWNlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYzODA0Njc4fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: "car2",
      name: "Car",
      driverName: "Farhan Ahmed",
      rating: 4.7,
      vehicle: "Corolla XYZ-456",
      fare: "Rs. 460",
      time: "7–9 min",
      icon: "car",
      timer: 25,
      photo: "https://images.unsplash.com/photo-1633177188754-980c2a6b6266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMG1hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2Mzg4NDAxM3ww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: "car3",
      name: "Car",
      driverName: "Kamran Shah",
      rating: 4.8,
      vehicle: "City DEF-789",
      fare: "Rs. 455",
      time: "6–8 min",
      icon: "car",
      timer: 42,
      photo: "https://images.unsplash.com/photo-1762286801642-15824347594b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWRkbGUlMjBlYXN0ZXJuJTIwbWFuJTIwZmFjZXxlbnwxfHx8fDE3NjM5MDAxODl8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
  ];

  const text = {
    en: {
      title: "Choose Your Ride",
      available: "Available Riders",
      noRiders: "No riders available",
      expiresIn: "Expires in"
    },
    ur: {
      title: "اپنی سواری منتخب کریں",
      available: "دستیاب سواریاں",
      noRiders: "کوئی سوار دستیاب نہیں",
      expiresIn: "ختم ہو رہا ہے"
    }
  };

  const t = text[language];

  const [riders, setRiders] = useState<Rider[]>([]);
  const [sortBy, setSortBy] = useState<'time' | 'fare' | 'rating'>('time');
  const readAloud = useReadAloud();

  // Text-to-speech when speaker is active
  useEffect(() => {
    if (speakerActive) {
      const ttsTexts = [
        t.title,
        t.available,
        ...riders.slice(0, 3).map(rider => 
          `${rider.driverName}, ${language === 'en' ? 'Rating' : 'ریٹنگ'} ${rider.rating}, ${rider.fare}, ${rider.time}`
        )
      ];
      readAloud.play(ttsTexts, 'Ride Options Screen');
    } else {
      readAloud.stop();
    }
  }, [speakerActive, riders.length]);

  // Filter and sort riders based on vehicle type and sort method
  useEffect(() => {
    const filtered = allRiders.filter(r => r.icon === vehicleType.toLowerCase());
    
    // Sort the filtered riders
    const sorted = [...filtered];
    switch(sortBy) {
      case 'time':
        // Parse time string "4–6 min" and sort by average time
        sorted.sort((a, b) => {
          const avgA = parseInt(a.time.split('–')[0]);
          const avgB = parseInt(b.time.split('–')[0]);
          return avgA - avgB;
        });
        break;
      case 'fare':
        // Parse fare string "Rs. 150" and sort by price
        sorted.sort((a, b) => {
          const fareA = parseInt(a.fare.replace('Rs. ', ''));
          const fareB = parseInt(b.fare.replace('Rs. ', ''));
          return fareA - fareB;
        });
        break;
      case 'rating':
        // Sort by rating (highest first)
        sorted.sort((a, b) => b.rating - a.rating);
        break;
    }
    
    setRiders(sorted);
  }, [vehicleType, sortBy]);

  // Countdown timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setRiders(prevRiders => {
        const updated = prevRiders
          .map(rider => ({
            ...rider,
            timer: rider.timer - 1
          }))
          .filter(rider => rider.timer > 0); // Remove expired offers
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getVehicleIcon = (icon: string) => {
    switch(icon) {
      case "bike": return <Bike className="w-6 h-6 text-[#0CAA41]" strokeWidth={2.5} />;
      case "rickshaw": return <RickshawIcon className="w-6 h-6 text-[#0CAA41]" />;
      case "car": return <CarIcon className="w-6 h-6 text-[#0CAA41]" />;
      default: return <Bike className="w-6 h-6 text-[#0CAA41]" strokeWidth={2.5} />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#F5F8F3] dark:bg-[#121212]">
      {/* Header */}
      <div className="bg-white dark:bg-[#1E1E1E] px-6 py-4 flex items-center justify-between border-b border-[#E0E0E0] dark:border-[#2A2A2A]">
        <button 
          onClick={() => onNavigate("vehicleSelection")}
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
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        <h2 className="text-[#1A1A1A] dark:text-white font-bold mb-4" style={{ fontSize: '18px' }}>
          {t.available}
        </h2>

        {/* Sorting Buttons */}
        <div className="flex gap-3 mb-5">
          <button
            onClick={() => setSortBy('time')}
            className={`px-6 py-3 rounded-full font-bold transition-all ${
              sortBy === 'time'
                ? 'bg-[#0CAA41] text-white shadow-md'
                : 'bg-white dark:bg-[#1E1E1E] text-[#1A1A1A] dark:text-white border border-[#E0E0E0] dark:border-[#2A2A2A]'
            }`}
            style={{ fontSize: '14px' }}
          >
            {language === 'en' ? 'Nearest' : 'قریب ترین'}
          </button>
          <button
            onClick={() => setSortBy('fare')}
            className={`px-6 py-3 rounded-full font-bold transition-all ${
              sortBy === 'fare'
                ? 'bg-[#0CAA41] text-white shadow-md'
                : 'bg-white dark:bg-[#1E1E1E] text-[#1A1A1A] dark:text-white border border-[#E0E0E0] dark:border-[#2A2A2A]'
            }`}
            style={{ fontSize: '14px' }}
          >
            {language === 'en' ? 'Lowest Fare' : 'کم ترین کرایہ'}
          </button>
          <button
            onClick={() => setSortBy('rating')}
            className={`px-6 py-3 rounded-full font-bold transition-all ${
              sortBy === 'rating'
                ? 'bg-[#0CAA41] text-white shadow-md'
                : 'bg-white dark:bg-[#1E1E1E] text-[#1A1A1A] dark:text-white border border-[#E0E0E0] dark:border-[#2A2A2A]'
            }`}
            style={{ fontSize: '14px' }}
          >
            {language === 'en' ? 'Highest Rating' : 'بہترین ریٹنگ'}
          </button>
        </div>

        {riders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#6B6B6B] dark:text-[#B0B0B0] font-bold" style={{ fontSize: '16px' }}>
              {t.noRiders}
            </p>
          </div>
        ) : (
          <motion.div className="space-y-4" layout>
            <AnimatePresence mode="popLayout">
              {riders.map((rider) => (
                <motion.button
                  key={rider.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ 
                    layout: { duration: 0.5, ease: "easeInOut" },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 }
                  }}
                  onClick={() => onNavigate("confirmRide", rider)}
                  className="w-full bg-white dark:bg-[#1E1E1E] rounded-3xl p-5 border border-[#E0E0E0] dark:border-[#2A2A2A] hover:shadow-lg hover:border-[#0CAA41] transition-all"
                >
                  <div className="flex items-center gap-4">
                    {/* Driver Photo */}
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#E0E0E0] dark:border-[#2A2A2A]">
                      <ImageWithFallback
                        src={rider.photo}
                        alt={rider.driverName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Driver Info */}
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-[#1A1A1A] dark:text-white font-bold" style={{ fontSize: '18px' }}>
                          {rider.driverName}
                        </h3>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-[#FFB800] text-[#FFB800]" />
                          <span className="text-[#1A1A1A] dark:text-white font-bold" style={{ fontSize: '14px' }}>
                            {rider.rating}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getVehicleIcon(rider.icon)}
                        <span className="text-[#6B6B6B] dark:text-[#B0B0B0] font-bold" style={{ fontSize: '14px' }}>
                          {rider.vehicle}
                        </span>
                        <span className="text-[#6B6B6B] dark:text-[#B0B0B0]">•</span>
                        <span className="text-[#6B6B6B] dark:text-[#B0B0B0] font-bold" style={{ fontSize: '14px' }}>
                          {rider.time}
                        </span>
                      </div>
                    </div>

                    {/* Price & Timer */}
                    <div className="text-right">
                      <div className="text-[#0CAA41] font-bold mb-1" style={{ fontSize: '20px' }}>
                        {rider.fare}
                      </div>
                      <div className="text-[#DC3545] font-bold" style={{ fontSize: '12px' }}>
                        {formatTime(rider.timer)}
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}