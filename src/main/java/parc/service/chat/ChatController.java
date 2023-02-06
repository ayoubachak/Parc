package parc.service.chat;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import parc.model.chat.ChatMessage;
import parc.repository.ChatMessageRepository;

@Controller
public class ChatController {

        private ChatMessageRepository chatMessageRepository;
        public ChatController(ChatMessageRepository chatMessageRepository) {
            this.chatMessageRepository = chatMessageRepository;
        }

        @MessageMapping("/chat")
        @SendTo("/topic/public")
        public ChatMessage receiveChatMessage(@Payload ChatMessage message) {
            chatMessageRepository.save(message);
            return message;
        }

        @MessageMapping("/upload")
        public void handleMediaUpload(@Payload ChatMessage upload) {
            // handle media upload
        }


}