package ops.kex.restapi.repository;

import ops.kex.restapi.model.Skills;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SkillsRepository
        extends JpaRepository<Skills, Integer> {
    Optional<Skills> findSkillsByTitleIgnoreCase(String skill);
    Skills findSkillByTitleIgnoreCase(String skill);
    List<Skills> findSkillsByTitleContainingIgnoreCase(String skill);
    Optional<Skills> findTopByOrderByIdDesc();
}