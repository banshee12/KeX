package ops.kex.restapi.controller;

import lombok.RequiredArgsConstructor;
import ops.kex.restapi.model.UserSkills;
import ops.kex.restapi.service.UserSkillsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api")
public class UserSkillsController {

    private final UserSkillsService userSkillsService;

    @GetMapping("user/userSkill")
    public List<UserSkills> getUserSkill(){
        return userSkillsService.getUserSkills();
    }

    @PostMapping("/user/userSkill")
    public void addUserSkillToUser(@RequestBody UserSkills userSkills) {
        userSkillsService.addUserSkillToUser(userSkills);
    }

    @PutMapping("/user/userSkill")
    public ResponseEntity<String> updateUserSkill(@RequestBody UserSkills userSkills) {
        return userSkillsService.updateUserSkill(userSkills);
    }

    @DeleteMapping("/user/userSkill/{userSkillsId}")
    public void deleteUserSkill(@PathVariable Integer userSkillsId) {
        userSkillsService.deleteUserSkill(userSkillsId);
    }
}
