package parc.controller;


import org.springframework.web.bind.annotation.*;
import parc.model.concrete.Consumption;
import parc.model.concrete.FuelCompany;
import parc.repository.ConsumptionRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;


import parc.repository.FuelCompanyRepository;

import parc.model.concrete.Consumption;
import parc.model.concrete.FuelType;

@RestController
@RequestMapping("/api/consumptions")
public class ConsumptionController extends BaseController<Consumption, ConsumptionRepository> {

    private final ConsumptionRepository repository;
    private final FuelCompanyRepository fuelCompanyRepository;

    public ConsumptionController(ConsumptionRepository repository,FuelCompanyRepository fuelCompanyRepository) {
        super(repository);
        this.repository = repository;
        this.fuelCompanyRepository=fuelCompanyRepository ;
    }

    @GetMapping("/all")
    public List<Consumption> all(){
        return (List<Consumption>) repository.findAll();
    }

    @PostMapping("/add")
    public Consumption create(@RequestBody Map<String, Object> params) {
        Consumption consumption = new Consumption();

        LocalDate date = LocalDate.parse((String)  params.get("date"));
        consumption.setDate(date.atStartOfDay());
        Double distance = Double.parseDouble((String) params.get("distance"));
        consumption.setDistance( distance );
        Float price = Float.parseFloat((String) params.get("price") );
        consumption.setPrice(price );
        Float volume = Float.parseFloat((String) params.get("volume") );
        consumption.setVolume(volume );

        Map<String, Object> fuelCompanyParams = (Map<String, Object>) params.get("fuelCompany");
        FuelCompany fuelCompany = fuelCompanyRepository.findById(Long.valueOf((Integer) fuelCompanyParams.get("id"))).orElse(null);
        consumption.setFuelCompany(fuelCompany);

        repository.save(consumption);

        return consumption;
    }

    @PutMapping("/update/{id}")
    public Consumption edit(@PathVariable Long id, @RequestBody Map<String, Object> params) {

        Consumption entity = repository.findById(id).orElse(null);
        if (entity != null) {

            LocalDate date = LocalDate.parse((String)  params.get("date"));
            entity.setDate(date.atStartOfDay());
            Double distance = Double.parseDouble((String) params.get("distance"));
            entity.setDistance( distance );
            Float price = Float.parseFloat((String) params.get("price") );
            entity.setPrice(price );
            Float volume = Float.parseFloat((String) params.get("volume") );
            entity.setVolume(volume );

            Map<String, Object> fuelCompanyParams = (Map<String, Object>) params.get("fuelCompany");
            FuelCompany fuelCompany = fuelCompanyRepository.findById(Long.valueOf((Integer) fuelCompanyParams.get("id"))).orElse(null);
            entity.setFuelCompany(fuelCompany);

            repository.save(entity);
        }
        return entity;
    }


}
