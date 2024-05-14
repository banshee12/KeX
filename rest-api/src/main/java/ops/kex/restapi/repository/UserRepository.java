package ops.kex.restapi.repository;


import ops.kex.restapi.model.*;
import ops.kex.restapi.projection.UserView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository
        extends JpaRepository<User, Integer>,
        JpaSpecificationExecutor<User> {
    Optional<User> findUserByUserSub(String userId);
    User findUserByUsernameIgnoreCase(String username);
    User getUserByUserSub(String userId);
    List<User> findUsersByUserSkillsSkill(Skills skill);
    List<UserView> getUsersByUserSkillsSkillAndUserSkillsVisibleAndUserSkillsLevelGreaterThanEqual(Skills skill, Boolean visible, Integer level);
}

