package app.back_end.auth.exceptions;

//Exception customizada para email ja cadastrado
public class EmailAlreadyExistsException extends RuntimeException {
    public EmailAlreadyExistsException(String message) {
        super(message);
    }
}
