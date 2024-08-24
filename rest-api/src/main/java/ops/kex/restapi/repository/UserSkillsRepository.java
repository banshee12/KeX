package ops.kex.restapi.repository;

import ops.kex.restapi.model.Experience;
import ops.kex.restapi.model.UserSkills;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserSkillsRepository
        extends JpaRepository<UserSkills, Integer> {

    UserSkills getUserSkillsById(Integer SkillId);

    Optional<UserSkills> findUserSkillsByUserUserIdAndSkillTitleIgnoringCase(Integer userId, String skillTitle);
    Optional<UserSkills> findUserSkillsById(Integer SkillId);

    List<UserSkills> findUserSkillsByUserUserId(Sort sort, Integer userId);
    List<UserSkills> getUserSkillsByUserUserId(Pageable pageable, Integer userId);

}
