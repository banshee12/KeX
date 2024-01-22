package ops.kex.restapi.controller;

import ops.kex.restapi.model.Tags;
import ops.kex.restapi.repository.TagsRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/tags")
public class TagsController {

    private final TagsRepository repository;

    public TagsController(TagsRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Tags> findAll() {
        return this.repository.findAll();
    }

}

