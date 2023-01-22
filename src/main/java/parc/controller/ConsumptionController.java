package parc.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import parc.model.concrete.Consumption;
import parc.repository.ConsumptionRepository;

@RestController
@RequestMapping("/api/consumptions")
public class ConsumptionController extends BaseController<Consumption, ConsumptionRepository> {

    private final ConsumptionRepository repository;

    public ConsumptionController(ConsumptionRepository repository) {
        super(repository);
        this.repository = repository;
    }

}
