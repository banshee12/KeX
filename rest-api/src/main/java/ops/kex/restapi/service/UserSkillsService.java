package ops.kex.restapi.service;

import lombok.RequiredArgsConstructor;
import ops.kex.restapi.model.Skills;
import ops.kex.restapi.model.User;
import ops.kex.restapi.model.UserSkills;
import ops.kex.restapi.repository.SkillsRepository;
import ops.kex.restapi.repository.UserRepository;
import ops.kex.restapi.repository.UserSkillsRepository;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserSkillsService {

    private final UserSkillsRepository userSkillsRepository;
    private final UserRepository userRepository;
    private final SkillsRepository skillsRepository;


    public List<UserSkills> getUserSkills() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof AnonymousAuthenticationToken) {
            throw new IllegalStateException("no user logged in");
        } else {
            User user = userRepository.findUserByUsernameIgnoreCase(authentication.getName());
            if (user != null) {
                return user.getUserSkills();
            }
            throw new IllegalStateException("User " + authentication.getName() + " does not exist");
        }
    }

    public void addUserSkillToUser(UserSkills userSkill) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof AnonymousAuthenticationToken) {
            throw new IllegalStateException("no user logged in");
        }
        else {
            User user = userRepository.findUserByUsernameIgnoreCase(authentication.getName());
            if (user != null) {
                Skills newSkill = skillsRepository.findSkillByTitleIgnoreCase(userSkill.getSkill().getTitle());
                if (newSkill == null) {
                    throw new IllegalStateException("skill " + userSkill.getSkill().getTitle() + " does not exist in Database");
                } else {
                    List<UserSkills> userSkills = user.getUserSkills();
                    if (!userSkills.contains(userSkillsRepository.findUserSkillsBySkillId(newSkill.getId()))) {
                        userSkill.setSkill(newSkill);
                        user.addUserSkill(userSkill);
                        userRepository.save(user);
                    } else
                        throw new IllegalStateException(("user " + user.getFirstname() + " " + user.getLastname() + " already has skill " + userSkill.getSkill().getTitle()));
                }
            } else throw new IllegalStateException("user " + authentication.getName() + " does not exist");
        }
    }

    @Transactional
    public void updateUserSkill(UserSkills userSkill) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof AnonymousAuthenticationToken) {
            throw new IllegalStateException("no user logged in");
        } else {
            if (userSkillsRepository.findUserSkillsById(userSkill.getId()).isPresent()){
                User user = userRepository.findUserByUsernameIgnoreCase(authentication.getName());
                if (user != null) {
                    List<UserSkills> allUserSkills = user.getUserSkills();
                    user.removeUserSkill(userSkill.getId());
                    Skills newSkill = skillsRepository.findSkillByTitleIgnoreCase(userSkill.getSkill().getTitle());
                    if (newSkill == null) {
                        throw new IllegalStateException("skill " + userSkill.getSkill().getTitle() + " does not exist in Database");
                    } else {
                        UserSkills checkUserSkill = userSkillsRepository.findUserSkillsBySkill_Title(userSkill.getSkill().getTitle());
                        if (!allUserSkills.contains(checkUserSkill) || (userSkill.getSkill().getTitle().equals(checkUserSkill.getSkill().getTitle()))) {
                            user.setUserSkills(allUserSkills);
                            userSkill.setSkill(newSkill);
                            user.addUserSkill(userSkill);
                            userRepository.save(user);
                        } else
                            throw new IllegalStateException(("user " + user.getUsername() + " already has skill " + userSkill.getSkill().getId()));
                    }
                } else throw new IllegalStateException("User " + authentication.getName() + " does not exist");
            } else throw new IllegalStateException("User Skill with ID " + userSkill.getId() + " does not exist");
        }
    }

    public void deleteUserSkill(UserSkills userSkills) {
        boolean exist = userSkillsRepository.existsById(userSkills.getId());
        if (!exist) {
            throw new IllegalStateException("UserSkill with id " + userSkills.getId() + " does not exists");
        }
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof AnonymousAuthenticationToken) {
            throw new IllegalStateException("no user logged in");
        } else {
            User user = userRepository.findUserByUsernameIgnoreCase(authentication.getName());
            user.removeUserSkill(userSkills.getId());
            userSkillsRepository.deleteById(userSkills.getId());
        }
    }
}
