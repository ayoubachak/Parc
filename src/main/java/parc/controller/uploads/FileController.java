package parc.controller.uploads;


import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import parc.model.chat.MediaContent;
import parc.service.uploads.FileService;
import parc.service.uploads.FileServiceImp;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

@RequestMapping("/uploads")
public class FileController {
    Logger logger = LoggerFactory.getLogger("File Controller");

    private FileServiceImp fileService;

    @Value("${media.root.directory}")
    private String path;

    @GetMapping(value = "/images/employees/{imagename}", produces = MediaType.IMAGE_JPEG_VALUE)
    public void downloadImage(
            @PathVariable("imagename") String imagename,
            HttpServletResponse response
    ) throws IOException {

        String urlpath = "/images/employees/";
        InputStream resourse = this.fileService.getResource(path+urlpath, imagename);
        logger.info("getting : "+path+urlpath+" the file is "+imagename);
        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
        StreamUtils.copy(resourse, response.getOutputStream());
    }
}
