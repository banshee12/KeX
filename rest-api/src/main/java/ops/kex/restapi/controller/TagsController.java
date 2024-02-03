package ops.kex.restapi.controller;

import ops.kex.restapi.model.Tags;
import ops.kex.restapi.repository.TagsRepository;
import ops.kex.restapi.service.TagsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/tags")
public class TagsController {

private final TagsService tagsService;

    public TagsController(TagsService tagsService) {
        this.tagsService = tagsService;
    }


    @GetMapping
    public List<Tags> getTags() {
        return tagsService.getTags();
    }

    @PostMapping
    public void registerNewTag(@RequestBody Tags tags){
        tagsService.addNewTag(tags);
    }

}

