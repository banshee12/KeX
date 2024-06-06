package ops.kex.restapi.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ops.kex.restapi.model.Experience;
import ops.kex.restapi.model.Skills;
import ops.kex.restapi.model.User;
import ops.kex.restapi.model.UserSkills;
import ops.kex.restapi.model.sorting.SortData;
import ops.kex.restapi.repository.ExperienceRepository;
import ops.kex.restapi.repository.SkillsRepository;
import ops.kex.restapi.repository.UserRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ExperienceService {

    private final ExperienceRepository experienceRepository;
    private final UserRepository userRepository;
    private final SkillsRepository skillsRepository;


    public List<Experience> getUserExperience(SortData sortData) {
        String sortDirectionStr = "asc";
        if (!sortData.getAsc()){
            sortDirectionStr = "desc";
        }
        Sort.Direction sortDirection = Sort.Direction.fromString(sortDirectionStr);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof AnonymousAuthenticationToken) {
            log.error("no user logged in");
        }
        else{
            User user = userRepository.findUserByUsernameIgnoreCase(authentication.getName());
            if (user != null) {
                if(sortData.getSize() > 0){
                    Pageable pageable = PageRequest.of(0,sortData.getSize(), Sort.by(sortDirection, sortData.getSortBy()));
                    return experienceRepository.getExperiencesByUserUserId(pageable, user.getUserId());
                } else return experienceRepository.findExperiencesByUserUserId(Sort.by(sortDirection, sortData.getSortBy()), user.getUserId());
            } else log.error("user " + authentication.getName() + " does not exist in database");
        }
        return null;
    }


    public void addExperienceToUser(Experience experience) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof AnonymousAuthenticationToken) {
            log.error("no user logged in");
        }
        else{
            User user = userRepository.findUserByUsernameIgnoreCase(authentication.getName());
            if(user != null){
                List<Skills> experienceSkills = new ArrayList<>();
                //Check if Skills exist
                for (Skills skill : experience.getSkill()){
                    Skills skillCheck = skillsRepository.findSkillByTitleIgnoreCase(skill.getTitle());
                    if (skillCheck == null) {
                        log.info("Skill " + skill.getTitle() + " does not exist in database");
                        skillCheck = Skills.builder()
                                .title(skill.getTitle())
                                .build();
                        skillsRepository.save(skillCheck);
                        log.info("Skill " + skill.getTitle() + " has been added to database");
                    }
                    experienceSkills.add(skillsRepository.findSkillByTitleIgnoreCase(skillCheck.getTitle()));

                    //check if user has skill
                    List<User> userSkillCheck = userRepository.findUsersByUserSkillsSkill(skillCheck);
                    if (!userSkillCheck.contains(user)) {
                        UserSkills userSkill = UserSkills.builder()
                                .visible(false)
                                .level(0)
                                .skill(skillCheck)
                                .build();
                        user.addUserSkill(userSkill);
                        log.info("Skill " + skill.getTitle() + " has been added to " + user.getUsername());
                    }

                }
                //add experience to user
                List<Experience> userExperience = user.getUserExperience();
                Experience newExperience = Experience.builder()
                        .title(experience.getTitle())
                        .description(experience.getDescription())
                        .visible(experience.getVisible())
                        .skill(experienceSkills)
                        .user(user)
                        .build();
                userExperience.add(newExperience);
                user.setUserExperience(userExperience);
                userRepository.save(user);
                log.info("Experience '" + newExperience.getTitle() + "' added to user " + user.getUsername());
            }
        }
    }

    public void deleteExperience(Integer experienceId) {
        boolean exists = experienceRepository.existsById(experienceId);
        if (!exists) {
            log.error("Experience with id " + experienceId + " does not exists");
        } else {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication instanceof AnonymousAuthenticationToken) {
                log.error("no user logged in");
            } else {
                User user = userRepository.findUserByUsernameIgnoreCase(authentication.getName());
                user.removeExperience(experienceId);
                experienceRepository.deleteById(experienceId);
                log.info("Experience deleted");
            }
        }
    }

    @Transactional
    public void updateExperience(Experience experience) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof AnonymousAuthenticationToken) {
            log.error("no user logged in");
        }
        else{
            User user = userRepository.findUserByUsernameIgnoreCase(authentication.getName());
            if(user != null){
                if(experienceRepository.findById(experience.getId()).isPresent()){
                    Experience userExperience = experienceRepository.findById(experience.getId()).get();
                    userExperience.setTitle(experience.getTitle());
                    userExperience.setVisible(experience.getVisible());
                    userExperience.setDescription(experience.getDescription());
                    List<Skills> experienceSkills = new ArrayList<>();
                    for (Skills skill : experience.getSkill()){
                        Skills skillCheck = skillsRepository.findSkillByTitleIgnoreCase(skill.getTitle());
                        if (skillCheck == null) {
                            log.info("Skill " + skill.getTitle() + " does not exist in database");
                            skillCheck = Skills.builder()
                                    .title(skill.getTitle())
                                    .build();
                            skillsRepository.save(skillCheck);
                            log.info("Skill " + skill.getTitle() + " has been added to database");
                        }
                        experienceSkills.add(skillsRepository.findSkillByTitleIgnoreCase(skillCheck.getTitle()));

                        //check if user has skill
                        List<User> userSkillCheck = userRepository.findUsersByUserSkillsSkill(skillCheck);
                        if (!userSkillCheck.contains(user)) {
                            UserSkills userSkill = UserSkills.builder()
                                    .visible(false)
                                    .level(0)
                                    .skill(skillCheck)
                                    .build();
                            user.addUserSkill(userSkill);
                            log.info("Skill " + skill.getTitle() + " has been added to " + user.getUsername());
                        }
                    }
                    userExperience.setSkill(experienceSkills);
                    experienceRepository.save(userExperience);
                    log.info("Experience updated");
                } else log.error("Experience with id " + experience.getId() + "does not exists");
            }
        }
    }
}
