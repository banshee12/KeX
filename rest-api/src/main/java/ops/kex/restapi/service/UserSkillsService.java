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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserSkillsService {

    private final UserSkillsRepository userSkillsRepository;
    private final UserRepository userRepository;
    private final SkillsRepository skillsRepository;
    private final ExperienceRepository experienceRepository;


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
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof AnonymousAuthenticationToken) {
            log.error("no user logged in");
            return new ResponseEntity<>(
                    "no user logged in",
                    HttpStatus.UNAUTHORIZED);
        } else {
            if (userSkillsRepository.findUserSkillsById(userSkill.getId()).isPresent()){
                User user = userRepository.findUserByUsernameIgnoreCase(authentication.getName());
                if (user != null) {
                    List<UserSkills> allUserSkills = user.getUserSkills();
                    user.removeUserSkill(userSkill.getId());
                    Skills newSkill = skillsRepository.findSkillByTitleIgnoreCase(userSkill.getSkill().getTitle());
                    if (newSkill == null) {
                        log.info("Skill " + userSkill.getSkill().getTitle() + " does not exist in database");
                        newSkill = Skills.builder()
                                .title(userSkill.getSkill().getTitle())
                                .build();
                        skillsRepository.save(newSkill);
                        log.info("Skill " + userSkill.getSkill().getTitle() + " has been added to database");
                    }
                    List<User> usersThatHaveToBeAddedSkill = userRepository.findUsersByUserSkillsSkill(userSkill.getSkill());
                    UserSkills checkUserSkill = userSkillsRepository.getUserSkillsById(userSkill.getId());
                    if(!usersThatHaveToBeAddedSkill.contains(user) || userSkill.getSkill().getTitle().equals(checkUserSkill.getSkill().getTitle()) || usersThatHaveToBeAddedSkill.isEmpty()){
                        user.setUserSkills(allUserSkills);
                        userSkill.setSkill(newSkill);
                        userSkill.setUser(user);
                        user.addUserSkill(userSkill);
                        userRepository.save(user);
                        log.info("skill '" + newSkill.getTitle() + "' updated for " + user.getUsername());
                        return new ResponseEntity<>(
                                "skill '" + newSkill.getTitle() + "' updated for '" + user.getUsername()+ "'" ,
                                HttpStatus.OK);
                    } else{
                        log.error("user " + user.getUsername() + " already has skill '" + userSkill.getSkill().getTitle()+"'");
                        return new ResponseEntity<>(
                                "user " + user.getUsername() + " already has skill '" + userSkill.getSkill().getTitle()+"'",
                                HttpStatus.CONFLICT);
                    }
                } else {
                    log.error("User " + authentication.getName() + " does not exist in database");
                    return new ResponseEntity<>(
                            "User " + authentication.getName() + " does not exist in database",
                            HttpStatus.INTERNAL_SERVER_ERROR);
                }
            } else {
                log.error("User Skill with ID " + userSkill.getId() + " does not exist in database");
                return new ResponseEntity<>(
                        "User Skill with ID " + userSkill.getId() + " does not exist in database",
                        HttpStatus.CONFLICT);
            }
        }
    }



    public ResponseEntity<String> deleteUserSkill(Integer userSkillsId) {
        Optional<UserSkills> optionalUserSkill = userSkillsRepository.findUserSkillsById(userSkillsId);
        boolean exist = userSkillsRepository.existsById(userSkillsId);
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
