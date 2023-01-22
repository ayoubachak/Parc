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

    public List<VehicleState> getVehicleState() {
        return vehicleState;
    }

    public void setVehicleState(List<VehicleState> vehicleState) {
        this.vehicleState = vehicleState;
    }

    public Reparation getReparation() {
        return reparation;
    }

    public void setReparation(Reparation reparation) {
        this.reparation = reparation;
    }
}
