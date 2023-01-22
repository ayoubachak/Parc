package parc.repository;

import org.springframework.data.repository.CrudRepository;
import parc.model.concrete.Consumption;

public interface ConsumptionRepository extends CrudRepository<Consumption, Long> {

}
