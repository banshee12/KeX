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


   @GetMapping()
    public ResponseEntity<User> getUser() {
       return userService.getUser();
    }

    @GetMapping("/{userSub}")
    public ResponseEntity<UserPage> getUserById(@PathVariable String userSub) {
        return userService.getUserById(userSub);
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

    @PutMapping("/favorite/{userSub}/{remove}")
    public ResponseEntity<String> editFavorite(
            @PathVariable String userSub,
            @PathVariable Boolean remove){
       return userService.editFavorite(userSub, remove);
    }

    @GetMapping("/favorite")
    public ResponseEntity<List<UserView>> getFavorites(){
       return userService.getFavorites();
    }
}
