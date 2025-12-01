import { Phone, MessageCircle, Star, MapPin, Bike } from "lucide-react";

interface DriverOnWayScreenProps {
  onNavigate: (screen: string) => void;
}

export function DriverOnWayScreen({ onNavigate }: DriverOnWayScreenProps) {
  return (
    <div className="flex flex-col h-screen bg-[#F8FAF9] relative">
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-[#6CAC78] mx-auto mb-2 animate-bounce" strokeWidth={1.5} />
            <p className="text-[#5a5a5a]">Driver is on the way</p>
          </div>
        </div>
      </div>

      {/* Status Banner */}
      <div className="relative z-10 bg-[#6CAC78] text-white px-5 py-4 text-center">
        <p className="text-[1.06rem]">Driver Arriving in 4 minutes</p>
      </div>

      {/* Driver Info Drawer */}
      <div className="relative z-10 mt-auto bg-white/95 backdrop-blur-sm rounded-t-3xl border-t-2 border-[#d0d0d0]">
        <div className="px-5 pt-6 pb-6">
          {/* Driver Card */}
          <div className="bg-white rounded-2xl p-5 mb-5 shadow-lg">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 bg-[#6CAC78]/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-[#1F1F1F]">AK</span>
              </div>
              <div className="flex-1">
                <h3 className="text-[#1F1F1F] mb-1">Ahmed Khan</h3>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-[#FFB800] text-[#FFB800]" />
                  <span className="text-[#1F1F1F]">4.8</span>
                </div>
              </div>
            </div>

            {/* Vehicle & Fare Row */}
            <div className="flex items-center justify-between bg-[#F8FAF9] rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#6CAC78]/20 rounded-xl flex items-center justify-center">
                  <Bike className="w-6 h-6 text-[#6CAC78]" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[#1F1F1F]">Bike</p>
                  <p className="text-[#5a5a5a] text-[0.94rem]">ABC-1234</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[#5a5a5a] text-[0.94rem]">Fare</p>
                <p className="text-[#6CAC78]">Rs. 150</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button className="w-full bg-[#6CAC78] text-white rounded-2xl p-5 flex items-center justify-center gap-3 hover:bg-[#5a9566] transition-colors">
              <Phone className="w-6 h-6" strokeWidth={2} />
              <span>Call Driver</span>
            </button>
            
            <button className="w-full bg-white border-2 border-[#d0d0d0] text-[#1F1F1F] rounded-2xl p-4 flex items-center justify-center gap-3 hover:bg-[#F8FAF9] transition-colors">
              <MessageCircle className="w-6 h-6" strokeWidth={2} />
              <span>Send Message</span>
            </button>
          </div>

          {/* Trip Progress */}
          <div className="mt-6 bg-[#E8F5E9] rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#5a5a5a]">Trip Status</span>
              <span className="text-[#6CAC78]">In Progress</span>
            </div>
            <div className="w-full h-2 bg-white rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-[#6CAC78] rounded-full"></div>
            </div>
          </div>

          {/* Cancel Ride */}
          <button 
            onClick={() => onNavigate("payment")}
            className="w-full mt-4 text-[#E57373] py-3 hover:underline"
          >
            Complete Ride
          </button>
        </div>
      </div>
    </div>
  );
}
