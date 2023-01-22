package parc.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import parc.model.concrete.Vehicle;
import parc.repository.VehicleRepository;

@RestController
@RequestMapping("/api/vehicle")
public class VehicleController extends BaseController<Vehicle, VehicleRepository> {

    private final VehicleRepository repository;

    public VehicleController(VehicleRepository repository) {
        super(repository);
        this.repository = repository;
    }
}