package parc.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import parc.model.concrete.Consumption;
import parc.repository.ConsumptionRepository;

import java.util.List;

@RestController
@RequestMapping("/api/consumptions")
public class ConsumptionController extends BaseController<Consumption, ConsumptionRepository> {

    private final ConsumptionRepository repository;

    public ConsumptionController(ConsumptionRepository repository) {
        super(repository);
        this.repository = repository;
    }

    @GetMapping("/all")
    public List<Consumption> all(){
        return (List<Consumption>) repository.findAll();
    }
}
