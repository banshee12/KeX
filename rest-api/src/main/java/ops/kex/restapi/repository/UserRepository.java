package ops.kex.restapi.repository;


import ops.kex.restapi.model.*;
import ops.kex.restapi.projection.UserView;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface UserRepository
        extends JpaRepository<User, Integer>,
        JpaSpecificationExecutor<User> {
    Optional<User> findUserByUserSub(String userId);
    User findUserByUsernameIgnoreCase(String username);
    User getUserByUserSub(String userId);
    UserView findUsersByUserSub(String userId);
    List<User> findUsersByUserSkillsSkill(Skills skill);
//    List<UserView> getUsersByUserSkillsSkillAndUserSkillsVisibleAndUserSkillsLevelGreaterThanEqual(Skills skill, Boolean visible, Integer level);
    List<UserView> findUsersByUserSkillsSkillContainingIgnoreCaseAndUserSkillsVisibleAndUserSkillsLevelGreaterThanEqual(Pageable pageable, Skills skill, Boolean visible, Integer level);
//    List<UserView> getUsersByUserSkillsSkillTitleContainingIgnoreCaseAndUserSkillsVisibleAndUserSkillsLevelGreaterThanEqual(Sort sort, String searchSkill, Boolean visible, Integer level);
    List<UserView> getDistinctUsersByUserSkillsSkillTitleContainingIgnoreCaseAndUserSkillsVisibleAndUserSkillsLevelGreaterThanEqual(Sort sort, String searchSkill, Boolean visible, Integer level);
}

