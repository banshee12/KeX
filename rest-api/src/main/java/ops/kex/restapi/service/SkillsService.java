package ops.kex.restapi.service;

import ops.kex.restapi.model.Skills;
import ops.kex.restapi.repository.SkillsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class SkillsService {
    private final SkillsRepository skillsRepository;

    @Autowired
    public SkillsService(SkillsRepository skillsRepository) {
        this.skillsRepository = skillsRepository;
    }

    public List<Skills> getSkills(){
        return skillsRepository.findAll();
    }

    public void addNewSkill(Skills skills){
        Optional<Skills> skillsOptional = skillsRepository
                .findSkillsBySkill(skills.getSkill());
        if (skillsOptional.isPresent()){
            throw new IllegalStateException("Skill already exists");
        }
        skillsRepository.save(skills);
    }

    public void deleteSkill(Integer skillId) {
        boolean exists = skillsRepository.existsById(skillId);
        if (!exists){
            throw new IllegalStateException("skill with id "+ skillId + " does not exists");
        }
        skillsRepository.deleteById(skillId);
    }

    @Transactional
    public void updateSkill(Integer skillId,
                            String skill) {
        Skills skills = skillsRepository.findById(skillId)
                .orElseThrow(() -> new IllegalStateException(
                        "skill with id " + skillId + " does not exists"));

        if (skill != null &&
                !skill.isEmpty() &&
                !Objects.equals(skills.getSkill(), skill)){
            Optional<Skills> skillsOptional = skillsRepository
                    .findSkillsBySkill(skill);
            if (skillsOptional.isPresent()) {
                throw new IllegalStateException("Skill already exists");
            }
            skills.setSkill(skill);
        }
    }
}
