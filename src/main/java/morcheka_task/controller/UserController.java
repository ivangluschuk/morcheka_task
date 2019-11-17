package morcheka_task.controller;

import morcheka_task.payload.CreateUserRequest;
import morcheka_task.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    @Transactional
    public ResponseEntity registerUser(@Valid @RequestBody CreateUserRequest request) {
        if (userService.isRequiredUsernameAvailable(request.getUsername())) {
            userService.createUser(request);
            return ResponseEntity.status(HttpStatus.OK).body("The user is successfully registered");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("This username is already taken");
        }
    }
}
