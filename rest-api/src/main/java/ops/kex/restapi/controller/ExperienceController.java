package ops.kex.restapi.controller;

import lombok.RequiredArgsConstructor;
import ops.kex.restapi.model.Experience;
import ops.kex.restapi.service.ExperienceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api")
public class ExperienceController {

    private final ExperienceService experienceService;

    @GetMapping("/experience")
    public List<Experience> getExperience() {
        return experienceService.getExperience();
    }

    @GetMapping("/user/experience")
    public List<Experience> getUserExperience(){
         return experienceService.getUserExperience();
    }


    @PostMapping("/user/experience")
    public void addExperienceToUser(@RequestBody Experience experience){
        experienceService.addExperienceToUser(experience);
    }

    @DeleteMapping("/user/experience")
    public void deleteExperience(
            @RequestBody Experience experience){
        experienceService.deleteExperience(experience);
    }

    @PutMapping("/user/experience")
    public void updateExperience(
            @RequestBody Experience experience){
        experienceService.updateExperience(experience);
    }
}
