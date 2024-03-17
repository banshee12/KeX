package ops.kex.restapi.service;

import lombok.RequiredArgsConstructor;
import ops.kex.restapi.model.Experience;
import ops.kex.restapi.model.User;
import ops.kex.restapi.repository.ExperienceRepository;
import ops.kex.restapi.repository.UserRepository;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExperienceService {

    private final ExperienceRepository experienceRepository;
    private final UserRepository userRepository;

    public List<Experience> getExperience() {
        return experienceRepository.findAll();
    }

    public List<Experience> getUserExperience() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof AnonymousAuthenticationToken) {
            throw new IllegalStateException("no user logged in");
        }
        else{
            User user = userRepository.findUserByUsernameIgnoreCase(authentication.getName());
            if (user != null) {
                return user.getUserExperience();
            }
            throw new IllegalStateException("User  " + authentication.getName() + " does not exist");
        }
    }

    public void addExperienceToUser(Experience experience) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof AnonymousAuthenticationToken) {
            throw new IllegalStateException("no user logged in");
        }
        else{
            User user = userRepository.findUserByUsernameIgnoreCase(authentication.getName());
            if(user != null){
                List<Experience> userExperience = user.getUserExperience();
                experienceRepository.save(experience);
                userExperience.add(experience);
                user.setUserExperience(userExperience);
                userRepository.save(user);
            }
        }
    }

    public void deleteExperience(Experience experience) {
        boolean exists = experienceRepository.existsById(experience.getId());
        if (!exists) {
            throw new IllegalStateException("Experience with id " + experience.getId() + " does not exists");
        }
        experienceRepository.deleteById(experience.getId());
    }

    @Transactional
    public void updateExperience(Experience experience) {
        Experience userExperience = experienceRepository.findById(experience.getId())
                .orElseThrow(() -> new IllegalStateException(
                        "Experience with id " + experience.getId() + "does not exists"));

        userExperience.setTitle(experience.getTitle()); //title
        userExperience.setVisible(experience.getVisible()); //visible
        userExperience.setDescription(experience.getDescription()); //description
        experienceRepository.save(userExperience);
    }
}
