package parc.repository;

import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.data.repository.query.Param;
import parc.model.concrete.MissionOrder;
import parc.model.concrete.Vehicle;

import java.util.List;
import java.util.Set;

public interface VehicleRepository extends CrudRepository<Vehicle, Long> {
    long count();
    Set<Vehicle> findByOrderMissions(MissionOrder orderMission);
    List<Vehicle>
    findByBrandModel_NameContainingIgnoreCaseOrBrandModel_Brand_NameContainingIgnoreCaseOrLiscenceContainingIgnoreCaseOrFuelType_NameContainingIgnoreCase(
            String brandModelName, String brandName, String license, String fuelTypeName);
}






