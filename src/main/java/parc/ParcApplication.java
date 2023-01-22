package parc;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import parc.model.User;
import parc.repository.UserRepository;

@SpringBootApplication
public class ParcApplication {

    public static void main(String[] args) {
        SpringApplication.run(ParcApplication.class, args);
    }
    @Bean
    CommandLineRunner commandLineRunner(UserRepository users, PasswordEncoder encoder) {
        return args -> {
//            users.deleteAll();
//            users.save(new User("ayoub.achak01@gmail.com",encoder.encode("ayoubachak"), "Ayoub", "Achak", "ADMIN,Directeur"));
        };
    }
}
