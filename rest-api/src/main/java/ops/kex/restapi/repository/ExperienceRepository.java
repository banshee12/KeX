package ops.kex.restapi.repository;

import ops.kex.restapi.model.Experience;
import ops.kex.restapi.model.Skills;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface ExperienceRepository
        extends JpaRepository<Experience, Integer> {

    List<Experience> findExperiencesBySkillTitle(String title);
    List<Experience> findExperiencesByUserUserId(Sort sort, Integer userId);
    List<Experience> getExperiencesByUserUserId(Pageable pageable, Integer userId);

    Optional<List<Experience>> getExperiencesBySkillTitleAndUserUserId(String SkillTitle, Integer userId);

    Optional<Experience> findExperienceById(Integer experienceId);
}
