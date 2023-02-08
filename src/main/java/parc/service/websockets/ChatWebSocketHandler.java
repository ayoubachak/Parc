package parc.service.websockets;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import parc.model.User;
import parc.model.chat.ChatMessage;
import parc.model.chat.Conversation;
import parc.repository.UserRepository;
import parc.repository.chat.ChatMessageRepository;
import parc.repository.chat.ConversationRepository;
import parc.repository.chat.GroupChatRepository;
import parc.service.chat.RecipientType;
import parc.service.chat.Status;
import parc.utils.JWTUtils;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;


public class ChatWebSocketHandler extends TextWebSocketHandler {

    // session handlers
    // TODO:chache the sessions or store them in the database
    private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
    private final Map<String, List<WebSocketSession>> groups = new ConcurrentHashMap<>();


    // repositories needed
    private final UserRepository userRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final ConversationRepository conversationRepository;
    private final GroupChatRepository groupChatRepository;

    private final Logger logger = LoggerFactory.getLogger(ChatWebSocketHandler.class);

    public ChatWebSocketHandler(UserRepository userRepository, ChatMessageRepository chatMessageRepository, ConversationRepository conversationRepository, GroupChatRepository groupChatRepository) {
        this.userRepository = userRepository;
        this.chatMessageRepository = chatMessageRepository;
        this.conversationRepository = conversationRepository;
        this.groupChatRepository = groupChatRepository;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws JsonProcessingException {
        String username = extractSenderFromSessionToken(session);
        sessions.put(username, session);
        logger.info("WebSocket connection established for {}", username);
    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        if (message instanceof TextMessage) {
            handleTextMessage(session, (TextMessage) message);
        } else if (message instanceof BinaryMessage) {
            handleBinaryMessage(session, (BinaryMessage) message);
        }
    }

    protected void handleTextMessage(WebSocketSession session, TextMessage message) {
        try {
            ChatMessage chatMessage = createChatMessage(session, message);
            if (chatMessage.getRecipientType() == RecipientType.GROUP) {
                sendGroupMessage(chatMessage);
            } else {
                sendPrivateMessage(chatMessage);
            }
        } catch (Exception e) {
            logger.error("Error handling text message", e);
        }
    }

    private ChatMessage createChatMessage(WebSocketSession session, TextMessage message) throws JsonProcessingException {
        ChatMessage chatMessage = new ChatMessage();
        User sender = userRepository.findByUsername(extractSenderFromSessionToken(session)).orElse(null); // this could be null obviously
        String payload = message.getPayload();
        String recipientId = extractRecipient(payload);
        String messageText = extractMessageText(payload);
        String conversationId = extractConversation(payload);

        if(recipientId.startsWith("group:")){ // the recipientId might be either a group id or a user id
            recipientId = recipientId.substring("group:".length());
        }

        // this will set the basic information for the chatmessage.
        chatMessage.setSender(sender);
        chatMessage.setRecipient(recipientId);
        chatMessage.setMessage(messageText);
        chatMessage.setStatus(Status.SENT);
        chatMessageRepository.save(chatMessage);

        // if the message does not belong to any conversation, we should create a new conversation
        if (conversationId == null){
            Conversation conv = new Conversation();
            conv.setCreatedBy(sender);
            Set<ChatMessage> messages = new HashSet<>();
            messages.add(chatMessage);
            conv.setMessages(messages);
            conversationRepository.save(conv);
        }

        return chatMessage;
    }

    private void sendPrivateMessage(ChatMessage chatMessage) throws IOException {
        WebSocketSession recipientSession = sessions.get(chatMessage.getRecipient());
        if (recipientSession != null) {
            recipientSession.sendMessage(new TextMessage(chatMessage.getMessage()));
        }
    }

    private void sendGroupMessage(ChatMessage chatMessage) throws IOException {
        String groupName = chatMessage.getRecipient();
        List<WebSocketSession> groupSessions = groups.get(groupName);
        if (groupSessions != null) {
            for (WebSocketSession client : groupSessions) {
                client.sendMessage(new TextMessage(chatMessage.getMessage()));
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws JsonProcessingException {
        String username = extractSenderFromSessionToken(session);
        sessions.remove(username);
        logger.info("WebSocket connection closed for {}", username);
    }


    private String extractSenderFromSessionToken(WebSocketSession session) throws JsonProcessingException {
        String token = Objects.requireNonNull(session.getHandshakeHeaders().get("Authorization")).get(0);
        String username = JWTUtils.extractSubFromToken(token);
        return username;
    }
    private String extractRecipient(String payload) {
        JsonNode jsonNode = parseJson(payload);
        assert jsonNode != null;
        return jsonNode.get("recipient").asText();
    }
    private String extractConversation(String payload) {
        JsonNode jsonNode = parseJson(payload);
        assert jsonNode != null;
        return jsonNode.get("conversation").asText();
    }

    private String extractMessageText(String payload) {
        JsonNode jsonNode = parseJson(payload);
        assert jsonNode != null;
        return jsonNode.get("message").asText();
    }

    private JsonNode parseJson(String payload) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readTree(payload);
        } catch (IOException e) {
            logger.error("Error parsing json", e);
            return null;
        }
    }

}

