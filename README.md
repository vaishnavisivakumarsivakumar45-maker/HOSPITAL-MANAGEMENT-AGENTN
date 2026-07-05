# 🏥 Hospital Information AI Agent

An AI-powered Hospital Information Assistant that helps users get instant hospital-related information through an interactive chatbot. The application uses Google's Gemini AI to answer hospital-related queries such as doctor availability, departments, OP timings, appointment guidance, emergency services, and hospital facilities.

---

## 🌐 Live Demo

**Project Link:**  
https://hospital-information-agent-637320943606.asia-southeast1.run.app

---

# 📖 Project Overview

The Hospital Information AI Agent is designed to simplify access to hospital information by providing instant responses through an AI chatbot. Instead of waiting at the reception or searching through multiple web pages, users can ask questions in natural language and receive quick, accurate answers.

This project demonstrates how Large Language Models (LLMs) can be integrated into a modern web application to improve healthcare information services.

---

# ❗ Problem Statement

Many hospitals still rely on manual enquiry systems where patients need to visit the reception or make phone calls to obtain basic information.

This leads to:
- Long waiting times
- Increased workload for reception staff
- Limited enquiry hours
- Repeated questions from patients
- Poor user experience

The goal of this project is to provide an AI-powered assistant that is available 24×7 to answer hospital-related questions instantly.

---

# 💡 Proposed Solution

The Hospital Information AI Agent enables users to:

- Ask hospital-related questions in natural language
- Get instant AI-generated responses
- View doctor and department information
- Check OP timings
- Learn appointment procedures
- Access emergency contact details
- Explore hospital facilities

---

# ✨ Features

- 🤖 AI-powered chatbot
- 🏥 Hospital information assistance
- 👨‍⚕️ Doctor and department details
- ⏰ OP timing information
- 📅 Appointment guidance
- 🚑 Emergency services information
- 💬 Natural language conversation
- ⚡ Fast responses using Google Gemini AI
- 📱 Responsive user interface

---

# 🛠 Technology Stack

### Frontend
- React.js
- Vite
- HTML5
- CSS3
- Tailwind CSS

### Backend
- Node.js
- Express.js

### AI Model
- Google Gemini API
 
### Version Control
- Git
- GitHub

### Deployment
- Google Cloud Run

---

# 🏗 System Architecture

```
User
   │
   ▼
React Frontend
   │
HTTP Request
   │
   ▼
Node.js + Express Backend
   │
Prompt Engineering
   │
   ▼
Google Gemini API
   │
AI Response
   │
   ▼
Frontend
```

---

# 🔄 Workflow

1. User opens the Hospital Information AI Agent.
2. User enters a hospital-related query.
3. The React frontend sends the request to the backend.
4. The backend creates a structured prompt.
5. The prompt is sent to the Gemini API.
6. Gemini processes the request and generates an intelligent response.
7. The backend receives the response.
8. The response is displayed to the user.

---

# 🧠 Prompt Engineering

The chatbot uses prompt engineering to generate accurate and consistent responses.

Example:

```text
You are a Hospital Information Assistant.

Answer only hospital-related questions.

Provide clear, polite, and accurate responses.

If the question is unrelated to hospital information,
politely inform the user that you can only answer hospital-related queries.

User Question:
What are the OP timings for Cardiology?
```

This helps the AI:
- Stay focused on hospital information
- Produce consistent answers
- Reduce irrelevant responses
- Improve overall accuracy

---

# 🚀 Installation

### Clone the repository

```bash
git clone <repository-url>
```

### Navigate to the project

```bash
cd Hospital-Information-Agent
```

### Install dependencies

```bash
npm install
```

### Create a `.env` file

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

### Run the project

```bash
npm run dev
```

---

# 📂 Project Structure

```
Hospital-Information-Agent/
│
├── src/
├── public/
├── server/
├── package.json
├── Dockerfile
├── server.ts
├── README.md
└── .env
```


# ✅ Advantages

- Instant AI-powered responses
- Available 24×7
- Easy-to-use interface
- Reduces receptionist workload
- Saves patients' time
- Improves user experience
- Fast and intelligent conversation

---

# ⚠ Limitations

- Requires an internet connection
- Depends on Google Gemini API
- Cannot diagnose medical conditions
- Information accuracy depends on available hospital data

---

# 🔮 Future Enhancements

- Voice Assistant
- Multi-language Support
- Online Appointment Booking
- Patient Login
- Doctor Availability Tracking
- Hospital Database Integration
- Chat History
- Emergency Ambulance Booking
- Mobile Application

---

# 📄 License

This project is developed for educational and learning purposes.
