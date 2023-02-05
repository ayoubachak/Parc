package parc.service.chat;

import org.springframework.context.annotation.Bean;

import java.nio.file.Paths;

public interface  MessageService {
    void storeMedia(byte[] mediaBytes, String mediaPath);


}


