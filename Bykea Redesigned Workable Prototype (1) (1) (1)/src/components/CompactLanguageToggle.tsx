interface CompactLanguageToggleProps {
  language: "en" | "ur";
  onLanguageChange: (lang: "en" | "ur") => void;
}

export function CompactLanguageToggle({ language, onLanguageChange }: CompactLanguageToggleProps) {
  return (
    <div className="flex items-center gap-1 bg-[#F5F8F3] dark:bg-[#2A2A2A] rounded-full p-1">
      <button
        onClick={() => onLanguageChange("en")}
        className={`px-3 py-1.5 rounded-full font-bold transition-all text-xs ${
          language === "en"
            ? "bg-[#0CAA41] text-white shadow-sm"
            : "text-[#6B6B6B] dark:text-[#B0B0B0]"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => onLanguageChange("ur")}
        className={`px-3 py-1.5 rounded-full font-bold transition-all text-xs ${
          language === "ur"
            ? "bg-[#0CAA41] text-white shadow-sm"
            : "text-[#6B6B6B] dark:text-[#B0B0B0]"
        }`}
      >
        UR
      </button>
    </div>
  );
}
