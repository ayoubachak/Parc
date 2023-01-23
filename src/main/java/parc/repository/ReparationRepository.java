package parc.repository;

import org.springframework.data.repository.CrudRepository;
import parc.model.concrete.Reparation;

public interface ReparationRepository extends CrudRepository<Reparation, Long> {
    long count();
}