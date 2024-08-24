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
import ops.kex.restapi.repository.UserSkillsRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserSkillsService {

    private final UserSkillsRepository userSkillsRepository;
    private final UserRepository userRepository;
    private final SkillsRepository skillsRepository;
    private final ExperienceRepository experienceRepository;
    private final UserService userService;


    public ResponseEntity<List<UserSkills>> getUserSkills(SortData sortData) {
        String sortDirectionStr = "asc";
        if (!sortData.getAsc()){
            sortDirectionStr = "desc";
        }
        Sort.Direction sortDirection = Sort.Direction.fromString(sortDirectionStr);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof AnonymousAuthenticationToken) {
            log.error("no user logged in");
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

        } else {
            User user = userRepository.findUserByUsernameIgnoreCase(authentication.getName());
            if (user != null) {
                if(sortData.getSize() != null && sortData.getSize() > 0){
                    Pageable pageable = PageRequest.of(0,sortData.getSize(), Sort.by(sortDirection, sortData.getSortBy()));
                    return new ResponseEntity<>(
                            userSkillsRepository.getUserSkillsByUserUserId(pageable, user.getUserId()),
                            HttpStatus.OK);
                } else return new ResponseEntity<>(
                        userSkillsRepository.findUserSkillsByUserUserId(Sort.by(sortDirection, sortData.getSortBy()), user.getUserId()),
                        HttpStatus.OK);
            } else {
                log.error("user " + authentication.getName() + " does not exist in database");
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }
        }
    }

    public ResponseEntity<String> addUserSkillToUser(UserSkills userSkill) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof AnonymousAuthenticationToken) {
            log.error("no user logged in");
            return new ResponseEntity<>(
                    "no user logged in",
                    HttpStatus.UNAUTHORIZED);
        }
        else {
            User user = userRepository.findUserByUsernameIgnoreCase(authentication.getName());
            if (user != null) {
                //does skill exist? if not add to database
                Skills skillCheck = skillsRepository.findSkillByTitleIgnoreCase(userSkill.getSkill().getTitle());
                if (skillCheck == null) {
                    log.info("Skill " + userSkill.getSkill().getTitle() + " does not exist in database");
                    skillCheck = Skills.builder()
                            .title(userSkill.getSkill().getTitle())
                            .build();
                    skillsRepository.save(skillCheck);
                    log.info("Skill " + userSkill.getSkill().getTitle() + " has been added to database");
                }
                List<User> userSkillCheck = userRepository.findUsersByUserSkillsSkill(skillCheck);
                if (!userSkillCheck.contains(user)) {
                    userSkill.setSkill(skillCheck);
                    userSkill.setUser(user);
                    user.addUserSkill(userSkill);
                    userRepository.save(user);
                    log.info("Skill '" + userSkill.getSkill().getTitle() +"' added to " + user.getUsername());
                    return new ResponseEntity<>(
                            "Skill '" + userSkill.getSkill().getTitle() +"' added to " + user.getUsername(),
                            HttpStatus.CREATED);
                } else {
                    log.warn("user " + user.getUsername() + " already has skill " + userSkill.getSkill().getTitle());
                    return new ResponseEntity<>(
                            "user " + user.getUsername() + " already has skill " + userSkill.getSkill().getTitle(),
                            HttpStatus.CONFLICT);
                }
            } else {
                log.error("user " + authentication.getName() + " does not exist in database");
                return new ResponseEntity<>(
                        "user" + authentication.getName() + " does not exist in database",
                        HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @Transactional
    public ResponseEntity<String> updateUserSkill(UserSkills userSkill) {
        User loggedUser = userService.getLoggedUser();
        if(loggedUser != null){
            Optional<UserSkills> optionalUserSkill = userSkillsRepository.findUserSkillsById(userSkill.getId());
            if(optionalUserSkill.isPresent()){
                //Init
                //check for name/skill change
                if(!Objects.equals(optionalUserSkill.get().getSkill().getTitle(), userSkill.getSkill().getTitle())){
                    //Save old userSkill for experience update
                    String oldSkillTitle = optionalUserSkill.get().getSkill().getTitle();
                    Integer oldSkillId = optionalUserSkill.get().getSkill().getId();
                    log.info("old skill title: {}", oldSkillTitle);
                    log.info("old skill id: {}", oldSkillId);
                    //check if user has skill
                    Optional<UserSkills> checkUserSkill = userSkillsRepository.findUserSkillsByUserUserIdAndSkillTitleIgnoringCase(loggedUser.getUserId(), userSkill.getSkill().getTitle());
                    if(checkUserSkill.isEmpty()){
                        loggedUser.removeUserSkill(optionalUserSkill.get().getId());
                        //check if skill exist
                        Optional<Skills> optionalSkills = skillsRepository.findSkillsByTitleIgnoreCase(userSkill.getSkill().getTitle());
                        if(optionalSkills.isEmpty()){
                            //save new skill
                            Skills newSkill = Skills.builder()
                                    .title(userSkill.getSkill().getTitle())
                                    .build();
                            skillsRepository.save(newSkill);
                            optionalSkills = skillsRepository.findSkillsByTitleIgnoreCase(newSkill.getTitle());
                            log.info("skill '{}' added to database", newSkill.getTitle());
                        }
                        //Update UserSkill Skill
                        optionalUserSkill.get().setSkill(optionalSkills.get());
                        log.info("skill '{}' added to '{}'", optionalSkills.get().getTitle(), loggedUser.getUsername());

                        //update experience
                        Optional<List<Experience>> optionalExperienceList = experienceRepository.getExperiencesBySkillTitleAndUserUserId(oldSkillTitle, loggedUser.getUserId());
                        if(optionalExperienceList.isPresent()){
                            if(!optionalExperienceList.get().isEmpty()){
                                log.info("experiences needs to be updated");
                                for(Experience experience : optionalExperienceList.get()){
                                    experience.removeSkill(oldSkillId);
                                    experience.addSkill(optionalSkills.get());
                                    log.info("skill '{}' added to experience '{}'", optionalSkills.get().getTitle(), experience.getTitle());
                                }
                            } else {
                                log.info("no experience affected");
                            }
                        }
                    } else {
                        log.error("user '{}' already has userSkill '{}'", loggedUser.getUsername(), userSkill.getSkill().getTitle());
                        return new ResponseEntity<>(
                                "no user logged in",
                                HttpStatus.UNAUTHORIZED);
                    }
                } else {
                    log.info("same skill");
                }
                optionalUserSkill.get().setUser(loggedUser);
                optionalUserSkill.get().setVisible(userSkill.getVisible());
                optionalUserSkill.get().setLevel(userSkill.getLevel());

            }
            log.info("userSkill with ID '{}' update", userSkill.getId());
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            log.error("no user logged in");
            return new ResponseEntity<>(
                    "no user logged in",
                    HttpStatus.UNAUTHORIZED);
        }
    }



    public ResponseEntity<String> deleteUserSkill(Integer userSkillsId) {
        Optional<UserSkills> optionalUserSkill = userSkillsRepository.findUserSkillsById(userSkillsId);
        if (optionalUserSkill.isEmpty()) {
            log.error("UserSkill with id " + userSkillsId + " can not be deleted cause it does not exists");
            return new ResponseEntity<>(
                    "UserSkill with id " + userSkillsId + " can not be deleted cause it does not exists",
                    HttpStatus.CONFLICT);
        } else {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication instanceof AnonymousAuthenticationToken) {
                log.error("no user logged in");
                return new ResponseEntity<>(
                        "no user logged in",
                        HttpStatus.UNAUTHORIZED);
            } else {
                //Remove Skills from experience
                Optional<Skills> optionalSkills = skillsRepository.findSkillsByTitleIgnoreCase(optionalUserSkill.get().getSkill().getTitle());
                if(optionalSkills.isEmpty()){
                    log.error("skill " + optionalUserSkill.get().getSkill().getTitle() + " does not exist in database");
                    return new ResponseEntity<>(
                            "skill " + optionalUserSkill.get().getSkill().getTitle() + " does not exist in database",
                            HttpStatus.INTERNAL_SERVER_ERROR);
                }
                List<Experience> experienceList = experienceRepository.findExperiencesBySkillTitle(optionalSkills.get().getTitle());
                for(Experience experience : experienceList){
                    experience.removeSkill(optionalSkills.get().getId());
                    experienceRepository.save(experience);
                    log.info("'{}' removed from experience '{}'", optionalSkills.get().getTitle(), experience.getTitle());
                }

                //Remove UserSkill from User
                User user = userRepository.findUserByUsernameIgnoreCase(authentication.getName());
                user.removeUserSkill(userSkillsId);
                userSkillsRepository.deleteById(userSkillsId);

                log.info("UserSkill deleted");
                return new ResponseEntity<>(
                        "UserSKill successfully deleted for " + user.getUsername(),
                        HttpStatus.OK);
            }
        }
    }
}
