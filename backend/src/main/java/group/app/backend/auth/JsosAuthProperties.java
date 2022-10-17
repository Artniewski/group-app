package group.app.backend.auth;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JsosAuthProperties {

    private String oauthToken;
    private String oauthConsumerKey;

}
