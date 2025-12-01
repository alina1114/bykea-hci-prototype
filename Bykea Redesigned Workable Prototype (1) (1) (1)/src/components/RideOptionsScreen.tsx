import { Bike, Car, ArrowLeft } from "lucide-react";

interface RideOptionsScreenProps {
  onNavigate: (screen: string) => void;
}

export function RideOptionsScreen({ onNavigate }: RideOptionsScreenProps) {
  const rideOptions = [
    {
      id: "bike",
      name: "Bike",
      icon: Bike,
      fare: "Rs. 150",
      time: "4–6 min",
      description: "Quick and economical"
    },
    {
      id: "rickshaw",
      name: "Rickshaw",
      icon: Car,
      fare: "Rs. 280",
      time: "6–8 min",
      description: "Comfortable ride"
    },
    {
      id: "car",
      name: "Car",
      icon: Car,
      fare: "Rs. 450",
      time: "5–7 min",
      description: "Premium comfort"
    }
  ];

  return (
    <div className="flex flex-col h-screen bg-[#F8FAF9]">
      {/* Header */}
      <div className="bg-white border-b-2 border-[#d0d0d0] px-5 py-5">
        <div className="flex items-center gap-3 mb-2">
          <button 
            onClick={() => onNavigate("dropoff")}
            className="p-2 hover:bg-[#F8FAF9] rounded-xl transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#1F1F1F]" strokeWidth={2} />
          </button>
          <h2 className="text-[#1F1F1F]">Step 3 of 3</h2>
        </div>
        <p className="text-[#5a5a5a] ml-14">Choose Your Ride</p>
      </div>

      {/* Route Info */}
      <div className="bg-white px-5 py-5 border-b-2 border-[#d0d0d0]">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 rounded-full bg-[#6CAC78] mt-1.5"></div>
            <div>
              <p className="text-[#5a5a5a] text-[0.94rem]">Pickup</p>
              <p className="text-[#1F1F1F]">Your Current Location</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 rounded-full bg-[#E57373] mt-1.5"></div>
            <div>
              <p className="text-[#5a5a5a] text-[0.94rem]">Destination</p>
              <p className="text-[#1F1F1F]">Selected Location</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ride Options */}
      <div className="flex-1 px-5 pt-6 pb-6 overflow-y-auto space-y-4">
        {rideOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => onNavigate("confirmRide")}
            className="w-full bg-white rounded-2xl p-6 hover:shadow-lg transition-shadow border-2 border-transparent hover:border-[#6CAC78]"
          >
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-[#6CAC78]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <option.icon className="w-9 h-9 text-[#6CAC78]" strokeWidth={2} />
              </div>
              
              <div className="flex-1 text-left">
                <h3 className="text-[#1F1F1F] mb-1">{option.name}</h3>
                <p className="text-[#5a5a5a] text-[0.94rem] mb-2">{option.description}</p>
                <div className="flex items-center gap-4">
                  <span className="text-[#6CAC78]">{option.fare}</span>
                  <span className="text-[#5a5a5a] text-[0.94rem]">Arrives in {option.time}</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Bottom Button */}
      <div className="bg-white px-5 py-6 border-t-2 border-[#d0d0d0]">
        <button 
          onClick={() => onNavigate("confirmRide")}
          className="w-full bg-[#6CAC78] text-white rounded-2xl p-5 hover:bg-[#5a9566] transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
