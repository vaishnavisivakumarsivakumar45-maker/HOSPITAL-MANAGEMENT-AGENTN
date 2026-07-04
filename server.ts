import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Initialize express app
const app = express();
const PORT = 3000;

app.use(express.json());

// ==========================================
// MOCK DATABASE COLLECTIONS (MongoDB Simulation)
// ==========================================

const hospitalData = {
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

const departmentsData = [
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
    floorNumber: 0, // Ground Floor
    doctors: ["Dr. Gregory House"]
  }
];

const doctorsData = [
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

const faqData = [
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

// Memory storage for user-submitted appointments
const appointmentsData: any[] = [];

// ==========================================
// API REST ENDPOINTS
// ==========================================

// GET /hospital
app.get(["/hospital", "/api/hospital"], (req, res) => {
  res.json(hospitalData);
});

// GET /departments
app.get(["/departments", "/api/departments"], (req, res) => {
  res.json(departmentsData);
});

// GET /doctors
app.get(["/doctors", "/api/doctors"], (req, res) => {
  const { search } = req.query;
  if (search) {
    const term = String(search).toLowerCase();
    const filtered = doctorsData.filter(d => 
      d.name.toLowerCase().includes(term) || 
      d.department.toLowerCase().includes(term) ||
      d.qualification.toLowerCase().includes(term)
    );
    return res.json(filtered);
  }
  res.json(doctorsData);
});

// GET /faq
app.get(["/faq", "/api/faq"], (req, res) => {
  res.json(faqData);
});

// POST /appointment
app.post(["/appointment", "/api/appointment"], (req, res) => {
  const { patientName, phone, doctorName, department, date, timeslot, reason } = req.body;
  if (!patientName || !phone || !doctorName || !date) {
    return res.status(400).json({ error: "Patient name, phone, doctor, and date are required." });
  }
  const newAppointment = {
    id: "APT-" + Date.now(),
    patientName,
    phone,
    doctorName,
    department,
    date,
    timeslot: timeslot || "10:00 AM",
    reason: reason || "General Consultation",
    createdAt: new Date().toISOString()
  };
  appointmentsData.push(newAppointment);
  res.status(201).json({ success: true, message: "Appointment booked successfully!", appointment: newAppointment });
});

// GET /appointments
app.get(["/appointments", "/api/appointments"], (req, res) => {
  res.json(appointmentsData);
});

// ==========================================
// GOOGLE GEMINI AI LAZY CHAT INTEGRATION
// ==========================================

let geminiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!geminiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required to power the AI Assistant.");
    }
    geminiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        }
      }
    });
  }
  return geminiClient;
}

// POST /chat
app.post(["/chat", "/api/chat"], async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message parameter is required." });
  }

  try {
    const ai = getGeminiClient();

    // Construct the context based on our current databases
    const contextText = `
SYSTEM HOSPITAL RECORDS CONTEXT:
==========================================
HOSPITAL INFORMATION:
- Name: ${hospitalData.name}
- Address: ${hospitalData.address}
- Phone Contact: ${hospitalData.phone}
- Emergency Contact: ${hospitalData.emergencyPhone}
- Support Email: ${hospitalData.email}
- Visiting Hours: ${hospitalData.visitingHours}
- Insurances Accepted: ${hospitalData.acceptedInsurances.join(", ")}
- Hospital Overview: ${hospitalData.overview}
- Vision: ${hospitalData.vision}
- Mission: ${hospitalData.mission}

DEPARTMENTS AVAILABLE:
${departmentsData.map(d => `* ${d.name} Department (located on Floor ${d.floorNumber}): ${d.description}. Associated Doctors: ${d.doctors.join(", ")}`).join("\n")}

DOCTORS STAFF LISTING:
${doctorsData.map(d => `* ${d.name} in department ${d.department}. Qualification: ${d.qualification}. Experience: ${d.experience} years. Available on days: ${d.availableDays.join(", ")}. Consultation Fee: $${d.consultationFee}.`).join("\n")}

FREQUENTLY ASKED QUESTIONS (FAQ):
${faqData.map(f => `Q: ${f.question}\nA: ${f.answer}`).join("\n")}
==========================================
`;

    // System Prompt
    const systemPrompt = `You are an AI Hospital Information Assistant.

Answer only using the hospital information provided in the SYSTEM HOSPITAL RECORDS CONTEXT block above.

Never generate fake information or assume details outside this block.

If information is unavailable in the context block, reply exactly:
"Sorry, I couldn't find that information in our hospital records."

If users ask for medical diagnosis, prescriptions, or drugs, politely advise them to consult a medical professional or visit our Emergency Department.

If users ask questions unrelated to hospital information (e.g., general knowledge, personal questions, math, other cities), reply exactly:
"I am designed to answer hospital-related questions only."

Keep answers short, professional, and easy to understand.`;

    // Map conversation history to Gemini parts
    const contents: any[] = [];
    if (Array.isArray(history)) {
      history.forEach(item => {
        contents.push({
          role: item.role === "assistant" ? "model" : "user",
          parts: [{ text: item.content }]
        });
      });
    }

    // Add current user message with context embedded
    contents.push({
      role: "user",
      parts: [
        { text: `${contextText}\n\nUSER QUESTION: ${message}` }
      ]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.1, // low temperature for high precision grounding
      }
    });

    const reply = response.text || "Sorry, I couldn't find that information in our hospital records.";
    res.json({ reply });

  } catch (error: any) {
    console.error("Gemini API Error:", error.message);
    // Handle lack of API key gracefully with a user-friendly message
    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        reply: "⚠️ Hospital Assistant is in Demo Mode. To activate live AI chat, please configure your GEMINI_API_KEY in Settings > Secrets."
      });
    }
    res.status(500).json({ error: "Failed to generate AI response. Please try again." });
  }
});

// ==========================================
// VITE OR STATIC ASSETS ROUTING
// ==========================================

async function setupViteOrStatic() {
  if (process.env.NODE_ENV !== "production") {
    // Development mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Full-Stack Running at http://localhost:${PORT}`);
  });
}

if (process.env.VERCEL !== "1") {
  setupViteOrStatic();
}

export default app;
