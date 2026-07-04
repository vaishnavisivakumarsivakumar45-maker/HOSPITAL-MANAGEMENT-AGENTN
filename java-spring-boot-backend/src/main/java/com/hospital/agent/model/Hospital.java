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
@Document(collection = "hospital")
public class Hospital {
    @Id
    private String id;
    private String name;
    private String address;
    private String phone;
    private String emergencyPhone;
    private String email;
    private String visitingHours;
    private List<String> acceptedInsurances;
    private String overview;
    private String vision;
    private String mission;
}
