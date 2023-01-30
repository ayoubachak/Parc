package parc.controller;

import org.springframework.web.bind.annotation.*;
import parc.model.concrete.*;
import parc.repository.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController extends BaseController<Vehicle, VehicleRepository> {

    private final VehicleRepository repository;
    private final ServiceRepository serviceRepository;
    private final BrandModelRepository brandModelRepository;
    private final BrandRepository brandRepository;
    private final FuelTypeRepository fuelTypeRepository;
    private final CategoryRepository categoryRepository;

    public VehicleController(VehicleRepository repository, ServiceRepository serviceRepository, BrandModelRepository brandModelRepository, BrandRepository brandRepository, FuelTypeRepository fuelTypeRepository, CategoryRepository categoryRepository) {
        super(repository);
        this.repository = repository;
        this.serviceRepository = serviceRepository;
        this.brandModelRepository = brandModelRepository;
        this.brandRepository = brandRepository;
        this.fuelTypeRepository = fuelTypeRepository;
        this.categoryRepository = categoryRepository;
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
//        BrandModel brandModel = entity.getBrandModel();
//        if(brandModel != null && brandModel.getId()!=null){
//            brandModel = brandModelRepository.findById(brandModel.getId()).orElse(null);
//        }
//        if(brandModel == null){
//            brandModel = new BrandModel();
//            brandModel.setBrand(entity.getBrandModel().getBrand());
//            brandModelRepository.save(brandModel);
//        }

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
}