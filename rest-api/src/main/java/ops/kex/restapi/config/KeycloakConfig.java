package ops.kex.restapi.config;

import lombok.extern.slf4j.Slf4j;
import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Slf4j
@Configuration
public class KeycloakConfig {

    private String authServerUrl = "https://kex-kc.kexserver.eu/";
    private String adminClientSecret = "66kM3Rz4J0W1OA0r1T3niLhicyP5KbBL";
    private String realm = "kex-application";
    private String clientId = "admin-cli";
    @Bean
    public Keycloak keycloak(){

        Keycloak keycloak = KeycloakBuilder.builder()
                .serverUrl(authServerUrl)
                .realm(realm)
                .grantType(OAuth2Constants.CLIENT_CREDENTIALS)
                .clientId(clientId)
                .clientSecret(adminClientSecret)
                .build();

        if (keycloak == null){
            log.error("Keycloak is null");
        }else log.info("Keycloak created");

        return keycloak;
    }
}