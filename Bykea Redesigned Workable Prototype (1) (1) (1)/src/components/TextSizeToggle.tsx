interface TextSizeToggleProps {
  currentSize: "small" | "medium" | "large";
  onSizeChange: (size: "small" | "medium" | "large") => void;
  compact?: boolean;
}

export function TextSizeToggle({ currentSize, onSizeChange, compact = false }: TextSizeToggleProps) {
  return (
    <div className={`flex items-center gap-1 bg-white dark:bg-[#1E1E1E] rounded-full p-1 shadow-sm border border-[#E0E0E0] dark:border-[#2A2A2A] ${compact ? 'scale-90' : ''}`}>
      <button
        onClick={() => onSizeChange("small")}
        className={`${compact ? 'px-3 py-1.5' : 'px-4 py-2'} rounded-full transition-colors font-bold ${
          currentSize === "small"
            ? "bg-[#0CAA41] text-white"
            : "text-[#4A4A4A] dark:text-[#B0B0B0] hover:bg-[#F5F8F3] dark:hover:bg-[#2A2A2A]"
        }`}
        style={{ fontSize: compact ? "14px" : "16px" }}
      >
        S
      </button>
      <button
        onClick={() => onSizeChange("medium")}
        className={`${compact ? 'px-3 py-1.5' : 'px-4 py-2'} rounded-full transition-colors font-bold ${
          currentSize === "medium"
            ? "bg-[#0CAA41] text-white"
            : "text-[#4A4A4A] dark:text-[#B0B0B0] hover:bg-[#F5F8F3] dark:hover:bg-[#2A2A2A]"
        }`}
        style={{ fontSize: compact ? "16px" : "18px" }}
      >
        M
      </button>
      <button
        onClick={() => onSizeChange("large")}
        className={`${compact ? 'px-3 py-1.5' : 'px-4 py-2'} rounded-full transition-colors font-bold ${
          currentSize === "large"
            ? "bg-[#0CAA41] text-white"
            : "text-[#4A4A4A] dark:text-[#B0B0B0] hover:bg-[#F5F8F3] dark:hover:bg-[#2A2A2A]"
        }`}
        style={{ fontSize: compact ? "18px" : "20px" }}
      >
        L
      </button>
    </div>
  );
}