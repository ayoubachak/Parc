package parc.repository;

import org.springframework.data.repository.CrudRepository;
import parc.model.chat.ChatMessage;


public interface ChatMessageRepository extends CrudRepository<ChatMessage, Long> {
    long count();

}
