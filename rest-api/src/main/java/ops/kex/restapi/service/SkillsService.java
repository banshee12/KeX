package ops.kex.restapi.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ops.kex.restapi.model.Skills;
import ops.kex.restapi.model.User;
import ops.kex.restapi.model.UserSkills;
import ops.kex.restapi.repository.SkillsRepository;
import ops.kex.restapi.repository.UserRepository;
import ops.kex.restapi.repository.UserSkillsRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class SkillsService {

    private final UserRepository userRepository;
    private final UserSkillsRepository userSkillsRepository;
    private final SkillsRepository skillsRepository;

    public List<Skills> getSkills(){
        return skillsRepository.findAll();
    }


    public void addNewSkill(Skills skills){
        Optional<Skills> skillsOptional = skillsRepository
                .findSkillsByTitleIgnoreCase(skills.getTitle());
        skillsOptional.ifPresent(value -> log.warn("Skill " + value.getTitle() + " already exists in database"));
        skillsRepository.save(skills);
    }

    public void deleteSkill(Integer skillId) {
        Optional<Skills> optionalSkills = skillsRepository.findById(skillId);
        if (optionalSkills.isEmpty()){
            log.error("skill "+ skillId + " can not be deleted cause it does not exists");
        }else{
            //delete userSkills
            List<User> userList = userRepository.findUsersByUserSkillsSkill(optionalSkills.get());
            for(User user : userList){
                UserSkills userSkill = null;
                for(UserSkills userSkills : user.getUserSkills()){
                    if(userSkills.getSkill().equals(optionalSkills.get())){
                        userSkill = userSkills;
                    }
                }
                if(userSkill != null){
                    user.removeUserSkill(userSkill.getId());
                    userSkillsRepository.deleteById(userSkill.getId());
                }
            }
            //Todo delete experience or only remove from experience
            //delete skill
            skillsRepository.deleteById(skillId);
            //log
            log.info("Skill " + skillId + " deleted");
        }
    }

    @Transactional
    public void updateSkill(Skills skill) {
        if(skillsRepository.findById(skill.getId()).isPresent()){
            Skills skills = skillsRepository.findById(skill.getId()).get();
            Optional<Skills> skillsOptional = skillsRepository
                    .findSkillsByTitleIgnoreCase(skill.getTitle());
            if (skillsOptional.isPresent()) {
                log.error("skill " + skill.getTitle() +" already exist in database");
            }
            skills.setTitle(skill.getTitle());
        } else log.error("skill " + skill.getTitle() + " can not be updated cause it does not exist");
    }

    public List<Skills> getSuggestedSkills(String skillToFind) {
        return skillsRepository
                .findSkillsByTitleContainingIgnoreCase(skillToFind);
    }
}
