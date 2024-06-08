package ops.kex.restapi.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ops.kex.restapi.model.ContactTime;
import ops.kex.restapi.model.User;
import ops.kex.restapi.repository.ContactTimeRepository;
import ops.kex.restapi.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ContactTimeService {

    private final ContactTimeRepository contactTimeRepository;
    private final UserRepository userRepository;

    public ResponseEntity<List<ContactTime>> getContactTimes() {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if ((authentication instanceof AnonymousAuthenticationToken)) {
                log.error("no user logged in");
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
            else {
                User user = userRepository.findUserByUsernameIgnoreCase(authentication.getName());
                if (user == null) {
                    log.error("user " + authentication.getName() + " does not exist");
                    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                } else return new ResponseEntity<>(user.getUserContactTimes(), HttpStatus.OK);
            }
    }


    public ResponseEntity<String> updateContactTime(List<ContactTime> contactTime) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if ((authentication instanceof AnonymousAuthenticationToken)) {
            log.error("no user logged in");
            return new ResponseEntity<>(
                    "no user logged in",
                    HttpStatus.UNAUTHORIZED);
        }else {
            User user = userRepository.findUserByUsernameIgnoreCase(authentication.getName());
            if (user == null) {
                log.error("user " + authentication.getName() + " does not exist");
                return new ResponseEntity<>(
                        "no user logged in",
                        HttpStatus.INTERNAL_SERVER_ERROR);
            } else {
                List<ContactTime> contactTimeList = contactTimeRepository.findContactTimesByUserUserId(user.getUserId());
                if (!contactTimeList.isEmpty()) {
                    contactTimeRepository.deleteAll(contactTimeList);
                }

                for (ContactTime ct : contactTime) {
                    //create contactTime and save it
                    ContactTime newContactTime = ContactTime.builder()
                            .day(ct.getDay())
                            .fromTime(ct.getFromTime())
                            .toTime(ct.getToTime())
                            .user(user)
                            .build();
                    contactTimeRepository.save(newContactTime);
                    log.info("contact time '" + ct.getDay() + ": " + ct.getFromTime() + " - " + ct.getToTime() + "' has been added to user " + user.getUsername());
                }
                return new ResponseEntity<>(
                        "contact time  has been added/updated",
                        HttpStatus.OK);
            }
        }
    }
}