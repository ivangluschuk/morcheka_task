package morcheka_task.service;

import lombok.Data;
import lombok.NonNull;
import morcheka_task.model.Note;
import morcheka_task.model.Role;
import morcheka_task.model.User;
import morcheka_task.payload.CreateUserRequest;
import morcheka_task.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.annotation.Nonnull;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
@Data
public final class UserService implements UserDetailsService {

    final UserRepository userRepository;

    private Collection<GrantedAuthority> authorities;
    private String password;
    private String username;
    private boolean accountNonExpired;
    private boolean accountNonLocked;
    private boolean credentialsNonExpired;
    private boolean enabled;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(@NonNull final String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("This user is not found"));
    }

    public void createUser(@NonNull final CreateUserRequest request) {
        var user = User.builder()
                .username(request.getUsername())
                .password(new BCryptPasswordEncoder().encode(request.getPassword()))
                .authorities(List.of(Role.USER))
                .credentialsNonExpired(true)
                .accountNonLocked(true)
                .accountNonExpired(true)
                .enabled(true)
                .build();
        userRepository.save(user);
    }

    public void updateUser(@Nonnull User user){
        userRepository.save(user);
    }

    public boolean isRequiredUsernameAvailable(@NonNull final String username) {
        return !userRepository.existsByUsername(username);
    }

    public Optional<User> findUserByUsername(@NonNull final String username) {
        return userRepository.findByUsername(username);
    }

    public void deleteNoteFromUser(@Nonnull User user, @Nonnull Note note) {
        user.deleteNote(note);
        updateUser(user);
    }
}
