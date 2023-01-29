package parc.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import parc.model.concrete.Service;
import parc.repository.ServiceRepository;

import java.util.List;

@RestController
@RequestMapping("/api/services")
public class ServiceController extends BaseController<Service, ServiceRepository> {

    private final ServiceRepository repository;

    public ServiceController(ServiceRepository repository) {
        super(repository);
        this.repository = repository;
    }

    @GetMapping("/all")
    public List<Service> all(){
        return (List<Service>) repository.findAll();
    }
}