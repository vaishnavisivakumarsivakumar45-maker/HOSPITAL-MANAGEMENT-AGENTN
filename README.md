# Hospital Information Agent

An intelligent, AI-powered Hospital Information Chatbot and management system built with **Spring Boot (Java)**, **Node.js/Express (Full-Stack Engine)**, **React & Tailwind CSS (High-Fidelity Interface)**, **MongoDB**, and **Google Gemini API**.

---

## 📋 Table of Contents
- [Project Introduction](#project-introduction)
- [Problem Statement](#problem-statement)
- [Objectives](#objectives)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Database Design](#database-design)
- [API Documentation](#api-documentation)
- [Prompt Engineering](#prompt-engineering)
- [Screenshots & Visual Tour](#screenshots--visual-tour)
- [Installation Steps](#installation-steps)
- [Docker Deployment Commands](#docker-deployment-commands)
- [Future Enhancements](#future-enhancements)

---

## 🚀 Project Introduction
The **Hospital Information Agent** is a cutting-edge, patient-centered chatbot application designed to instantly answer hospital queries. It leverages state-of-the-art Generative AI via the **Google Gemini API** grounded on actual structured hospital records in **MongoDB**. 

The system features a highly responsive, modern multi-page single view dashboard including interactive doctors directories, wayfinding map routing, clinical departments indexes, and a fully functional real-time medical appointment scheduler.

---

## ⚠️ Problem Statement
Patients and visitors navigating medical facilities frequently experience high administrative friction:
1. **Navigational Fatigue:** Difficulty locating specific wards (e.g., Cardiology, Pediatrics) across multiple floors.
2. **Scheduling Delays:** Long wait lines or phone hold times simply to check a doctor's availability days or consultation fees.
3. **Information Fragmentation:** Scattered details regarding accepted health insurances, OP (Out-Patient) hours, and visiting rules.
4. **General AI Hallucination & Clinical Safety Liability:** Generic AI models often fabricate administrative info or dangerously attempt to prescribe medication or diagnose patients.

---

## 🎯 Objectives
- Provide **instant, 24/7 administrative assistance** regarding doctor availability, visiting hours, floor charts, and fees.
- **Formulate strict AI Grounding Rules:** Restrict AI outputs strictly to verified MongoDB facts, preventing medical diagnosis, prescription advice, or off-topic conversation.
- Create a **fully functional patient scheduler** that permits real-time appointment booking.
- Architect a **unified docker-compose pipeline** packaging the Java REST service, Node.js proxy, and MongoDB service.

---

## 🛠️ Technology Stack
- **Backend Services:** 
  - Spring Boot 3.x (Java 17) - Enterprise MVC Core
  - Node.js 20 & Express - Server-Side Gemini API Proxy & Vite Asset Engine
- **Frontend Core:** React 19, Tailwind CSS 4, Lucide Icons, and Motion.js (Animations)
- **Database System:** MongoDB 6.0 (Durable JSON document collection)
- **AI Core:** Google Gemini 3.5 Flash Model (`@google/genai` TypeScript SDK and Java `RestTemplate` mapping)
- **Deployment & Containers:** Docker, Docker Compose

---

## 🏢 System Architecture
```
[ Patient Client / React UI ]
             │ (Port 3000)
             ▼
    [ Node/Express Proxy ] ───► [ Google Gemini LLM API ]
             │
             ▼ (Port 8080)
   [ Spring Boot REST API ] ───► [ MongoDB (Port 27017) ]
```

The system follows a clean **MVC (Model-View-Controller) Architecture** for maximum separation of concerns:
1. **Controller:** Maps inbound HTTP request paths (`/doctors`, `/chat`, `/appointment`) to service interfaces.
2. **Service Layer:** Houses the business logic, triggers queries from MongoDB, and generates GenAI prompt templates.
3. **Repository Layer:** Interacts with the MongoDB collections through standard repository abstractions (`MongoRepository`).
4. **Model Tier:** Represents database document structures in Java (POJOs) and TypeScript.
5. **DTO (Data Transfer Object):** Deserializes requests and serializes payloads securely.

---

## 🗄️ Database Design

### MongoDB Collections Schema

#### 1. `hospital`
Stores configuration metadata for the hospital facility.
```json
{
  "_id": "ObjectId",
  "name": "String",
  "address": "String",
  "phone": "String",
  "emergencyPhone": "String",
  "email": "String",
  "visitingHours": "String",
  "acceptedInsurances": ["String"],
  "overview": "String",
  "vision": "String",
  "mission": "String"
}
```

#### 2. `department`
Tracks clinical floors, descriptions, and linked staff.
```json
{
  "_id": "ObjectId",
  "name": "String",
  "description": "String",
  "floorNumber": "Integer",
  "doctors": ["String"]
}
```

#### 3. `doctor`
Physical doctor records with clinical rates and active day availability.
```json
{
  "_id": "ObjectId",
  "name": "String",
  "department": "String",
  "experience": "Integer",
  "qualification": "String",
  "availableDays": ["String"],
  "consultationFee": "Double"
}
```

#### 4. `faq`
Standard frequently asked Q&A records.
```json
{
  "_id": "ObjectId",
  "question": "String",
  "answer": "String"
}
```

#### 5. `appointment`
Tracks patient appointments booked in real-time.
```json
{
  "_id": "ObjectId",
  "patientName": "String",
  "phone": "String",
  "doctorName": "String",
  "department": "String",
  "date": "String",
  "timeslot": "String",
  "reason": "String",
  "createdAt": "ISODate"
}
```

---

## 🔌 API Documentation

### 1. Hospital General Metadata
* **Route:** `GET /hospital`
* **Description:** Retrieves St. Jude primary information.
* **Response Type:** `JSON (Hospital object)`

### 2. Department Navigation Index
* **Route:** `GET /departments`
* **Description:** Lists floor plans, wayfinding details, and assigned specialists.
* **Response Type:** `JSON (Array of Department)`

### 3. Doctors staff directory
* **Route:** `GET /doctors`
* **Query Parameters:** `search` (Optional: Search by name, specialty, or credentials)
* **Response Type:** `JSON (Array of Doctor)`

### 4. Appointment Booking Registry
* **Route:** `POST /appointment`
* **Request Body:**
  ```json
  {
    "patientName": "John Doe",
    "phone": "+1 (555) 123-4567",
    "doctorName": "Dr. Sarah Connor",
    "department": "Cardiology",
    "date": "2026-07-10",
    "timeslot": "10:00 AM",
    "reason": "Routine Cardiovascular Screening"
  }
  ```
* **Response:** `201 Created` returning the saved `Appointment` with a generated ID.

### 5. Grounded Chat Integration
* **Route:** `POST /chat`
* **Request Body:**
  ```json
  {
    "message": "Where is the Cardiology department located?",
    "history": [
      { "role": "user", "content": "Hello" },
      { "role": "assistant", "content": "Hello! I am your assistant." }
    ]
  }
  ```
* **Response:**
  ```json
  {
    "reply": "The Cardiology department is located on the 1st Floor. Associated doctors include Dr. Sarah Connor and Dr. Ravi Kumar."
  }
  ```

---

## 🧠 Prompt Engineering
To ensure total security and prevent clinical diagnostic liability, we employ advanced prompt templates:

### System Instruction
```
You are an AI Hospital Information Assistant.

Answer only using the hospital information provided in the SYSTEM HOSPITAL RECORDS CONTEXT block above.

Never generate fake information.

If information is unavailable, reply:
"Sorry, I couldn't find that information in our hospital records."

If users ask for medical diagnosis or medicines, politely advise them to consult a doctor.

If users ask questions unrelated to hospital information, reply:
"I am designed to answer hospital-related questions only."

Keep answers short, professional, and easy to understand.
```

---

## 📸 Screenshots & Visual Tour
1. **Home Panel:** Modern dark-theme banner introducing the facility. Includes a prompt launcher, emergency quick contacts, and an interactive reservation form.
2. **About Page:** Showcases JCI credentials, clinical overview, and modular mission/vision cards.
3. **Specialties Floor Wayfinder:** Displays Urology, Emergency, Neurology, etc., highlighting their floors and linking to medical personnel.
4. **Searchable Registry:** Highly responsive input allowing instant keyword filtering on physicians.
5. **AI Consultation Chat:** Features scroll mechanics, chat reset buttons, typing indicators, and quick-ask recommendation pills.

---

## 📦 Installation Steps

### Prerequisites
- Java JDK 17
- Node.js v20+
- MongoDB instance running on port 27017

### Running the Full-Stack Node Application (Live Workspace)
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure `.env` with your Gemini API Key:
   ```env
   GEMINI_API_KEY="AIzaSyYourKey..."
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Access the web interface at `http://localhost:3000`.

### Running the Java Spring Boot Backend
1. Open the `/java-spring-boot-backend` directory.
2. Build the project using Maven:
   ```bash
   mvn clean install
   ```
3. Run the Spring Boot app:
   ```bash
   mvn spring-boot:run
   ```

---

## 🐳 Docker Deployment Commands

Deploy the entire suite instantly with a single command!

### 1. Build and Compile with Docker Compose
Ensure your environment variable `GEMINI_API_KEY` is exported on your host, then run:
```bash
docker-compose up --build -d
```

### 2. Verify Running Containers
Check the status of running containers:
```bash
docker ps
```
- Web Front-End: `http://localhost:3000`
- Spring Boot Service: `http://localhost:8080`
- MongoDB Database: `mongodb://localhost:27017`

### 3. Stop Services
```bash
docker-compose down -v
```

---

## 🔮 Future Enhancements
- **SMS Notifications:** Automate appointment confirmations and reminders via Twilio integration.
- **Multilingual Support:** Localize the chatbot to translate hospital wayfinding guidelines into 12+ international languages using Gemini Live Translation APIs.
- **Google Maps Navigation:** Integrate the Google Maps SDK to provide step-by-step transit guidance to our physical campus.
- **Electronic Health Record (EHR) Sync:** Safely sync booked appointments to active clinical logs (e.g., HL7 FHIR standards compliance).
