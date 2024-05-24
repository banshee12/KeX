package ops.kex.restapi.controller;

import lombok.RequiredArgsConstructor;
import ops.kex.restapi.model.Experience;
import ops.kex.restapi.model.sorting.SortData;
import ops.kex.restapi.service.ExperienceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/user")
public class ExperienceController {

    private final ExperienceService experienceService;


    @PutMapping("/experience/sorted")
    public List<Experience> getUserExperience(@RequestBody SortData sortData){
         return experienceService.getUserExperience(sortData);
    }


    @PostMapping("/experience")
    public void addExperienceToUser(@RequestBody Experience experience){
        experienceService.addExperienceToUser(experience);
    }

    @DeleteMapping("/experience/{experienceId}")
    public void deleteExperience(@PathVariable Integer experienceId){
        experienceService.deleteExperience(experienceId);
    }

    @PutMapping("/experience")
    public void updateExperience(
            @RequestBody Experience experience){
        experienceService.updateExperience(experience);
    }
}
