package parc.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import parc.model.concrete.Employee;
import parc.repository.EmployeeRepository;

import java.util.List;

@RestController
@RequestMapping("/fix")
public class MaintainanceController {
    private final EmployeeRepository employeeRepository;


    public MaintainanceController(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @GetMapping("/employees/emails")
    public List<Employee> fixEmployeeEmails(){
        List<Employee> employees = employeeRepository.findByEmailIsNull();
        for (Employee employee : employees) {
            employee.setEmail("employee." + employee.getId() + "@parc.com");
            employeeRepository.save(employee);
        }
        return employees;
    }

}
