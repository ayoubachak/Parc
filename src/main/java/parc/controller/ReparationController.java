package parc.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import parc.model.concrete.Reparation;
import parc.repository.ReparationRepository;

@RestController
@RequestMapping("/api/reparation")
public class ReparationController extends BaseController<Reparation, ReparationRepository> {

    private final ReparationRepository repository;

    public ReparationController(ReparationRepository repository) {
        super(repository);
        this.repository = repository;
    }
}