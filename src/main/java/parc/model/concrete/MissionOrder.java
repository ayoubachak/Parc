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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getMissionSubject() {
        return missionSubject;
    }

    public void setMissionSubject(String missionSubject) {
        this.missionSubject = missionSubject;
    }

    public Employee getRemplacementEmployee() {
        return remplacementEmployee;
    }

    public void setRemplacementEmployee(Employee remplacementEmployee) {
        this.remplacementEmployee = remplacementEmployee;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
