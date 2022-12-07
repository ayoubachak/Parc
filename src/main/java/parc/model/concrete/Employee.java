package parc.model.concrete;

import jakarta.persistence.*;

@Entity
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;
    private String function;
    private String name;
    @ManyToOne
    @JoinColumn(name = "service_id")
    private Service service;


}
