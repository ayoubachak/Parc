package parc.model.concrete;

import jakarta.persistence.*;

@Entity
public class BrandModel {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;
    private String name;
    @ManyToOne
    private Brand brand;
}
