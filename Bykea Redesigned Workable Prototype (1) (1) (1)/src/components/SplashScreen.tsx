import { useEffect } from "react";
import { motion } from "motion/react";
import { useVoiceAssistScreen } from "./useVoiceAssistScreen";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const voiceAssist = useVoiceAssistScreen({
    screenKey: 'splash',
    language: 'en',
    autoAnnounce: true
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-screen bg-[#0CAA41]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center"
      >
        {/* Bykea Logo */}
        <div className="mb-6">
          <div className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center shadow-2xl">
            <span className="text-[#0CAA41] font-bold" style={{ fontSize: '48px' }}>B</span>
          </div>
        </div>
        
        <motion.h1 
          className="text-white font-bold mb-2"
          style={{ fontSize: '42px' }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Bykea
        </motion.h1>
        
        <motion.p
          className="text-white/90"
          style={{ fontSize: '18px' }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Your Ride, Your Way
        </motion.p>
      </motion.div>
    </motion.div>
  );
}