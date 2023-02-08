package parc.model.chat;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import parc.model.User;
import parc.service.chat.RecipientType;
import parc.service.chat.Status;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "chat_messages")
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    @ManyToOne(cascade = { CascadeType.ALL })
    @JoinColumn(name = "sender_id")
    protected User sender;
    @Column(name = "recipient_id")
    protected String recipient;
    protected RecipientType recipientType;
    protected LocalDateTime deliveredAt;
    @ElementCollection
    protected List<String> viewedBy;
    @ElementCollection
    protected List<String> deliveredTo;

    @CreationTimestamp
    protected LocalDateTime createdAt;
    protected Status status;
    private String message;
    @ManyToOne(cascade = { CascadeType.ALL })
    private MediaContent mediaContent;

    public ChatMessage() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public String getRecipient() {
        return recipient;
    }

    public void setRecipient(String recipient) {
        this.recipient = recipient;
    }

    public RecipientType getRecipientType() {
        return recipientType;
    }

    public void setRecipientType(RecipientType recipientType) {
        this.recipientType = recipientType;
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

    public List<String> getDeliveredTo() {
        return deliveredTo;
    }

    public void setDeliveredTo(List<String> deliveredTo) {
        this.deliveredTo = deliveredTo;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public MediaContent getMediaContent() {
        return mediaContent;
    }

    public void setMediaContent(MediaContent mediaContent) {
        this.mediaContent = mediaContent;
    }
}
