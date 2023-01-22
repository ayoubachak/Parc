package parc.repository;

import org.springframework.data.repository.CrudRepository;
import parc.model.concrete.FuelCompany;

public interface FuelCompanyRepository extends CrudRepository<FuelCompany, Long> {

}