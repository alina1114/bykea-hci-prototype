import { Search, Home, MapPin, Building2, ShoppingBag, MicVocal, User, Plus, Minus } from "lucide-react";
import { BottomNavigation } from "./BottomNavigation";

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <div className="flex flex-col h-screen bg-[#F8FAF9]">
      {/* Top App Bar */}
      <div className="bg-white border-b-2 border-[#d0d0d0] px-5 py-4 h-[72px] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#6CAC78] rounded-lg flex items-center justify-center">
            <span className="text-white">B</span>
          </div>
          <h1 className="text-[#1F1F1F]">Bykea</h1>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-[#F8FAF9] transition-colors">
          <User className="w-6 h-6 text-[#1F1F1F]" strokeWidth={2} />
          <span className="text-[#1F1F1F]">Profile</span>
        </button>
      </div>

      {/* Map Section */}
      <div className="relative h-[45vh] bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-[#6CAC78] mx-auto mb-2" strokeWidth={1.5} />
            <p className="text-[#5a5a5a]">Map Preview</p>
          </div>
        </div>
        
        {/* Zoom Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
            <Plus className="w-6 h-6 text-[#1F1F1F]" strokeWidth={2} />
          </button>
          <button className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
            <Minus className="w-6 h-6 text-[#1F1F1F]" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 px-5 pt-6 pb-24 overflow-y-auto">
        {/* Search Bar */}
        <div 
          onClick={() => onNavigate("pickup")}
          className="bg-white rounded-2xl shadow-md p-5 mb-6 flex items-center gap-4 cursor-pointer hover:shadow-lg transition-shadow"
        >
          <Search className="w-7 h-7 text-[#5a5a5a]" strokeWidth={2} />
          <span className="text-[#5a5a5a] text-sm">Where do you want to go?</span>
        </div>

        {/* Quick Shortcuts */}
        <h2 className="mb-4 text-[#1F1F1F]">Quick Destinations</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button 
            onClick={() => onNavigate("pickup")}
            className="bg-white rounded-2xl p-6 flex flex-col items-center gap-3 hover:shadow-lg transition-shadow h-[160px] justify-center"
          >
            <Home className="w-12 h-12 text-[#6CAC78]" strokeWidth={2} />
            <div className="text-center">
              <div className="text-[#1F1F1F] mb-1">گھر</div>
              <div className="text-[#1F1F1F]">Home</div>
            </div>
          </button>

          <button 
            onClick={() => onNavigate("pickup")}
            className="bg-white rounded-2xl p-6 flex flex-col items-center gap-3 hover:shadow-lg transition-shadow h-[160px] justify-center"
          >
            <Building2 className="w-12 h-12 text-[#6CAC78]" strokeWidth={2} />
            <div className="text-center">
              <div className="text-[#1F1F1F] mb-1">مسجد</div>
              <div className="text-[#1F1F1F]">Mosque</div>
            </div>
          </button>

          <button 
            onClick={() => onNavigate("pickup")}
            className="bg-white rounded-2xl p-6 flex flex-col items-center gap-3 hover:shadow-lg transition-shadow h-[160px] justify-center"
          >
            <MapPin className="w-12 h-12 text-[#6CAC78]" strokeWidth={2} />
            <div className="text-center">
              <div className="text-[#1F1F1F] mb-1">ہسپتال</div>
              <div className="text-[#1F1F1F]">Hospital</div>
            </div>
          </button>

          <button 
            onClick={() => onNavigate("pickup")}
            className="bg-white rounded-2xl p-6 flex flex-col items-center gap-3 hover:shadow-lg transition-shadow h-[160px] justify-center"
          >
            <ShoppingBag className="w-12 h-12 text-[#6CAC78]" strokeWidth={2} />
            <div className="text-center">
              <div className="text-[#1F1F1F] mb-1">بازار</div>
              <div className="text-[#1F1F1F]">Market</div>
            </div>
          </button>
        </div>

        {/* Help Button */}
        <button className="w-full bg-white border-2 border-[#d0d0d0] rounded-2xl p-5 flex items-center justify-center gap-3 hover:bg-[#F8FAF9] transition-colors">
          <MicVocal className="w-6 h-6 text-[#6CAC78]" strokeWidth={2} />
          <span className="text-[#1F1F1F]">Need Help? Voice Assistance</span>
        </button>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="home" onTabChange={() => {}} />
    </div>
  );
}
