package parc.repository;

import org.springframework.data.repository.CrudRepository;
import parc.model.concrete.ReparationDetails;

public interface ReparationDetailsRepository extends CrudRepository<ReparationDetails, Long> {
    long count();
}