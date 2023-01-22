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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getOilChangedAt() {
        return oilChangedAt;
    }

    public void setOilChangedAt(LocalDateTime oilChangedAt) {
        this.oilChangedAt = oilChangedAt;
    }

    public float getDistance() {
        return distance;
    }

    public void setDistance(float distance) {
        this.distance = distance;
    }
}
