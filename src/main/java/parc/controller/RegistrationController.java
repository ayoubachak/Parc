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
import parc.model.requests.LoginRequest;
import parc.model.requests.RegisterRequest;
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
    public Map<String, Object> register(@RequestBody RegisterRequest request){
        HashMap<String, Object> response = new HashMap<>();

        // check if the user already exists
        if(userRepository.existsByUsername(request.username())){
            response.put("status", false);
            response.put("msg", "User with name "+request.username()+" already exists!");
        }else{
            response.put("status",true);
            User newUser = new User(request.username(), passwordEncoder.encode(request.password()), request.name(), request.lastname(), "USER");
            // saving the new user
            userRepository.save(newUser);

            response.put("msg", "Registered Successfully");
            response.put("user", newUser);
            response.put("redirect", "login");
        }
        return response;
    }

}
