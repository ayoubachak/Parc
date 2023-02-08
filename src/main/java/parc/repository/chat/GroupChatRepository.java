package parc.repository.chat;

import org.springframework.data.repository.CrudRepository;
import parc.model.chat.GroupChat;

public interface GroupChatRepository extends CrudRepository<GroupChat, Long> {
}
