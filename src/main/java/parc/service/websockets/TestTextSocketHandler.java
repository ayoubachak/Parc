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
import parc.utils.JWTUtils;

import java.util.Map;
import java.util.Objects;

public class TestTextSocketHandler extends TextWebSocketHandler {
    Logger LOGGER = LoggerFactory.getLogger("Token");
    public TestTextSocketHandler(){
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String token = Objects.requireNonNull(session.getHandshakeHeaders().get("Authorization")).get(0);
        // Extract the username from the claims
        String username = JWTUtils.extractSubFromToken(token);
        session.sendMessage(new TextMessage("Hello " + username + ", you sent: " + message.getPayload()));
    }


}
