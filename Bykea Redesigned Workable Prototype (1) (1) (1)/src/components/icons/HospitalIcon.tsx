export function HospitalIcon({ className = "w-7 h-7" }: { className?: string }) {
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
      {/* Building */}
      <rect x="4" y="4" width="16" height="16" rx="2" />
      
      {/* Cross - Vertical */}
      <rect x="10.5" y="7" width="3" height="10" fill="currentColor" />
      
      {/* Cross - Horizontal */}
      <rect x="8" y="10.5" width="8" height="3" fill="currentColor" />
      
      {/* Windows */}
      <rect x="7" y="18" width="2" height="2" opacity="0.3" />
      <rect x="15" y="18" width="2" height="2" opacity="0.3" />
    </svg>
  );
}