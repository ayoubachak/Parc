package parc.controller;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import parc.model.concrete.FuelCompany;
import parc.model.concrete.MissionOrder;
import parc.model.concrete.Vehicle;
import parc.repository.FuelCompanyRepository;

import java.util.List;
import java.util.Set;

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

//    @GetMapping("/consumption/{id}")
//    public Set<Vehicle> getFuelCompanyByConsumptionId(@PathVariable Long id){
//        FuelCompany orderMission =  missionOrderRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("MissionOrder with ID not found"));
//
//        return repository.findByOrderMissions(orderMission);
//    }

}