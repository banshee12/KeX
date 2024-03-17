package ops.kex.restapi.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
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
public class ContactTimeService {

    private final ContactTimeRepository contactTimeRepository;
    private final UserRepository userRepository;

    public List<ContactTime> getContactTime() {
        return contactTimeRepository.findAll();
    }

    public List<ContactTime> getUserContactTimes() {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (!(authentication instanceof AnonymousAuthenticationToken)) {
                User user = userRepository.findUserByUsernameIgnoreCase(authentication.getName());
                if (user == null) {
                    throw new EntityNotFoundException("Error while user sync");
                } else {
                    return user.getUserContactTimes();
                }
            }
            else throw new IllegalStateException ("no user logged in");
        }

    public void addContactTimeToUser(ContactTime contactTime) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
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
        }else throw new IllegalStateException ("no user logged in");
    }

    public void deleteContactTime(ContactTime contactTime) {
        boolean exists = contactTimeRepository.existsById(contactTime.getId());
        if (!exists){
            throw new IllegalStateException("Contact Time with id "+ contactTime.getId() + " does not exists");
        }
        contactTimeRepository.deleteById(contactTime.getId());
    }

    public void updateContactTime(ContactTime contactTime) {
        ContactTime oldContactTime = contactTimeRepository.findById(contactTime.getId())
                .orElseThrow(() -> new IllegalStateException(
                        "Contact Time with id " + contactTime.getId() + " does not exists"));

        oldContactTime.setDay(contactTime.getDay()); //day
        oldContactTime.setFromTime(contactTime.getFromTime()); //from time
        oldContactTime.setToTime(contactTime.getToTime()); //to Time
        contactTimeRepository.save(oldContactTime);
    }
}
