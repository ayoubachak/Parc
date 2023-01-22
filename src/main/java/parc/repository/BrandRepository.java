package parc.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import parc.model.concrete.Brand;
public interface BrandRepository extends CrudRepository<Brand, Long> {

}
