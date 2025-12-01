import { Mic } from "lucide-react";

interface MicButtonProps {
  onClick: (e: React.MouseEvent) => void;
  className?: string;
}

export function MicButton({ onClick, className = "" }: MicButtonProps) {
  return (
    <div 
      onClick={onClick}
      className={`w-12 h-12 bg-gradient-to-br from-[#0CAA41] to-[#0a8f37] rounded-full flex items-center justify-center cursor-pointer hover:shadow-xl hover:scale-105 transition-all shadow-lg ${className}`}
      role="button"
      tabIndex={0}
      aria-label="Voice Search"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(e as any);
        }
      }}
    >
      <Mic className="w-5 h-5 text-white" strokeWidth={2.5} />
    </div>
  );
}
