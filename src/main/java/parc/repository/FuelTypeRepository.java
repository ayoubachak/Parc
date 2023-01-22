package parc.repository;

import org.springframework.data.repository.CrudRepository;
import parc.model.concrete.FuelType;

public interface FuelTypeRepository extends CrudRepository<FuelType, Long> {

}