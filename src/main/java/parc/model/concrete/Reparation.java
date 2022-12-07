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
    @OneToOne
    @JoinColumn(name = "reparation_details_id")
    private ReparationDetails reparationDetails;

}
