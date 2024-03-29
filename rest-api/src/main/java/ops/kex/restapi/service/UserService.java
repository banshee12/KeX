package ops.kex.restapi.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import ops.kex.restapi.model.Skills;
import ops.kex.restapi.model.User;
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
                saveUser.setUsername(optionalUser.get().getUsername());
                saveUser.setLastname(optionalUser.get().getLastname());
                saveUser.setFirstname(optionalUser.get().getFirstname());
                saveUser.setEmail(optionalUser.get().getEmail());
            }
            else {
                saveUser.setContactOptionPhone(false);
                saveUser.setContactOptionMail(false);
                saveUser.setContactOptionAppointment(false);
            }
            userRepository.save(saveUser);
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

    //set contact Options
    @Transactional
    public void updateUserContactOptions(User user) {
        if (user == null) {
            throw new EntityNotFoundException("Error while user sync");
        } else {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (!(authentication instanceof AnonymousAuthenticationToken)) {
                User savedUser = userRepository.findUserByUsernameIgnoreCase(authentication.getName());
                if (savedUser == null) {
                    throw new EntityNotFoundException("User " +authentication.getName() + " not found");
                    } else {
                    savedUser.setContactOptionAppointment(user.getContactOptionAppointment());
                    savedUser.setContactOptionMail(user.getContactOptionMail());
                    savedUser.setContactOptionPhone(user.getContactOptionPhone());
                }
            }
        }
    }


    //Todo improve search (add possibility to search for experience title)
    public List<User> findUser(String searchStr) {
        List<Skills> skills = skillsRepository.findSkillsByTitleContainingIgnoreCase(searchStr);
        List<User> users = new ArrayList<>();
        for (Skills skill : skills ){
            List<User> usersTemp = userRepository.findUsersByUserSkillsSkill(skillsRepository.findSkillByTitleIgnoreCase(skill.getTitle()));
            for(User user : usersTemp){
                if (!users.contains(user)) {
                    users.add(user);
                }
            }
        }
        return users;
    }
}
