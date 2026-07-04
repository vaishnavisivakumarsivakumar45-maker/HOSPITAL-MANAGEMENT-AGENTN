package com.hospital.agent.service;

import com.hospital.agent.model.*;
import com.hospital.agent.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HospitalService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private FAQRepository faqRepository;

    @Autowired
    private HospitalRepository hospitalRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    public List<Doctor> getAllDoctors(String search) {
        if (search != null && !search.trim().isEmpty()) {
            return doctorRepository.findByNameContainingIgnoreCase(search);
        }
        return doctorRepository.findAll();
    }

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    public List<FAQ> getAllFAQs() {
        return faqRepository.findAll();
    }

    public Hospital getHospitalDetails() {
        List<Hospital> list = hospitalRepository.findAll();
        if (!list.isEmpty()) {
            return list.get(0);
        }
        return null;
    }

    public Appointment saveAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }
}
