package parc.repository;

import org.springframework.data.repository.CrudRepository;
import parc.model.concrete.Service;

public interface ServiceRepository extends CrudRepository<Service, Long> {
    long count();
}