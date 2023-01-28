package parc.model.concrete;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Entity
public class VehicleState {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String state;

    @ManyToMany(cascade = { CascadeType.ALL })
    @JoinTable(name = "vehicle_vehicle_state",
            joinColumns = @JoinColumn(name = "vehicle_state_id",unique = false),
            inverseJoinColumns = @JoinColumn(name = "vehicle_id",unique = false))
    private Set<Vehicle> vehicles;




    public VehicleState() {}
    public VehicleState(Long id, LocalDateTime endDate, LocalDateTime startDate, String state,Set<Vehicle> vehicles) {
        this.id = id;
        this.endDate = endDate;
        this.startDate = startDate;
        this.state = state;
        this.vehicles = vehicles;
    }
    //getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}
