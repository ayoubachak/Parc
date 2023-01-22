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
    private int distance;
    private float price;
    private float volume; // in litter
    @ManyToOne
    private FuelCompany fuelCompany;

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

    public int getDistance() {
        return distance;
    }

    public void setDistance(int distance) {
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
