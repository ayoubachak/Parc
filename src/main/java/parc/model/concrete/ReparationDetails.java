package parc.model.concrete;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class ReparationDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;
    private float price;
    private String type;
    @OneToMany
    private List<Piece> pieces;

}
