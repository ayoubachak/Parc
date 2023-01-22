package parc.repository;

import org.springframework.data.repository.CrudRepository;
import parc.model.concrete.Category;

public interface CategoryRepository extends CrudRepository<Category, Long> {

}
