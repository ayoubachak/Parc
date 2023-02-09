package parc.service.uploads;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileServiceImp implements FileService{

    Logger logger = LoggerFactory.getLogger("File Logger");

    @Override
    public String uploadFile(String path, MultipartFile file) throws IOException {
        String name = file.getOriginalFilename();
        String randomID = UUID.randomUUID().toString();
        assert name != null;
        String filename = randomID.concat(name.substring(name.lastIndexOf(".")));
        String filepath = path + File.separator + filename;

        File f = new File(path);
        if(!f.exists()){ f.mkdir();}
        Files.copy(file.getInputStream(), Paths.get(filepath));

        return name;
    }

    @Override
    public InputStream getResource(String path, String filename) throws FileNotFoundException {
        String fullpath = path+ File.separator+filename;
        logger.info("File Path Retrieving : " + fullpath);
        return new FileInputStream(fullpath);
    }
}
