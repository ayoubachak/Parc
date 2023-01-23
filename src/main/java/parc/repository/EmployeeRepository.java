package parc.repository;

import org.springframework.data.repository.CrudRepository;
import parc.model.concrete.Employee;

public interface EmployeeRepository extends CrudRepository<Employee, Long> {
    long count();
}
