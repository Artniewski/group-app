package group.app.backend.auth;

import com.gargoylesoftware.htmlunit.BrowserVersion;
import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.html.HtmlForm;
import com.gargoylesoftware.htmlunit.html.HtmlPage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class AuthService {

    public static final String JSOS_AUTH_URL = "https://jsos.pwr.edu.pl/index.php/site/loginAsStudent";

    public JsosAuthProperties getJsosAuthProperties() {
        try (final WebClient webClient = setUpWebClient()) {
            HtmlPage htmlPage = webClient.getPage(JSOS_AUTH_URL);
            HtmlForm form = htmlPage.getForms().stream().findFirst().orElseThrow(NoSuchFieldException::new);

            return buildAuthProperties(form);

        } catch (IOException | NoSuchFieldException e) {
            throw new RuntimeException("Cannot connect to " + JSOS_AUTH_URL);    //TODO: Custom exception
        }
    }

    private JsosAuthProperties buildAuthProperties(HtmlForm form) {
        String oauthToken = form.getInputByName("oauth_token").getValue();
        String oauthConsumerKey = form.getInputByName("oauth_consumer_key").getValue();
        return JsosAuthProperties.builder()
                .oauthToken(oauthToken)
                .oauthConsumerKey(oauthConsumerKey)
                .build();
    }

    private static WebClient setUpWebClient() {
        WebClient webClient = new WebClient(BrowserVersion.FIREFOX);
        webClient.getOptions().setThrowExceptionOnScriptError(false);
        webClient.getOptions().setThrowExceptionOnFailingStatusCode(false);
        webClient.getOptions().setCssEnabled(false);
        return webClient;
    }

}
