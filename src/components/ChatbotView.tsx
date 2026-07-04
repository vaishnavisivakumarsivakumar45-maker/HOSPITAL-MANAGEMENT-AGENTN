import React, { useState, useRef, useEffect } from "react";
import { 
  Send, 
  Bot, 
  User, 
  HelpCircle, 
  Sparkles, 
  ShieldAlert, 
  RefreshCw, 
  Clock,
  HeartPulse
} from "lucide-react";
import { Message } from "../types";

interface ChatbotViewProps {
  initialQuestion?: string;
  clearInitialQuestion?: () => void;
}

export default function ChatbotView({ initialQuestion = "", clearInitialQuestion }: ChatbotViewProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I am St. Jude's AI Hospital Information Assistant. I can help answer questions about our hospital, clinical departments, available doctors, scheduling, and policies. How can I assist you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "What are the visiting hours?",
    "Where is the Cardiology department?",
    "Which doctor is available on Monday?",
    "Which insurance is accepted?",
    "How can I book an appointment?",
    "What is the consultation fee for Dr. Ravi Kumar?"
  ];

  // If we receive an initial question (e.g. from the Home page), trigger it
  useEffect(() => {
    if (initialQuestion) {
      handleSendMessage(initialQuestion);
      if (clearInitialQuestion) {
        clearInitialQuestion();
      }
    }
  }, [initialQuestion]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || loading) return;

    // Add user message
    const userMsg: Message = {
      role: "user",
      content: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // Gather current message history for context (excluding initial system messages if desired, or mapping cleanly)
      const mappedHistory = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: mappedHistory
        })
      });

      const data = await response.json();
      
      const assistantMsg: Message = {
        role: "assistant",
        content: data.reply || "Sorry, I encountered an issue retrieving that information.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: Message = {
        role: "assistant",
        content: "Sorry, I couldn't establish a secure connection to our databases. Please try again later.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Chat history cleared. Hello! I am St. Jude's AI Hospital Information Assistant. I can help answer questions about our hospital, clinical departments, available doctors, scheduling, and policies. How can I assist you today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="py-4 h-[calc(100vh-140px)] min-h-[550px] flex flex-col" id="chatbot-view-wrapper">
      {/* Top Bar / Grounding Indicator */}
      <div className="bg-slate-900 text-white p-4 rounded-t-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800" id="chat-header">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 text-white p-2.5 rounded-xl flex items-center justify-center relative">
            <Bot className="h-5 w-5" />
            <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-teal-400 rounded-full border-2 border-slate-900"></div>
          </div>
          <div>
            <div className="font-sans font-bold text-sm tracking-tight flex items-center gap-1.5">
              St. Jude AI Assistant
              <span className="bg-teal-500/15 border border-teal-500/30 text-teal-300 font-mono text-[9px] px-1.5 py-0.5 rounded-md uppercase">
                Grounded AI
              </span>
            </div>
            <span className="block text-[10px] text-slate-400 font-sans mt-0.5">
              Answers hospital-related logistics and directories safely.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2" id="chat-actions">
          <button
            onClick={clearChat}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-750 text-slate-300 font-sans text-xs px-3 py-1.5 rounded-lg border border-slate-700 cursor-pointer transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Reset Chat
          </button>
        </div>
      </div>

      {/* Safety Compliance Warning Line */}
      <div className="bg-amber-50 border-b border-amber-100 text-amber-800 px-4 py-2 text-[10px] font-sans flex items-center gap-2">
        <ShieldAlert className="h-3.5 w-3.5 text-amber-600 shrink-0" />
        <span>
          <strong>Safety Compliance:</strong> This AI assistant is strictly designed to answer hospital administrative, scheduling, and wayfinding questions. It will not provide clinical diagnoses, prescriptions, or medical treatment advices.
        </span>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 bg-slate-50 border-l border-r border-slate-200 overflow-y-auto p-4 sm:p-6 space-y-4" id="chat-messages-log">
        {messages.map((msg, index) => {
          const isAI = msg.role === "assistant";
          const isWarning = msg.content.includes("⚠️") || msg.content.includes("Demo Mode");
          
          return (
            <div
              key={index}
              className={`flex gap-3 max-w-3xl ${isAI ? "mr-auto" : "ml-auto flex-row-reverse"}`}
            >
              {/* Profile Avatar Icon */}
              <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
                isAI ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-700"
              }`}>
                {isAI ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
              </div>

              {/* Message Content Bubble */}
              <div className="space-y-1">
                <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-3xs ${
                  isAI
                    ? isWarning
                      ? "bg-amber-50 border border-amber-200 text-amber-900 rounded-tl-none"
                      : "bg-white border border-slate-200 text-slate-800 rounded-tl-none"
                    : "bg-indigo-600 text-white rounded-tr-none"
                }`}>
                  <p className="font-sans whitespace-pre-line">{msg.content}</p>
                </div>
                <span className={`block text-[9px] font-mono text-slate-400 mt-1 ${isAI ? "text-left" : "text-right"}`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {/* Loading / Typing Animation */}
        {loading && (
          <div className="flex gap-3 mr-auto max-w-lg">
            <div className="h-8 w-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <Bot className="h-4 w-4" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none px-4 py-3 flex items-center justify-center gap-1.5 h-11 shadow-3xs">
              <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
              <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
              <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions Grid (Only visible if the list is small or at bottom) */}
      <div className="bg-slate-50 border-l border-r border-slate-200 px-4 py-2.5 flex items-center gap-2 overflow-x-auto shrink-0 border-t border-slate-100" id="suggested-queries-scroller">
        <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap flex items-center gap-1 shrink-0">
          <HelpCircle className="h-3.5 w-3.5" />
          Quick Ask:
        </span>
        <div className="flex gap-1.5 overflow-x-auto scrollbar-none">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-100 text-slate-700 hover:text-indigo-600 text-xs px-3 py-1.5 rounded-full font-sans font-medium whitespace-nowrap transition-colors cursor-pointer shrink-0"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Message Input Box */}
      <div className="bg-white p-3 rounded-b-2xl border-b border-l border-r border-slate-200 shrink-0" id="chat-input-container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(input);
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            placeholder="Type your hospital question here (e.g. 'Is there a pediatrician?')..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            className="flex-1 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all disabled:bg-slate-100"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-3.5 rounded-xl transition-all cursor-pointer disabled:bg-slate-200 disabled:text-slate-400 shrink-0"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
