package com.hospital.agent;

import com.hospital.agent.model.*;
import com.hospital.agent.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Arrays;
import java.util.List;

@SpringBootApplication
public class HospitalAgentApplication {

    public static void main(String[] args) {
        SpringApplication.run(HospitalAgentApplication.class, args);
    }

    @Bean
    public CommandLineRunner initDatabase(
            DoctorRepository doctorRepository,
            DepartmentRepository departmentRepository,
            HospitalRepository hospitalRepository,
            FAQRepository faqRepository) {
        return args -> {
            // Seed Hospital Information if empty
            if (hospitalRepository.count() == 0) {
                Hospital hospital = new Hospital();
                hospital.setName("St. Jude Memorial Hospital");
                hospital.setAddress("123 Health Science Parkway, Sector 4, Metro City");
                hospital.setPhone("+1 (555) 019-2834");
                hospital.setEmergencyPhone("+1 (555) 911-3637");
                hospital.setEmail("info@stjudememorial.org");
                hospital.setVisitingHours("10:00 AM to 7:00 PM daily");
                hospital.setAcceptedInsurances(Arrays.asList("BlueCross BlueShield", "Aetna", "Cigna", "UnitedHealthcare", "Medicare"));
                hospital.setOverview("St. Jude Memorial Hospital has been a leading healthcare provider for over 45 years, offering compassionate, world-class medical services with state-of-the-art facilities and a stellar team of dedicated specialists.");
                hospital.setVision("To be the global benchmark for patient-centric care, innovative clinical research, and accessible community wellness.");
                hospital.setMission("To provide outstanding healthcare services with safety, dignity, and empathy, integrating cutting-edge technology and human warmth.");
                hospitalRepository.save(hospital);
                System.out.println("✅ Hospital records seeded in MongoDB.");
            }

            // Seed Departments if empty
            if (departmentRepository.count() == 0) {
                Department cardiology = new Department("cardiology", "Cardiology", "Comprehensive care for cardiovascular systems, including preventive screening, non-invasive imaging, and advanced interventional procedures.", 1, Arrays.asList("Dr. Sarah Connor", "Dr. Ravi Kumar"));
                Department neurology = new Department("neurology", "Neurology", "Advanced diagnostics and treatment for disorders of the brain, spinal cord, nerves, and muscles, led by elite neuro-specialists.", 2, Arrays.asList("Dr. Charles Xavier"));
                Department orthopedics = new Department("orthopedics", "Orthopedics", "Expert therapeutic and surgical care for bones, joints, ligaments, tendons, and muscles, specialized in joint replacement and sports medicine.", 3, Arrays.asList("Dr. Alan Grant", "Dr. Elizabeth Shaw"));
                Department pediatrics = new Department("pediatrics", "Pediatrics", "Providing friendly, compassionate pediatric primary care, immunizations, developmental screenings, and acute illness treatment from infancy through adolescence.", 4, Arrays.asList("Dr. Monica Geller"));
                Department ent = new Department("ent", "ENT", "Full-spectrum medical and surgical treatments for Ear, Nose, and Throat issues, hearing loss, sinus disorders, and allergy management.", 5, Arrays.asList("Dr. Stephen Strange"));
                Department dermatology = new Department("dermatology", "Dermatology", "Clinical skin care specializing in skin cancer screenings, acne treatments, eczema, psoriasis, and state-of-the-art cosmetic dermatological procedures.", 6, Arrays.asList("Dr. Bruce Banner"));
                Department emergency = new Department("emergency", "Emergency", "24/7 high-intensity trauma and critical care unit equipped to handle any adult or pediatric medical emergencies immediately.", 0, Arrays.asList("Dr. Gregory House"));

                departmentRepository.saveAll(Arrays.asList(cardiology, neurology, orthopedics, pediatrics, ent, dermatology, emergency));
                System.out.println("✅ Department records seeded in MongoDB.");
            }

            // Seed Doctors if empty
            if (doctorRepository.count() == 0) {
                doctorRepository.save(new Doctor("Dr. Sarah Connor", "Cardiology", 15, "MD - Cardiology, FACC", Arrays.asList("Monday", "Wednesday", "Friday"), 150));
                doctorRepository.save(new Doctor("Dr. Ravi Kumar", "Cardiology", 12, "MD - Cardiology, DM", Arrays.asList("Tuesday", "Thursday"), 130));
                doctorRepository.save(new Doctor("Dr. Charles Xavier", "Neurology", 20, "MD - Neurology, PhD in Brain Sciences", Arrays.asList("Wednesday", "Friday"), 200));
                doctorRepository.save(new Doctor("Dr. Alan Grant", "Orthopedics", 10, "MS - Orthopedics, Joint Reconstruction Specialist", Arrays.asList("Monday", "Thursday"), 120));
                doctorRepository.save(new Doctor("Dr. Elizabeth Shaw", "Orthopedics", 8, "MS - Orthopedics, Sports Medicine Fellow", Arrays.asList("Tuesday", "Friday"), 110));
                doctorRepository.save(new Doctor("Dr. Monica Geller", "Pediatrics", 14, "MD - Pediatrics, DCH", Arrays.asList("Monday", "Tuesday", "Wednesday"), 100));
                doctorRepository.save(new Doctor("Dr. Stephen Strange", "ENT", 18, "MD - Otolaryngology, FACS", Arrays.asList("Tuesday", "Thursday", "Friday"), 180));
                doctorRepository.save(new Doctor("Dr. Bruce Banner", "Dermatology", 11, "MD - Dermatology, PhD in Cellular Biology", Arrays.asList("Thursday", "Saturday"), 115));
                doctorRepository.save(new Doctor("Dr. Gregory House", "Emergency", 22, "MD - Diagnostic & Internal Medicine", Arrays.asList("Monday", "Tuesday", "Wednesday", "Thursday", "Friday"), 250));
                System.out.println("✅ Doctor staff records seeded in MongoDB.");
            }

            // Seed FAQs if empty
            if (faqRepository.count() == 0) {
                faqRepository.save(new FAQ("What are the visiting hours?", "10:00 AM to 7:00 PM daily."));
                faqRepository.save(new FAQ("Is emergency service available?", "Yes, our Emergency Department is open 24/7 on the Ground Floor."));
                faqRepository.save(new FAQ("Which insurance is accepted?", "We accept major plans including BlueCross BlueShield, Aetna, Cigna, UnitedHealthcare, and Medicare."));
                faqRepository.save(new FAQ("Where is the Cardiology department?", "The Cardiology department is located on the 1st Floor."));
                faqRepository.save(new FAQ("How can I book an appointment?", "You can book an appointment through our website's Quick Services Appointment Form, by calling +1 (555) 019-2834, or visiting our reception desk."));
                faqRepository.save(new FAQ("What is the consultation fee for Dr. Ravi Kumar?", "The consultation fee for Dr. Ravi Kumar is $130."));
                faqRepository.save(new FAQ("Which doctor is available on Monday?", "On Mondays, Dr. Sarah Connor (Cardiology), Dr. Alan Grant (Orthopedics), and Dr. Monica Geller (Pediatrics) are available."));
                faqRepository.save(new FAQ("What are the OP (Out-Patient) timings?", "Out-patient consultations run from 9:00 AM to 5:00 PM, Monday through Saturday."));
                System.out.println("✅ Frequently Asked Questions (FAQ) records seeded in MongoDB.");
            }
        };
    }
}
