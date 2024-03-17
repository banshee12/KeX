package ops.kex.restapi.controller;

import lombok.RequiredArgsConstructor;
import ops.kex.restapi.model.ContactTime;
import ops.kex.restapi.service.ContactTimeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api")
public class ContactTimeController {

    private final ContactTimeService contactTimeService;


    @GetMapping("/contactTime")
    public List<ContactTime> getContactTime() {
        return contactTimeService.getContactTime();
    }

    @GetMapping("/user/contactTime")
    public List<ContactTime> getUserContactTime(){
        return contactTimeService.getUserContactTimes();
    }

    @PostMapping("/user/contactTime")
    public void addContactTimeToUser(
            @RequestBody ContactTime contactTime){
        contactTimeService.addContactTimeToUser(contactTime);
    }

    @DeleteMapping("/ContactTime")
    public void deleteContactTime(
            @RequestBody ContactTime contactTime){
        contactTimeService.deleteContactTime(contactTime);
    }

    @PutMapping("user/contactTime")
    public void updateContactTime(
            @RequestBody ContactTime contactTime){
        contactTimeService.updateContactTime(contactTime);
    }
}
