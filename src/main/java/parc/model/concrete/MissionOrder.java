package parc.model.concrete;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class MissionOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String path;
    private String missionSubject;
    @ManyToOne
    @JoinColumn(name = "remplacement_employee_id")
    private Employee remplacementEmployee;
    private String type;

}
