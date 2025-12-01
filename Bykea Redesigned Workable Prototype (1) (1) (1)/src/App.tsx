import { useState, useEffect } from "react";
import { SplashScreen } from "./components/SplashScreen";
import { LoginScreen } from "./components/LoginScreen";
import { OTPScreen } from "./components/OTPScreen";
import { ProfileSetupScreen } from "./components/ProfileSetupScreen";
import { NewHomeScreen } from "./components/NewHomeScreen";
import { NewPickupScreen } from "./components/NewPickupScreen";
import { NewDropoffScreen } from "./components/NewDropoffScreen";
import { VehicleSelectionScreen } from "./components/VehicleSelectionScreen";
import { NewRideOptionsScreen } from "./components/NewRideOptionsScreen";
import { NewConfirmRideScreen } from "./components/NewConfirmRideScreen";
import { NewDriverOnWayScreen } from "./components/NewDriverOnWayScreen";
import { RatingScreen } from "./components/RatingScreen";
import { NewPaymentScreen } from "./components/NewPaymentScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { TripsScreen } from "./components/TripsScreen";
import { SettingsScreen } from "./components/SettingsScreen";
import { WalletScreen } from "./components/WalletScreen";
import { ManageDestinationsScreen } from "./components/ManageDestinationsScreen";
import { ManageQuickDestinationsScreen } from "./components/ManageQuickDestinationsScreen";
import { ChatScreen } from "./components/ChatScreen";
import { TripDetailsScreen } from "./components/TripDetailsScreen";
import { EditProfileScreen } from "./components/EditProfileScreen";
import { PaymentMethodsScreen } from "./components/PaymentMethodsScreen";
import { AddPaymentMethodScreen } from "./components/AddPaymentMethodScreen";
import { SavedAddressesScreen } from "./components/SavedAddressesScreen";
import { AddAddressScreen } from "./components/AddAddressScreen";
import { CallDriverModal } from "./components/CallDriverModal";
import { VoiceAssistantModal } from "./components/VoiceAssistantModal";
import { ReadAloudProvider } from "./components/ReadAloudContext";
import { ReadAloudComponent } from "./components/ReadAloudComponent";
import { ReadAloudOptionsSheet } from "./components/ReadAloudOptionsSheet";
import { VoiceAssistProvider } from "./components/VoiceAssistContext";

type Screen = 
  | "splash" 
  | "login" 
  | "otp"
  | "profileSetup"
  | "home" 
  | "pickup" 
  | "dropoff" 
  | "vehicleSelection" 
  | "rideOptions" 
  | "confirmRide" 
  | "driverOnWay" 
  | "rating" 
  | "payment" 
  | "profile" 
  | "trips" 
  | "settings" 
  | "wallet"
  | "manageDestinations"
  | "manageQuickDestinations"
  | "chat"
  | "tripDetails"
  | "editProfile"
  | "paymentMethods"
  | "addPaymentMethod"
  | "savedAddresses"
  | "addAddress";

