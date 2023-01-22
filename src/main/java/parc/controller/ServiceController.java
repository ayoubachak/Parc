package parc.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import parc.model.concrete.Service;
import parc.repository.ServiceRepository;

@RestController
@RequestMapping("/api/service")
public class ServiceController extends BaseController<Service, ServiceRepository> {

    private final ServiceRepository repository;

    public ServiceController(ServiceRepository repository) {
        super(repository);
        this.repository = repository;
    }
}