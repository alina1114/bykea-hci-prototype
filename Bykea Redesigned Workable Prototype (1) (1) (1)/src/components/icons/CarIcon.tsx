export function CarIcon({ className = "w-9 h-9" }: { className?: string }) {
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
      {/* Car body */}
      <path d="M5 11 L6 8 L8 6 L16 6 L18 8 L19 11 Z" fill="currentColor" opacity="0.2" />
      <path d="M5 11 L6 8 L8 6 L16 6 L18 8 L19 11" />
      <rect x="3" y="11" width="18" height="6" rx="1.5" />
      {/* Windows */}
      <path d="M7 8 L7 11 L11 11 L11 8" />
      <path d="M13 8 L13 11 L17 11 L17 8" />
      {/* Wheels */}
      <circle cx="6.5" cy="17" r="2" />
      <circle cx="17.5" cy="17" r="2" />
      {/* Wheel details */}
      <circle cx="6.5" cy="17" r="0.8" fill="currentColor" />
      <circle cx="17.5" cy="17" r="0.8" fill="currentColor" />
    </svg>
  );
}
