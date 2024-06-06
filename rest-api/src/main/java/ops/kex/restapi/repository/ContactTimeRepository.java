package ops.kex.restapi.repository;

import ops.kex.restapi.model.ContactTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface ContactTimeRepository
        extends JpaRepository<ContactTime, Integer> {
    List<ContactTime> findContactTimesByUserUserId(Integer userId);
}
