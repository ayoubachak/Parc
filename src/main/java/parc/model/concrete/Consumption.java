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

}
