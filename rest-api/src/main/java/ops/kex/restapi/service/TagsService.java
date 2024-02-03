package ops.kex.restapi.service;

import ops.kex.restapi.model.Tags;
import ops.kex.restapi.repository.TagsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TagsService {
    private final TagsRepository tagsRepository;

    @Autowired
    public TagsService(TagsRepository tagsRepository) {
        this.tagsRepository = tagsRepository;
    }

    public List<Tags> getTags(){
        return tagsRepository.findAll();
    }

    public void addNewTag(Tags tags){
        Optional<Tags> tagsOptional = tagsRepository
                .findTagsByTag(tags.getTag());
        if (tagsOptional.isPresent()){
            throw new IllegalStateException("tag already exists");
        }
        tagsRepository.save(tags);
    }
}
