package parc.controller;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.web.bind.annotation.*;
import parc.model.concrete.Employee;
import parc.model.concrete.Service;
import parc.repository.EmployeeRepository;
import parc.repository.ServiceRepository;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController extends BaseController<Employee, EmployeeRepository> {

    private final EmployeeRepository repository;
    private final ServiceRepository serviceRepository;

    public EmployeeController(EmployeeRepository repository, ServiceRepository serviceRepository) {
        super(repository);
        this.repository = repository;
        this.serviceRepository = serviceRepository;
    }

    @GetMapping("/all")
    public List<Employee> all(){
        return (List<Employee>) repository.findAll();
    }
    @GetMapping("/count")
    public long count() {
        return repository.count();
    }

    @PostMapping("/add")
    public Employee create(@RequestBody Employee entity) {
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
        return repository.save(entity);
    }
    @PutMapping("/update/{id}")
    public Employee update(@PathVariable Long id, @RequestBody Employee entity) {
        Employee employee = repository.findById(id).orElse(null);
        if (employee == null) {
            throw new EntityNotFoundException("Employee not found with id: " + id);
        }
        Service service = entity.getService();
        if (service != null && service.getId() != null) {
            service = serviceRepository.findById(service.getId()).orElse(null);
        }
        if (service == null) {
            // create a new service
            service = new Service();
            serviceRepository.save(service);
        }
        if(employee.getId() == null){
            employee.setId(id);
        }
        employee.setName(entity.getName());
        employee.setFunction(entity.getFunction());
        employee.setService(service);
        return repository.save(employee);
    }

    @GetMapping("/search")
    public List<Employee> getEmployees(@RequestParam("query") String query) {
        return repository.findByNameContainingOrEmailContaining(query, query);
    }
}

