package ops.kex.restapi;

import ops.kex.restapi.model.Skills;
import ops.kex.restapi.repository.SkillsRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
	@Bean
	CommandLineRunner commandLineRunner(SkillsRepository repository) {
		return args -> repository.save(new Skills("Java"));
	}
}
