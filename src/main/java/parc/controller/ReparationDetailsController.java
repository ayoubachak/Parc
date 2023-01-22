package parc.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import parc.model.concrete.ReparationDetails;
import parc.repository.ReparationDetailsRepository;

@RestController
@RequestMapping("/api/reparationdetails")
public class ReparationDetailsController extends BaseController<ReparationDetails, ReparationDetailsRepository> {

    private final ReparationDetailsRepository repository;

    public ReparationDetailsController(ReparationDetailsRepository repository) {
        super(repository);
        this.repository = repository;
    }
}