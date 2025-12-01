import { Mic, X } from "lucide-react";
import { useState, useEffect } from "react";

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VoiceAssistantModal({ isOpen, onClose }: VoiceAssistantModalProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    if (isOpen) {
      setIsListening(true);
      setTranscript("");
      
      // Simulate listening after 2 seconds
      setTimeout(() => {
        setTranscript("I want to go to...");
      }, 1500);
    } else {
      setIsListening(false);
      setTranscript("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl w-full max-w-md p-8 relative border border-[#E0E0E0] dark:border-[#2A2A2A]">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#F5F8F3] dark:bg-[#2A2A2A] flex items-center justify-center hover:bg-[#E0E0E0] dark:hover:bg-[#3A3A3A] transition-colors"
        >
          <X className="w-5 h-5 text-[#1A1A1A] dark:text-white" />
        </button>

        <div className="text-center">
          <div className="mb-8">
            <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center ${
              isListening ? "bg-[#0CAA41] animate-pulse" : "bg-[#E0E0E0] dark:bg-[#2A2A2A]"
            }`}>
              <Mic className="w-12 h-12 text-white" strokeWidth={2.5} />
            </div>
          </div>

          <h2 className="mb-4 font-bold text-[#1A1A1A] dark:text-white">
            {isListening ? "Listening..." : "Tap to speak"}
          </h2>

          {transcript && (
            <div className="bg-[#F5F8F3] dark:bg-[#2A2A2A] rounded-2xl p-6 mb-6 border border-[#E0E0E0] dark:border-[#3A3A3A]">
              <p className="text-[#1A1A1A] dark:text-white font-bold" style={{ fontSize: "1.1rem" }}>
                "{transcript}"
              </p>
            </div>
          )}

          <p className="text-[#4A4A4A] dark:text-[#B0B0B0] mb-8 font-semibold">
            You can say things like:<br />
            "Take me to the hospital"<br />
            "I want to go home"
          </p>

          {transcript && (
            <button
              onClick={onClose}
              className="w-full bg-[#0CAA41] text-white rounded-2xl py-5 hover:bg-[#0a8f37] transition-colors shadow-lg font-bold"
            >
              Confirm Choice
            </button>
          )}
        </div>
      </div>
    </div>
  );
}