import React from "react";
import { Hospital, Compass, Heart, Award, Sparkles, Building2, ShieldCheck, Waves } from "lucide-react";
import { Hospital as HospitalType } from "../types";

interface AboutViewProps {
  hospital: HospitalType;
}

export default function AboutView({ hospital }: AboutViewProps) {
  const facilities = [
    {
      title: "Intensive Care Units (ICU)",
      desc: "Level-3 state-of-the-art life support monitors, specialized pulmonary ventilators, and 1:1 dedicated nursing ratios."
    },
    {
      title: "Advanced Diagnostics Lab",
      desc: "Full automated biochemistry profiling, molecular pathology, high-precision MRI scanners, and ultra-low-dose CT imaging."
    },
    {
      title: "Robotic Surgical Theatre",
      desc: "Equipped with advanced surgeon console navigation arms for micro-precision orthopedic and cardiology surgeries."
    },
    {
      title: "24/7 Digital Pharmacy",
      desc: "Instantly connected barcode-tracked dispensary to prevent formulation mismatch, serving out-patients and emergency."
    },
    {
      title: "Pediatric Specialized Wards",
      desc: "Enriched, friendly environment staffed with specialized pediatric care specialists and parent-rooming facilities."
    },
    {
      title: "Physiotherapy & Rehab Suites",
      desc: "Reconditioning gyms with advanced hydrotherapy suites, spine mobilization systems, and gait-analysis feedback panels."
    }
  ];

  return (
    <div className="space-y-12 py-6" id="about-view-wrapper">
      {/* Title Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full font-sans font-semibold text-xs">
          <Award className="h-4 w-4" />
          Legacy of Care
        </div>
        <h2 className="font-sans font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
          About St. Jude Memorial Hospital
        </h2>
        <p className="font-sans text-slate-500 text-sm leading-relaxed">
          Discover the history, medical philosophy, and world-class technological infrastructure that make our institution a global benchmark for compassionate healthcare.
        </p>
      </div>

      {/* Grid: Description & Infrastructure Graphic */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center" id="about-overview">
        <div className="space-y-6">
          <p className="font-sans text-slate-600 text-base leading-relaxed">
            {hospital.overview}
          </p>
          <p className="font-sans text-slate-600 text-base leading-relaxed">
            Our hospital acts as a primary trauma center and a specialized referral hub. Since our inception, we have integrated computer-assisted diagnostics, electronic health record workflows, and patient assistance bots to optimize safety.
          </p>
          
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <span className="block font-sans font-black text-3xl text-indigo-600">45+</span>
              <span className="block font-sans font-medium text-xs text-slate-500 mt-1">Years of clinical excellence</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <span className="block font-sans font-black text-3xl text-indigo-600">100%</span>
              <span className="block font-sans font-medium text-xs text-slate-500 mt-1">Electronic medical grounding</span>
            </div>
          </div>
        </div>

        {/* Dynamic Hospital Styled Graphic (Replaces Broken Static Images) */}
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-lg border border-slate-800 flex flex-col justify-between h-96">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-teal-500/10 rounded-full blur-2xl"></div>
          
          <div className="flex justify-between items-start z-10">
            <div className="bg-indigo-600/30 border border-indigo-400/20 px-3 py-1 rounded-full flex items-center gap-1 text-xs">
              <Building2 className="h-4 w-4 text-indigo-300" />
              Main Facility
            </div>
            <div className="text-right text-slate-400 text-xs font-mono">
              GPS: METRO_CAMPUS_SEC_4
            </div>
          </div>

          <div className="my-auto py-6 z-10 flex flex-col items-center justify-center">
            {/* SVG Visualizing a hospital building block */}
            <svg viewBox="0 0 200 100" className="w-48 h-24 text-indigo-400" fill="currentColor">
              {/* Base */}
              <rect x="10" y="70" width="180" height="20" rx="3" fill="slate-700" className="opacity-40" />
              {/* Wing A */}
              <rect x="30" y="20" width="50" height="60" rx="4" className="fill-indigo-500/80" />
              {/* Wing B */}
              <rect x="120" y="30" width="50" height="50" rx="4" className="fill-teal-500/80" />
              {/* Center Tower */}
              <rect x="70" y="10" width="60" height="70" rx="4" className="fill-indigo-600" />
              {/* Red cross banner */}
              <path d="M 95 30 L 105 30 L 105 20 L 95 20 Z" className="fill-rose-500" />
              <path d="M 90 25 L 110 25 L 110 35 L 90 35 Z" className="fill-rose-500" />
              <circle cx="100" cy="27" r="12" fill="none" stroke="#f43f5e" strokeWidth="2" />
            </svg>
            <span className="text-xs text-indigo-200 mt-4 tracking-wider uppercase font-semibold">
              St. Jude Memorial Hospital Campus
            </span>
          </div>

          <div className="border-t border-white/10 pt-4 flex justify-between text-xs text-slate-400 z-10 font-sans">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-teal-400" /> JCI Accredited
            </span>
            <span>A Grade Infrastructure</span>
          </div>
        </div>
      </div>

      {/* Vision & Mission bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="about-vision-mission">
        <div className="bg-indigo-950 text-white rounded-2xl p-8 relative overflow-hidden border border-indigo-900 shadow-sm">
          <div className="absolute top-0 right-0 p-6 text-indigo-400/20">
            <Compass className="h-16 w-16" />
          </div>
          <span className="inline-flex items-center gap-1 text-indigo-300 font-sans font-semibold text-xs tracking-wider uppercase mb-3">
            Our Vision
          </span>
          <h4 className="font-sans font-bold text-xl text-white tracking-tight mb-4">
            Global Benchmark for Patient Welfare
          </h4>
          <p className="font-sans text-indigo-100 text-sm leading-relaxed">
            {hospital.vision}
          </p>
        </div>

        <div className="bg-slate-900 text-white rounded-2xl p-8 relative overflow-hidden border border-slate-800 shadow-sm">
          <div className="absolute top-0 right-0 p-6 text-teal-500/20">
            <Heart className="h-16 w-16" />
          </div>
          <span className="inline-flex items-center gap-1 text-teal-400 font-sans font-semibold text-xs tracking-wider uppercase mb-3">
            Our Mission
          </span>
          <h4 className="font-sans font-bold text-xl text-white tracking-tight mb-4">
            Outstanding Clinical Safety & Safety
          </h4>
          <p className="font-sans text-slate-200 text-sm leading-relaxed">
            {hospital.mission}
          </p>
        </div>
      </div>

      {/* Medical Facilities Listing */}
      <div className="space-y-6 pt-6" id="about-facilities">
        <h3 className="font-sans font-bold text-slate-900 text-xl flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-indigo-600" />
          World-Class Medical Facilities
        </h3>
        <p className="font-sans text-slate-500 text-sm max-w-2xl">
          Our specialized divisions feature cutting-edge bio-medical installations configured to deliver immediate diagnostic insights.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((fac, idx) => (
            <div 
              key={idx}
              className="bg-white border border-slate-100 hover:border-indigo-100 rounded-xl p-6 shadow-2xs hover:shadow-xs transition-all duration-150"
            >
              <h5 className="font-sans font-semibold text-slate-900 text-sm flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-indigo-600"></div>
                {fac.title}
              </h5>
              <p className="font-sans text-xs text-slate-500 mt-2 leading-relaxed">
                {fac.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
