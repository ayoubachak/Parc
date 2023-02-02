package parc.repository;

import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.data.repository.query.Param;
import parc.model.concrete.MissionOrder;
import parc.model.concrete.Vehicle;

import java.util.List;

public interface VehicleRepository extends CrudRepository<Vehicle, Long> {
    long count();
//    @Query("SELECT * from vehicle_order_mission where order_mission_id=:id")

//    List<Vehicle> findVehiclesByMissionId(@Param("id") Long id);
//    List<Vehicle> findByOrderMissions(MissionOrder orderMission);
}






