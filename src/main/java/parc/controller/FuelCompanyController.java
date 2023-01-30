package parc.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import parc.model.concrete.FuelCompany;
import parc.repository.FuelCompanyRepository;

import java.util.List;

@RestController
@RequestMapping("/api/fuelCompanies")
public class FuelCompanyController extends BaseController<FuelCompany, FuelCompanyRepository> {

    private final FuelCompanyRepository repository;

    public FuelCompanyController(FuelCompanyRepository repository) {
        super(repository);
        this.repository = repository;
    }

    @GetMapping("/all")
    public List<FuelCompany> all(){
        return (List<FuelCompany>) repository.findAll();
    }
}