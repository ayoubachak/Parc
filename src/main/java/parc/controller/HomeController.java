package parc.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class HomeController {

    @GetMapping("/hello")
    public String hello(Principal principal) {
        return "Hello, " + principal.getName();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/secure")
    public String secure() {
        return "This is secured!";
    }


}