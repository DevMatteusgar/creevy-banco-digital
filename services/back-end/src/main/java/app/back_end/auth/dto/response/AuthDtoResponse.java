package app.back_end.auth.dto.response;

public class AuthDtoResponse {

    //Token para o usuário autenticar
    public String token;

    public AuthDtoResponse(String token){
        this.token = token;
    }
}
