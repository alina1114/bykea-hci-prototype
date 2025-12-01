import { Star, ArrowLeft, Bike } from "lucide-react";

interface ConfirmRideScreenProps {
  onNavigate: (screen: string) => void;
}

export function ConfirmRideScreen({ onNavigate }: ConfirmRideScreenProps) {
  return (
    <div className="flex flex-col h-screen bg-[#F8FAF9]">
      {/* Header */}
      <div className="bg-white border-b-2 border-[#d0d0d0] px-5 py-5">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate("rideOptions")}
            className="p-2 hover:bg-[#F8FAF9] rounded-xl transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#1F1F1F]" strokeWidth={2} />
          </button>
          <h2 className="text-[#1F1F1F]">Confirm Your Ride</h2>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 pt-6 pb-6 overflow-y-auto">
        {/* Driver Card */}
        <div className="bg-white rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-5 mb-6">
            <div className="w-20 h-20 bg-[#6CAC78]/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-[#1F1F1F]">AK</span>
            </div>
            <div className="flex-1">
              <h3 className="text-[#1F1F1F] mb-2">Ahmed Khan</h3>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-[#FFB800] text-[#FFB800]" />
                <span className="text-[#1F1F1F]">4.8</span>
                <span className="text-[#5a5a5a]">(245 rides)</span>
              </div>
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="bg-[#F8FAF9] rounded-xl p-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#6CAC78]/20 rounded-xl flex items-center justify-center">
                <Bike className="w-7 h-7 text-[#6CAC78]" strokeWidth={2} />
              </div>
              <div>
                <p className="text-[#1F1F1F] mb-1">Bike</p>
                <p className="text-[#5a5a5a]">ABC-1234</p>
              </div>
            </div>
          </div>

          {/* Trip Details */}
          <div className="space-y-4 mb-6">
            <div>
              <p className="text-[#5a5a5a] mb-1 text-[0.94rem]">Pickup</p>
              <p className="text-[#1F1F1F]">Your Current Location</p>
            </div>
            <div>
              <p className="text-[#5a5a5a] mb-1 text-[0.94rem]">Destination</p>
              <p className="text-[#1F1F1F]">Selected Location</p>
            </div>
          </div>

          {/* Fare */}
          <div className="border-t-2 border-[#d0d0d0] pt-4">
            <div className="flex items-center justify-between">
              <span className="text-[#5a5a5a]">Total Fare</span>
              <span className="text-[#6CAC78]">Rs. 150</span>
            </div>
          </div>
        </div>

        {/* Warning Notice */}
        <div className="bg-[#FFF9E6] border-2 border-[#FFB800] rounded-2xl p-4 mb-6">
          <p className="text-[#1F1F1F] text-center">Please verify the driver details before confirming</p>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="bg-white px-5 py-6 space-y-3 border-t-2 border-[#d0d0d0]">
        <button 
          onClick={() => onNavigate("driverOnWay")}
          className="w-full bg-[#6CAC78] text-white rounded-2xl p-5 hover:bg-[#5a9566] transition-colors"
        >
          Confirm Ride
        </button>
        
        <button 
          onClick={() => onNavigate("rideOptions")}
          className="w-full bg-white border-2 border-[#E57373] text-[#E57373] rounded-2xl p-5 hover:bg-[#FFF5F5] transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
