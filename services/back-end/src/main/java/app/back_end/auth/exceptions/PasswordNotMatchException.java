package app.back_end.auth.exceptions;

//Exception para senha não confere
public class PasswordNotMatchException extends RuntimeException {
    public PasswordNotMatchException(String message) {
        super(message);
    }
}