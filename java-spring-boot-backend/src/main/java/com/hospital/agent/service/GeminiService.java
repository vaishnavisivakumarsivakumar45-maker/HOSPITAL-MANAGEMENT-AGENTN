package com.hospital.agent.service;

import com.hospital.agent.dto.ChatRequest;
import com.hospital.agent.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    @Autowired
    private HospitalService hospitalService;

    private final RestTemplate restTemplate = new RestTemplate();

    public String generateChatResponse(String message, List<ChatRequest.ChatMessage> history) {
        try {
            // Retrieve latest database records to ground Gemini's answers in real MongoDB collections data
            Hospital hospital = hospitalService.getHospitalDetails();
            List<Department> departments = hospitalService.getAllDepartments();
            List<Doctor> doctors = hospitalService.getAllDoctors(null);
            List<FAQ> faqs = hospitalService.getAllFAQs();

            // Construct Context Block
            StringBuilder context = new StringBuilder();
            context.append("SYSTEM HOSPITAL RECORDS CONTEXT:\n");
            context.append("==========================================\n");
            if (hospital != null) {
                context.append("HOSPITAL INFORMATION:\n");
                context.append("- Name: ").append(hospital.getName()).append("\n");
                context.append("- Address: ").append(hospital.getAddress()).append("\n");
                context.append("- Phone: ").append(hospital.getPhone()).append("\n");
                context.append("- Emergency Phone: ").append(hospital.getEmergencyPhone()).append("\n");
                context.append("- Support Email: ").append(hospital.getEmail()).append("\n");
                context.append("- Visiting Hours: ").append(hospital.getVisitingHours()).append("\n");
                context.append("- Insurances Accepted: ").append(String.join(", ", hospital.getAcceptedInsurances())).append("\n");
                context.append("- Hospital Overview: ").append(hospital.getOverview()).append("\n");
                context.append("- Vision: ").append(hospital.getVision()).append("\n");
                context.append("- Mission: ").append(hospital.getMission()).append("\n\n");
            }

            context.append("DEPARTMENTS AVAILABLE:\n");
            for (Department d : departments) {
                context.append("* ").append(d.getName()).append(" Department (Floor ").append(d.getFloorNumber()).append("): ")
                        .append(d.getDescription()).append(". Doctors: ").append(String.join(", ", d.getDoctors())).append("\n");
            }
            context.append("\n");

            context.append("DOCTORS STAFF LISTING:\n");
            for (Doctor d : doctors) {
                context.append("* ").append(d.getName()).append(" in department ").append(d.getDepartment())
                        .append(". Qualification: ").append(d.getQualification()).append(". Experience: ").append(d.getExperience())
                        .append(" years. Available days: ").append(String.join(", ", d.getAvailableDays()))
                        .append(". Consultation Fee: $").append(d.getConsultationFee()).append(".\n");
            }
            context.append("\n");

            context.append("FREQUENTLY ASKED QUESTIONS (FAQ):\n");
            for (FAQ f : faqs) {
                context.append("Q: ").append(f.getQuestion()).append("\nA: ").append(f.getAnswer()).append("\n\n");
            }
            context.append("==========================================\n");

            // Define System Instruction matching exact Prompt Engineering requirement
            String systemInstruction = "You are an AI Hospital Information Assistant.\n" +
                    "\n" +
                    "Answer only using the hospital information provided in the SYSTEM HOSPITAL RECORDS CONTEXT block above.\n" +
                    "\n" +
                    "Never generate fake information.\n" +
                    "\n" +
                    "If information is unavailable, reply:\n" +
                    "'Sorry, I couldn't find that information in our hospital records.'\n" +
                    "\n" +
                    "If users ask for medical diagnosis or medicines, politely advise them to consult a doctor.\n" +
                    "\n" +
                    "If users ask questions unrelated to hospital information, reply:\n" +
                    "'I am designed to answer hospital-related questions only.'\n" +
                    "\n" +
                    "Keep answers short, professional, and easy to understand.";

            // Formulate standard Gemini HTTP API payload
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("User-Agent", "aistudio-build");

            Map<String, Object> requestBody = new HashMap<>();
            
            // Build contents array including history
            List<Map<String, Object>> contentsList = new ArrayList<>();
            if (history != null) {
                for (ChatRequest.ChatMessage hist : history) {
                    Map<String, Object> turn = new HashMap<>();
                    turn.put("role", hist.getRole().equals("assistant") ? "model" : "user");
                    
                    Map<String, Object> part = new HashMap<>();
                    part.put("text", hist.getContent());
                    turn.put("parts", Collections.singletonList(part));
                    contentsList.add(turn);
                }
            }

            // Add active query with grounding context
            Map<String, Object> currentTurn = new HashMap<>();
            currentTurn.put("role", "user");
            Map<String, Object> currentPart = new HashMap<>();
            currentPart.put("text", context + "\n\nUSER QUESTION: " + message);
            currentTurn.put("parts", Collections.singletonList(currentPart));
            contentsList.add(currentTurn);

            requestBody.put("contents", contentsList);

            // Configure systemInstruction in Gemini Config block
            Map<String, Object> configMap = new HashMap<>();
            Map<String, Object> systemPart = new HashMap<>();
            systemPart.put("text", systemInstruction);
            Map<String, Object> systemContent = new HashMap<>();
            systemContent.put("parts", Collections.singletonList(systemPart));
            configMap.put("systemInstruction", systemContent);
            
            // Limit creativity / increase factual grounding
            configMap.put("temperature", 0.1);
            
            requestBody.put("config", configMap);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            String requestUrl = apiUrl + "?key=" + apiKey;
            ResponseEntity<Map> responseEntity = restTemplate.postForEntity(requestUrl, entity, Map.class);

            if (responseEntity.getStatusCode().is2xxSuccessful() && responseEntity.getBody() != null) {
                Map body = responseEntity.getBody();
                List candidates = (List) body.get("candidates");
                if (candidates != null && !candidates.isEmpty()) {
                    Map candidate = (Map) candidates.get(0);
                    Map content = (Map) candidate.get("content");
                    if (content != null) {
                        List parts = (List) content.get("parts");
                        if (parts != null && !parts.isEmpty()) {
                            Map part = (Map) parts.get(0);
                            return (String) part.get("text");
                        }
                    }
                }
            }
            return "Sorry, I couldn't find that information in our hospital records.";
        } catch (Exception e) {
            System.err.println("Error calling Gemini API: " + e.getMessage());
            return "Sorry, I couldn't find that information in our hospital records.";
        }
    }
}
