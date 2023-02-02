package parc.repository;

import org.springframework.data.repository.CrudRepository;
import parc.model.concrete.Brand;
import parc.model.concrete.BrandModel;

import java.util.List;

public interface BrandModelRepository extends CrudRepository<BrandModel, Long> {

}
