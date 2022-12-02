package parc.utils;

public class JWTUtils {
    public static final String SECRET = "This is a very detailed secret";
    public static final String HEADER = "Authorization";
    public static final String PREFIX = "Bearer ";

    public static final Long ACCESS_TOKEN_EXPIRATION= (long) (5 * 60 * 1000);
    public static final Long REFRESH_TOKEN_EXPIRATION= (long) (10 * 24 * 60 * 60 * 1000);

}