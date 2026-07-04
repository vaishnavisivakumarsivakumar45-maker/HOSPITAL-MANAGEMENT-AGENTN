import React, { useState, useEffect } from "react";
import { HeartPulse, Loader, Activity, Phone, Clock, Mail } from "lucide-react";
import Navbar from "./components/Navbar";
import HomeView from "./components/HomeView";
import AboutView from "./components/AboutView";
import DepartmentsView from "./components/DepartmentsView";
import DoctorsView from "./components/DoctorsView";
import ChatbotView from "./components/ChatbotView";
import ContactView from "./components/ContactView";
import { Hospital, Department, Doctor } from "./types";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Transfer queries between tabs
  const [initialSearch, setInitialSearch] = useState<string>("");
  const [initialQuestion, setInitialQuestion] = useState<string>("");

  useEffect(() => {
    async function loadHospitalData() {
      try {
        setLoading(true);
        // Fetch Hospital Details
        const hospRes = await fetch("/api/hospital");
        const hospData = await hospRes.json();

        // Fetch Departments
        const deptRes = await fetch("/api/departments");
        const deptData = await deptRes.json();

        // Fetch Doctors
        const docRes = await fetch("/api/doctors");
        const docData = await docRes.json();

        setHospital(hospData);
        setDepartments(deptData);
        setDoctors(docData);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load initial hospital data:", err);
        setError("Could not establish connection to St. Jude hospital registry. Please refresh the page.");
        setLoading(false);
      }
    }
    loadHospitalData();
  }, []);

  const handleAskAI = (question?: string) => {
    if (question) {
      setInitialQuestion(question);
    }
    setActiveTab("chatbot");
  };

  const handleSelectDoctor = (doctorName: string) => {
    setInitialSearch(doctorName);
    setActiveTab("doctors");
  };

  const handleBookWithDoctor = (doctorName: string, departmentName: string) => {
    // Navigates to home and scrolls to the appointment form
    setActiveTab("home");
    setTimeout(() => {
      const element = document.getElementById("appointment-form");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-4" id="loading-spinner">
        <div className="bg-indigo-600 text-white p-4 rounded-2xl animate-pulse">
          <HeartPulse className="h-10 w-10 animate-spin" />
        </div>
        <div className="text-center space-y-1">
          <h3 className="font-sans font-bold text-slate-800 text-lg">St. Jude Patient Portal</h3>
          <p className="font-sans text-xs text-slate-400">Loading electronic health registries and AI assistants...</p>
        </div>
      </div>
    );
  }

  if (error || !hospital) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4" id="error-fallback">
        <div className="bg-rose-50 border border-rose-100 p-8 rounded-2xl max-w-md text-center space-y-4">
          <div className="bg-rose-100 text-rose-700 p-4 rounded-full mx-auto w-16 h-16 flex items-center justify-center">
            <HeartPulse className="h-8 w-8" />
          </div>
          <h3 className="font-sans font-bold text-slate-900 text-lg">Connection Failure</h3>
          <p className="font-sans text-xs text-slate-500 leading-relaxed">
            {error || "Unable to retrieve clinical structures."}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between" id="app-root-shell">
      {/* Top Banner & Main Nav */}
      <div className="flex-1">
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={(tab) => {
            setActiveTab(tab);
            // Clear search terms if moving away
            if (tab !== "doctors") setInitialSearch("");
          }} 
          emergencyPhone={hospital.emergencyPhone} 
        />

        {/* Content Container */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="active-viewport-area">
          {activeTab === "home" && (
            <HomeView 
              onAskAI={handleAskAI} 
              doctors={doctors}
              departments={departments}
              hospitalPhone={hospital.phone}
              emergencyPhone={hospital.emergencyPhone}
            />
          )}

          {activeTab === "about" && (
            <AboutView hospital={hospital} />
          )}

          {activeTab === "departments" && (
            <DepartmentsView 
              departments={departments} 
              onSelectDoctor={handleSelectDoctor}
            />
          )}

          {activeTab === "doctors" && (
            <DoctorsView 
              doctors={doctors} 
              initialSearch={initialSearch}
              onBookWithDoctor={handleBookWithDoctor}
            />
          )}

          {activeTab === "chatbot" && (
            <ChatbotView 
              initialQuestion={initialQuestion}
              clearInitialQuestion={() => setInitialQuestion("")}
            />
          )}

          {activeTab === "contact" && (
            <ContactView 
              hospital={hospital} 
              onAskAI={handleAskAI}
            />
          )}
        </main>
      </div>

      {/* Footer Block */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 shrink-0 mt-16" id="app-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white">
                <HeartPulse className="h-6 w-6 text-indigo-500" />
                <span className="font-sans font-bold text-lg tracking-tight">St. Jude Memorial Hospital</span>
              </div>
              <p className="font-sans text-xs text-slate-400 leading-relaxed">
                A modern healthcare sanctuary offering safe, premium healing services grounded in world-class research and digital excellence.
              </p>
            </div>

            <div className="space-y-3 font-sans text-xs">
              <h5 className="font-semibold text-white uppercase tracking-wider text-[10px]">Contact Coordinates</h5>
              <div className="space-y-2 text-slate-400">
                <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-indigo-400" /> {hospital.phone}</div>
                <div className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-indigo-400" /> {hospital.email}</div>
                <div className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-indigo-400" /> Visiting: {hospital.visitingHours}</div>
              </div>
            </div>

            <div className="space-y-3 font-sans text-xs">
              <h5 className="font-semibold text-white uppercase tracking-wider text-[10px]">Patient Privacy & Compliance</h5>
              <p className="text-slate-400 leading-relaxed">
                Compliant with JCI clinical audit norms. Digital patient record encryption is standard across Metro Campus Sector 4.
              </p>
              <span className="block text-[10px] text-indigo-400 font-semibold">
                © {new Date().getFullYear()} St. Jude Memorial. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
