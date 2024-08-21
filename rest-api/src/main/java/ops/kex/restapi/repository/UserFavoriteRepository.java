package ops.kex.restapi.repository;

import ops.kex.restapi.model.UserFavorite;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserFavoriteRepository extends JpaRepository<UserFavorite, Integer> {
    UserFavorite findByUserSubAndFavoriteUserSub(String userSub, String favoriteUser);
}
