package parc.service.websockets;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.BinaryWebSocketHandler;
import parc.model.chat.ChatMessage;
import parc.repository.chat.ChatMessageRepository;
import parc.repository.chat.MediaMessageRepository;
import parc.service.chat.MessageService;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

public class MediaWebSocketHandler  extends BinaryWebSocketHandler {

    public final int HEADER_LENGTH = 8190;
    public final String MULTIPLE_FILES_HEADER = "multiple";

    private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
    private final MediaMessageRepository mediaMessageRepository;
    private final MessageService messageService;

    public MediaWebSocketHandler(MediaMessageRepository mediaMessageRepository, MessageService messageService) {
        this.mediaMessageRepository = mediaMessageRepository;
        this.messageService = messageService;
    }

    @Override
    public void handleBinaryMessage(WebSocketSession session, BinaryMessage message) {
        // Handle incoming binary message (media)
        byte[] mediaBytes = message.getPayload().array();
        String senderId = Objects.requireNonNull(session.getPrincipal()).getName(); // get the sender's id
        String mediaPath = generateUniqueMediaPath(senderId, mediaBytes);
        // Check if the binary message contains multiple media files
        List<ChatMessage> mediaMessages = new ArrayList<>();
        if (isMultipleMediaTypes(mediaBytes)) {
            // Extract multiple media files from the binary message
            Map<String, byte[]> mediaFiles = extractMultipleMediaFiles(mediaBytes);
            for (Map.Entry<String, byte[]> mediaFile : mediaFiles.entrySet()) {
                String mediaType = mediaFile.getKey();
                byte[] fileBytes = mediaFile.getValue();

                // Generate a unique path for each media file
                String filePath = generateUniqueMediaPath(senderId, fileBytes);

                // Store the media file in the server
                messageService.storeMedia(fileBytes, filePath);

                // Create a ChatMessage for each media file
                ChatMessage mediaMessage = new ChatMessage();
                mediaMessage.getMediaContent().setMediaUrl(filePath);
                mediaMessage.getMediaContent().setMediaType(mediaType);
                mediaMessages.add(mediaMessage);
            }
        } else {
            // Extract the media type from the binary message or specify explicitly
            String mediaType = extractMediaType(message);

            // Store the media in the server
            messageService.storeMedia(mediaBytes, mediaPath);

            // Create a ChatMessage for the media
            ChatMessage mediaMessage = new ChatMessage();
            mediaMessage.getMediaContent().setMediaUrl(mediaPath);
            mediaMessage.getMediaContent().setMediaType(mediaType);
            mediaMessages.add(mediaMessage);
        }

        // Save the ChatMessages to the database
        mediaMessageRepository.saveAll(mediaMessages);

        // Example of sending the media to all connected clients
        for (WebSocketSession client : sessions.values()) {
            try {
                client.sendMessage(message);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }



    private boolean isMultipleMediaTypes(byte[] mediaBytes) {
        // Check if the binary message starts with a specific header indicating multiple files
        byte[] header = Arrays.copyOfRange(mediaBytes, 0, HEADER_LENGTH);
        String headerString = new String(header, StandardCharsets.UTF_8);
        if (headerString.equals(MULTIPLE_FILES_HEADER)) {
            return true;
        }
        return false;
    }

    private Map<String, byte[]> extractMultipleMediaFiles(byte[] mediaBytes) {
        Map<String, byte[]> mediaFiles = new HashMap<>();

        // Check if the binary message starts with a specific header indicating multiple files
        byte[] header = Arrays.copyOfRange(mediaBytes, 0, HEADER_LENGTH);
        String headerString = new String(header, StandardCharsets.UTF_8);
        if (!headerString.equals(MULTIPLE_FILES_HEADER)) {
            return mediaFiles;
        }

        // Extract the number of files from the binary message
        byte[] numFilesBytes = Arrays.copyOfRange(mediaBytes, HEADER_LENGTH, HEADER_LENGTH + 4);
        int numFiles = ByteBuffer.wrap(numFilesBytes).getInt();

        // Extract the media type and file data for each file
        int currentIndex = HEADER_LENGTH + 4;
        for (int i = 0; i < numFiles; i++) {
            // Extract the media type
            byte[] mediaTypeLengthBytes = Arrays.copyOfRange(mediaBytes, currentIndex, currentIndex + 4);
            int mediaTypeLength = ByteBuffer.wrap(mediaTypeLengthBytes).getInt();
            currentIndex += 4;
            byte[] mediaTypeBytes = Arrays.copyOfRange(mediaBytes, currentIndex, currentIndex + mediaTypeLength);
            String mediaType = new String(mediaTypeBytes, StandardCharsets.UTF_8);
            currentIndex += mediaTypeLength;

            // Extract the file data
            byte[] fileLengthBytes = Arrays.copyOfRange(mediaBytes, currentIndex, currentIndex + 4);
            int fileLength = ByteBuffer.wrap(fileLengthBytes).getInt();
            currentIndex += 4;
            byte[] fileBytes = Arrays.copyOfRange(mediaBytes, currentIndex, currentIndex + fileLength);
            currentIndex += fileLength;

            mediaFiles.put(mediaType, fileBytes);
        }

        return mediaFiles;
    }


    private String extractMediaType(BinaryMessage message) {
//        Map<String, Object> headers = message.getHeaders();
//        String mediaType = (String) headers.get("Content-Type");
//        if (mediaType == null) {
//            // If the media type is not specified in the headers, specify it explicitly
//            mediaType = "application/octet-stream";
//        }
        String mediaType = "image/jpeg";
        return mediaType;
    }


    private String generateUniqueMediaPath(String senderId, byte[] mediaBytes) {
        String hash = DigestUtils.sha256Hex(mediaBytes).toLowerCase();
        return senderId + "/" + hash;
    }

}
