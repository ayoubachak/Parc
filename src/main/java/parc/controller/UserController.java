package parc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;

import parc.model.User;
import parc.repository.UserRepository;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    PasswordEncoder encoder;

    @PostMapping("/add")
    public User addUser(@RequestBody User user) {
        if(userRepository.findByUsername(user.getUsername()).orElse(null) != null){
            throw new RuntimeException("User Already Exists");
        }
        user.setPassword(encoder.encode(user.getPassword())); // encoding the password when it's received
        user.setCreatedOn(LocalDateTime.now());
        user.setUpdatedOn(LocalDateTime.now());
        return userRepository.save(user);
    }

    @DeleteMapping("/del/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }

    @PutMapping("/upd/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        User entity = userRepository.findById(id).orElse(null);
        if(entity == null){
            entity = new User();
            entity.setCreatedOn(LocalDateTime.now());
        }
        entity.setUpdatedOn(LocalDateTime.now());
        entity.setName(user.getName());
        entity.setLastname(user.getLastname());
        if(userRepository.findByUsername(user.getUsername()).orElse(null) == null){ // if the username doesn't already exist
            entity.setUsername(user.getUsername());
        }
        entity.setRoles(user.getRoles());

        return userRepository.save(entity);
    }

    @GetMapping("/get/{id}")
    public User getUser(@PathVariable Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @GetMapping("/count")
    public long countUsers() {
        return userRepository.count();
    }

    @GetMapping("/all")
    public List<User> getAllUsers(){
        return (List<User>) userRepository.findAll();
    }

    @GetMapping("/me")
    public User getUserInfo(Principal principal) {
        String username = principal.getName();
        return userRepository.findByUsername(username).orElse(null);
    }

    @GetMapping("/search")
    public List<User> findUsers(@RequestParam("query") String query) {
        return userRepository.findByNameContainingIgnoreCaseOrLastnameContainingIgnoreCaseOrUsernameContainingIgnoreCase(query, query, query);
    }
}
