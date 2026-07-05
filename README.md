# 🏥 Hospital Information AI Agent

An AI-powered Hospital Information Assistant that helps users get instant hospital-related information through a simple chat interface. The application uses Google's Gemini AI to answer user queries about doctors, departments, OP timings, appointments, emergency services, and hospital facilities.

---

## 📌 Project Overview

The Hospital Information AI Agent is designed to improve the patient experience by providing quick and accurate responses to common hospital-related questions. Instead of waiting at the reception or searching through multiple web pages, users can simply ask questions in natural language and receive instant answers.

This project demonstrates how Large Language Models (LLMs) can be integrated into a web application to provide intelligent healthcare information assistance.

---

## ❗ Problem Statement

Many hospitals still depend on manual enquiry systems where patients must visit the reception or make phone calls to obtain basic information. This often leads to:

- Long waiting times
- Repeated enquiries
- Increased workload for hospital staff
- Limited enquiry hours
- Poor user experience

This project aims to solve these problems by providing a 24×7 AI-powered virtual assistant.

---

## 💡 Proposed Solution

The Hospital Information AI Agent allows users to:

- Ask hospital-related questions in natural language
- Get instant AI-generated responses
- Access doctor and department information
- Know OP timings
- Learn appointment procedures
- Find emergency services
- View hospital facilities

---

## ✨ Features

- 🤖 AI-powered chatbot
- 🏥 Hospital information assistance
- 👨‍⚕️ Doctor and department details
- ⏰ OP timing information
- 📅 Appointment guidance
- 🚑 Emergency service information
- 💬 Natural language conversation
- ⚡ Fast response using Gemini AI
- 📱 Responsive web interface

---

## 🛠 Technology Stack

### Frontend
- React.js
- Vite
- HTML5
- CSS3
- Tailwind CSS

### Backend
- Node.js
- Express.js

### AI
- Google Gemini API
- Google AI Studio

### Version Control
- Git
- GitHub

### Deployment
- Docker (Optional)
- AWS / Azure / Render / Railway (Future Deployment)

---

## 🏗 System Architecture

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

## 🔄 Workflow

1. User opens the Hospital Information website.
2. User enters a hospital-related question.
3. React frontend sends the request to the backend.
4. Backend creates a structured prompt.
5. Gemini API processes the prompt.
6. AI generates an appropriate response.
7. Backend returns the response.
8. Frontend displays the answer to the user.

---

## 🧠 Prompt Engineering

The application uses prompt engineering to improve response quality.

Example prompt:

```
You are a Hospital Information Assistant.

Answer only hospital-related questions.

Provide clear, polite, and accurate responses.

If the question is unrelated to hospitals,
politely inform the user.

User Question:
What are the OP timings for Cardiology?
```

This helps the AI:
- Stay focused
- Produce consistent responses
- Reduce irrelevant answers
- Improve accuracy

---

## 🚀 project link



https://hospital-information-agent-637320943606.asia-southeast1.run.app

### Navigate to the project

```bash
cd YOUR_REPOSITORY
```

### Install dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file.

Example:

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

---

### Start the development server

```bash
npm run dev
```

---

## 📂 Project Structure

```
Hospital-Information-Agent/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
│
├── server/
│
├── public/
│
├── package.json
├── Dockerfile
├── README.md
└── .env
```

---

## 📸 Screenshots

Add screenshots here after running the project.

Example:

- Home Page
- Chat Interface
- AI Response
- About Page

---

## 🔮 Future Enhancements

- Voice Assistant
- Multi-language Support
- Online Appointment Booking
- Patient Login
- Doctor Availability Tracking
- Hospital Database Integration
- Medical Report Access
- Emergency Ambulance Booking
- Chat History
- Mobile Application

---

## Advantages

- Instant responses
- Easy to use
- Available 24×7
- Reduces receptionist workload
- Saves patient time
- Improves patient experience
- AI-powered intelligent conversation

---

## Limitations

- Requires internet connection
- Depends on Gemini API availability
- Cannot diagnose diseases
- Accuracy depends on available hospital information

---

## 👩‍💻 Author

**Vaishnavi Sivakumar**

- GitHub: https://github.com/VAISHNAVISIVAKUMAR050

---

## 📄 License

This project is developed for educational and learning purposes.
