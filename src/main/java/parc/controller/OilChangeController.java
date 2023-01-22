package parc.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import parc.model.concrete.OilChange;
import parc.repository.OilChangeRepository;

@RestController
@RequestMapping("/api/oilchange")
public class OilChangeController extends BaseController<OilChange, OilChangeRepository> {

    private final OilChangeRepository repository;

    public OilChangeController(OilChangeRepository repository) {
        super(repository);
        this.repository = repository;
    }
}