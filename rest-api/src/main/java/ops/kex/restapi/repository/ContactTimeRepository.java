package ops.kex.restapi.repository;

import ops.kex.restapi.model.ContactTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ContactTimeRepository
        extends JpaRepository<ContactTime, Integer> {
}
