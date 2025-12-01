import { Phone, X } from "lucide-react";
import { motion } from "motion/react";

interface CallDriverModalProps {
  isOpen: boolean;
  onClose: () => void;
  driverName: string;
  language: "en" | "ur";
}

export function CallDriverModal({ isOpen, onClose, driverName, language }: CallDriverModalProps) {
  if (!isOpen) return null;

  const text = {
    en: {
      calling: "Calling",
      cancel: "Cancel"
    },
    ur: {
      calling: "کال کر رہے ہیں",
      cancel: "منسوخ کریں"
    }
  };

  const t = text[language];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-8 w-full max-w-sm relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#F5F8F3] dark:hover:bg-[#2A2A2A] transition-colors"
        >
          <X className="w-5 h-5 text-[#6B6B6B] dark:text-[#B0B0B0]" strokeWidth={2.5} />
        </button>

        {/* Driver Avatar */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-[#0CAA41]/10 rounded-full flex items-center justify-center mb-4">
            <span className="text-[#0CAA41] font-bold" style={{ fontSize: '32px' }}>
              {driverName.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          
          <h3 className="text-[#1A1A1A] dark:text-white font-bold mb-2" style={{ fontSize: '24px' }}>
            {driverName}
          </h3>
          
          <p className="text-[#6B6B6B] dark:text-[#B0B0B0] font-bold" style={{ fontSize: '16px' }}>
            {t.calling}...
          </p>
        </div>

        {/* Animated Phone Icon */}
        <div className="flex justify-center mb-8">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-16 h-16 bg-[#0CAA41] rounded-full flex items-center justify-center"
          >
            <Phone className="w-7 h-7 text-white" strokeWidth={2.5} />
          </motion.div>
        </div>

        {/* Cancel Button */}
        <button
          onClick={onClose}
          className="w-full bg-[#DC3545] text-white rounded-2xl py-4 font-bold hover:bg-[#c82333] transition-colors"
          style={{ fontSize: '18px', height: '56px' }}
        >
          {t.cancel}
        </button>
      </motion.div>
    </div>
  );
}
