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
    public OilChange() {}
    public OilChange(Long id,int distance,LocalDateTime oil_changed_at) {
        this.id=id;
        this.distance=distance;
        this.oilChangedAt=oil_changed_at;
    }

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
