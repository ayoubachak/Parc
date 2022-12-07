package parc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import parc.model.User;
import parc.repository.UserRepository;
import parc.service.TokenService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class RegistrationController {

    @Autowired
    UserRepository userRepository;
    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final TokenService tokenService;
    private final AuthenticationManager authenticationManager;

    public RegistrationController(TokenService tokenService, AuthenticationManager authenticationManager) {
        this.tokenService = tokenService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/register")
    public Map<String, Object> register(@ModelAttribute("user") User user){
        HashMap<String, Object> response = new HashMap<>();

        // check if the user already exists
        if(userRepository.existsByUsername(user.getUsername())){
            response.put("status", false);
            response.put("msg", "User with name "+user.getUsername()+" already exists!");
        }else{
            response.put("status",true);
            User newUser = new User(user.getUsername(), passwordEncoder.encode(user.getPassword()), user.getName(), user.getLastname(), "USER");
            // saving the new user
            userRepository.save(newUser);

            response.put("msg", "Registered Successfully");
            response.put("user", newUser);
            response.put("redirect", "login");
        }
        return response;
    }
    @GetMapping("/all")
    public List<User> getAllUsers(){
        return (List<User>) userRepository.findAll();
    }
}
