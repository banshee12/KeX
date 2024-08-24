package ops.kex.restapi.service;

import lombok.extern.slf4j.Slf4j;
import ops.kex.restapi.model.User;
import ops.kex.restapi.repository.UserRepository;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.springframework.stereotype.Service;



@Slf4j
@Service
public class KeycloakService {

    private final String REALM_NAME = "kex-application";

    private final UserRepository userRepository;
    private final Keycloak keycloak;

    public KeycloakService(UserRepository userRepository, Keycloak keycloak) {
        this.userRepository = userRepository;
        this.keycloak = keycloak;
    }

    private UsersResource getUserResource(){
        RealmResource proMa = keycloak.realm(REALM_NAME);
        return proMa.users();
    }

    public Integer deleteUser(String sub){
        if(userRepository.findUserByUserSub(sub).isPresent()){
            User deleteUser = userRepository.findUserByUserSub(sub).get();
            userRepository.delete(deleteUser);
            getUserResource().delete(deleteUser.getUserSub());
            log.info("User " + deleteUser.getUsername() + " deleted");
            return 1;
        }else {
            log.error("User with id " + sub +" does not exist in DB");
            return -1;
        }
    }
}