import { Volume2, VolumeX } from "lucide-react";
import { useVoiceAssist } from "./VoiceAssistContext";

interface GlobalSpeakerButtonProps {
  isActive?: boolean; // For backward compatibility
  onToggle?: () => void; // For backward compatibility
}

export function GlobalSpeakerButton({ isActive: externalActive, onToggle: externalToggle }: GlobalSpeakerButtonProps) {
  const voiceAssist = useVoiceAssist();
  
  // Use VoiceAssist context if available, otherwise fall back to props
  const isActive = externalActive !== undefined ? externalActive : voiceAssist.isActive;
  const handleToggle = externalToggle || voiceAssist.toggle;

  return (
    <button
      onClick={handleToggle}
      className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
        isActive 
          ? "bg-[#0CAA41] text-white shadow-lg" 
          : "bg-[#E0E0E0] dark:bg-[#2A2A2A] text-[#6B6B6B] dark:text-[#B0B0B0]"
      }`}
      aria-label={isActive ? "Voice Assist On - Tap to turn off" : "Voice Assist Off - Tap to turn on"}
      aria-pressed={isActive}
    >
      {isActive ? (
        <Volume2 className="w-5 h-5" strokeWidth={2.5} />
      ) : (
        <Volume2 className="w-5 h-5" strokeWidth={2.5} />
      )}
    </button>
  );
}