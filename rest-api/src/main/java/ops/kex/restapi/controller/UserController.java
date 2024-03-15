package ops.kex.restapi.controller;

import lombok.RequiredArgsConstructor;
import ops.kex.restapi.model.*;
import ops.kex.restapi.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api")
public class UserController {

    private final UserService userService;

    @GetMapping("/user/all")
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("/user")
    public User getUser() {
        return userService.getUser();
    }

    @PutMapping("/user/contactOption")
    public void updateUserContactOptions(
            @RequestBody User user) {
        userService.updateUserContactOptions(user);
    }
}
