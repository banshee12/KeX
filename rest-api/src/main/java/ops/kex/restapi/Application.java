package ops.kex.restapi;

import ops.kex.restapi.model.Tags;
import ops.kex.restapi.repository.TagsRepository;
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
	CommandLineRunner commandLineRunner(TagsRepository repository) {
		return args -> repository.save(new Tags("Java"));
	}
}
