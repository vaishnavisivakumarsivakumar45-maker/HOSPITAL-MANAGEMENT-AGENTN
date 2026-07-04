package com.hospital.agent.repository;

import com.hospital.agent.model.Doctor;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends MongoRepository<Doctor, String> {
    List<Doctor> findByNameContainingIgnoreCase(String name);
    List<Doctor> findByDepartmentIgnoreCase(String department);
}
