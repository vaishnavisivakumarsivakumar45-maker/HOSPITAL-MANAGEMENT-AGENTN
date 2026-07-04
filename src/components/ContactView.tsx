import React from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  ShieldAlert, 
  Clock, 
  ExternalLink,
  MessageSquareCode
} from "lucide-react";
import { Hospital } from "../types";

interface ContactViewProps {
  hospital: Hospital;
  onAskAI: (question: string) => void;
}

export default function ContactView({ hospital, onAskAI }: ContactViewProps) {
  return (
    <div className="space-y-12 py-6" id="contact-view-wrapper">
      {/* Title Header */}
      <div className="space-y-3 max-w-3xl">
        <span className="inline-flex items-center gap-1.5 text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full font-sans font-semibold text-xs">
          <Clock className="h-4 w-4" />
          Location & Hours
        </span>
        <h2 className="font-sans font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
          Connect With Our Campus
        </h2>
        <p className="font-sans text-slate-500 text-sm leading-relaxed">
          Need clinical guidance, billing answers, or visiting credentials? Access all contact coordinates below or use our AI Chatbot for automated support.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="contact-split">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Address Card */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-2xs space-y-4">
            <div className="flex gap-4">
              <div className="bg-indigo-50 text-indigo-600 p-3 rounded-xl shrink-0 h-11 w-11 flex items-center justify-center">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-bold text-slate-900 text-sm">Physical Campus Address</h4>
                <p className="font-sans text-xs text-slate-600 leading-relaxed">
                  {hospital.address}
                </p>
              </div>
            </div>
          </div>

          {/* Hotline Contact Cards */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-2xs space-y-4">
            <div className="flex gap-4">
              <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl shrink-0 h-11 w-11 flex items-center justify-center">
                <Phone className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-bold text-slate-900 text-sm">General Reception Desk</h4>
                <p className="font-sans text-xs text-slate-600">
                  Call for appointments, outpatient billing queries, or medical record transfers.
                </p>
                <a 
                  href={`tel:${hospital.phone}`} 
                  className="inline-block font-mono font-bold text-sm text-indigo-600 hover:underline mt-2"
                >
                  {hospital.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Support Email Card */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-2xs space-y-4">
            <div className="flex gap-4">
              <div className="bg-sky-50 text-sky-600 p-3 rounded-xl shrink-0 h-11 w-11 flex items-center justify-center">
                <Mail className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-bold text-slate-900 text-sm">Patient Liaison Email</h4>
                <p className="font-sans text-xs text-slate-600">
                  Send general inquiries, medical record applications, or insurance pre-authorizations.
                </p>
                <a 
                  href={`mailto:${hospital.email}`} 
                  className="inline-block font-mono font-bold text-sm text-indigo-600 hover:underline mt-2"
                >
                  {hospital.email}
                </a>
              </div>
            </div>
          </div>

          {/* Emergency Helpline Highlight */}
          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6 space-y-4">
            <div className="flex gap-4">
              <div className="bg-rose-100 text-rose-700 p-3 rounded-xl shrink-0 h-11 w-11 flex items-center justify-center animate-pulse">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-bold text-slate-900 text-sm">24/7 Trauma Emergency</h4>
                <p className="font-sans text-xs text-rose-800">
                  Use this line solely for emergency trauma admissions. Active dispatchers route ambulance systems immediately.
                </p>
                <a 
                  href={`tel:${hospital.emergencyPhone}`} 
                  className="inline-block font-mono font-black text-base text-rose-700 hover:underline mt-2"
                >
                  {hospital.emergencyPhone}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Styled Vector Map (Replaces raw broken iframes or provides custom high-quality navigation graphic) */}
        <div className="lg:col-span-7 bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6" id="campus-map-box">
          <div className="flex justify-between items-center">
            <h4 className="font-sans font-bold text-slate-900 text-base">Campus Layout Wayfinding</h4>
            <span className="font-sans text-[10px] bg-slate-50 border border-slate-100 text-slate-500 font-semibold px-2.5 py-1 rounded-md uppercase">
              Main Campus Gate
            </span>
          </div>

          {/* High Fidelity Vector Hospital Map illustration with pins and roads */}
          <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 h-80 flex flex-col justify-between relative overflow-hidden shadow-inner">
            {/* Grid pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            
            {/* Vector Roads */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              {/* Roads */}
              <line x1="0" y1="120" x2="600" y2="120" stroke="#cbd5e1" strokeWidth="24" />
              <line x1="300" y1="0" x2="300" y2="350" stroke="#cbd5e1" strokeWidth="24" />
              {/* Markings */}
              <line x1="0" y1="120" x2="600" y2="120" stroke="#ffffff" strokeWidth="1" strokeDasharray="8 8" />
              <line x1="300" y1="0" x2="300" y2="350" stroke="#ffffff" strokeWidth="1" strokeDasharray="8 8" />
            </svg>

            {/* Campus buildings representations */}
            <div className="absolute top-4 left-6 bg-white border border-slate-200 rounded-lg p-3 shadow-xs text-left z-10 w-44">
              <span className="block font-sans font-bold text-xs text-slate-800">Wing A - Specialist Consultations</span>
              <span className="block font-sans text-[9px] text-slate-400 mt-0.5">Cardiology, Neurology, Orthopedics</span>
            </div>

            <div className="absolute bottom-6 left-6 bg-white border border-slate-200 rounded-lg p-3 shadow-xs text-left z-10 w-44">
              <span className="block font-sans font-bold text-xs text-slate-800">Wing B - Pediatric Care</span>
              <span className="block font-sans text-[9px] text-slate-400 mt-0.5">Floor 4, Toddlers Primary Care</span>
            </div>

            <div className="absolute top-4 right-6 bg-rose-50 border border-rose-200 rounded-lg p-3 shadow-xs text-left z-10 w-44">
              <span className="block font-sans font-bold text-xs text-rose-800 flex items-center gap-1">
                <ShieldAlert className="h-3 w-3" /> Emergency Admission
              </span>
              <span className="block font-sans text-[9px] text-rose-600 mt-0.5">Ground Floor Trauma & Triages</span>
            </div>

            <div className="absolute bottom-6 right-6 bg-indigo-50 border border-indigo-200 rounded-lg p-3 shadow-xs text-left z-10 w-44">
              <span className="block font-sans font-bold text-xs text-indigo-800">Public Parking Bays</span>
              <span className="block font-sans text-[9px] text-indigo-400 mt-0.5">Complimentary for patients</span>
            </div>

            {/* Main pin for current location */}
            <div className="absolute top-[108px] left-[288px] -translate-y-1/2 bg-indigo-600 text-white p-2.5 rounded-full shadow-md z-20 flex items-center justify-center animate-bounce">
              <MapPin className="h-5 w-5" />
            </div>

            <span className="block text-[10px] text-slate-400 font-sans z-10 text-right mt-auto">
              Wayfinding Layout © St. Jude Memorial Systems
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs font-sans text-slate-600">
            <span>
              Looking for exact ward directions? Ask our AI agent:
            </span>
            <button
              onClick={() => onAskAI("Where is the Cardiology department?")}
              className="flex items-center gap-1 bg-white hover:bg-indigo-50 border border-slate-200 text-indigo-600 font-sans font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <MessageSquareCode className="h-3.5 w-3.5" />
              Ask AI Directions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
