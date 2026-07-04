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
@Document(collection = "department")
public class Department {
    @Id
    private String id;
    private String name;
    private String description;
    private int floorNumber;
    private List<String> doctors;
}
