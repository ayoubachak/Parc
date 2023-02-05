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
    // Store all connected WebSocket sessions
    private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
    private ChatMessageRepository chatMessageRepository;
    private MessageService messageService;

    public ChatWebSocketHandler(ChatMessageRepository chatMessageRepository, MessageService messageService) {
        this.chatMessageRepository = chatMessageRepository;
        this.messageService = messageService;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // Add the new session to the sessions map
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
        // Handle incoming text message and perform necessary actions for your chat app
        // ...
        // You can access the message content using `message.getPayload()`

        // Example of sending a message to all connected clients
        for (WebSocketSession client : sessions.values()) {
            client.sendMessage(new TextMessage("Server: " + message.getPayload()));
        }
    }



    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
    // Remove the closed session from the sessions map
        sessions.remove(session.getId());
    }
}

