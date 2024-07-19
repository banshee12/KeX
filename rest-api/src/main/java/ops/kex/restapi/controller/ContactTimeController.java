package ops.kex.restapi.controller;

import lombok.RequiredArgsConstructor;
import ops.kex.restapi.model.ContactTime;
import ops.kex.restapi.service.ContactTimeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/user")
public class ContactTimeController {

    private final ContactTimeService contactTimeService;


    @GetMapping("/contactTime")
    public ResponseEntity<List<ContactTime>> getContactTime(){
        return contactTimeService.getContactTimes();
    }

    @PutMapping("/contactTime")
    public ResponseEntity<String> updateContactTime(@RequestBody List<ContactTime> contactTime){
        return contactTimeService.updateContactTime(contactTime);
    }
}
