package morcheka_task.repository;

import lombok.NonNull;
import morcheka_task.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(@NonNull String username);
    boolean existsByUsername(@NonNull String username);
}
