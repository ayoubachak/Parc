package parc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import parc.model.User;
import parc.repository.UserRepository;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/add")
    public User addUser(@RequestBody User brand) {
        return userRepository.save(brand);
    }

    @DeleteMapping("/del/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }

    @PutMapping("/upd/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        user.setId(id);
        return userRepository.save(user);
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




}
