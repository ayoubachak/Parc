package parc.repository;

import org.springframework.data.repository.CrudRepository;
import parc.model.concrete.MissionOrder;

public interface MissionOrderRepository extends CrudRepository<MissionOrder, Long> {
    long count();
}