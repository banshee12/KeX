package ops.kex.restapi.repository;

import ops.kex.restapi.model.Skills;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SkillsRepository
        extends ListCrudRepository<Skills, Integer> {
    @Query("SELECT t FROM Skills t WHERE t.skill = ?1")
    Optional<Skills> findSkillsBySkill(String skill);
}
