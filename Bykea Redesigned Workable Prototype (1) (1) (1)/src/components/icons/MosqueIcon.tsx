export function MosqueIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Main Dome */}
      <path d="M5 12 C5 9, 8 7, 12 7 C16 7, 19 9, 19 12" fill="currentColor" opacity="0.15" />
      <path d="M5 12 C5 9, 8 7, 12 7 C16 7, 19 9, 19 12" />
      
      {/* Base building */}
      <rect x="4" y="12" width="16" height="8" rx="1" />
      <line x1="4" y1="16" x2="20" y2="16" />
      
      {/* Door */}
      <path d="M10 20 L10 16 L14 16 L14 20" />
      
      {/* Left Minaret */}
      <rect x="2" y="9" width="2" height="11" rx="0.5" />
      <circle cx="3" cy="8" r="1" fill="currentColor" />
      <path d="M2.5 7 L3.5 7 L3.5 6 L2.5 6 Z" fill="currentColor" />
      
      {/* Right Minaret */}
      <rect x="20" y="9" width="2" height="11" rx="0.5" />
      <circle cx="21" cy="8" r="1" fill="currentColor" />
      <path d="M20.5 7 L21.5 7 L21.5 6 L20.5 6 Z" fill="currentColor" />
      
      {/* Crescent on dome */}
      <path d="M12 7 L12 4" strokeWidth="1.5" />
      <path d="M11.5 3.5 C11.5 2.8, 12 2.5, 12.5 2.5 C12.2 3, 12.2 3.5, 12.5 4" strokeWidth="1" fill="none" />
    </svg>
  );
}