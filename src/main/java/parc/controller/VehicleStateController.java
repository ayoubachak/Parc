package parc.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import parc.model.concrete.VehicleState;
import parc.repository.VehicleStateRepository;

@RestController
@RequestMapping("/api/vehicleStates")
public class VehicleStateController extends BaseController<VehicleState, VehicleStateRepository> {

    private final VehicleStateRepository repository;

    public VehicleStateController(VehicleStateRepository repository) {
        super(repository);
        this.repository = repository;
    }
}