package ops.kex.restapi.repository;

import ops.kex.restapi.model.UserSkills;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserSkillsRepository
        extends JpaRepository<UserSkills, Integer> {
    UserSkills findUserSkillsBySkillId(Integer SkillId);
    Optional<UserSkills> findUserSkillsById(Integer SkillId);
    UserSkills findUserSkillsBySkill_Title(String SkillTitle);
}
