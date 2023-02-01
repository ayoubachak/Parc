package parc.model.concrete;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;
    private String function;
    private String name;
    private String email;
    @ManyToOne(cascade = { CascadeType.ALL })
    @JoinColumn(name = "service_id")
    private Service service;

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<MissionOrder> missionOrders = new HashSet<>();
    @ManyToMany(cascade = { CascadeType.ALL })
    @JoinTable(name = "employee_order_mission",
            joinColumns = @JoinColumn(name = "employee_id",unique = false),
            inverseJoinColumns = @JoinColumn(name = "order_mission_id",unique = false))
    private Set<MissionOrder> orderMissions;
    public Employee(){}
    public Employee(Long id, String function,String email, String name, Service service,Set<MissionOrder> missionOrders) {
        this.id = id;
        this.function = function;
        this.name = name;
        this.email = email;
        this.service = service;
        this.orderMissions = missionOrders;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFunction() {
        return function;
    }

    public void setFunction(String function) {
        this.function = function;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Service getService() {
        return service;
    }

    public void setService(Service service) {
        this.service = service;
    }
}
