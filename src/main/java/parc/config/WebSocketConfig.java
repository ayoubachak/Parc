package parc.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import parc.repository.ChatMessageRepository;
import parc.service.chat.FileSystemMessageService;
import parc.service.chat.MessageService;
import parc.service.websockets.ChatWebSocketHandler;
import parc.service.websockets.MediaWebSocketHandler;

import java.nio.file.Paths;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
    private ChatMessageRepository chatMessageRepository;
    private MessageService messageService;
    public WebSocketConfig(ChatMessageRepository chatMessageRepository, MessageService messageService) {
        this.chatMessageRepository = chatMessageRepository;
        this.messageService = messageService;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(new ChatWebSocketHandler(chatMessageRepository, messageService), "/chat");
        registry.addHandler(new MediaWebSocketHandler(chatMessageRepository, messageService), "/upload");
    }
    @Bean
    public MessageService messageService(@Value("${media.root.directory}") String rootDirectory) {
        return new FileSystemMessageService(rootDirectory);
    }
}
