package parc.repository;

import org.springframework.data.repository.CrudRepository;
import parc.model.concrete.Employee;

import java.util.List;

public interface EmployeeRepository extends CrudRepository<Employee, Long> {
    long count();

    List<Employee> findByEmailIsNull();
}
