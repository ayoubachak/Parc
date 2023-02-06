package parc.service.websockets;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.codec.binary.Base64;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Map;

public class TestTextSocketHandler extends TextWebSocketHandler {
    public TestTextSocketHandler(){
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String token = session.getHandshakeHeaders().get("Authorization").get(0);
        // Extract the username from the claims
        String username = extractUsernameFromToken(token);
        session.sendMessage(new TextMessage("Hello " + username + ", you sent: " + message.getPayload()));
    }

    private String extractUsernameFromToken(String token) {
        try {
            // Split the token into header and payload parts
            String[] parts = token.split("\\.");
            String header = parts[0];
            String payload = parts[1];

            // Base64 decode the header and payload
            Base64 base64Url = new Base64(true);
            byte[] headerBytes = base64Url.decode(header);
            byte[] payloadBytes = base64Url.decode(payload);

            // Convert the header and payload to strings
            String headerJson = new String(headerBytes, "UTF-8");
            String payloadJson = new String(payloadBytes, "UTF-8");

            // Convert the JSON strings to maps
            Map<String, Object> headerMap = new ObjectMapper().readValue(headerJson, Map.class);
            Map<String, Object> payloadMap = new ObjectMapper().readValue(payloadJson, Map.class);

            // Extract the "sub" from the payload
            String username = (String) payloadMap.get("sub");

            return username;
        } catch (Exception e) {
            // Return null if there was an error
            return null;
        }
    }
}
