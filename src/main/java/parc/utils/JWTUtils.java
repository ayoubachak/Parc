package parc.utils;

import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class JWTUtils {
    private static final Logger logger = LoggerFactory.getLogger(JWTUtils.class);

    public static String extractSubFromToken(String token) throws JsonProcessingException {
        String[] split_string = token.split("\\.");
        String base64EncodedHeader = split_string[0];
        String base64EncodedBody = split_string[1];
        String base64EncodedSignature = split_string[2];
        Base64 base64Url = new Base64(true);

        String body = new String(base64Url.decode(base64EncodedBody));
        ObjectMapper mapper = new ObjectMapper();
        Map<String, String> map = mapper.readValue(body, new TypeReference<Map<String, String>>() {});
        return map.get("sub");
    }
}
