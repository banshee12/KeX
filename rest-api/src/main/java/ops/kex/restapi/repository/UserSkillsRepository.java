package ops.kex.restapi.repository;

import ops.kex.restapi.model.UserSkills;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserSkillsRepository
        extends JpaRepository<UserSkills, Integer> {
    UserSkills findUserSkillsBySkillId(Integer SkillId);
    UserSkills findUserSkillsBySkill_Title(String SkillTitle);
}
