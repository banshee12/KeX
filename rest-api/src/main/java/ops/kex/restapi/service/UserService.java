package ops.kex.restapi.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ops.kex.restapi.model.*;
import ops.kex.restapi.model.search.UserSearch;
import ops.kex.restapi.projection.UserView;
import ops.kex.restapi.repository.UserRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {


    private final UserRepository userRepository;

    public ResponseEntity<String> SyncUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(!(authentication instanceof AnonymousAuthenticationToken))
        {
            JwtAuthenticationToken jwtAuthenticationToken = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
            String sub = String.valueOf(jwtAuthenticationToken.getTokenAttributes().get("sub"));
            String username = String.valueOf(jwtAuthenticationToken.getTokenAttributes().get("preferred_username"));
            String firstname = String.valueOf(jwtAuthenticationToken.getTokenAttributes().get("given_name"));
            String lastname = String.valueOf(jwtAuthenticationToken.getTokenAttributes().get("family_name"));
            String email = String.valueOf(jwtAuthenticationToken.getTokenAttributes().get("email"));

            User user = User.builder()
                    .userSub(sub)
                    .username(username)
                    .firstname(firstname)
                    .lastname(lastname)
                    .email(email)
                    .build();

            User saveUser = user;
            Optional<User> optionalUser = userRepository.findUserByUserSub(user.getUserSub());

            if (optionalUser.isPresent()) {
                saveUser = optionalUser.get();
                saveUser.setUsername(user.getUsername());
                saveUser.setLastname(user.getLastname());
                saveUser.setFirstname(user.getFirstname());
                saveUser.setEmail(user.getEmail());
            }
            else {
                saveUser.setContactOptionPhone(false);
                saveUser.setContactOptionMail(false);
                saveUser.setContactOptionAppointment(false);
            }
            userRepository.save(saveUser);
            log.info("user " + saveUser.getUsername() +" synchronized with database");
            return new ResponseEntity<>("user " + saveUser.getUsername() +" synchronized with database", HttpStatus.OK);
        } else{
            log.info("no user logged in");
            return new ResponseEntity<>("no user logged in", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //retrieve all users
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    //retrieve logged user
    public ResponseEntity<User> getUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(!(authentication instanceof AnonymousAuthenticationToken))
        {
            String username = authentication.getName();
            return new ResponseEntity<>(userRepository.findUserByUsernameIgnoreCase(username),HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }


    public ResponseEntity<User> getUserById(String userId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(!(authentication instanceof AnonymousAuthenticationToken))
        {
            User user = userRepository.getUserByUserSub(userId);
            if(user != null){
                List<Experience> experienceList = user.getUserExperience();
                List<UserSkills> userSkillsList = user.getUserSkills();
                experienceList.removeIf(experience -> !experience.getVisible());
                userSkillsList.removeIf(UserSkills -> !UserSkills.getVisible());
                user.setUserExperience(experienceList);
                user.setUserSkills(userSkillsList);
                return new ResponseEntity<>(user, HttpStatus.OK);
            } else{
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } else{
            log.info("no user logged in");
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //set contact Options
    @Transactional
    public ResponseEntity<String> updateUserContactOptions(User user) {
        if (user == null) {
            log.error("User does not exist");
            return new ResponseEntity<>("User does not exist", HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (!(authentication instanceof AnonymousAuthenticationToken)) {
                User savedUser = userRepository.findUserByUsernameIgnoreCase(authentication.getName());
                if (savedUser == null) {
                    log.error("User " +authentication.getName() + " not found");
                    return new ResponseEntity<>("User " +authentication.getName() + " not found", HttpStatus.NOT_FOUND);
                    } else {
                    savedUser.setContactOptionAppointment(user.getContactOptionAppointment());
                    savedUser.setContactOptionMail(user.getContactOptionMail());
                    savedUser.setContactOptionPhone(user.getContactOptionPhone());
                    log.info("contact options updated");
                    return new ResponseEntity<>("contact options updated", HttpStatus.OK);
                }
            } else{
                log.info("no user logged in");
                return new ResponseEntity<>("no user logged in", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    public ResponseEntity<List<UserView>> findUser(UserSearch userSearch) {
        String sortDirectionStr = "asc";
        if (!userSearch.getSortData().getAsc()){
            sortDirectionStr = "desc";
        }
        Sort.Direction sortDirection = Sort.Direction.fromString(sortDirectionStr);

        Integer minLevel = 0;
        if(userSearch.getMinLevel()!=null){
            minLevel = userSearch.getMinLevel();
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findUserByUsernameIgnoreCase(authentication.getName());
        List<UserView> foundUsers = new ArrayList<>();
        if (user != null) {
            //Pageable if sort size greater 0
            if(userSearch.getSortData().getSize() > 0){
                Pageable pageable = PageRequest.of(0,userSearch.getSortData().getSize(), Sort.by(sortDirection, userSearch.getSortData().getSortBy()));
                foundUsers = userRepository.findDistinctUsersByUserSkillsSkillTitleContainingIgnoreCaseAndUserSkillsVisibleAndUserSkillsLevelGreaterThanEqual(
                        pageable,
                        userSearch.getSearchSkill(),
                        true,
                        minLevel);
            } else{
                foundUsers = userRepository.getDistinctUsersByUserSkillsSkillTitleContainingIgnoreCaseAndUserSkillsVisibleAndUserSkillsLevelGreaterThanEqual(
                        Sort.by(sortDirection, userSearch.getSortData().getSortBy()),
                        userSearch.getSearchSkill(),
                        true,
                        minLevel);
            }
            foundUsers.removeIf(userView -> userView.getUserSub().equals(user.getUserSub()));
            return new ResponseEntity<>(foundUsers,HttpStatus.OK);
        } else {
            log.error("user " + authentication.getName() + " does not exist in database");
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}