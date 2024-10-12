package ops.kex.restapi.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ops.kex.restapi.model.*;
import ops.kex.restapi.model.search.UserSearch;
import ops.kex.restapi.projection.UserView;
import ops.kex.restapi.repository.UserFavoriteRepository;
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
    private final KeycloakService keycloakService;
    private final UserFavoriteRepository userFavoriteRepository;

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

    //retrieve logged user
    public ResponseEntity<User> getUser() {
        if(getLoggedUser() != null){
            return new ResponseEntity<>(getLoggedUser(),HttpStatus.OK);
        } else{
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    public User getLoggedUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(!(authentication instanceof AnonymousAuthenticationToken))
        {
            String username = authentication.getName();
            return userRepository.findUserByUsernameIgnoreCase(username);
        }
        return null;
    }


    public ResponseEntity<UserPage> getUserById(String userSub) {
        User loggedUser = getLoggedUser();
        if(loggedUser != null){
            User user = userRepository.getUserByUserSub(userSub);
            if(user != null){
                List<Experience> experienceList = user.getUserExperience();
                List<UserSkills> userSkillsList = user.getUserSkills();
                experienceList.removeIf(experience -> !experience.getVisible());
                userSkillsList.removeIf(UserSkills -> !UserSkills.getVisible());
                user.setUserExperience(experienceList);
                user.setUserSkills(userSkillsList);

                //Check if favorite
                UserFavorite userFavorite = userFavoriteRepository.findByUserSubAndFavoriteUserSub(loggedUser.getUserSub(), userSub);
                Boolean favorite = false;
                if(userFavorite != null){
                    favorite = true;
                }

                UserPage userPage = UserPage.builder()
                        .user(user)
                        .isFavorite(favorite)
                        .build();
                return new ResponseEntity<>(userPage, HttpStatus.OK);
            } else{
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }else{
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
        User loggedUser = getLoggedUser();
        if(loggedUser != null){
            String sortDirectionStr = userSearch.getSortData() != null && !userSearch.getSortData().getAsc() ? "desc" : "asc";
            Sort.Direction sortDirection = Sort.Direction.fromString(sortDirectionStr);

            int minLevel = 0;
            int year = 0;
            if(userSearch.getMinLevel() != null){
                minLevel = userSearch.getMinLevel();
            }

            if(loggedUser.getYear() != null){
                if(loggedUser.getYear() != 0){
                    year = loggedUser.getYear();
                }
            }

            List<UserView> foundUsers = new ArrayList<>();
            if(year == 0){
                //Pageable if sort size greater 0
                if(userSearch.getSortData() != null && userSearch.getSortData().getSize() != null && userSearch.getSortData().getSize() > 0){
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
                foundUsers.removeIf(userView -> userView.getUserSub().equals(loggedUser.getUserSub()));
                return new ResponseEntity<>(foundUsers,HttpStatus.OK);
            }else {
                //Pageable if sort size greater 0
                if(userSearch.getSortData() != null && userSearch.getSortData().getSize() != null && userSearch.getSortData().getSize() > 0){
                    Pageable pageable = PageRequest.of(0,userSearch.getSortData().getSize(), Sort.by(sortDirection, userSearch.getSortData().getSortBy()));
                    foundUsers = userRepository.findDistinctUsersByUserSkillsSkillTitleContainingIgnoreCaseAndUserSkillsVisibleAndUserSkillsLevelGreaterThanEqualAndYear(
                            pageable,
                            userSearch.getSearchSkill(),
                            true,
                            minLevel,
                            year);
                } else{
                    foundUsers = userRepository.getDistinctUsersByUserSkillsSkillTitleContainingIgnoreCaseAndUserSkillsVisibleAndUserSkillsLevelGreaterThanEqualAndYear(
                            Sort.by(sortDirection, userSearch.getSortData().getSortBy()),
                            userSearch.getSearchSkill(),
                            true,
                            minLevel,
                            year);
                }
                foundUsers.removeIf(userView -> userView.getUserSub().equals(loggedUser.getUserSub()));
                return new ResponseEntity<>(foundUsers,HttpStatus.OK);
            }
        }
        log.error("user does not exist in database");
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<String> deleteUser() {
        User deleteUser = getLoggedUser();
        if(deleteUser != null){
            if(keycloakService.deleteUser(deleteUser.getUserSub()) > 0){
                userRepository.delete(deleteUser);
                return new ResponseEntity<>(HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<String> editFavorite(String favoriteUserSub, Boolean remove) {
        User loggedUser = getLoggedUser();
        if(loggedUser != null){
            if(!Objects.equals(loggedUser.getUserSub(), favoriteUserSub)){
                if(remove){
                    UserFavorite userFavorite = userFavoriteRepository.findByUserSubAndFavoriteUserSub(loggedUser.getUserSub(), favoriteUserSub);
                    if(userFavorite != null){
                        loggedUser.removeFavorite(userFavorite.getId());
                        userFavoriteRepository.delete(userFavorite);
                        log.info("{} favorite removed from {}", favoriteUserSub, loggedUser.getUsername());
                        return new ResponseEntity<>("favorite removed", HttpStatus.OK);
                    } else{
                        log.info("{} ist not favored by {}", favoriteUserSub, loggedUser.getUsername());
                        return new ResponseEntity<>("is no favorite",HttpStatus.INTERNAL_SERVER_ERROR);
                    }
                } else{
                    if(userRepository.findUserByUserSub(favoriteUserSub).isPresent()){
                        UserFavorite userFavorite = UserFavorite.builder()
                                .userSub(loggedUser.getUserSub())
                                .favoriteUserSub(favoriteUserSub)
                                .build();
                        loggedUser.addFavorite(userFavorite);
                        userRepository.save(loggedUser);
                        log.info("{} favorite added to {}", favoriteUserSub, loggedUser.getUsername());
                        return new ResponseEntity<>("favorite added", HttpStatus.OK);
                    } else{
                        log.info("{} does not exist", favoriteUserSub);
                        return new ResponseEntity<>(favoriteUserSub + " does not exist", HttpStatus.OK);
                    }
                }
            } else {
                log.warn("can´t favorite yourself");
                return new ResponseEntity<>("can´t favorite yourself",HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<List<UserView>> getFavorites() {
        User loggedUser = getLoggedUser();
        if(loggedUser != null){
            List<UserFavorite> userFavorite = loggedUser.getFavorites();
            List<UserView> userViews = new ArrayList<>();
            if(userFavorite != null && !userFavorite.isEmpty()){
                for(UserFavorite userFavoriteItem : userFavorite){
                    UserView userView = userRepository.findUsersByUserSub(userFavoriteItem.getFavoriteUserSub());
                    if(userView != null){
                        userViews.add(userView);
                    }
                }
            }
            return new ResponseEntity<>(userViews,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}