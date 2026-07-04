import React, { useState, useEffect, useCallback } from "react";
import { HeartPulse, RefreshCw, Radio, HardDrive, AlertTriangle, HelpCircle, ShieldCheck, Phone } from "lucide-react";
import Navbar from "./components/Navbar";
import HomeView from "./components/HomeView";
import AboutView from "./components/AboutView";
import DepartmentsView from "./components/DepartmentsView";
import DoctorsView from "./components/DoctorsView";
import ChatbotView from "./components/ChatbotView";
import ContactView from "./components/ContactView";
import { Hospital, Department, Doctor } from "./types";
import { fallbackHospital, fallbackDepartments, fallbackDoctors } from "./mockData";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [retryCount, setRetryCount] = useState<number>(0);
  const [loadingStatus, setLoadingStatus] = useState<string>("Initializing clinical databases...");
  const [debugLogs, setDebugLogs] = useState<string[]>([]);

  // Transfer queries between tabs
  const [initialSearch, setInitialSearch] = useState<string>("");
  const [initialQuestion, setInitialQuestion] = useState<string>("");

  // Logger helper to populate console and user-facing troubleshooting log
  const logTelemetry = useCallback((message: string, isError = false) => {
    const timestamp = new Date().toISOString().substring(11, 19);
    const logLine = `[${timestamp}] ${message}`;
    if (isError) {
      console.error(logLine);
    } else {
      console.log(logLine);
    }
    setDebugLogs((prev) => [...prev, logLine]);
  }, []);

  // Safe fetch helper that guarantees response content type is JSON and response is OK
  const fetchJSON = async (url: string) => {
    logTelemetry(`Initiating request: ${url}`);
    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status} ${res.statusText} for ${url}`);
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      throw new Error(
        `Invalid content type received: "${contentType}". Expected "application/json". This occurs when the server redirects to a wildcard index.html.`
      );
    }

    return await res.json();
  };

  // Main data loader with exponential backoff retry mechanism
  const loadHospitalData = useCallback(async (currentAttempt: number = 0) => {
    try {
      setLoading(true);
      setError("");
      setIsOffline(false);

      if (currentAttempt === 0) {
        setDebugLogs([]);
        logTelemetry("Starting hospital data connection flow...");
      }

      setLoadingStatus(
        currentAttempt > 0
          ? `Connection attempt ${currentAttempt + 1} of 3 (retrying with exponential backoff)...`
          : "Fetching St. Jude health records..."
      );

      logTelemetry(`Attempt ${currentAttempt + 1} to contact backend registry...`);

      // 1. Fetch hospital details
      const hospitalData = await fetchJSON("/api/hospital");
      logTelemetry("Hospital details successfully loaded from backend registry.");

      // 2. Fetch departments
      const departmentsData = await fetchJSON("/api/departments");
      logTelemetry(`Successfully loaded ${departmentsData.length} departments.`);

      // 3. Fetch doctors
      const doctorsData = await fetchJSON("/api/doctors");
      logTelemetry(`Successfully loaded ${doctorsData.length} active medical staff records.`);

      // Success
      setHospital(hospitalData);
      setDepartments(departmentsData);
      setDoctors(doctorsData);
      setIsOffline(false);
      logTelemetry("All clinical data modules loaded successfully. Connection established.");
      setLoading(false);
    } catch (err: any) {
      const errorMessage = err.message || "Unknown communication failure.";
      logTelemetry(`Error during connection attempt ${currentAttempt + 1}: ${errorMessage}`, true);

      const maxRetries = 2; // 0, 1, 2 = 3 total attempts
      if (currentAttempt < maxRetries) {
        const nextAttempt = currentAttempt + 1;
        // Exponential backoff: 1000ms * 2^attempt (1s, 2s, 4s)
        const delay = Math.pow(2, currentAttempt) * 1000;
        logTelemetry(`Scheduling retry attempt ${nextAttempt + 1} in ${delay}ms...`);
        
        setTimeout(() => {
          setRetryCount(nextAttempt);
          loadHospitalData(nextAttempt);
        }, delay);
      } else {
        logTelemetry("Maximum retry limit exceeded. Connection failed.", true);
        setError(
          "Could not establish a secure connection to the live St. Jude hospital database."
        );
        setLoading(false);
      }
    }
  }, [logTelemetry]);

  // Initial trigger
  useEffect(() => {
    loadHospitalData(0);
  }, [loadHospitalData]);

  // Activate local fallback data gracefully (Offline Mode)
  const enterOfflineMode = () => {
    logTelemetry("User requested to continue in Offline Mode.");
    logTelemetry("Initializing local hospital registry databases...");
    
    setHospital(fallbackHospital);
    setDepartments(fallbackDepartments);
    setDoctors(fallbackDoctors);
    
    setIsOffline(true);
    setError("");
    setLoading(false);
    logTelemetry("Offline Mode initialized. Local databases populated and fully active.");
  };

  const handleRetryConnection = () => {
    setRetryCount(0);
    loadHospitalData(0);
  };

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
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 space-y-4 animate-fadeIn" id="loading-spinner">
        <div className="bg-indigo-600 text-white p-5 rounded-2xl shadow-lg shadow-indigo-600/20 relative">
          <HeartPulse className="h-10 w-10 animate-pulse" />
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-teal-400 animate-ping"></span>
        </div>
        <div className="text-center space-y-2 max-w-sm">
          <h3 className="font-sans font-black text-slate-800 text-xl tracking-tight">St. Jude Patient Portal</h3>
          <p className="font-sans text-xs text-slate-500 font-medium">{loadingStatus}</p>
          
          {retryCount > 0 && (
            <div className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full text-[10px] font-sans text-indigo-700 font-semibold mt-2">
              <RefreshCw className="h-3 w-3 animate-spin" />
              Retrying connection (Attempt {retryCount + 1}/3)...
            </div>
          )}
        </div>
      </div>
    );
  }

  // Troubleshooter Screen (Replaces the broken crashing Connection Failure display)
  if (error && !hospital) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 md:p-12" id="error-fallback">
        <div className="bg-white border border-slate-200 shadow-xl rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-8 animate-fadeIn">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 border-b border-slate-100 pb-6">
            <div className="bg-amber-50 text-amber-600 border border-amber-100 p-4 rounded-2xl shrink-0">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <div className="space-y-1.5 text-center sm:text-left">
              <h3 className="font-sans font-black text-slate-900 text-2xl tracking-tight">
                Connection Troubleshooting
              </h3>
              <p className="font-sans text-xs text-slate-500 leading-relaxed">
                We are currently unable to establish a secure link to the live St. Jude health database registry. This can be caused by server cold-starts, firewalls, or transient network drops.
              </p>
            </div>
          </div>

          {/* Console / Diagnostics Log */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-sans font-bold text-xs text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Radio className="h-4 w-4 text-rose-500 animate-pulse" />
                Live Connection Diagnostics Log
              </span>
              <span className="font-mono text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
                VERCEL_COMPATIBLE
              </span>
            </div>
            <div className="bg-slate-950 rounded-xl p-4 h-48 overflow-y-auto font-mono text-[10px] text-teal-400 border border-slate-900 space-y-1 shadow-inner leading-normal select-all">
              {debugLogs.length === 0 ? (
                <div className="text-slate-500 italic">No diagnostic events logged yet.</div>
              ) : (
                debugLogs.map((log, lIdx) => (
                  <div key={lIdx} className={log.includes("Error") ? "text-rose-400 font-semibold" : ""}>
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Action Control Panel */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-4">
            <h4 className="font-sans font-bold text-slate-800 text-xs uppercase tracking-wider">
              Troubleshooting Controls
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button 
                onClick={handleRetryConnection}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-3 px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs group"
              >
                <RefreshCw className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
                Retry Connection
              </button>

              <button 
                onClick={enterOfflineMode}
                className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold py-3 px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <HardDrive className="h-4 w-4" />
                Offline Mode
              </button>

              <button 
                onClick={() => window.location.reload()}
                className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold py-3 px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-2xs"
              >
                Reload Page
              </button>
            </div>
          </div>

          {/* Help Notice */}
          <div className="flex items-center gap-2.5 text-xs text-slate-400 font-sans">
            <HelpCircle className="h-4 w-4" />
            <span>Tip: Click <strong>Offline Mode</strong> to instantly browse doctor specialties, schedules, and map details using our high-fidelity local database.</span>
          </div>

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
          emergencyPhone={hospital?.emergencyPhone || fallbackHospital.emergencyPhone} 
          isOffline={isOffline}
        />

        {/* If running in Offline Mode, display an persistent, beautiful helper notice bar */}
        {isOffline && (
          <div className="bg-amber-500 text-white py-2 px-4 text-xs font-sans font-bold flex items-center justify-between gap-4 animate-slideDown shadow-inner">
            <div className="flex items-center gap-2">
              <HardDrive className="h-4 w-4 animate-pulse" />
              <span>Offline Backup Mode Active: Using local St. Jude medical datasets. AI assistant is in local rule-based safety mode.</span>
            </div>
            <button
              onClick={handleRetryConnection}
              className="bg-white/20 hover:bg-white/30 text-white font-sans text-[10px] uppercase font-black px-3 py-1 rounded-md transition-all cursor-pointer whitespace-nowrap"
            >
              Attempt Live Sync
            </button>
          </div>
        )}

        {/* Content Container */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="active-viewport-area">
          {activeTab === "home" && hospital && (
            <HomeView 
              onAskAI={handleAskAI} 
              doctors={doctors}
              departments={departments}
              hospitalPhone={hospital.phone}
              emergencyPhone={hospital.emergencyPhone}
              isOffline={isOffline}
            />
          )}

          {activeTab === "about" && hospital && (
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
              isOffline={isOffline}
            />
          )}

          {activeTab === "contact" && hospital && (
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
                <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-indigo-400" /> {hospital?.phone || fallbackHospital.phone}</div>
                <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-indigo-400" /> emergency: {hospital?.emergencyPhone || fallbackHospital.emergencyPhone}</div>
                <div className="flex items-center gap-2 flex-wrap"><span className="font-semibold text-white">Visiting Hours:</span> {hospital?.visitingHours || fallbackHospital.visitingHours}</div>
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
