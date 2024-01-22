package ops.kex.restapi.repository;

import ops.kex.restapi.model.Tags;
import org.springframework.data.repository.ListCrudRepository;

public interface TagsRepository extends ListCrudRepository<Tags, Integer> {
}
