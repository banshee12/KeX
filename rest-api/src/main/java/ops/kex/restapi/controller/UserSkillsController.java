package ops.kex.restapi.controller;

import lombok.RequiredArgsConstructor;
import ops.kex.restapi.model.UserSkills;
import ops.kex.restapi.model.sorting.SortData;
import ops.kex.restapi.service.UserSkillsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api")
public class UserSkillsController {

    private final UserSkillsService userSkillsService;

    @PutMapping("user/userSkill/sorted")
    public List<UserSkills> getUserSkill(@RequestBody SortData sortData){
        return userSkillsService.getUserSkills(sortData);
    }

    @PostMapping("/user/userSkill")
    public void addUserSkillToUser(@RequestBody UserSkills userSkills) {
        userSkillsService.addUserSkillToUser(userSkills);
    }

    @PutMapping("/user/userSkill")
    public void updateUserSkill(@RequestBody UserSkills userSkills) {
        userSkillsService.updateUserSkill(userSkills);
    }

    @DeleteMapping("/user/userSkill/{userSkillsId}")
    public void deleteUserSkill(@PathVariable Integer userSkillsId) {
        userSkillsService.deleteUserSkill(userSkillsId);
    }
}
