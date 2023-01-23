package parc.repository;

import org.springframework.data.repository.CrudRepository;
import parc.model.concrete.BrandModel;

public interface BrandModelRepository extends CrudRepository<BrandModel, Long> {
    long count();
}
