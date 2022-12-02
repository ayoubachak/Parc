package parc;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ParcApplication {

    public static void main(String[] args) {
        SpringApplication.run(ParcApplication.class, args);
    }
    @Bean
    CommandLineRunner commandLineRunner() {
        return args -> {

        };
    }
}
