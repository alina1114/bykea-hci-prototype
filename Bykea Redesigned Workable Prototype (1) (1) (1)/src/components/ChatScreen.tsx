import { ArrowLeft, Send } from "lucide-react";
import { useState } from "react";
import { GlobalSpeakerButton } from "./GlobalSpeakerButton";

interface ChatScreenProps {
  onBack: () => void;
  driverName: string;
  speakerActive: boolean;
  onSpeakerToggle: () => void;
  language: "en" | "ur";
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "driver";
  time: string;
}

export function ChatScreen({ 
  onBack, 
  driverName, 
  speakerActive, 
  onSpeakerToggle,
  language 
}: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "I'm on my way!", sender: "driver", time: "10:45 AM" },
    { id: "2", text: "How long will you take?", sender: "user", time: "10:46 AM" },
    { id: "3", text: "About 3 minutes", sender: "driver", time: "10:46 AM" }
  ]);
  const [inputText, setInputText] = useState("");

  const text = {
    en: {
      placeholder: "Type a message...",
      title: `Chat with ${driverName}`
    },
    ur: {
      placeholder: "پیغام ٹائپ کریں...",
      title: `${driverName} کے ساتھ چیٹ`
    }
  };

  const t = text[language];

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        sender: "user",
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setInputText("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#F5F8F3] dark:bg-[#121212]">
      {/* Header */}
      <div className="bg-white dark:bg-[#1E1E1E] px-6 py-4 flex items-center justify-between border-b border-[#E0E0E0] dark:border-[#2A2A2A]">
        <button 
          onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-[#F5F8F3] dark:hover:bg-[#2A2A2A] transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-[#1A1A1A] dark:text-white" strokeWidth={2.5} />
        </button>
        
        {/* Driver Info */}
        <div className="flex items-center gap-3 flex-1 ml-3">
          <div className="w-10 h-10 bg-[#0CAA41]/10 rounded-full flex items-center justify-center">
            <span className="text-[#0CAA41] font-bold" style={{ fontSize: '16px' }}>
              {driverName.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <span className="text-[#1A1A1A] dark:text-white font-bold" style={{ fontSize: '18px' }}>
            {driverName}
          </span>
        </div>

        <GlobalSpeakerButton isActive={speakerActive} onToggle={onSpeakerToggle} />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[75%] ${
              message.sender === "user" 
                ? "bg-[#0CAA41] text-white" 
                : "bg-white dark:bg-[#1E1E1E] text-[#1A1A1A] dark:text-white border border-[#E0E0E0] dark:border-[#2A2A2A]"
            } rounded-2xl px-5 py-3`}>
              <p className="font-bold mb-1" style={{ fontSize: '16px' }}>
                {message.text}
              </p>
              <p className={`text-xs ${
                message.sender === "user" ? "text-white/80" : "text-[#6B6B6B] dark:text-[#B0B0B0]"
              }`}>
                {message.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="bg-white dark:bg-[#1E1E1E] px-6 py-4 border-t border-[#E0E0E0] dark:border-[#2A2A2A]">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder={t.placeholder}
            className="flex-1 bg-[#F5F8F3] dark:bg-[#2A2A2A] rounded-2xl px-5 py-3 text-[#1A1A1A] dark:text-white outline-none font-bold"
            style={{ fontSize: '16px' }}
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="w-12 h-12 bg-[#0CAA41] rounded-full flex items-center justify-center disabled:opacity-50 hover:bg-[#0a8f37] transition-colors"
          >
            <Send className="w-5 h-5 text-white" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
