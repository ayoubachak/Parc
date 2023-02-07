package parc.service.websockets;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.apache.commons.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Map;

public class TestTextSocketHandler extends TextWebSocketHandler {
    Logger LOGGER = LoggerFactory.getLogger("Token");
    public TestTextSocketHandler(){
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String token = session.getHandshakeHeaders().get("Authorization").get(0);
        // Extract the username from the claims
        String username = extractUsernameFromToken(token);
        session.sendMessage(new TextMessage("Hello " + username + ", you sent: " + message.getPayload()));
    }


    private String extractUsernameFromToken(String token) throws JsonProcessingException {
        String[] split_string = token.split("\\.");
        String base64EncodedHeader = split_string[0];
        String base64EncodedBody = split_string[1];
        String base64EncodedSignature = split_string[2];
        Base64 base64Url = new Base64(true);

        String body = new String(base64Url.decode(base64EncodedBody));
        LOGGER.info("JWT Body : "+body);
        ObjectMapper mapper = new ObjectMapper();
        Map<String, String> map = mapper.readValue(body, new TypeReference<Map<String, String>>() {});
        return map.get("sub");
    }
}
