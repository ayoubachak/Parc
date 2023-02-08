package parc.repository.chat;

import org.springframework.data.repository.CrudRepository;
import parc.model.User;
import parc.model.chat.Conversation;
import parc.service.chat.RecipientType;

import java.util.Optional;

public interface ConversationRepository extends CrudRepository<Conversation, Long> {
    Optional<Conversation> findByMessagesSenderAndMessagesRecipientAndMessagesRecipientType(
            User sender, String recipient, RecipientType recipientType);

}
