package ops.kex.restapi.controller;

import lombok.RequiredArgsConstructor;
import ops.kex.restapi.model.*;
import ops.kex.restapi.projection.UserView;
import ops.kex.restapi.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/user")
public class UserController {

    private final UserService userService;

    @GetMapping("/all")
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("")
    public User getUser() {
        return userService.getUser();
    }

    @GetMapping("/Id")
    public User getUserById(
            @RequestParam String userId) {
        return userService.getUserById(userId);
    }

    @GetMapping("/search")
    public List<UserView> findUser(
            @RequestParam String searchStr) {
        return userService.findUser(searchStr);
    }

    @PutMapping("/contactOption")
    public void updateUserContactOptions(
            @RequestBody User user) {
        userService.updateUserContactOptions(user);
    }

    @GetMapping("/sync")
    public void syncUser(){
        userService.SyncUser();
    }
}
