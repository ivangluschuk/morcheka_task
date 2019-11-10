package morcheka_task.controller;

import com.google.common.collect.ImmutableList;
import morcheka_task.model.Role;
import morcheka_task.model.User;
import morcheka_task.payload.RegistrationRequest;
import morcheka_task.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;

@RestController
public class AuthenticationController {

    private final UserService userService;

    public AuthenticationController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    @Transactional
    public ResponseEntity registerUser(@Valid @RequestBody RegistrationRequest regRequest) {
        var user = User.builder()
                .username(regRequest.getUsername())
                .password(new BCryptPasswordEncoder().encode(regRequest.getPassword()))
                .authorities(ImmutableList.of(Role.USER))
                .credentialsNonExpired(true)
                .accountNonLocked(true)
                .accountNonExpired(true)
                .enabled(true)
                .build();

        if (userService.existsByUsername(user.getUsername())) {
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("This username is already taken");
        } else {
            userService.save(user);
           return ResponseEntity.status(HttpStatus.OK).body("The user is successfully registered");
        }
    }
}
