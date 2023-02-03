package parc.model.concrete;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Consumption {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;
    private LocalDateTime date;
    private double distance;
    private float price;
    private float volume; // in litter
    @ManyToOne(cascade = { CascadeType.ALL })
    private FuelCompany fuelCompany;

    public Consumption(){}
    public Consumption(Long i, LocalDateTime date, double distance, float price, float volume, FuelCompany fuelCompany) {
        this.id=i;
        this.date = date;
        this.distance = distance;
        this.price = price;
        this.volume = volume;
        this.fuelCompany = fuelCompany;

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public double getDistance() {
        return distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public float getVolume() {
        return volume;
    }

    public void setVolume(float volume) {
        this.volume = volume;
    }

    public FuelCompany getFuelCompany() {
        return fuelCompany;
    }

    public void setFuelCompany(FuelCompany fuelCompany) {
        this.fuelCompany = fuelCompany;
    }
}
