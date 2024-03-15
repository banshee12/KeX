package ops.kex.restapi.controller;

import ops.kex.restapi.model.Skills;
import ops.kex.restapi.service.SkillsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api")
public class SkillsController {

    private final SkillsService skillsService;

    public SkillsController(SkillsService skillsService) {
        this.skillsService = skillsService;
    }

    @GetMapping("/skills")
    public List<Skills> getSkills() {
        return skillsService.getSkills();
    }

    @GetMapping("user/skill/suggestion")
    public List<Skills> getSuggestedSkills(
            @RequestParam String skillToFind){
        return skillsService.getSuggestedSkills(skillToFind);
    }

    @PostMapping("/newskills")
    public void registerNewSkill(@RequestBody Skills skills) {
        skillsService.addNewSkill(skills);
    }

    @DeleteMapping("/skill")
    public void deleteSkill(@RequestBody Skills skill){
        skillsService.deleteSkill(skill);
    }

    @PutMapping("/skill")
    public void updateSkill(@RequestBody Skills skill){
        skillsService.updateSkill(skill);
    }

}


