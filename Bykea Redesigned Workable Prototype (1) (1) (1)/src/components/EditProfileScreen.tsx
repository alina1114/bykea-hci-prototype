import { ArrowLeft, User, Mail, Phone, Save } from "lucide-react";
import { useState } from "react";
import { GlobalSpeakerButton } from "./GlobalSpeakerButton";

interface EditProfileScreenProps {
  onBack: () => void;
  userProfile: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  onProfileUpdate: (profile: { firstName: string; lastName: string; email: string; phone: string }) => void;
  speakerActive: boolean;
  onSpeakerToggle: () => void;
  language: "en" | "ur";
}

export function EditProfileScreen({
  onBack,
  userProfile,
  onProfileUpdate,
  speakerActive,
  onSpeakerToggle,
  language
}: EditProfileScreenProps) {
  const [firstName, setFirstName] = useState(userProfile.firstName);
  const [lastName, setLastName] = useState(userProfile.lastName);
  const [email, setEmail] = useState(userProfile.email);
  const [phone, setPhone] = useState(userProfile.phone);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const text = {
    en: {
      title: "Edit Profile",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email Address",
      phone: "Phone Number",
      save: "Save Changes",
      cancel: "Cancel",
      success: "Profile updated successfully!",
      required: "This field is required",
      invalidEmail: "Please enter a valid email",
      invalidPhone: "Please enter a valid phone number"
    },
    ur: {
      title: "پروفائل میں ترمیم کریں",
      firstName: "پہلا نام",
      lastName: "آخری نام",
      email: "ای میل پتہ",
      phone: "فون نمبر",
      save: "تبدیلیاں محفوظ کریں",
      cancel: "منسوخ کریں",
      success: "پروفائل کامیابی سے اپ ڈیٹ ہو گیا!",
      required: "یہ فیلڈ ضروری ہے",
      invalidEmail: "براہ کرم ایک درست ای میل درج کریں",
      invalidPhone: "براہ کرم ایک درست فون نمبر درج کریں"
    }
  };

  const t = text[language];

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!firstName.trim()) newErrors.firstName = t.required;
    if (!lastName.trim()) newErrors.lastName = t.required;
    if (!email.trim()) {
      newErrors.email = t.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = t.invalidEmail;
    }
    if (!phone.trim()) {
      newErrors.phone = t.required;
    } else if (!/^[\d\s\+\-\(\)]+$/.test(phone)) {
      newErrors.phone = t.invalidPhone;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onProfileUpdate({ firstName, lastName, email, phone });
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onBack();
      }, 1500);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#F5F8F3] dark:bg-[#121212]">
      {/* Header */}
      <div className="bg-white dark:bg-[#1E1E1E] px-6 py-4 flex items-center justify-between border-b border-[#E0E0E0] dark:border-[#2A2A2A]">
        <button
          onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-2xl hover:bg-[#F5F8F3] dark:hover:bg-[#2A2A2A] transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-[#1A1A1A] dark:text-white" strokeWidth={2.5} />
        </button>
        <h1 className="text-[#1A1A1A] dark:text-white font-bold flex-1 text-center">
          {t.title}
        </h1>
        <GlobalSpeakerButton isActive={speakerActive} onToggle={onSpeakerToggle} />
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        {/* Profile Picture */}
        <div className="flex justify-center mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-[#0CAA41]/20 to-[#0CAA41]/10 rounded-full flex items-center justify-center border-4 border-white dark:border-[#2A2A2A] shadow-lg">
            <User className="w-16 h-16 text-[#0CAA41]" strokeWidth={2} />
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 bg-[#E8F5EC] dark:bg-[#0CAA41]/10 border-2 border-[#0CAA41] rounded-2xl p-5 text-center">
            <p className="text-[#0CAA41] font-bold text-lg">{t.success}</p>
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-5">
          {/* First Name */}
          <div>
            <label className="block text-[#1A1A1A] dark:text-white font-bold mb-3">
              {t.firstName}
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`w-full px-6 py-5 rounded-2xl border-2 ${
                errors.firstName
                  ? 'border-[#DC3545] bg-[#FFF5F5] dark:bg-[#DC3545]/10'
                  : 'border-[#E0E0E0] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]'
              } text-[#1A1A1A] dark:text-white focus:outline-none focus:border-[#0CAA41] transition-colors`}
              placeholder="Enter first name"
            />
            {errors.firstName && (
              <p className="mt-2 text-[#DC3545] text-sm font-bold">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-[#1A1A1A] dark:text-white font-bold mb-3">
              {t.lastName}
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`w-full px-6 py-5 rounded-2xl border-2 ${
                errors.lastName
                  ? 'border-[#DC3545] bg-[#FFF5F5] dark:bg-[#DC3545]/10'
                  : 'border-[#E0E0E0] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]'
              } text-[#1A1A1A] dark:text-white focus:outline-none focus:border-[#0CAA41] transition-colors`}
              placeholder="Enter last name"
            />
            {errors.lastName && (
              <p className="mt-2 text-[#DC3545] text-sm font-bold">{errors.lastName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-[#1A1A1A] dark:text-white font-bold mb-3">
              {t.email}
            </label>
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A] dark:text-[#B0B0B0]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-14 pr-6 py-5 rounded-2xl border-2 ${
                  errors.email
                    ? 'border-[#DC3545] bg-[#FFF5F5] dark:bg-[#DC3545]/10'
                    : 'border-[#E0E0E0] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]'
                } text-[#1A1A1A] dark:text-white focus:outline-none focus:border-[#0CAA41] transition-colors`}
                placeholder="example@email.com"
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-[#DC3545] text-sm font-bold">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-[#1A1A1A] dark:text-white font-bold mb-3">
              {t.phone}
            </label>
            <div className="relative">
              <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A] dark:text-[#B0B0B0]" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full pl-14 pr-6 py-5 rounded-2xl border-2 ${
                  errors.phone
                    ? 'border-[#DC3545] bg-[#FFF5F5] dark:bg-[#DC3545]/10'
                    : 'border-[#E0E0E0] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]'
                } text-[#1A1A1A] dark:text-white focus:outline-none focus:border-[#0CAA41] transition-colors`}
                placeholder="+92 300 1234567"
              />
            </div>
            {errors.phone && (
              <p className="mt-2 text-[#DC3545] text-sm font-bold">{errors.phone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="bg-white dark:bg-[#1E1E1E] px-6 py-6 space-y-3 border-t border-[#E0E0E0] dark:border-[#2A2A2A]">
        <button
          onClick={handleSave}
          className="w-full bg-[#0CAA41] text-white rounded-3xl py-7 hover:bg-[#0a8f37] transition-colors shadow-lg shadow-[#0CAA41]/20 font-bold text-xl flex items-center justify-center gap-3"
        >
          <Save className="w-6 h-6" strokeWidth={2.5} />
          {t.save}
        </button>
        <button
          onClick={onBack}
          className="w-full bg-white dark:bg-[#1E1E1E] border-2 border-[#E0E0E0] dark:border-[#2A2A2A] text-[#1A1A1A] dark:text-white rounded-3xl py-5 hover:bg-[#F5F8F3] dark:hover:bg-[#2A2A2A] transition-colors font-bold text-lg"
        >
          {t.cancel}
        </button>
      </div>
    </div>
  );
}