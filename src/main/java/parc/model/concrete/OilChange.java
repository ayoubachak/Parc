package parc.model.concrete;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class OilChange {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;
    private LocalDateTime oilChangedAt;
    private float distance;
}
