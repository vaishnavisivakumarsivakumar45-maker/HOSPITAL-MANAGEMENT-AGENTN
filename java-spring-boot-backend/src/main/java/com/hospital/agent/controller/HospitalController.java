package com.hospital.agent.controller;

import com.hospital.agent.dto.ChatRequest;
import com.hospital.agent.dto.ChatResponse;
import com.hospital.agent.model.*;
import com.hospital.agent.service.GeminiService;
import com.hospital.agent.service.HospitalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*") // Allows flexible frontend connection
public class HospitalController {

    @Autowired
    private HospitalService hospitalService;

    @Autowired
    private GeminiService geminiService;

    @GetMapping("/hospital")
    public ResponseEntity<Hospital> getHospital() {
        Hospital details = hospitalService.getHospitalDetails();
        if (details != null) {
            return ResponseEntity.ok(details);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/departments")
    public ResponseEntity<List<Department>> getDepartments() {
        return ResponseEntity.ok(hospitalService.getAllDepartments());
    }

    @GetMapping("/doctors")
    public ResponseEntity<List<Doctor>> getDoctors(@RequestParam(required = false) String search) {
        return ResponseEntity.ok(hospitalService.getAllDoctors(search));
    }

    @GetMapping("/faq")
    public ResponseEntity<List<FAQ>> getFAQs() {
        return ResponseEntity.ok(hospitalService.getAllFAQs());
    }

    @PostMapping("/appointment")
    public ResponseEntity<Appointment> createAppointment(@RequestBody Appointment appointment) {
        if (appointment.getPatientName() == null || appointment.getPhone() == null || appointment.getDoctorName() == null) {
            return ResponseEntity.badRequest().build();
        }
        Appointment saved = hospitalService.saveAppointment(appointment);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping("/appointments")
    public ResponseEntity<List<Appointment>> getAppointments() {
        return ResponseEntity.ok(hospitalService.getAllAppointments());
    }

    @PostMapping("/chat")
    public ResponseEntity<ChatResponse> chat(@RequestBody ChatRequest request) {
        if (request.getMessage() == null || request.getMessage().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(new ChatResponse("Please provide a valid message."));
        }
        String reply = geminiService.generateChatResponse(request.getMessage(), request.getHistory());
        return ResponseEntity.ok(new ChatResponse(reply));
    }
}
