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

    public ReparationDetails() {}
    public ReparationDetails(Long id,float price,String type) {
        this.id=id;
        this.price=price;
        this.type=type;
    }
    @OneToMany(cascade = { CascadeType.ALL })
    private List<Piece> pieces;

    @OneToOne(mappedBy = "reparationDetails",cascade = { CascadeType.ALL } )
    private Reparation reparation;
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<Piece> getPieces() {
        return pieces;
    }

    public void setPieces(List<Piece> pieces) {
        this.pieces = pieces;
    }
}
