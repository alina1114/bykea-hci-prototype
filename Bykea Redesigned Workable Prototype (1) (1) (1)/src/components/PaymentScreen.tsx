import { Wallet, Banknote, Volume2, ArrowLeft, CheckCircle2 } from "lucide-react";

interface PaymentScreenProps {
  onNavigate: (screen: string) => void;
}

export function PaymentScreen({ onNavigate }: PaymentScreenProps) {
  return (
    <div className="flex flex-col h-screen bg-[#F8FAF9]">
      {/* Header */}
      <div className="bg-white border-b-2 border-[#d0d0d0] px-5 py-5">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate("driverOnWay")}
            className="p-2 hover:bg-[#F8FAF9] rounded-xl transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#1F1F1F]" strokeWidth={2} />
          </button>
          <h2 className="text-[#1F1F1F]">Payment</h2>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 pt-6 pb-6 overflow-y-auto">
        {/* Trip Complete Badge */}
        <div className="bg-[#E8F5E9] border-2 border-[#6CAC78] rounded-2xl p-6 mb-6 text-center">
          <CheckCircle2 className="w-16 h-16 text-[#6CAC78] mx-auto mb-3" strokeWidth={2} />
          <h3 className="text-[#1F1F1F] mb-2">Trip Completed!</h3>
          <p className="text-[#5a5a5a]">Thank you for riding with us</p>
        </div>

        {/* Total Fare */}
        <div className="bg-white rounded-2xl p-6 mb-6">
          <div className="text-center mb-6">
            <p className="text-[#5a5a5a] mb-2">Total Fare</p>
            <h1 className="text-[#6CAC78]">Rs. 150</h1>
          </div>

          <div className="space-y-3 border-t-2 border-[#d0d0d0] pt-4">
            <div className="flex items-center justify-between">
              <span className="text-[#5a5a5a]">Base Fare</span>
              <span className="text-[#1F1F1F]">Rs. 120</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#5a5a5a]">Service Fee</span>
              <span className="text-[#1F1F1F]">Rs. 30</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <h2 className="mb-4 text-[#1F1F1F]">Select Payment Method</h2>
        
        <div className="space-y-4 mb-6">
          {/* Cash Payment */}
          <button className="w-full bg-white rounded-2xl p-6 hover:shadow-lg transition-shadow border-2 border-[#6CAC78]">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-[#6CAC78]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Banknote className="w-9 h-9 text-[#6CAC78]" strokeWidth={2} />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-[#1F1F1F] mb-1">Cash Payment</h3>
                <p className="text-[#5a5a5a] text-[0.94rem]">Pay with cash to driver</p>
              </div>
              <div className="w-6 h-6 rounded-full border-2 border-[#6CAC78] flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#6CAC78]"></div>
              </div>
            </div>
          </button>

          {/* Digital Payment */}
          <button className="w-full bg-white rounded-2xl p-6 hover:shadow-lg transition-shadow border-2 border-transparent hover:border-[#6CAC78]">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-[#6CAC78]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Wallet className="w-9 h-9 text-[#6CAC78]" strokeWidth={2} />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-[#1F1F1F] mb-1">Digital Payment</h3>
                <p className="text-[#5a5a5a] text-[0.94rem]">Pay with wallet or card</p>
              </div>
              <div className="w-6 h-6 rounded-full border-2 border-[#d0d0d0]"></div>
            </div>
          </button>
        </div>

        {/* Audio Help */}
        <button className="w-full bg-white border-2 border-[#d0d0d0] rounded-2xl p-4 flex items-center justify-center gap-3 hover:bg-[#F8FAF9] transition-colors">
          <Volume2 className="w-6 h-6 text-[#6CAC78]" strokeWidth={2} />
          <span className="text-[#1F1F1F]">Audio Instructions</span>
        </button>
      </div>

      {/* Bottom Button */}
      <div className="bg-white px-5 py-6 border-t-2 border-[#d0d0d0]">
        <button 
          onClick={() => onNavigate("home")}
          className="w-full bg-[#6CAC78] text-white rounded-2xl p-5 hover:bg-[#5a9566] transition-colors"
        >
          Complete Payment
        </button>
      </div>
    </div>
  );
}
