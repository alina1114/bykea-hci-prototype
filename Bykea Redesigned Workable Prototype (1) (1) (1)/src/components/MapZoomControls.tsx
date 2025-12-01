import { Plus, Minus } from "lucide-react";

interface MapZoomControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export function MapZoomControls({ onZoomIn, onZoomOut }: MapZoomControlsProps) {
  return (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
      <button
        onClick={onZoomIn}
        className="w-11 h-11 bg-white dark:bg-[#1E1E1E] rounded-full shadow-lg flex items-center justify-center border border-[#E0E0E0] dark:border-[#2A2A2A] hover:bg-[#F5F8F3] dark:hover:bg-[#2A2A2A] transition-colors"
        aria-label="Zoom In"
      >
        <Plus className="w-5 h-5 text-[#1A1A1A] dark:text-white" strokeWidth={2.5} />
      </button>
      <button
        onClick={onZoomOut}
        className="w-11 h-11 bg-white dark:bg-[#1E1E1E] rounded-full shadow-lg flex items-center justify-center border border-[#E0E0E0] dark:border-[#2A2A2A] hover:bg-[#F5F8F3] dark:hover:bg-[#2A2A2A] transition-colors"
        aria-label="Zoom Out"
      >
        <Minus className="w-5 h-5 text-[#1A1A1A] dark:text-white" strokeWidth={2.5} />
      </button>
    </div>
  );
}
