package parc.service.websockets;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import parc.model.chat.ChatMessage;
import parc.repository.ChatMessageRepository;
import parc.service.chat.MessageService;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;


public class ChatWebSocketHandler extends TextWebSocketHandler {
    private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
    private Map<String, List<WebSocketSession>> groups = new ConcurrentHashMap<>();

    private ChatMessageRepository chatMessageRepository;

    public ChatWebSocketHandler(ChatMessageRepository chatMessageRepository) {
        this.chatMessageRepository = chatMessageRepository;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.put(session.getId(), session);
    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        if (message instanceof TextMessage) {
            handleTextMessage(session, (TextMessage) message);
        } else if (message instanceof BinaryMessage) {
            handleBinaryMessage(session, (BinaryMessage) message);
        }
    }

    public void handleTextMessage(WebSocketSession session, TextMessage message) throws InterruptedException, IOException {
        String payload = message.getPayload();
        String recipient = extractRecipient(payload);
        String messageText = extractMessageText(payload);

        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setSender(session.getId());
        chatMessage.setRecipient(recipient);
        chatMessage.setMessage(messageText);

        if (recipient.startsWith("group:")) {
            chatMessage.setGroupMessage(true);
            String groupName = recipient.substring("group:".length());
            List<WebSocketSession> groupSessions = groups.get(groupName);
            if (groupSessions != null) {
                for (WebSocketSession client : groupSessions) {
                    client.sendMessage(new TextMessage(messageText));
                }
            }
        } else {
            chatMessage.setGroupMessage(false);
            WebSocketSession recipientSession = sessions.get(recipient);
            if (recipientSession != null) {
                recipientSession.sendMessage(new TextMessage(messageText));
            }
        }
        chatMessageRepository.save(chatMessage);

    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session.getId());
        for (List<WebSocketSession> groupSessions : groups.values()) {
            groupSessions.remove(session);
        }
    }

    private String extractRecipient(String payload) {
        // Parse the payload to extract the recipient information
        String[] parts = payload.split(":");
        if (parts.length < 2) {
            return "";
        }
        return parts[0];
    }

    private String extractMessageText(String payload) {
        // Parse the payload to extract the message text
        String[] parts = payload.split(":");
        if (parts.length < 2) {
            return "";
        }
        return parts[1];
    }

    public void addToGroup(String groupName, WebSocketSession session) {
        List<WebSocketSession> groupSessions = groups.get(groupName);
        if (groupSessions == null) {
            groupSessions = new ArrayList<>();
            groups.put(groupName, groupSessions);
        }
        groupSessions.add(session);
    }

    public void removeFromGroup(String groupName, WebSocketSession session) {
        List<WebSocketSession> groupSessions = groups.get(groupName);
        if (groupSessions != null) {
            groupSessions.remove(session);
        }
    }

    public void handleBinaryMessage(WebSocketSession session, BinaryMessage message) {
        // Handle binary message if required
        // This can include converting binary data to a different format, or storing it in a database
    }
}
