import { AlertTriangle, X } from "lucide-react";

interface CancellationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  language: "en" | "ur";
  driverStatus?: "searching" | "coming" | "arrived";
}

export function CancellationDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  language,
  driverStatus = "searching" 
}: CancellationDialogProps) {
  if (!isOpen) return null;

  const text = {
    en: {
      title: "Cancel Ride?",
      subtitle: "Are you sure you want to cancel this ride?",
      warning: "Cancellation charges may apply if the rider has arrived or is close to your location.",
      confirm: "Yes, Cancel Ride",
      goBack: "Go Back"
    },
    ur: {
      title: "سواری منسوخ کریں؟",
      subtitle: "کیا آپ واقعی اس سواری کو منسوخ کرنا چاہتے ہیں؟",
      warning: "اگر سوار آپ کی جگہ پر پہنچ گیا ہے یا قریب ہے تو منسوخی کی فیس لاگو ہو سکتی ہے۔",
      confirm: "ہاں، سواری منسوخ کریں",
      goBack: "واپس جائیں"
    }
  };

  const t = text[language];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50">
      <div className="bg-white dark:bg-[#1E1E1E] rounded-t-[32px] w-full max-w-[428px] p-6 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#DC3545]/10 rounded-2xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-[#DC3545]" strokeWidth={2.5} />
            </div>
            <h2 className="text-[#1A1A1A] dark:text-white font-bold" style={{ fontSize: '22px' }}>
              {t.title}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#F5F8F3] dark:hover:bg-[#2A2A2A] transition-colors"
          >
            <X className="w-6 h-6 text-[#6B6B6B] dark:text-[#B0B0B0]" strokeWidth={2.5} />
          </button>
        </div>

        {/* Content */}
        <div className="mb-6">
          <p className="text-[#1A1A1A] dark:text-white font-bold mb-4" style={{ fontSize: '16px' }}>
            {t.subtitle}
          </p>
          <div className="bg-[#FFF5F5] dark:bg-[#DC3545]/10 border border-[#DC3545]/20 rounded-2xl p-4">
            <p className="text-[#DC3545] font-bold" style={{ fontSize: '14px', lineHeight: '1.6' }}>
              ⚠️ {t.warning}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={onConfirm}
            className="w-full bg-[#DC3545] text-white rounded-2xl py-4 font-bold hover:bg-[#C82333] transition-colors shadow-lg"
            style={{ fontSize: '18px', height: '56px' }}
          >
            {t.confirm}
          </button>
          <button
            onClick={onClose}
            className="w-full bg-[#F5F8F3] dark:bg-[#2A2A2A] text-[#1A1A1A] dark:text-white rounded-2xl py-4 font-bold hover:bg-[#E0E0E0] dark:hover:bg-[#3A3A3A] transition-colors"
            style={{ fontSize: '18px', height: '56px' }}
          >
            {t.goBack}
          </button>
        </div>
      </div>
    </div>
  );
}