export default function App() {
  // Navigation & Screen State
  const [currentScreen, setCurrentScreen] = useState<Screen>("splash");
  
  // User Profile Data
  const [userProfile, setUserProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });
  
  // Quick Destinations State
  const [quickDestinations, setQuickDestinations] = useState<string[]>(["home", "mosque", "hospital", "market"]);
  
  // Wallet Balance State
  const [walletBalance, setWalletBalance] = useState(500);
  
  // Ride Location Data
  const [pickupLocation, setPickupLocation] = useState<{ name: string, address: string }>({ name: "", address: "" });
  const [dropoffLocation, setDropoffLocation] = useState<string>("");
  
  // Payment Methods State
  const [paymentMethods, setPaymentMethods] = useState([
    { id: "cash", type: "cash" as const, name: "Cash", details: "Pay driver in cash" },
  ]);
  const [selectedPaymentId, setSelectedPaymentId] = useState("cash");
  
  // Saved Addresses State
  const [savedAddresses, setSavedAddresses] = useState<Array<{ id: string; title: string; address: string; icon: "home" | "work" | "location" }>>([
    { id: "home1", title: "Home", address: "123 Main Street, Karachi", icon: "home" },
    { id: "work1", title: "Work", address: "456 Business Center, Clifton", icon: "work" },
  ]);
  
  // Global Settings
  const [language, setLanguage] = useState<"en" | "ur">("en");
  const [textSize, setTextSize] = useState<"small" | "medium" | "large">("small");
  const [darkMode, setDarkMode] = useState(false);
  const [boldText, setBoldText] = useState(false);
  const [brightness, setBrightness] = useState(100);
  
  // Speaker Button State (persists across all screens)
  const [speakerActive, setSpeakerActive] = useState(false);
  
  // Modals
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  
  // Ride Data
  const [selectedDestination, setSelectedDestination] = useState<string>("");
  const [selectedVehicleType, setSelectedVehicleType] = useState<string>("bike");
  const [selectedRider, setSelectedRider] = useState<any>(null);

  // Apply global settings
  useEffect(() => {
    const classes = [
      `text-size-${textSize}`,
      darkMode ? "dark" : "",
      boldText ? "bold-text" : ""
    ].filter(Boolean).join(" ");
    
    document.documentElement.className = classes;
    
    // Apply brightness
    document.documentElement.style.filter = `brightness(${brightness}%)`;
  }, [textSize, darkMode, boldText, brightness]);

  const handleNavigate = (screen: string, data?: any) => {
    setCurrentScreen(screen as Screen);
    
    // Handle navigation data
    if (screen === "dropoff" && typeof data === "string") {
      setSelectedDestination(data);
    } else if (screen === "pickup" && typeof data === "string") {
      // Store pre-selected destination when navigating to pickup from quick destinations
      setSelectedDestination(data);
    } else if (screen === "rideOptions" && typeof data === "string") {
      setSelectedVehicleType(data);
    } else if (screen === "confirmRide" && data) {
      setSelectedRider(data);
    } else if (screen === "driverOnWay" && data) {
      setSelectedRider(data);
    }
  };

  const handleTabChange = (tab: "home" | "trips" | "wallet" | "profile") => {
    if (tab === "profile" || tab === "trips" || tab === "wallet") {
      setCurrentScreen(tab);
    } else {
      setCurrentScreen("home");
    }
  };

  const handleSpeakerToggle = () => {
    setSpeakerActive(!speakerActive);
  };

  const handleVoiceClick = () => {
    setShowVoiceModal(true);
  };

  const handleCallDriver = () => {
    setShowCallModal(true);
  };

  return (
    <ReadAloudProvider>
      <VoiceAssistProvider>
        <div className="min-h-screen bg-[#F5F8F3] dark:bg-[#121212] flex items-center justify-center">
          {/* Mobile Container */}
          <div className="w-full max-w-md h-screen bg-white dark:bg-[#1E1E1E] shadow-2xl relative overflow-hidden">
            
            {/* Splash Screen */}
            {currentScreen === "splash" && (
              <SplashScreen onComplete={() => setCurrentScreen("login")} />
            )}

            {/* Login Screen */}
            {currentScreen === "login" && (
              <LoginScreen 
                onNavigate={(screen, data) => {
                  if (screen === "otp" && data?.phone) {
                    setUserProfile(prev => ({ ...prev, phone: data.phone }));
                  }
                  handleNavigate(screen, data);
                }}
                language={language}
              />
            )}

            {/* OTP Screen */}
            {currentScreen === "otp" && (
              <OTPScreen 
                onNavigate={handleNavigate}
                onBack={() => setCurrentScreen("login")}
                language={language}
              />
            )}

            {/* Profile Setup Screen */}
            {currentScreen === "profileSetup" && (
              <ProfileSetupScreen 
                onComplete={(data) => {
                  setUserProfile(data);
                  setCurrentScreen("home");
                }}
                onBack={() => setCurrentScreen("otp")}
                language={language}
                phoneNumber={userProfile.phone}
              />
            )}

            {/* Home Screen */}
            {currentScreen === "home" && (
              <NewHomeScreen 
                onNavigate={handleNavigate} 
                textSize={textSize}
                onTextSizeChange={setTextSize}
                onVoiceClick={handleVoiceClick}
                speakerActive={speakerActive}
                onSpeakerToggle={handleSpeakerToggle}
                language={language}
                onLanguageChange={setLanguage}
                quickDestinations={quickDestinations}
                onTabChange={(tab) => {
                  if (tab === "settings") {
                    setCurrentScreen("settings");
                  } else {
                    handleTabChange(tab);
                  }
                }}
              />
            )}

            {/* Pickup Screen */}
            {currentScreen === "pickup" && (
              <NewPickupScreen 
                onNavigate={handleNavigate}
                onVoiceClick={handleVoiceClick}
                speakerActive={speakerActive}
                onSpeakerToggle={handleSpeakerToggle}
                language={language}
                onPickupSelect={(location, address) => {
                  setPickupLocation({ name: location, address });
                }}
              />
            )}

            {/* Dropoff Screen */}
            {currentScreen === "dropoff" && (
              <NewDropoffScreen 
                onNavigate={handleNavigate}
                onVoiceClick={handleVoiceClick}
                selectedDestination={selectedDestination}
                speakerActive={speakerActive}
                onSpeakerToggle={handleSpeakerToggle}
                language={language}
                pickupLocation={pickupLocation}
              />
            )}

            {/* Vehicle Selection */}
            {currentScreen === "vehicleSelection" && (
              <VehicleSelectionScreen 
                onNavigate={handleNavigate}
                onVoiceClick={handleVoiceClick}
                speakerActive={speakerActive}
                onSpeakerToggle={handleSpeakerToggle}
                language={language}
              />
            )}

            {/* Ride Options */}
            {currentScreen === "rideOptions" && (
              <NewRideOptionsScreen 
                onNavigate={handleNavigate}
                onVoiceClick={handleVoiceClick}
                vehicleType={selectedVehicleType}
                speakerActive={speakerActive}
                onSpeakerToggle={handleSpeakerToggle}
                language={language}
              />
            )}

            {/* Confirm Ride */}
            {currentScreen === "confirmRide" && (
              <NewConfirmRideScreen 
                onNavigate={handleNavigate}
                onVoiceClick={handleVoiceClick}
                riderData={selectedRider}
                speakerActive={speakerActive}
                onSpeakerToggle={handleSpeakerToggle}
                language={language}
              />
            )}

            {/* Driver On Way */}
            {currentScreen === "driverOnWay" && (
              <NewDriverOnWayScreen 
                onNavigate={handleNavigate} 
                riderData={selectedRider}
                speakerActive={speakerActive}
                onSpeakerToggle={handleSpeakerToggle}
                language={language}
                onCallDriver={handleCallDriver}
                onChat={() => setCurrentScreen("chat")}
              />
            )}

            {/* Rating */}
            {currentScreen === "rating" && (
              <RatingScreen 
                onNavigate={handleNavigate}
                riderData={selectedRider}
                speakerActive={speakerActive}
                onSpeakerToggle={handleSpeakerToggle}
                language={language}
              />
            )}

            {/* Payment */}
            {currentScreen === "payment" && (
              <NewPaymentScreen 
                onNavigate={handleNavigate}
                onVoiceClick={handleVoiceClick}
                speakerActive={speakerActive}
                onSpeakerToggle={handleSpeakerToggle}
                language={language}
              />
            )}

            {/* Profile */}
            {currentScreen === "profile" && (
              <ProfileScreen 
                onTabChange={handleTabChange}
                onNavigate={handleNavigate}
                speakerActive={speakerActive}
                onSpeakerToggle={handleSpeakerToggle}
                language={language}
                userProfile={userProfile}
              />
            )}

            {/* Trips */}
            {currentScreen === "trips" && (
              <TripsScreen 
                onTabChange={handleTabChange}
                onNavigate={handleNavigate}
                speakerActive={speakerActive}
                onSpeakerToggle={handleSpeakerToggle}
                language={language}
              />
            )}

            {/* Wallet */}
            {currentScreen === "wallet" && (
              <WalletScreen 
                onTabChange={handleTabChange}
                speakerActive={speakerActive}
                onSpeakerToggle={handleSpeakerToggle}
                language={language}
                walletBalance={walletBalance}
                onAddMoney={(amount) => setWalletBalance(walletBalance + amount)}
              />
            )}

            {/* Settings */}
            {currentScreen === "settings" && (
              <SettingsScreen 
                onTabChange={(tab) => {
                  if (tab === "home" || tab === "trips" || tab === "wallet" || tab === "profile") {
                    handleTabChange(tab);
                  }
                }}
                darkMode={darkMode}
                onDarkModeToggle={() => setDarkMode(!darkMode)}
                textSize={textSize}
                onTextSizeChange={setTextSize}
                boldText={boldText}
                onBoldTextToggle={() => setBoldText(!boldText)}
                brightness={brightness}
                onBrightnessChange={setBrightness}
                language={language}
                onLanguageChange={setLanguage}
                speakerActive={speakerActive}
                onSpeakerToggle={handleSpeakerToggle}
              />
            )}

            {/* Manage Destinations */}
            {currentScreen === "manageDestinations" && (
              <ManageDestinationsScreen 
                onBack={() => setCurrentScreen("home")}
                speakerActive={speakerActive}
                onSpeakerToggle={handleSpeakerToggle}
                language={language}
              />
            )}

            {/* Manage Quick Destinations */}
            {currentScreen === "manageQuickDestinations" && (
              <ManageQuickDestinationsScreen 
                onBack={() => setCurrentScreen("home")}
                speakerActive={speakerActive}
                onSpeakerToggle={handleSpeakerToggle}
                language={language}
                activeDestinations={quickDestinations}
                onDestinationsChange={setQuickDestinations}
              />
            )}

            {/* Chat */}
            {currentScreen === "chat" && (
              <ChatScreen 
                onBack={() => setCurrentScreen("driverOnWay")}
                driverName={selectedRider?.driverName || "Ahmed Khan"}
                speakerActive={speakerActive}
                onSpeakerToggle={handleSpeakerToggle}
                language={language}
              />
            )}

            {/* Trip Details */}
            {currentScreen === "tripDetails" && (
              <TripDetailsScreen 
                onBack={() => setCurrentScreen("trips")}
                speakerActive={speakerActive}
                onSpeakerToggle={handleSpeakerToggle}
                language={language}
              />
            )}

            {/* Edit Profile */}
            {currentScreen === "editProfile" && (
              <EditProfileScreen 
                onBack={() => setCurrentScreen("profile")}
                speakerActive={speakerActive}
                onSpeakerToggle={handleSpeakerToggle}
                language={language}
                userProfile={userProfile}
                onProfileUpdate={setUserProfile}
              />
            )}

            {/* Payment Methods */}
            {currentScreen === "paymentMethods" && (
              <PaymentMethodsScreen 
                onBack={() => setCurrentScreen("profile")}
                speakerActive={speakerActive}
                onSpeakerToggle={handleSpeakerToggle}
                language={language}
                paymentMethods={paymentMethods}
                selectedPaymentId={selectedPaymentId}
                onPaymentSelect={setSelectedPaymentId}
                onAddPaymentMethod={() => setCurrentScreen("addPaymentMethod")}
              />
            )}

            {/* Add Payment Method */}
            {currentScreen === "addPaymentMethod" && (
              <AddPaymentMethodScreen 
                onBack={() => setCurrentScreen("paymentMethods")}
                speakerActive={speakerActive}
                onSpeakerToggle={handleSpeakerToggle}
                language={language}
                onPaymentAdd={(newMethod) => {
                  setPaymentMethods([...paymentMethods, newMethod]);
                  setSelectedPaymentId(newMethod.id);
                }}
              />
            )}

            {/* Saved Addresses */}
            {currentScreen === "savedAddresses" && (
              <SavedAddressesScreen 
                onBack={() => setCurrentScreen("profile")}
                speakerActive={speakerActive}
                onSpeakerToggle={handleSpeakerToggle}
                language={language}
                savedAddresses={savedAddresses}
                onAddressSelect={(id) => {
                  // Handle address selection if needed
                }}
                onAddAddress={() => setCurrentScreen("addAddress")}
              />
            )}

            {/* Add Address */}
            {currentScreen === "addAddress" && (
              <AddAddressScreen 
                onBack={() => setCurrentScreen("savedAddresses")}
                speakerActive={speakerActive}
                onSpeakerToggle={handleSpeakerToggle}
                language={language}
                onAddressAdd={(newAddress) => {
                  setSavedAddresses([...savedAddresses, newAddress]);
                }}
              />
            )}

            {/* Modals */}
            <VoiceAssistantModal 
              isOpen={showVoiceModal}
              onClose={() => setShowVoiceModal(false)}
            />

            <CallDriverModal
              isOpen={showCallModal}
              onClose={() => setShowCallModal(false)}
              driverName={selectedRider?.driverName || "Ahmed Khan"}
              language={language}
            />
            
            {/* Read-Aloud Persistent Controls */}
            <ReadAloudComponent 
              placement={
                currentScreen === "driverOnWay" || currentScreen === "pickup" || currentScreen === "dropoff" 
                  ? "bottom-right" 
                  : "top-right"
              }
            />
            
            {/* Read-Aloud Options Sheet */}
            <ReadAloudOptionsSheet language={language} />
          </div>
        </div>
      </VoiceAssistProvider>
    </ReadAloudProvider>
  );
}