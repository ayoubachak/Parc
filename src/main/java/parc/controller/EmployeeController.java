package parc.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import parc.model.concrete.Employee;
import parc.repository.EmployeeRepository;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController extends BaseController<Employee, EmployeeRepository> {

    private final EmployeeRepository repository;

    public EmployeeController(EmployeeRepository repository) {
        super(repository);
        this.repository = repository;
    }

    @GetMapping("/all")
    public List<Employee> all(){
        return (List<Employee>) repository.findAll();
    }

}

