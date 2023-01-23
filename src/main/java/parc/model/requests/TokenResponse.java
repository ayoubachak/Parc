package parc.model.requests;

public class TokenResponse{
    private String user;
    private String token;

    public TokenResponse(String user, String token){
        this.user = user;
        this.token = token;
    }

    public String getUser() {
        return user;
    }

    public String getToken() {
        return token;
    }

}
