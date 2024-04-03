package ops.kex.restapi.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ops.kex.restapi.model.Skills;
import ops.kex.restapi.repository.SkillsRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class SkillsService {
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

    public void deleteSkill(Skills skill) {
        boolean exists = skillsRepository.existsById(skill.getId());
        if (!exists){
            log.error("skill "+ skill.getTitle() + " can not be deleted cause it does not exists");
        }
        skillsRepository.deleteById(skill.getId());
    }

    @Transactional
    public void updateSkill(Skills skill) {
        if(skillsRepository.findById(skill.getId()).isPresent()){
            Skills skills = skillsRepository.findById(skill.getId()).get();
            Optional<Skills> skillsOptional = skillsRepository
                    .findSkillsByTitleIgnoreCase(skill.getTitle());
            if (skillsOptional.isPresent()) {
                log.error("skill " + skill.getTitle() +" already exists in database");
            }
            skills.setTitle(skill.getTitle());
        } else log.error("skill " + skill.getTitle() + " can not be updated cause it does not exist");
    }

    public List<Skills> getSuggestedSkills(String skillToFind) {
        return skillsRepository
                .findSkillsByTitleContainingIgnoreCase(skillToFind);
    }
}
