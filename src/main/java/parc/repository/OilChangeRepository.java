package parc.repository;

import org.springframework.data.repository.CrudRepository;
import parc.model.concrete.OilChange;

public interface OilChangeRepository extends CrudRepository<OilChange, Long> {
    long count();
}