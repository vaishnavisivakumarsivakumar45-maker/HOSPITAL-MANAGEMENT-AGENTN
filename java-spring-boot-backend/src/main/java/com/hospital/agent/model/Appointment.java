package com.hospital.agent.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "appointment")
public class Appointment {
    @Id
    private String id;
    private String patientName;
    private String phone;
    private String doctorName;
    private String department;
    private String date;
    private String timeslot;
    private String reason;
    private LocalDateTime createdAt = LocalDateTime.now();
}
