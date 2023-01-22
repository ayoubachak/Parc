package parc.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import parc.model.concrete.FuelCompany;
import parc.repository.FuelCompanyRepository;

@RestController
@RequestMapping("/api/fuelcompany")
public class FuelCompanyController extends BaseController<FuelCompany, FuelCompanyRepository> {

    private final FuelCompanyRepository repository;

    public FuelCompanyController(FuelCompanyRepository repository) {
        super(repository);
        this.repository = repository;
    }
}