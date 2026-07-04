import React, { useState } from "react";
import { MessageSquareCode, Phone, CalendarCheck2, ShieldAlert, ArrowRight, HeartPulse, Clock, Sparkles } from "lucide-react";
import { Doctor, Department, Appointment } from "../types";

interface HomeViewProps {
  onAskAI: (initialQuestion?: string) => void;
  doctors: Doctor[];
  departments: Department[];
  hospitalPhone: string;
  emergencyPhone: string;
}

export default function HomeView({ onAskAI, doctors, departments, hospitalPhone, emergencyPhone }: HomeViewProps) {
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("10:00 AM");
  const [reason, setReason] = useState("");
  
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<any | null>(null);
  const [bookingError, setBookingError] = useState("");

  const sampleQuestions = [
    "Which doctor is available on Monday?",
    "Where is the Cardiology department?",
    "What are the visiting hours?",
    "Is emergency service available?"
  ];

  // Dynamically filter doctors based on selected department
  const filteredDoctors = selectedDept
    ? doctors.filter(doc => doc.department.toLowerCase() === selectedDept.toLowerCase())
    : doctors;

  const handleBookAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !phone || !selectedDoctor || !appointmentDate) {
      setBookingError("Please fill in all required fields.");
      return;
    }
    setBookingError("");
    setIsBooking(true);

    try {
      const response = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientName,
          phone,
          doctorName: selectedDoctor,
          department: selectedDept || doctors.find(d => d.name === selectedDoctor)?.department || "General",
          date: appointmentDate,
          timeslot: timeSlot,
          reason
        })
      });

      const data = await response.json();
      if (response.ok) {
        setBookingSuccess(data.appointment);
        // Clear fields
        setPatientName("");
        setPhone("");
        setSelectedDept("");
        setSelectedDoctor("");
        setAppointmentDate("");
        setReason("");
      } else {
        setBookingError(data.error || "Failed to book appointment. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setBookingError("Unable to connect to server. Please try again later.");
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="space-y-16 py-6" id="home-view-wrapper">
      {/* Hero Section */}
      <section className="relative bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-800" id="hero-section">
        {/* Abstract design elements */}
        <div className="absolute inset-0 bg-radial-gradient from-indigo-500/20 via-transparent to-transparent opacity-60"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-600 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-500 rounded-full blur-3xl opacity-20"></div>

        <div className="relative max-w-5xl mx-auto px-6 py-16 sm:px-12 lg:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-full text-indigo-300 font-sans font-medium text-xs mb-6 animate-pulse">
            <Sparkles className="h-4 w-4" />
            Empowered by Google Gemini AI
          </div>
          <h1 className="font-sans font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none mb-6">
            Intelligent Care, <br className="hidden sm:inline" />
            <span className="text-indigo-400">Compassionate Healing</span>
          </h1>
          <p className="font-sans text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Welcome to St. Jude Memorial Hospital, where advanced clinical sciences meet smart healthcare automation. Ask our AI Assistant any hospital information instantly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center" id="hero-actions">
            <button
              onClick={() => onAskAI()}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-sans font-semibold px-8 py-4 rounded-xl transition-all duration-150 cursor-pointer shadow-lg shadow-indigo-600/20 group"
            >
              <MessageSquareCode className="h-5 w-5 group-hover:scale-110 transition-transform" />
              Ask AI Assistant
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="#appointment-form"
              className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 font-sans font-semibold px-8 py-4 rounded-xl transition-all duration-150"
            >
              <CalendarCheck2 className="h-5 w-5" />
              Book Appointment
            </a>
          </div>
        </div>
      </section>

      {/* Ask AI Prompt suggestions panel */}
      <section className="bg-slate-50 border border-slate-100 rounded-2xl p-6 sm:p-8" id="ai-quick-prompts">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="font-sans font-bold text-lg text-slate-900 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-indigo-600" />
              Instant AI Assistant Queries
            </h3>
            <p className="font-sans text-sm text-slate-500 mt-1">
              Select any question below to test the Gemini AI-powered grounding chatbot instantly.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 md:max-w-2xl justify-start md:justify-end">
            {sampleQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => onAskAI(q)}
                className="bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 text-slate-700 hover:text-indigo-600 font-sans font-medium text-xs px-4 py-2.5 rounded-full shadow-2xs transition-all duration-150 cursor-pointer text-left"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency & Core Info Row */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6" id="core-info-cards">
        <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6 flex gap-4">
          <div className="bg-rose-100 text-rose-700 p-3 h-12 w-12 rounded-xl flex items-center justify-center shrink-0">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-sans font-bold text-slate-900 text-base">24/7 Trauma Emergency</h4>
            <p className="font-sans text-xs text-slate-600 mt-1">
              Our advanced Trauma & Emergency Unit is open 24/7 on the ground floor with zero wait time for critical emergencies.
            </p>
            <a 
              href={`tel:${emergencyPhone}`}
              className="inline-flex items-center gap-1.5 font-sans font-bold text-sm text-rose-700 mt-3 hover:underline"
            >
              <Phone className="h-4 w-4" />
              Call Now: {emergencyPhone}
            </a>
          </div>
        </div>

        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 flex gap-4">
          <div className="bg-indigo-100 text-indigo-700 p-3 h-12 w-12 rounded-xl flex items-center justify-center shrink-0">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-sans font-bold text-slate-900 text-base">Visiting & OP Timings</h4>
            <p className="font-sans text-xs text-slate-600 mt-1">
              Visiting: 10:00 AM - 7:00 PM (Daily). <br />
              Out-Patient OP Consultations: 9:00 AM - 5:00 PM (Mon - Sat).
            </p>
            <span className="inline-flex items-center gap-1 font-sans font-semibold text-xs text-indigo-700 mt-4">
              * Passes mandatory for wards
            </span>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex gap-4">
          <div className="bg-slate-200 text-slate-700 p-3 h-12 w-12 rounded-xl flex items-center justify-center shrink-0">
            <HeartPulse className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-sans font-bold text-slate-900 text-base">Insured Family Network</h4>
            <p className="font-sans text-xs text-slate-600 mt-1">
              We process direct cashless transactions with major insurance partners including BlueCross, Aetna, Cigna, and Medicare.
            </p>
            <span className="inline-flex items-center gap-1 font-sans font-semibold text-xs text-slate-500 mt-4">
              Check in desk for forms
            </span>
          </div>
        </div>
      </section>

      {/* Appointment & Quick Services Block */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6 items-start" id="appointment-form">
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-sans font-semibold text-xs">
            <CalendarCheck2 className="h-3.5 w-3.5" />
            Quick Patient Portal
          </div>
          <h2 className="font-sans font-bold text-3xl text-slate-900 tracking-tight">
            Schedule an Appointment in Seconds
          </h2>
          <p className="font-sans text-slate-500 text-sm leading-relaxed">
            Choose your desired department and select from our list of available specialists. Our automatic scheduling engine registers your visit in real-time.
          </p>
          
          <div className="border-t border-slate-100 pt-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600 font-sans font-bold text-sm">01</div>
              <div>
                <h5 className="font-sans font-semibold text-slate-900 text-sm">Select Department & Doctor</h5>
                <p className="font-sans text-xs text-slate-400">Match the practitioner best suited to your symptoms.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600 font-sans font-bold text-sm">02</div>
              <div>
                <h5 className="font-sans font-semibold text-slate-900 text-sm">Select Day & Timeslot</h5>
                <p className="font-sans text-xs text-slate-400">Cross-reference doctor's available days before booking.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Appointment Form */}
        <div className="lg:col-span-7 bg-white border border-slate-100 shadow-sm rounded-2xl p-6 sm:p-8">
          <h3 className="font-sans font-bold text-slate-900 text-lg mb-6 flex items-center gap-2">
            <CalendarCheck2 className="h-5 w-5 text-indigo-600" />
            Appointment Reservation
          </h3>

          {bookingSuccess ? (
            <div className="bg-teal-50 border border-teal-100 text-teal-800 p-6 rounded-xl space-y-4 animate-fadeIn" id="success-message">
              <div className="flex items-center gap-2 text-teal-700 font-bold text-base">
                <HeartPulse className="h-5 w-5" />
                Appointment Booked Successfully!
              </div>
              <p className="font-sans text-xs">
                Your appointment has been logged in our secure system. Please print or save the details below:
              </p>
              <div className="bg-white p-4 rounded-lg border border-teal-100 font-mono text-xs text-slate-700 space-y-1">
                <div><span className="font-semibold">Appointment ID:</span> {bookingSuccess.id}</div>
                <div><span className="font-semibold">Patient Name:</span> {bookingSuccess.patientName}</div>
                <div><span className="font-semibold">Doctor Name:</span> {bookingSuccess.doctorName}</div>
                <div><span className="font-semibold">Department:</span> {bookingSuccess.department}</div>
                <div><span className="font-semibold">Date:</span> {bookingSuccess.date}</div>
                <div><span className="font-semibold">Timeslot:</span> {bookingSuccess.timeslot}</div>
                {bookingSuccess.reason && <div><span className="font-semibold">Reason:</span> {bookingSuccess.reason}</div>}
              </div>
              <button
                onClick={() => setBookingSuccess(null)}
                className="bg-teal-600 hover:bg-teal-700 text-white font-sans font-semibold text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                Book Another Appointment
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookAppointment} className="space-y-4" id="appt-form-element">
              {bookingError && (
                <div className="bg-rose-50 border border-rose-100 text-rose-700 p-3 rounded-lg text-xs font-sans">
                  {bookingError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans font-bold text-slate-700 mb-1">Patient Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-indigo-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-sans font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="E.g. +1 (555) 123-4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-indigo-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans font-bold text-slate-700 mb-1">Department</label>
                  <select
                    value={selectedDept}
                    onChange={(e) => {
                      setSelectedDept(e.target.value);
                      setSelectedDoctor(""); // Reset doctor selection
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-indigo-600"
                  >
                    <option value="">-- Select Specialty --</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.name}>{dept.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-sans font-bold text-slate-700 mb-1">Doctor *</label>
                  <select
                    required
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-indigo-600"
                  >
                    <option value="">-- Choose practitioner --</option>
                    {filteredDoctors.map((doc, idx) => (
                      <option key={idx} value={doc.name}>{doc.name} ({doc.department})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans font-bold text-slate-700 mb-1">Appointment Date *</label>
                  <input
                    type="date"
                    required
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-indigo-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-sans font-bold text-slate-700 mb-1">Preferred Time *</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-indigo-600"
                  >
                    <option value="09:00 AM">09:00 AM (OP Morning)</option>
                    <option value="10:00 AM">10:00 AM (OP Morning)</option>
                    <option value="11:00 AM">11:00 AM (OP Morning)</option>
                    <option value="02:00 PM">02:00 PM (OP Afternoon)</option>
                    <option value="03:00 PM">03:00 PM (OP Afternoon)</option>
                    <option value="04:00 PM">04:00 PM (OP Afternoon)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-sans font-bold text-slate-700 mb-1">Reason for Visit (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="Describe your symptoms or reason..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-indigo-600"
                />
              </div>

              <button
                type="submit"
                disabled={isBooking}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-sans font-semibold py-3 rounded-lg transition-colors cursor-pointer disabled:bg-slate-400"
              >
                {isBooking ? "Booking Appointment..." : "Securely Book Appointment"}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
