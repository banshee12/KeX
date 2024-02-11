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

    @PostMapping("/newskills")
    public void registerNewSkill(@RequestBody Skills skills) {
        skillsService.addNewSkill(skills);
    }

    @DeleteMapping("/deleteskill/{skillId}")
    public void deleteSkill(
            @PathVariable("skillId") Integer skillId){
        skillsService.deleteSkill(skillId);
    }

    @PutMapping("/updateskill/{skillId}")
    public void updateSkill(
            @PathVariable("skillId") Integer skillId,
            @RequestParam(required = false) String skill){
        skillsService.updateSkill(skillId, skill);
    }

}


