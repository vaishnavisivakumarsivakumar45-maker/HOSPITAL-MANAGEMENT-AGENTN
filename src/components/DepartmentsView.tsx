import React from "react";
import { 
  Heart, 
  Brain, 
  Activity, 
  Baby, 
  Ear, 
  Sparkles, 
  FlameKindling, 
  Layers, 
  User, 
  Navigation,
  ArrowUpRight
} from "lucide-react";
import { Department } from "../types";

interface DepartmentsViewProps {
  departments: Department[];
  onSelectDoctor: (doctorName: string) => void;
}

export default function DepartmentsView({ departments, onSelectDoctor }: DepartmentsViewProps) {
  
  // Custom icons mapping for hospital departments
  const getDeptIcon = (id: string) => {
    switch (id.toLowerCase()) {
      case "cardiology":
        return <Heart className="h-6 w-6 text-rose-600" />;
      case "neurology":
        return <Brain className="h-6 w-6 text-purple-600" />;
      case "orthopedics":
        return <Activity className="h-6 w-6 text-emerald-600" />;
      case "pediatrics":
        return <Baby className="h-6 w-6 text-amber-600" />;
      case "ent":
        return <Ear className="h-6 w-6 text-sky-600" />;
      case "dermatology":
        return <Sparkles className="h-6 w-6 text-pink-600" />;
      case "emergency":
        return <FlameKindling className="h-6 w-6 text-rose-700 animate-pulse" />;
      default:
        return <Layers className="h-6 w-6 text-indigo-600" />;
    }
  };

  const getDeptColorTheme = (id: string) => {
    switch (id.toLowerCase()) {
      case "cardiology":
        return "border-rose-100 bg-rose-50/30 text-rose-700";
      case "neurology":
        return "border-purple-100 bg-purple-50/30 text-purple-700";
      case "orthopedics":
        return "border-emerald-100 bg-emerald-50/30 text-emerald-700";
      case "pediatrics":
        return "border-amber-100 bg-amber-50/30 text-amber-700";
      case "ent":
        return "border-sky-100 bg-sky-50/30 text-sky-700";
      case "dermatology":
        return "border-pink-100 bg-pink-50/30 text-pink-700";
      case "emergency":
        return "border-rose-200 bg-rose-100/40 text-rose-800";
      default:
        return "border-slate-100 bg-slate-50 text-indigo-700";
    }
  };

  return (
    <div className="space-y-12 py-6" id="departments-view-wrapper">
      {/* Page Title */}
      <div className="space-y-3 max-w-3xl">
        <span className="inline-flex items-center gap-1.5 text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full font-sans font-semibold text-xs">
          <Navigation className="h-3.5 w-3.5" />
          Wayfinding & Specialty Guide
        </span>
        <h2 className="font-sans font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
          Specialized Clinical Departments
        </h2>
        <p className="font-sans text-slate-500 text-sm leading-relaxed">
          Browse through our state-of-the-art departments. Use our wayfinding floor index to locate treatment bays or consult medical personnel attached to each unit.
        </p>
      </div>

      {/* Grid of Departments */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="departments-grid">
        {departments.map((dept) => {
          const isEmergency = dept.id.toLowerCase() === "emergency";
          return (
            <div 
              key={dept.id} 
              id={`dept-card-${dept.id}`}
              className={`bg-white border rounded-2xl p-6 shadow-2xs hover:shadow-xs transition-all duration-150 flex flex-col justify-between relative ${
                isEmergency ? "border-rose-200 ring-2 ring-rose-500/5" : "border-slate-100"
              }`}
            >
              <div className="space-y-4">
                {/* Header: Icon & Floor */}
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl border ${getDeptColorTheme(dept.id)}`}>
                    {getDeptIcon(dept.id)}
                  </div>
                  <span className="font-mono font-bold text-xs text-slate-400 flex items-center gap-1">
                    <Navigation className="h-3.5 w-3.5" />
                    {dept.floorNumber === 0 ? "GROUND FLOOR" : `FLOOR ${dept.floorNumber}`}
                  </span>
                </div>

                {/* Body: Title & Desc */}
                <div className="space-y-2">
                  <h3 className="font-sans font-bold text-slate-900 text-lg flex items-center gap-1.5">
                    {dept.name}
                    {isEmergency && (
                      <span className="bg-rose-600 text-white font-sans font-extrabold text-[10px] px-1.5 py-0.5 rounded-full uppercase animate-pulse">
                        24/7 Priority
                      </span>
                    )}
                  </h3>
                  <p className="font-sans text-xs text-slate-500 leading-relaxed">
                    {dept.description}
                  </p>
                </div>
              </div>

              {/* Footer: Doctors lists */}
              <div className="border-t border-slate-50 pt-4 mt-6">
                <span className="block text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Assigned Practitioners ({dept.doctors.length})
                </span>
                <div className="flex flex-wrap gap-2">
                  {dept.doctors.map((doc, docIdx) => (
                    <button
                      key={docIdx}
                      onClick={() => onSelectDoctor(doc)}
                      className="inline-flex items-center gap-1 bg-slate-50 hover:bg-indigo-50 border border-slate-100 hover:border-indigo-100 text-slate-700 hover:text-indigo-600 text-xs px-2.5 py-1.5 rounded-lg font-sans font-medium transition-all duration-150 cursor-pointer"
                    >
                      <User className="h-3 w-3" />
                      {doc}
                      <ArrowUpRight className="h-2.5 w-2.5 opacity-60" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
