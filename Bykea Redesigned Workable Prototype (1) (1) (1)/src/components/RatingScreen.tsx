import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import { GlobalSpeakerButton } from "./GlobalSpeakerButton";
import { useReadAloud } from "./ReadAloudContext";

interface RatingScreenProps {
  onNavigate: (screen: string) => void;
  riderData?: any;
  speakerActive: boolean;
  onSpeakerToggle: () => void;
  language: "en" | "ur";
}

export function RatingScreen({ onNavigate, riderData, speakerActive, onSpeakerToggle, language }: RatingScreenProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const readAloud = useReadAloud();

  const text = {
    en: {
      title: "Rate Your Ride",
      question: "How was your experience?",
      comment: "Add a comment (optional)",
      submit: "Submit Rating & Continue",
      excellent: "Excellent! Thank you!",
      great: "Great ride!",
      good: "Good experience!",
      improve: "We'll improve!",
      sorry: "Sorry for the inconvenience"
    },
    ur: {
      title: "اپنی سواری کی درجہ بندی کریں",
      question: "آپ کا تجربہ کیسا رہا؟",
      comment: "تبصرہ شامل کریں (اختیاری)",
      submit: "درجہ بندی جمع کروائیں اور جاری رکھیں",
      excellent: "بہترین! شکریہ!",
      great: "زبردست سواری!",
      good: "اچھا تجربہ!",
      improve: "ہم بہتر کریں گے!",
      sorry: "تکلیف کے لیے معذرت"
    }
  };

  const t = text[language];

  // Text-to-speech when speaker is active
  useEffect(() => {
    if (speakerActive) {
      const ttsTexts = [
        t.title,
        riderData?.driverName || "Driver",
        riderData?.vehicle || "Vehicle",
        t.question
      ];
      readAloud.play(ttsTexts, 'Rating Screen');
    } else {
      readAloud.stop();
    }
  }, [speakerActive]);

  const handleSubmit = () => {
    if (rating > 0) {
      onNavigate("payment");
    }
  };

  const getFeedbackText = () => {
    if (rating === 5) return t.excellent;
    if (rating === 4) return t.great;
    if (rating === 3) return t.good;
    if (rating === 2) return t.improve;
    if (rating === 1) return t.sorry;
    return "";
  };

  return (
    <div className="flex flex-col h-screen bg-[#F5F8F3] dark:bg-[#121212]">
      {/* Header */}
      <div className="bg-white dark:bg-[#1E1E1E] px-5 py-6 border-b border-[#E0E0E0] dark:border-[#2A2A2A]">
        <div className="flex items-center justify-between">
          <div className="w-11"></div> {/* Spacer for centering */}
          <h2 className="text-[#1A1A1A] dark:text-white font-bold text-2xl flex-1 text-center">{t.title}</h2>
          <GlobalSpeakerButton isActive={speakerActive} onToggle={onSpeakerToggle} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 pt-12 pb-6 overflow-y-auto flex flex-col items-center">
        {/* Driver Info */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-8 mb-8 text-center w-full border border-[#E0E0E0] dark:border-[#2A2A2A]">
          <div className="w-24 h-24 bg-[#0CAA41]/10 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-4xl font-bold text-[#0CAA41]">
              {riderData?.driverName?.charAt(0) || "D"}
            </span>
          </div>
          <h3 className="text-[#1A1A1A] dark:text-white font-bold text-2xl mb-2">
            {riderData?.driverName || "Driver"}
          </h3>
          <p className="text-[#4A4A4A] dark:text-[#B0B0B0] font-bold text-lg">
            {riderData?.vehicle || "Vehicle"}
          </p>
        </div>

        {/* Rating Stars */}
        <div className="mb-8">
          <p className="text-center text-[#1A1A1A] dark:text-white font-bold text-xl mb-6">
            {t.question}
          </p>
          <div className="flex gap-4 justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-16 h-16 ${
                    star <= (hoveredRating || rating)
                      ? "fill-[#FFB800] text-[#FFB800]"
                      : "text-[#E0E0E0] dark:text-[#4A4A4A]"
                  }`}
                  strokeWidth={2}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Feedback Text */}
        {rating > 0 && (
          <div className="text-center mb-6">
            <p className="text-[#0CAA41] font-bold text-lg">
              {getFeedbackText()}
            </p>
          </div>
        )}

        {/* Optional Comment */}
        <div className="w-full mb-6">
          <textarea
            placeholder={t.comment}
            className="w-full bg-white dark:bg-[#1E1E1E] border-2 border-[#E0E0E0] dark:border-[#2A2A2A] rounded-3xl p-6 text-[#1A1A1A] dark:text-white font-semibold placeholder:text-[#4A4A4A] dark:placeholder:text-[#B0B0B0] resize-none focus:outline-none focus:border-[#0CAA41]"
            rows={4}
          />
        </div>
      </div>

      {/* Bottom Action */}
      <div className="bg-white dark:bg-[#1E1E1E] px-5 py-6 border-t border-[#E0E0E0] dark:border-[#2A2A2A]">
        <button
          onClick={handleSubmit}
          disabled={rating === 0}
          className={`w-full rounded-3xl py-7 transition-colors shadow-lg font-bold text-xl flex items-center justify-center ${
            rating > 0
              ? "bg-[#0CAA41] text-white hover:bg-[#0a8f37] shadow-[#0CAA41]/20"
              : "bg-[#E0E0E0] dark:bg-[#2A2A2A] text-[#4A4A4A] dark:text-[#B0B0B0] cursor-not-allowed"
          }`}
        >
          {t.submit}
        </button>
      </div>
    </div>
  );
}