package parc.repository.chat;

import org.springframework.data.repository.CrudRepository;
import parc.model.chat.ChatMessage;


public interface ChatMessageRepository extends CrudRepository<ChatMessage, Long> {
    long count();

}
