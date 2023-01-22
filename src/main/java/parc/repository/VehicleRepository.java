package parc.repository;

import org.springframework.data.repository.CrudRepository;
import parc.model.concrete.Vehicle;

public interface VehicleRepository extends CrudRepository<Vehicle, Long> {

}