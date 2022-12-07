package parc.model.concrete;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;
    private String color;
    private String liscence;
    private String model;
    private int numchairs;
    private float power;
    private int vehkm;
    @ManyToOne
    private BrandModel brandModel;
    @OneToMany
    @JoinColumn(name = "consumption_id")
    private List<Consumption> consumption;
    @ManyToOne
    private FuelType fuelType;
    @ManyToOne
    private Category category;
    @OneToMany
    @JoinColumn(name = "missionorder_id")
    private List<MissionOrder> missionOrder;
    @ManyToOne
    private Service service;
    @OneToMany
    private List<VehicleState> vehicleState;
    @ManyToOne
    @JoinColumn(name = "reparation_id")
    private Reparation reparation;

}
