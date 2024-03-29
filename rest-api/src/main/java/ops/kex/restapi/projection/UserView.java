package ops.kex.restapi.projection;

import jakarta.persistence.CascadeType;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import ops.kex.restapi.model.ContactTime;
import ops.kex.restapi.model.Experience;
import ops.kex.restapi.model.UserSkills;

import java.util.List;

public interface UserView {
//    Integer getUserId();
    String getUserSub();
//    String getUsername();
//    String getEmail();
    String getFirstname();
    String getLastname();
//    Boolean getContactOptionPhone();
//    Boolean getContactOptionMail();
//    Boolean getContactOptionAppointment();
//    List<UserSkills> getUserSkills();
//    List<Experience> getUserExperience();
//    List<ContactTime> getUserContactTimes();
}
