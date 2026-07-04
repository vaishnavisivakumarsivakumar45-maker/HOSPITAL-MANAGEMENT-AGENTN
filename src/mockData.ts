import { Hospital, Department, Doctor, FAQ } from "./types";

export const fallbackHospital: Hospital = {
  name: "St. Jude Memorial Hospital",
  address: "123 Health Science Parkway, Sector 4, Metro City",
  phone: "+1 (555) 019-2834",
  emergencyPhone: "+1 (555) 911-3637",
  email: "info@stjudememorial.org",
  visitingHours: "10:00 AM to 7:00 PM daily",
  acceptedInsurances: ["BlueCross BlueShield", "Aetna", "Cigna", "UnitedHealthcare", "Medicare"],
  overview: "St. Jude Memorial Hospital has been a leading healthcare provider for over 45 years, offering compassionate, world-class medical services with state-of-the-art facilities and a stellar team of dedicated specialists.",
  vision: "To be the global benchmark for patient-centric care, innovative clinical research, and accessible community wellness.",
  mission: "To provide outstanding healthcare services with safety, dignity, and empathy, integrating cutting-edge technology and human warmth."
};

export const fallbackDepartments: Department[] = [
  {
    id: "cardiology",
    name: "Cardiology",
    description: "Comprehensive care for cardiovascular systems, including preventive screening, non-invasive imaging, and advanced interventional procedures.",
    floorNumber: 1,
    doctors: ["Dr. Sarah Connor", "Dr. Ravi Kumar"]
  },
  {
    id: "neurology",
    name: "Neurology",
    description: "Advanced diagnostics and treatment for disorders of the brain, spinal cord, nerves, and muscles, led by elite neuro-specialists.",
    floorNumber: 2,
    doctors: ["Dr. Charles Xavier"]
  },
  {
    id: "orthopedics",
    name: "Orthopedics",
    description: "Expert therapeutic and surgical care for bones, joints, ligaments, tendons, and muscles, specialized in joint replacement and sports medicine.",
    floorNumber: 3,
    doctors: ["Dr. Alan Grant", "Dr. Elizabeth Shaw"]
  },
  {
    id: "pediatrics",
    name: "Pediatrics",
    description: "Providing friendly, compassionate pediatric primary care, immunizations, developmental screenings, and acute illness treatment from infancy through adolescence.",
    floorNumber: 4,
    doctors: ["Dr. Monica Geller"]
  },
  {
    id: "ent",
    name: "ENT",
    description: "Full-spectrum medical and surgical treatments for Ear, Nose, and Throat issues, hearing loss, sinus disorders, and allergy management.",
    floorNumber: 5,
    doctors: ["Dr. Stephen Strange"]
  },
  {
    id: "dermatology",
    name: "Dermatology",
    description: "Clinical skin care specializing in skin cancer screenings, acne treatments, eczema, psoriasis, and state-of-the-art cosmetic dermatological procedures.",
    floorNumber: 6,
    doctors: ["Dr. Bruce Banner"]
  },
  {
    id: "emergency",
    name: "Emergency",
    description: "24/7 high-intensity trauma and critical care unit equipped to handle any adult or pediatric medical emergencies immediately.",
    floorNumber: 0,
    doctors: ["Dr. Gregory House"]
  }
];

export const fallbackDoctors: Doctor[] = [
  {
    name: "Dr. Sarah Connor",
    department: "Cardiology",
    experience: 15,
    qualification: "MD - Cardiology, FACC",
    availableDays: ["Monday", "Wednesday", "Friday"],
    consultationFee: 150
  },
  {
    name: "Dr. Ravi Kumar",
    department: "Cardiology",
    experience: 12,
    qualification: "MD - Cardiology, DM",
    availableDays: ["Tuesday", "Thursday"],
    consultationFee: 130
  },
  {
    name: "Dr. Charles Xavier",
    department: "Neurology",
    experience: 20,
    qualification: "MD - Neurology, PhD in Brain Sciences",
    availableDays: ["Wednesday", "Friday"],
    consultationFee: 200
  },
  {
    name: "Dr. Alan Grant",
    department: "Orthopedics",
    experience: 10,
    qualification: "MS - Orthopedics, Joint Reconstruction Specialist",
    availableDays: ["Monday", "Thursday"],
    consultationFee: 120
  },
  {
    name: "Dr. Elizabeth Shaw",
    department: "Orthopedics",
    experience: 8,
    qualification: "MS - Orthopedics, Sports Medicine Fellow",
    availableDays: ["Tuesday", "Friday"],
    consultationFee: 110
  },
  {
    name: "Dr. Monica Geller",
    department: "Pediatrics",
    experience: 14,
    qualification: "MD - Pediatrics, DCH",
    availableDays: ["Monday", "Tuesday", "Wednesday"],
    consultationFee: 100
  },
  {
    name: "Dr. Stephen Strange",
    department: "ENT",
    experience: 18,
    qualification: "MD - Otolaryngology, FACS",
    availableDays: ["Tuesday", "Thursday", "Friday"],
    consultationFee: 180
  },
  {
    name: "Dr. Bruce Banner",
    department: "Dermatology",
    experience: 11,
    qualification: "MD - Dermatology, PhD in Cellular Biology",
    availableDays: ["Thursday", "Saturday"],
    consultationFee: 115
  },
  {
    name: "Dr. Gregory House",
    department: "Emergency",
    experience: 22,
    qualification: "MD - Diagnostic & Internal Medicine",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    consultationFee: 250
  }
];

export const fallbackFAQs: FAQ[] = [
  {
    question: "What are the visiting hours?",
    answer: "10:00 AM to 7:00 PM daily."
  },
  {
    question: "Is emergency service available?",
    answer: "Yes, our Emergency Department is open 24/7 on the Ground Floor."
  },
  {
    question: "Which insurance is accepted?",
    answer: "We accept major plans including BlueCross BlueShield, Aetna, Cigna, UnitedHealthcare, and Medicare."
  },
  {
    question: "Where is the Cardiology department?",
    answer: "The Cardiology department is located on the 1st Floor."
  },
  {
    question: "How can I book an appointment?",
    answer: "You can book an appointment through our website's Quick Services Appointment Form, by calling +1 (555) 019-2834, or visiting our reception desk."
  },
  {
    question: "What is the consultation fee for Dr. Ravi Kumar?",
    answer: "The consultation fee for Dr. Ravi Kumar is $130."
  },
  {
    question: "Which doctor is available on Monday?",
    answer: "On Mondays, Dr. Sarah Connor (Cardiology), Dr. Alan Grant (Orthopedics), and Dr. Monica Geller (Pediatrics) are available."
  },
  {
    question: "What are the OP (Out-Patient) timings?",
    answer: "Out-patient consultations run from 9:00 AM to 5:00 PM, Monday through Saturday."
  }
];
