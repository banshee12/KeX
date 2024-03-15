package ops.kex.restapi.service;

import lombok.RequiredArgsConstructor;
import ops.kex.restapi.model.Skills;
import ops.kex.restapi.repository.SkillsRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SkillsService {
    private final SkillsRepository skillsRepository;

    public List<Skills> getSkills(){
        return skillsRepository.findAll();
    }


    public void addNewSkill(Skills skills){
        Optional<Skills> skillsOptional = skillsRepository
                .findSkillsByTitleIgnoreCase(skills.getTitle());
        if (skillsOptional.isPresent()){
            throw new IllegalStateException("Skill already exists");
        }
        skillsRepository.save(skills);
    }

    public void deleteSkill(Skills skill) {
        boolean exists = skillsRepository.existsById(skill.getId());
        if (!exists){
            throw new IllegalStateException("skill "+ skill.getTitle() + " does not exists");
        }
        skillsRepository.deleteById(skill.getId());
    }

    @Transactional
    public void updateSkill(Skills skill) {
        Skills skills = skillsRepository.findById(skill.getId())
                .orElseThrow(() -> new IllegalStateException(
                        "skill " + skill.getTitle() + " does not exists"));

            Optional<Skills> skillsOptional = skillsRepository
                    .findSkillsByTitleIgnoreCase(skill.getTitle());
            if (skillsOptional.isPresent()) {
                throw new IllegalStateException("Skill already exists");
            }
            skills.setTitle(skill.getTitle());
    }

    public List<Skills> getSuggestedSkills(String skillToFind) {
        return skillsRepository
                .findSkillsByTitleContainingIgnoreCase(skillToFind);
    }
}
