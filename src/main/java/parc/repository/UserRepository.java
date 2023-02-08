package parc.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.security.core.userdetails.UserDetails;
import parc.model.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {


    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);
    long count();
    List<User> findByNameContainingIgnoreCaseOrLastnameContainingIgnoreCaseOrUsernameContainingIgnoreCase(String name, String lastname, String username);
}
