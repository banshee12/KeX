package ops.kex.restapi.controller;

import lombok.RequiredArgsConstructor;
import ops.kex.restapi.model.Skills;
import ops.kex.restapi.service.SkillsService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api")
public class SkillsController {

    private final SkillsService skillsService;


    @GetMapping("/skill")
    public List<Skills> getSkills() {
        return skillsService.getSkills();
    }

    @GetMapping("user/skill/suggestion")
    public List<Skills> getSuggestedSkills(
            @RequestParam String skillToFind){
        return skillsService.getSuggestedSkills(skillToFind);
    }

    @PostMapping("/skill")
    public Skills addNewSkill(@RequestBody Skills skills) {
        return skillsService.addNewSkill(skills);
    }

    @PreAuthorize("hasRole('client_admin')")
    @DeleteMapping("/skill/{skillId}")
    public void deleteSkill(@PathVariable Integer skillId){
        skillsService.deleteSkill(skillId);
    }

    @PreAuthorize("hasRole('client_admin')")
    @PutMapping("/skill")
    public void updateSkill(@RequestBody Skills skill){
        skillsService.updateSkill(skill);
    }

}


