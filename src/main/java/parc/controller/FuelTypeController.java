package parc.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import parc.model.concrete.FuelType;
import parc.repository.FuelTypeRepository;

import java.util.List;

@RestController
@RequestMapping("/api/fuelTypes")
public class FuelTypeController extends BaseController<FuelType, FuelTypeRepository> {

    private final FuelTypeRepository repository;

    public FuelTypeController(FuelTypeRepository repository) {
        super(repository);
        this.repository = repository;
    }

    @GetMapping("/all")
    public List<FuelType> all(){
        return (List<FuelType>) repository.findAll();
    }
}