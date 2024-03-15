package ops.kex.restapi.repository;

import ops.kex.restapi.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository
        extends JpaRepository<User, Integer> {
    Optional<User> findUserByUserSid(String userIdStr);
    User findUserByUsernameIgnoreCase(String username);
}

