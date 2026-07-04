export interface Hospital {
  name: string;
  address: string;
  phone: string;
  emergencyPhone: string;
  email: string;
  visitingHours: string;
  acceptedInsurances: string[];
  overview: string;
  vision: string;
  margin?: string;
  mission: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  floorNumber: number;
  doctors: string[];
}

export interface Doctor {
  name: string;
  department: string;
  experience: number;
  qualification: string;
  availableDays: string[];
  consultationFee: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Appointment {
  id?: string;
  patientName: string;
  phone: string;
  doctorName: string;
  department: string;
  date: string;
  timeslot?: string;
  reason?: string;
  createdAt?: string;
}

export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}
