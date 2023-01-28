package parc.model.concrete;

import jakarta.persistence.*;

import java.util.List;
import java.util.Set;

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
    @ManyToOne(cascade = { CascadeType.ALL })
    private BrandModel brandModel;
    @OneToMany(cascade = { CascadeType.ALL })
    @JoinColumn(name = "consumption_id")
    private List<Consumption> consumption;
    @ManyToOne(cascade = { CascadeType.ALL })
    private FuelType fuelType;
    @ManyToOne(cascade = { CascadeType.ALL })
    private Category category;
    @OneToMany(cascade = { CascadeType.ALL })
    @JoinColumn(name = "missionorder_id")
    private List<MissionOrder> missionOrder;
    @ManyToOne(cascade = { CascadeType.ALL })
    private Service service;

    @ManyToOne(cascade = { CascadeType.ALL })
    @JoinColumn(name = "reparation_id")
    private Reparation reparation;

    @ManyToMany(cascade = { CascadeType.ALL })
    @JoinTable(name = "vehicle_order_mission", joinColumns = { @JoinColumn(name = "vehicle_id",unique = false) }, inverseJoinColumns = {
            @JoinColumn(name = "order_mission_id",unique = false) })
    private Set<MissionOrder> orderMissions;

    @ManyToMany(
            cascade = {CascadeType.ALL})
    @JoinTable(name = "vehicle_vehicle_state",
            joinColumns = { @JoinColumn(name = "vehicle_id",unique = false) },
            inverseJoinColumns = { @JoinColumn(name = "vehicle_state_id",unique = false) })
    private Set<VehicleState> vehicleStates;

    public Vehicle(){}

    public Set<MissionOrder> getOrderMissions() {
        return orderMissions;
    }

    public void setOrderMissions(Set<MissionOrder> orderMissions) {
        this.orderMissions = orderMissions;
    }

//    public Set<VehicleState> getVehicleStates() {
//        return vehicleStates;
//    }
//
//    public void setVehicleStates(Set<VehicleState> vehicleStates) {
//        this.vehicleStates = vehicleStates;
//    }

    public Vehicle(Long id, String color, String license, String model, int numChairs, int power, int vehkm, BrandModel brandModel, Category category, FuelType fuelType, Reparation reparation, Service service, Set<VehicleState> vehicleState, Set<MissionOrder> orderMissions) {
        this.id = id;
        this.color = color;
        this.liscence = license;
        this.model = model;
        this.numchairs = numChairs;
        this.power = power;
        this.vehkm = vehkm;
        this.brandModel = brandModel;
        this.category = category;
        this.fuelType = fuelType;
        this.reparation = reparation;
        this.service = service;
        this.orderMissions = orderMissions;
//        this.vehicleStates = vehicleState;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getLiscence() {
        return liscence;
    }

    public void setLiscence(String liscence) {
        this.liscence = liscence;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public int getNumchairs() {
        return numchairs;
    }

    public void setNumchairs(int numchairs) {
        this.numchairs = numchairs;
    }

    public float getPower() {
        return power;
    }

    public void setPower(float power) {
        this.power = power;
    }

    public int getVehkm() {
        return vehkm;
    }

    public void setVehkm(int vehkm) {
        this.vehkm = vehkm;
    }

    public BrandModel getBrandModel() {
        return brandModel;
    }

    public void setBrandModel(BrandModel brandModel) {
        this.brandModel = brandModel;
    }

    public List<Consumption> getConsumption() {
        return consumption;
    }

    public void setConsumption(List<Consumption> consumption) {
        this.consumption = consumption;
    }

    public FuelType getFuelType() {
        return fuelType;
    }

    public void setFuelType(FuelType fuelType) {
        this.fuelType = fuelType;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public List<MissionOrder> getMissionOrder() {
        return missionOrder;
    }

    public void setMissionOrder(List<MissionOrder> missionOrder) {
        this.missionOrder = missionOrder;
    }

    public Service getService() {
        return service;
    }

    public void setService(Service service) {
        this.service = service;
    }

//    public Set<VehicleState> getVehicleState() {
//        return vehicleStates;
//    }
//
//    public void setVehicleState(Set<VehicleState> vehicleState) {
//        this.vehicleStates = vehicleState;
//    }

    public Reparation getReparation() {
        return reparation;
    }

    public void setReparation(Reparation reparation) {
        this.reparation = reparation;
    }
}
