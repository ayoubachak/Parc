package parc.model.chat;
import jakarta.persistence.*;
import parc.service.chat.Status;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "chat_messages")
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sender;
    private String recipient;
    private String message;
    private String mediaUrl;
    private String mediaType;
    private LocalDateTime deliveredAt;
    @ElementCollection
    private List<String> viewedBy;
    private boolean isGroupMessage;
    private Date createdAt;

    private Status status;

    public ChatMessage() {
    }

    public ChatMessage(String sender, String recipient, String message, String mediaUrl, boolean isGroupMessage, Date createdAt) {
        this.sender = sender;
        this.recipient = recipient;
        this.message = message;
        this.mediaUrl = mediaUrl;
        this.isGroupMessage = isGroupMessage;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getRecipient() {
        return recipient;
    }

    public void setRecipient(String recipient) {
        this.recipient = recipient;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getMediaUrl() {
        return mediaUrl;
    }

    public void setMediaUrl(String mediaUrl) {
        this.mediaUrl = mediaUrl;
    }

    public String getMediaType() {
        return mediaType;
    }

    public void setMediaType(String mediaType) {
        this.mediaType = mediaType;
    }

    public LocalDateTime getDeliveredAt() {
        return deliveredAt;
    }

    public void setDeliveredAt(LocalDateTime deliveredAt) {
        this.deliveredAt = deliveredAt;
    }

    public List<String> getViewedBy() {
        return viewedBy;
    }

    public void setViewedBy(List<String> viewedBy) {
        this.viewedBy = viewedBy;
    }

    public boolean isGroupMessage() {
        return isGroupMessage;
    }

    public void setGroupMessage(boolean groupMessage) {
        isGroupMessage = groupMessage;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
