package parc.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import parc.model.concrete.FuelType;
import parc.repository.FuelTypeRepository;

@RestController
@RequestMapping("/api/fuelTypes")
public class FuelTypeController extends BaseController<FuelType, FuelTypeRepository> {

    private final FuelTypeRepository repository;

    public FuelTypeController(FuelTypeRepository repository) {
        super(repository);
        this.repository = repository;
    }
}