package app.back_end.auth.exceptions;

//Exception para usuario não encontrado
public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String message) {
        super(message);
    }
}
