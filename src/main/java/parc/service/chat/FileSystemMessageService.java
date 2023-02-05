package parc.service.chat;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileSystemMessageService implements MessageService {

    private final Path rootDirectory;

    public FileSystemMessageService(@Value("${media.root.directory}") String rootDirectory) {
        this.rootDirectory = Paths.get(rootDirectory);
    }

    @Override
    public void storeMedia(byte[] mediaBytes, String mediaPath) {
        Path path = rootDirectory.resolve(mediaPath);
        try {
            Files.write(path, mediaBytes);
        } catch (IOException e) {
            // Handle the exception, such as logging the error
        }
    }
}
