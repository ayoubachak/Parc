package parc.model.concrete;

import jakarta.persistence.*;

import java.util.Set;

@Entity
public class FuelCompany {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;
    private String name;

    @OneToMany(mappedBy = "fuelCompany", cascade = CascadeType.ALL)
    private Set<Consumption> consumptions;
    public FuelCompany() { }

    public FuelCompany(Long id, String name) {
        this.id = id;
        this.name = name;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
