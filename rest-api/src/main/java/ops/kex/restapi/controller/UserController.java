package ops.kex.restapi.controller;

import lombok.RequiredArgsConstructor;
import ops.kex.restapi.model.*;
import ops.kex.restapi.model.search.UserSearch;
import ops.kex.restapi.projection.UserView;
import ops.kex.restapi.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/user")
public class UserController {

    private final UserService userService;

//    @GetMapping("/all")
//    public List<User> getUsers() {
//        return userService.getUsers();
//    }

   @GetMapping()
    public ResponseEntity<User> getUser() {
       return userService.getUser();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable String userId) {
        return userService.getUserById(userId);
    }

    @PostMapping("/search")
    public ResponseEntity<List<UserView>> findUser(@RequestBody UserSearch userSearch) {
        return userService.findUser(userSearch);
    }

    @PutMapping("/contactOption")
    public ResponseEntity<String> updateUserContactOptions(
            @RequestBody User user) {
        return userService.updateUserContactOptions(user);
    }

    @GetMapping("/sync")
    public ResponseEntity<String> syncUser(){
        return userService.SyncUser();
    }

    @DeleteMapping
    public ResponseEntity<String> deleteUser(){
       return userService.deleteUser();
    }
}
