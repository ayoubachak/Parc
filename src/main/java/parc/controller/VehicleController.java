package parc.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import parc.model.concrete.Vehicle;
import parc.repository.VehicleRepository;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController extends BaseController<Vehicle, VehicleRepository> {

    private final VehicleRepository repository;

    public VehicleController(VehicleRepository repository) {
        super(repository);
        this.repository = repository;
    }
    @GetMapping("/all")
    public List<Vehicle> all(){

        return (List<Vehicle>) repository.findAll();
    }
}