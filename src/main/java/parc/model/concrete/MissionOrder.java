package parc.model.concrete;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Entity
public class MissionOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;
    @ManyToOne(cascade = { CascadeType.ALL })
    @JoinColumn(name = "employee_id")
    private Employee employee;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String path;
    private String missionSubject;
    @ManyToOne(cascade = { CascadeType.ALL })
    @JoinColumn(name = "remplacement_employee_id")
    private Employee remplacementEmployee;
    private String type;

    @ManyToMany(cascade = { CascadeType.ALL })
    @JoinTable(name = "vehicle_order_mission",
            joinColumns = @JoinColumn(name = "order_mission_id",unique = false),
            inverseJoinColumns = @JoinColumn(name = "vehicle_id",unique = false))
    private Set<Vehicle> vehicles;

    @ManyToMany(cascade = { CascadeType.ALL })
    @JoinTable(name = "employee_order_mission",
            joinColumns = @JoinColumn(name = "order_mission_id",unique = false),
            inverseJoinColumns = @JoinColumn(name = "employee_id",unique = false))
    private Set<Employee> employees;

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

    public MissionOrder(){}

    public MissionOrder(Long id ,Employee employee, LocalDateTime endDate, String missionSubject, String path, LocalDateTime startDate, String type, Employee replacementEmployee,Set<Vehicle> vehicles,Set<Employee> employees) {
        this.id=id;
        this.employee = employee;
        this.endDate = endDate;
        this.missionSubject = missionSubject;
        this.path = path;
        this.startDate = startDate;
        this.type = type;
        this.remplacementEmployee = replacementEmployee;
        this.vehicles=vehicles;
        this.employees=employees;

    }

    public Set<Vehicle> getVehicles() {
        return vehicles;
    }

    public void setVehicles(Set<Vehicle> vehicles) {
        this.vehicles = vehicles;
    }

    public Set<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(Set<Employee> employees) {
        this.employees = employees;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
