package parc.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import parc.repository.UserRepository;
import parc.repository.chat.ChatMessageRepository;
import parc.repository.chat.ConversationRepository;
import parc.repository.chat.GroupChatRepository;
import parc.repository.chat.MediaMessageRepository;
import parc.service.chat.FileSystemMessageService;
import parc.service.chat.MessageService;
import parc.service.websockets.ChatWebSocketHandler;
import parc.service.websockets.MediaWebSocketHandler;
import parc.service.websockets.TestTextSocketHandler;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
    Logger LOGGER = LoggerFactory.getLogger("Logger");
    private final MediaMessageRepository mediaMessageRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final ConversationRepository conversationRepository;
    private final GroupChatRepository groupChatRepository;
    private final UserRepository userRepository;
    private final MessageService messageService;
    public WebSocketConfig(MediaMessageRepository mediaMessageRepository, ChatMessageRepository chatMessageRepository, ConversationRepository conversationRepository, GroupChatRepository groupChatRepository, UserRepository userRepository, MessageService messageService) {
        this.mediaMessageRepository = mediaMessageRepository;
        this.chatMessageRepository = chatMessageRepository;
        this.conversationRepository = conversationRepository;
        this.groupChatRepository = groupChatRepository;
        this.userRepository = userRepository;

        this.messageService = messageService;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        LOGGER.info("Registering the /chat or /upload");
        registry.addHandler(new ChatWebSocketHandler(userRepository, chatMessageRepository, conversationRepository, groupChatRepository), "/chat");
        registry.addHandler(new MediaWebSocketHandler(mediaMessageRepository, messageService), "/upload");
        registry.addHandler(new TestTextSocketHandler(), "/test");
    }
    @Bean
    public MessageService messageService(@Value("${media.root.directory}") String rootDirectory) {
        return new FileSystemMessageService(rootDirectory);
    }

    
}
