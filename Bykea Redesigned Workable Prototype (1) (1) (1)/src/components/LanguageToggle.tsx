import { Globe } from "lucide-react";

interface LanguageToggleProps {
  language: "en" | "ur";
  onLanguageChange: (lang: "en" | "ur") => void;
}

export function LanguageToggle({ language, onLanguageChange }: LanguageToggleProps) {
  return (
    <div className="flex items-center gap-2 bg-[#F5F8F3] dark:bg-[#2A2A2A] rounded-full p-1">
      <button
        onClick={() => onLanguageChange("en")}
        className={`px-4 py-2 rounded-full font-bold transition-all ${
          language === "en"
            ? "bg-[#0CAA41] text-white shadow-sm"
            : "text-[#6B6B6B] dark:text-[#B0B0B0]"
        }`}
        style={{ fontSize: '14px', minWidth: '64px' }}
      >
        English
      </button>
      <button
        onClick={() => onLanguageChange("ur")}
        className={`px-4 py-2 rounded-full font-bold transition-all ${
          language === "ur"
            ? "bg-[#0CAA41] text-white shadow-sm"
            : "text-[#6B6B6B] dark:text-[#B0B0B0]"
        }`}
        style={{ fontSize: '14px', minWidth: '64px' }}
      >
        اردو
      </button>
    </div>
  );
}
