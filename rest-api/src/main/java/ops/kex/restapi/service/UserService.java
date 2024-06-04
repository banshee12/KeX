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

    public void SyncUser() {
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
        }
    }

    //retrieve all users
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    //retrieve logged user
    public User getUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(!(authentication instanceof AnonymousAuthenticationToken))
        {
            String username = authentication.getName();
            return userRepository.findUserByUsernameIgnoreCase(username);
        }
        return null;
    }


    public User getUserById(String userId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(!(authentication instanceof AnonymousAuthenticationToken))
        {
            User user = userRepository.getUserByUserSub(userId);
            List<Experience> experienceList = user.getUserExperience();
            List<UserSkills> userSkillsList = user.getUserSkills();
            experienceList.removeIf(experience -> !experience.getVisible());
            userSkillsList.removeIf(UserSkills -> !UserSkills.getVisible());
            user.setUserExperience(experienceList);
            user.setUserSkills(userSkillsList);
            return user;
        }
        return null;
    }

    //set contact Options
    @Transactional
    public void updateUserContactOptions(User user) {
        if (user == null) {
            log.error("User does not exist");
        } else {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (!(authentication instanceof AnonymousAuthenticationToken)) {
                User savedUser = userRepository.findUserByUsernameIgnoreCase(authentication.getName());
                if (savedUser == null) {
                    log.error("User " +authentication.getName() + " not found");
                    } else {
                    savedUser.setContactOptionAppointment(user.getContactOptionAppointment());
                    savedUser.setContactOptionMail(user.getContactOptionMail());
                    savedUser.setContactOptionPhone(user.getContactOptionPhone());
                }
            }
        }
    }
    public List<UserView> findUser(UserSearch userSearch) {
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
            return foundUsers;
        } else log.error("user " + authentication.getName() + " does not exist in database");
        return null;
    }
}