package ops.kex.restapi.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ops.kex.restapi.model.ContactTime;
import ops.kex.restapi.model.User;
import ops.kex.restapi.repository.ContactTimeRepository;
import ops.kex.restapi.repository.UserRepository;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ContactTimeService {

    private final ContactTimeRepository contactTimeRepository;
    private final UserRepository userRepository;

    public List<ContactTime> getContactTime() {
        return contactTimeRepository.findAll();
    }

    public List<ContactTime> getUserContactTimes() {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if ((authentication instanceof AnonymousAuthenticationToken)) {
                log.error("no user logged in");
            }
            else {
                User user = userRepository.findUserByUsernameIgnoreCase(authentication.getName());
                if (user == null) {
                    log.error("user " + authentication.getName() + " does not exist");
                } else return user.getUserContactTimes();
            }
        return null;
    }

    public void addContactTimeToUser(ContactTime contactTime) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if ((authentication instanceof AnonymousAuthenticationToken)) {
            log.error("no user logged in");
        }else {
            User user = userRepository.findUserByUsernameIgnoreCase(authentication.getName());
            if (user == null) {
                throw new EntityNotFoundException("Error while user sync");
            } else {
                List<ContactTime> userContactTime = user.getUserContactTimes();
                contactTimeRepository.save(contactTime);
                userContactTime.add(contactTime);
                user.setUserContactTimes(userContactTime);
                userRepository.save(user);
            }
        }
    }

    public void deleteContactTime(Integer contactTimeId) {
        boolean exists = contactTimeRepository.existsById(contactTimeId);
        if (!exists){
            log.error("Contact Time with id "+ contactTimeId + " does not exists");
        }
        contactTimeRepository.deleteById(contactTimeId);
    }

    public void updateContactTime(ContactTime contactTime) {
        if (contactTimeRepository.findById(contactTime.getId()).isPresent()){
            ContactTime userContactTime = contactTimeRepository.findById(contactTime.getId()).get();
            userContactTime.setDay(contactTime.getDay());
            userContactTime.setFromTime(contactTime.getFromTime());
            userContactTime.setToTime(contactTime.getToTime());
            contactTimeRepository.save(userContactTime);
        } else log.error("Contact Time with id " + contactTime.getId() + " does not exists");
    }
}
