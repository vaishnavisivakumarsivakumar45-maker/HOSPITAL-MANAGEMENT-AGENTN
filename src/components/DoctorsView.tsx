import React, { useState, useEffect } from "react";
import { Search, UserCheck, Calendar, DollarSign, Award, Star, ArrowRight } from "lucide-react";
import { Doctor } from "../types";

interface DoctorsViewProps {
  doctors: Doctor[];
  initialSearch?: string;
  onBookWithDoctor: (doctorName: string, department: string) => void;
}

export default function DoctorsView({ doctors, initialSearch = "", onBookWithDoctor }: DoctorsViewProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  // Synchronize search term if updated externally (e.g. from department selection)
  useEffect(() => {
    if (initialSearch) {
      setSearchTerm(initialSearch);
    }
  }, [initialSearch]);

  const filteredDoctors = doctors.filter((doc) => {
    const term = searchTerm.toLowerCase();
    return (
      doc.name.toLowerCase().includes(term) ||
      doc.department.toLowerCase().includes(term) ||
      doc.qualification.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-10 py-6" id="doctors-view-wrapper">
      {/* Page Title & Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full font-sans font-semibold text-xs">
            <UserCheck className="h-3.5 w-3.5" />
            Medical Staff Registry
          </span>
          <h2 className="font-sans font-bold text-3xl text-slate-900 tracking-tight">
            Consult Our Specialist Doctors
          </h2>
          <p className="font-sans text-slate-500 text-sm">
            Search our staff registry by practitioner name, clinical department, or qualifications.
          </p>
        </div>

        {/* Search Component */}
        <div className="relative w-full lg:max-w-md shrink-0" id="search-bar">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            placeholder="Search name, department, or qualification..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 hover:bg-slate-100/50 border border-slate-200 focus:border-indigo-500 rounded-xl pl-11 pr-4 py-3.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all duration-150 shadow-2xs"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-sans text-indigo-600 hover:text-indigo-800 cursor-pointer font-semibold"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Grid Results */}
      {filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="doctors-grid">
          {filteredDoctors.map((doc, idx) => (
            <div 
              key={idx}
              id={`doctor-card-${doc.name.replace(/\s+/g, '-').toLowerCase()}`}
              className="bg-white border border-slate-100 hover:border-indigo-100 rounded-2xl p-6 shadow-2xs hover:shadow-xs transition-all duration-150 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Badge Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="inline-flex bg-indigo-50 text-indigo-700 text-[10px] font-sans font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                      {doc.department}
                    </span>
                    <h3 className="font-sans font-bold text-slate-900 text-lg mt-1">{doc.name}</h3>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-lg text-xs font-bold shrink-0">
                    <Star className="h-3 w-3 fill-amber-500" />
                    4.9
                  </div>
                </div>

                {/* Main Stats: Qualification & Exp */}
                <div className="space-y-2 border-t border-b border-slate-50 py-3 font-sans text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-indigo-600" />
                    <span><span className="font-semibold text-slate-800">Qualification:</span> {doc.qualification}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserCheck className="h-4 w-4 text-indigo-600" />
                    <span><span className="font-semibold text-slate-800">Experience:</span> {doc.experience} Years</span>
                  </div>
                </div>

                {/* Availability info */}
                <div className="space-y-2">
                  <span className="block text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider">
                    Available Days
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {doc.availableDays.map((day, dIdx) => (
                      <span 
                        key={dIdx}
                        className="bg-slate-50 border border-slate-100 text-slate-600 text-[10px] px-2 py-1 rounded-md font-medium"
                      >
                        <Calendar className="h-2.5 w-2.5 inline mr-1 text-slate-400" />
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Consultation Fee & CTA Button */}
              <div className="border-t border-slate-50 pt-4 mt-6 flex items-center justify-between">
                <div>
                  <span className="block text-[9px] font-sans font-bold text-slate-400 uppercase tracking-wider">
                    Consultation Fee
                  </span>
                  <span className="font-sans font-black text-xl text-slate-900 flex items-center">
                    <DollarSign className="h-4 w-4 text-indigo-600" />
                    {doc.consultationFee}
                  </span>
                </div>

                <button
                  onClick={() => onBookWithDoctor(doc.name, doc.department)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-sans font-semibold text-xs px-4 py-2.5 rounded-lg transition-all duration-150 flex items-center gap-1.5 cursor-pointer shadow-xs group"
                >
                  Book Visit
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-12 text-center text-slate-500 space-y-3" id="no-doctors-result">
          <p className="font-sans font-bold text-base text-slate-800">No Specialists Match Your Query</p>
          <p className="font-sans text-xs text-slate-400 max-w-sm mx-auto">
            Try searching for other terms like "Cardiology", "House", "MD", or clear the current filter criteria.
          </p>
          <button
            onClick={() => setSearchTerm("")}
            className="bg-indigo-600 text-white font-sans font-semibold text-xs px-4 py-2 rounded-lg mt-2 cursor-pointer"
          >
            Clear Search Filter
          </button>
        </div>
      )}
    </div>
  );
}
