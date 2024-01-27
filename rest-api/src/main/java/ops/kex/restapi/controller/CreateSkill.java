package ops.kex.restapi.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class CreateSkill {
    @GetMapping("/")
    public String index(){
        return "Hello World";
    }
}
