package ops.kex.restapi.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ops.kex.restapi.model.Skills;
import ops.kex.restapi.model.User;
import ops.kex.restapi.projection.UserView;
import ops.kex.restapi.repository.SkillsRepository;
import ops.kex.restapi.repository.UserRepository;
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
public class UserService {


    private final UserRepository userRepository;
    private final SkillsRepository skillsRepository;

    public void SyncUser(User user) {
        if (user == null) {
            throw new EntityNotFoundException("Error while user sync");
        } else {
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
            return userRepository.getUserByUserSub(userId);
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


    //Todo improve search (add possibility to search for experience title)
    //Todo change return type to UserView
    //Todo only return user when searched skill/experience is visible
    public List<UserView> findUser(String searchStr) {
        List<Skills> skills = skillsRepository.findSkillsByTitleContainingIgnoreCase(searchStr);
        List<UserView> users = new ArrayList<>();
        for (Skills skill : skills ){
            List<UserView> usersTemp = userRepository.getUsersByUserSkillsSkill(skillsRepository.findSkillByTitleIgnoreCase(skill.getTitle()));
            for(UserView user : usersTemp){
                if (!users.contains(user)) {
                    users.add(user);
                }
            }
        }
        return users;
    }
}
