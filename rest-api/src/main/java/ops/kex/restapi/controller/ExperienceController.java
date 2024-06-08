package ops.kex.restapi.controller;

import lombok.RequiredArgsConstructor;
import ops.kex.restapi.model.Experience;
import ops.kex.restapi.model.sorting.SortData;
import ops.kex.restapi.service.ExperienceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/user")
public class ExperienceController {

    private final ExperienceService experienceService;


    @PutMapping("/experience/sorted")
    public ResponseEntity<List<Experience>> getUserExperience(@RequestBody SortData sortData){
         return experienceService.getUserExperience(sortData);
    }


    @PostMapping("/experience")
    public ResponseEntity<String> addExperienceToUser(@RequestBody Experience experience){
        return experienceService.addExperienceToUser(experience);
    }

    @DeleteMapping("/experience/{experienceId}")
    public ResponseEntity<String> deleteExperience(@PathVariable Integer experienceId){
        return experienceService.deleteExperience(experienceId);
    }

    @PutMapping("/experience")
    public ResponseEntity<String> updateExperience(
            @RequestBody Experience experience){
        return experienceService.updateExperience(experience);
    }
}
