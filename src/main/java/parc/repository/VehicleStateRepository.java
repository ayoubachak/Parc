package parc.repository;

import org.springframework.data.repository.CrudRepository;
import parc.model.concrete.VehicleState;

public interface VehicleStateRepository extends CrudRepository<VehicleState, Long> {

}