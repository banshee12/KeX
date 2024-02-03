package ops.kex.restapi.repository;

import ops.kex.restapi.model.Tags;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TagsRepository
        extends ListCrudRepository<Tags, Integer> {
    @Query("SELECT t FROM Tags t WHERE t.tag = ?1")
    Optional<Tags> findTagsByTag(String tag);
}
