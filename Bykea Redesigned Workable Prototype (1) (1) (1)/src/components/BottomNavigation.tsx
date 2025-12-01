import { Home, History, User } from "lucide-react";

interface BottomNavigationProps {
  activeTab: "home" | "history" | "profile";
  onTabChange: (tab: "home" | "history" | "profile") => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#d0d0d0] mx-auto max-w-md">
      <div className="grid grid-cols-3 h-20">
        <button
          onClick={() => onTabChange("home")}
          className={`flex flex-col items-center justify-center gap-1.5 transition-colors ${
            activeTab === "home"
              ? "bg-[#6CAC78]/10 text-[#6CAC78]"
              : "text-[#5a5a5a] hover:text-[#1F1F1F]"
          }`}
        >
          <Home className="w-7 h-7" strokeWidth={2} />
          <span className="text-[0.94rem]">Home</span>
        </button>
        
        <button
          onClick={() => onTabChange("history")}
          className={`flex flex-col items-center justify-center gap-1.5 transition-colors ${
            activeTab === "history"
              ? "bg-[#6CAC78]/10 text-[#6CAC78]"
              : "text-[#5a5a5a] hover:text-[#1F1F1F]"
          }`}
        >
          <History className="w-7 h-7" strokeWidth={2} />
          <span className="text-[0.94rem]">Rides History</span>
        </button>
        
        <button
          onClick={() => onTabChange("profile")}
          className={`flex flex-col items-center justify-center gap-1.5 transition-colors ${
            activeTab === "profile"
              ? "bg-[#6CAC78]/10 text-[#6CAC78]"
              : "text-[#5a5a5a] hover:text-[#1F1F1F]"
          }`}
        >
          <User className="w-7 h-7" strokeWidth={2} />
          <span className="text-[0.94rem]">Profile</span>
        </button>
      </div>
    </div>
  );
}
