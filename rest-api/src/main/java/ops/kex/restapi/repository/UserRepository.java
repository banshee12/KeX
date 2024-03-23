package ops.kex.restapi.repository;

import lombok.NonNull;
import ops.kex.restapi.model.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository
        extends JpaRepository<User, Integer>,
        JpaSpecificationExecutor<User> {
    Optional<User> findUserByUserSub(String userIdStr);
    User findUserByUsernameIgnoreCase(String username);
    List<User> findUsersByUserSkillsSkill(Skills skill);
    List<User> findAll(@NonNull Specification<User> specification);
}

