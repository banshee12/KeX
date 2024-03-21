package ops.kex.restapi.config;

import ops.kex.restapi.model.Skills;
import ops.kex.restapi.repository.SkillsRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SkillsConfig {
//    @Bean
//    CommandLineRunner commandLineRunnerSkills(SkillsRepository repository) {
//        Skills skill1 = Skills.builder()
//                .title("Java")
//                .build();
//        Skills skill2 = Skills.builder()
//                .title("JavaScript")
//                .build();
//        Skills skill3 = Skills.builder()
//                .title("TypeScript")
//                .build();
//        Skills skill4 = Skills.builder()
//                .title("Python")
//                .build();
//        Skills skill5 = Skills.builder()
//                .title("Spring Boot")
//                .build();
//        Skills skill6 = Skills.builder()
//                .title("Angular")
//                .build();
//        Skills skill7 = Skills.builder()
//                .title("C#")
//                .build();
//        Skills skill8 = Skills.builder()
//                .title("Spring Security")
//                .build();
//        Skills skill9 = Skills.builder()
//                .title("React")
//                .build();
//        Skills skill10 = Skills.builder()
//                .title("C")
//                .build();
//        Skills skill11 = Skills.builder()
//                .title("C++")
//                .build();
//
//        return args -> repository.saveAll(List.of(
//                skill1,
//                skill2,
//                skill3,
//                skill4,
//                skill5,
//                skill6,
//                skill7,
//                skill8,
//                skill9,
//                skill10,
//                skill11));
//    }
}
