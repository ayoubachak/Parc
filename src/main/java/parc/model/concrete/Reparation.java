package parc.model.concrete;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Reparation {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;
    private String bill;
    private int distance;
    private LocalDateTime reparationDate;
    private String reparationReference;

    public Reparation() {}

    @OneToOne(cascade = { CascadeType.ALL })
    @JoinColumn(name = "reparation_details_id")
    private ReparationDetails reparationDetails;

    public Reparation(Long id, String bill, Integer distance, LocalDateTime reparationDate, String reparationReference, ReparationDetails reparationDetails) {
        this.id = id;
        this.bill = bill;
        this.distance = distance;
        this.reparationDate = reparationDate;
        this.reparationReference = reparationReference;
        this.reparationDetails = reparationDetails;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBill() {
        return bill;
    }

    public void setBill(String bill) {
        this.bill = bill;
    }

    public int getDistance() {
        return distance;
    }

    public void setDistance(int distance) {
        this.distance = distance;
    }

    public LocalDateTime getReparationDate() {
        return reparationDate;
    }

    public void setReparationDate(LocalDateTime reparationDate) {
        this.reparationDate = reparationDate;
    }

    public String getReparationReference() {
        return reparationReference;
    }

    public void setReparationReference(String reparationReference) {
        this.reparationReference = reparationReference;
    }

    public ReparationDetails getReparationDetails() {
        return reparationDetails;
    }

    public void setReparationDetails(ReparationDetails reparationDetails) {
        this.reparationDetails = reparationDetails;
    }
}
