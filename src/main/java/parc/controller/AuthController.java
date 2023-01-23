package parc.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import parc.model.User;
import parc.model.requests.LoginRequest;
import parc.model.requests.TokenResponse;
import parc.service.JwtUserDetailsService;
import parc.service.TokenService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

import java.security.Principal;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger LOG = LoggerFactory.getLogger(AuthController.class);

    private final TokenService tokenService;
    private final AuthenticationManager authenticationManager;
    private final JwtUserDetailsService jwtUserDetailsService;


    public AuthController(TokenService tokenService, AuthenticationManager authenticationManager, JwtUserDetailsService jwtUserDetailsService) {
        this.tokenService = tokenService;
        this.authenticationManager = authenticationManager;
        this.jwtUserDetailsService = jwtUserDetailsService;
    }

    @PostMapping("/login")
    @ResponseBody
    public TokenResponse token(@RequestBody LoginRequest userLogin) throws AuthenticationException {
        // Perform authentication
        UsernamePasswordAuthenticationToken userAuth = new UsernamePasswordAuthenticationToken(userLogin.username(), userLogin.password());
        Authentication authentication = authenticationManager.authenticate(userAuth);

        // Generate token
        String token = tokenService.generateToken(authentication);

        // Return JSON response
        return new TokenResponse(userLogin.username(), token);
    }

    // this is not fully working at all
    @PostMapping("/refresh")
    public String refreshToken(HttpServletRequest request) throws AuthenticationException{
        Principal principal = request.getUserPrincipal();
        String username = principal.getName();
        UserDetails userDetails = this.jwtUserDetailsService.loadUserByUsername(username);
        UsernamePasswordAuthenticationToken userAuth = new UsernamePasswordAuthenticationToken(userDetails, null,
                userDetails.getAuthorities());
        Authentication authentication = authenticationManager.authenticate(userAuth);

        String accessToken = String.valueOf(parseAccessToken(request));

        return "{\"refresh\":\""+tokenService.generateRefreshToken(authentication)+"\"}" ;
    }

    private Optional<String> parseAccessToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if(StringUtils.hasText(authHeader) && authHeader.startsWith("Bearer ")) {
            return Optional.of(authHeader.replace("Bearer ", ""));
        }
        return Optional.empty();
    }
}
