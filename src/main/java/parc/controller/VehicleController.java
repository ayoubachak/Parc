package parc.controller;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.web.bind.annotation.*;
import parc.model.concrete.*;
import parc.repository.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController extends BaseController<Vehicle, VehicleRepository> {

    private final VehicleRepository repository;
    private final ServiceRepository serviceRepository;
    private final BrandModelRepository brandModelRepository;
    private final BrandRepository brandRepository;
    private final FuelTypeRepository fuelTypeRepository;
    private final CategoryRepository categoryRepository;
    private final MissionOrderRepository missionOrderRepository;
    public VehicleController(VehicleRepository repository, ServiceRepository serviceRepository, BrandModelRepository brandModelRepository, BrandRepository brandRepository, FuelTypeRepository fuelTypeRepository, CategoryRepository categoryRepository, MissionOrderRepository missionOrderRepository) {
        super(repository);
        this.repository = repository;
        this.serviceRepository = serviceRepository;
        this.brandModelRepository = brandModelRepository;
        this.brandRepository = brandRepository;
        this.fuelTypeRepository = fuelTypeRepository;
        this.categoryRepository = categoryRepository;

        this.missionOrderRepository = missionOrderRepository;
    }
    @GetMapping("/all")
    public List<Vehicle> all(){
        return (List<Vehicle>) repository.findAll();
    }

    @PostMapping("/add")
    public Vehicle create(@RequestBody Vehicle entity){

        Service service = entity.getService();
        // check if the service exists
        if (service != null && service.getId() != null) {
            service = serviceRepository.findById(service.getId()).orElse(null);
        }
        if (service == null) {
            // create a new service
            service = new Service();
            serviceRepository.save(service);
        }
        entity.setService(service);

        // Brand checking
        BrandModel brandModel = entity.getBrandModel();
        Brand brand = brandModel.getBrand();
        if(brandModel != null && brandModel.getId() != null){
            brandModel = brandModelRepository.findById(brandModel.getId()).orElse(null);
        }
        if(brandModel == null){
            brandModel = new BrandModel();
            brandModel.setBrand(brand);
            brandModelRepository.save(brandModel);
        }
        entity.setBrandModel(brandModel);

        // Fuel Type checking
        FuelType fuelType = entity.getFuelType();
        // check if the fuelType exists
        if (fuelType != null && fuelType.getId() != null) {
            fuelType = fuelTypeRepository.findById(fuelType.getId()).orElse(null);
        }
        if (fuelType == null) {
            // create a new fuelType
            fuelType = new FuelType();
            fuelTypeRepository.save(fuelType);
        }
        entity.setFuelType(fuelType);

        // Category Checking
        Category category = entity.getCategory();
        // check if the category exists
        if (category != null && category.getId() != null) {
            category = categoryRepository.findById(category.getId()).orElse(null);
        }
        if (category == null) {
            // create a new category
            category = new Category();
            categoryRepository.save(category);
        }
        entity.setCategory(category);


        return repository.save(entity);
    }

    @PutMapping("/update/{id}")
    public Vehicle update(@PathVariable Long id, @RequestBody Vehicle entity){
        Vehicle vehicle = repository.findById(id).orElse(null);
        if(vehicle == null ){
            throw  new EntityNotFoundException("No Vehicle found with id :"+id);
        }
        // setting the sent variables
        vehicle.setColor(entity.getColor());
        vehicle.setLiscence(entity.getLiscence());
        vehicle.setModel(entity.getModel());
        vehicle.setNumchairs(entity.getNumchairs());
        vehicle.setPower(entity.getPower());
        vehicle.setVehkm(entity.getVehkm());

        Service service = entity.getService();
        // check if the service exists
        if (service != null && service.getId() != null) {
            service = serviceRepository.findById(service.getId()).orElse(null);
        }
        if (service == null) {
            // create a new service
            service = new Service();
            serviceRepository.save(service);
        }
        vehicle.setService(service);

        // Brand checking
        BrandModel brandModel = entity.getBrandModel();
        Brand brand = brandModel.getBrand();
        if(brandModel != null && brandModel.getId() != null){
            brandModel = brandModelRepository.findById(brandModel.getId()).orElse(null);
        }
        if(brandModel == null){
            brandModel = new BrandModel();
            brandModel.setBrand(brand);
            brandModelRepository.save(brandModel);
        }
        vehicle.setBrandModel(brandModel);

        // Fuel Type checking
        FuelType fuelType = entity.getFuelType();
        // check if the fuelType exists
        if (fuelType != null && fuelType.getId() != null) {
            fuelType = fuelTypeRepository.findById(fuelType.getId()).orElse(null);
        }
        if (fuelType == null) {
            // create a new fuelType
            fuelType = new FuelType();
            fuelTypeRepository.save(fuelType);
        }
        vehicle.setFuelType(fuelType);

        // Category Checking
        Category category = entity.getCategory();
        // check if the category exists
        if (category != null && category.getId() != null) {
            category = categoryRepository.findById(category.getId()).orElse(null);
        }
        if (category == null) {
            // create a new category
            category = new Category();
            categoryRepository.save(category);
        }
        vehicle.setCategory(category);
        return repository.save(vehicle);
    }
    @GetMapping("/count")
    public long count() {
        return repository.count();
    }

    @GetMapping("/mission/{id}")
    public Set<Vehicle> getVehiclesByMissionId(@PathVariable Long id){
        MissionOrder orderMission =  missionOrderRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("MissionOrder with ID not found"));

        return repository.findByOrderMissions(orderMission);
    }

    @GetMapping("/search")
    public List<Vehicle> getVehicles(@RequestParam("query") String query) {
        return repository.findByBrandModel_NameContainingIgnoreCaseOrBrandModel_Brand_NameContainingIgnoreCaseOrLiscenceContainingIgnoreCaseOrFuelType_NameContainingIgnoreCase(
                query, query, query, query);
    }
}