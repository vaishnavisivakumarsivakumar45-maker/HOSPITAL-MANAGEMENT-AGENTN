package com.hospital.agent.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "doctor")
public class Doctor {
    @Id
    private String id;
    private String name;
    private String department;
    private int experience;
    private String qualification;
    private List<String> availableDays;
    private double consultationFee;

    public Doctor(String name, String department, int experience, String qualification, List<String> availableDays, double consultationFee) {
        this.name = name;
        this.department = department;
        this.experience = experience;
        this.qualification = qualification;
        this.availableDays = availableDays;
        this.consultationFee = consultationFee;
    }
}
