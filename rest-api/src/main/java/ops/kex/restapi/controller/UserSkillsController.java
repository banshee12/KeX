package ops.kex.restapi.controller;

import lombok.RequiredArgsConstructor;
import ops.kex.restapi.model.UserSkills;
import ops.kex.restapi.service.UserSkillsService;
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
    public void updateUserSkill(@RequestBody UserSkills userSkills) {
        userSkillsService.updateUserSkill(userSkills);
    }

    @DeleteMapping("/user/userSkill")
    public void deleteUserSkill(@RequestBody UserSkills userSkills) {
        userSkillsService.deleteUserSkill(userSkills);
    }
}
