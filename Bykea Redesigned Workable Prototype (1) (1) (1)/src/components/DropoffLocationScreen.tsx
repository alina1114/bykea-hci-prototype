import { MapPin, Search, ArrowLeft } from "lucide-react";

interface DropoffLocationScreenProps {
  onNavigate: (screen: string) => void;
}

export function DropoffLocationScreen({ onNavigate }: DropoffLocationScreenProps) {
  return (
    <div className="flex flex-col h-screen bg-[#F8FAF9]">
      {/* Step Indicator */}
      <div className="bg-white border-b-2 border-[#d0d0d0] px-5 py-5">
        <div className="flex items-center gap-3 mb-2">
          <button 
            onClick={() => onNavigate("pickup")}
            className="p-2 hover:bg-[#F8FAF9] rounded-xl transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#1F1F1F]" strokeWidth={2} />
          </button>
          <h2 className="text-[#1F1F1F]">Step 2 of 3</h2>
        </div>
        <p className="text-[#5a5a5a] ml-14">Select Destination</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white px-5 py-4 border-b-2 border-[#d0d0d0]">
        <div className="bg-[#F8FAF9] rounded-2xl p-4 flex items-center gap-3">
          <Search className="w-6 h-6 text-[#5a5a5a]" strokeWidth={2} />
          <input 
            type="text" 
            placeholder="Search destination or move the pin"
            className="bg-transparent flex-1 outline-none text-[#1F1F1F] placeholder:text-[#5a5a5a]"
          />
        </div>
      </div>

      {/* Map */}
      <div className="relative flex-1 bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9]">
        <div className="absolute inset-0 flex items-center justify-center">
          <MapPin className="w-20 h-20 text-[#E57373] animate-bounce" strokeWidth={2} />
        </div>
        
        {/* Instruction */}
        <div className="absolute top-6 left-0 right-0 mx-5">
          <div className="bg-white rounded-2xl shadow-lg p-4 text-center">
            <p className="text-[#1F1F1F]">Move the pin to your destination</p>
          </div>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="bg-white px-5 py-6 space-y-3 border-t-2 border-[#d0d0d0]">
        <button 
          onClick={() => onNavigate("rideOptions")}
          className="w-full bg-[#6CAC78] text-white rounded-2xl p-5 hover:bg-[#5a9566] transition-colors"
        >
          Confirm Destination
        </button>
        
        <button 
          onClick={() => onNavigate("pickup")}
          className="w-full bg-white border-2 border-[#d0d0d0] text-[#1F1F1F] rounded-2xl p-5 hover:bg-[#F8FAF9] transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
