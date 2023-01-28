package parc.model.concrete;

import jakarta.persistence.*;

@Entity
public class BrandModel {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;
    private String name;
    @ManyToOne(cascade = { CascadeType.ALL })
    private Brand brand;

    public  BrandModel(){}

    public BrandModel(Long id, String name, Brand brand) {
        this.id = id;
        this.name = name;
        this.brand = brand;
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

    public Brand getBrand() {
        return brand;
    }

    public void setBrand(Brand brand) {
        this.brand = brand;
    }
}
