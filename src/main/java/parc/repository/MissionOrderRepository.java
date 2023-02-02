package parc.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import parc.model.concrete.MissionOrder;

public interface MissionOrderRepository extends CrudRepository<MissionOrder, Long> {
    long count();
    @Query(value = "SELECT COUNT(DISTINCT mission_subject) FROM mission_order", nativeQuery = true)
    long subjects();
}