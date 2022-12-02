package parc.controller;

import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetails;
import parc.model.LoginRequest;
import parc.service.JwtUserDetailsService;
import parc.service.TokenService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import parc.utils.JWTUtils;

@RestController
public class AuthController {

    private static final Logger LOG = LoggerFactory.getLogger(AuthController.class);

    private final TokenService tokenService;
    private final AuthenticationManager authenticationManager;

    public AuthController(TokenService tokenService, AuthenticationManager authenticationManager) {
        this.tokenService = tokenService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/login")
    public String token(@RequestBody LoginRequest userLogin) throws AuthenticationException {
        UsernamePasswordAuthenticationToken userAuth = new UsernamePasswordAuthenticationToken(userLogin.username(), userLogin.password());
        Authentication authentication = authenticationManager.authenticate(userAuth);
        return "{\"token\":\""+tokenService.generateToken(authentication)+"\"}" ;
    }

}
