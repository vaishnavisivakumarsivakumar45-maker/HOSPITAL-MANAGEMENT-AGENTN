import React, { useState } from "react";
import { Activity, Menu, X, HeartPulse, ShieldAlert } from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  emergencyPhone: string;
}

export default function Navbar({ activeTab, setActiveTab, emergencyPhone }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Hospital" },
    { id: "departments", label: "Departments" },
    { id: "doctors", label: "Doctors" },
    { id: "chatbot", label: "AI Chatbot" },
    { id: "contact", label: "Contact Us" },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsOpen(false);
  };

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-xs" id="nav-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Brand */}
          <div className="flex items-center" id="brand-logo">
            <button 
              onClick={() => handleNavClick("home")}
              className="flex items-center gap-2 cursor-pointer focus:outline-none"
            >
              <div className="bg-indigo-600 text-white p-2 rounded-xl flex items-center justify-center">
                <HeartPulse className="h-6 w-6" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-sans font-bold text-lg text-slate-900 tracking-tight leading-none">
                  St. Jude
                </span>
                <span className="font-sans font-medium text-xs text-indigo-600 tracking-wider">
                  MEMORIAL HOSPITAL
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-1" id="desktop-menu">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-lg font-sans font-medium text-sm transition-all duration-150 cursor-pointer ${
                  activeTab === item.id
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Emergency Hotline Quick Badge */}
          <div className="hidden lg:flex items-center" id="emergency-badge">
            <a 
              href={`tel:${emergencyPhone}`}
              className="flex items-center gap-2 bg-rose-50 text-rose-700 px-4 py-1.5 rounded-full border border-rose-100 font-sans font-semibold text-xs hover:bg-rose-100 transition-all duration-150"
            >
              <ShieldAlert className="h-4 w-4 animate-pulse" />
              EMERGENCY: {emergencyPhone}
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center" id="mobile-menu-btn">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900 p-2 rounded-lg hover:bg-slate-100 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 animate-fadeIn" id="mobile-dropdown">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg font-sans font-medium text-base transition-all duration-150 ${
                  activeTab === item.id
                    ? "bg-indigo-50 text-indigo-600 font-semibold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 border-t border-slate-100 px-4 pb-2">
              <a
                href={`tel:${emergencyPhone}`}
                className="flex items-center justify-center gap-2 w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-lg font-sans font-semibold text-sm transition-all duration-150 shadow-sm"
              >
                <ShieldAlert className="h-4 w-4" />
                Emergency Hotline: {emergencyPhone}
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
