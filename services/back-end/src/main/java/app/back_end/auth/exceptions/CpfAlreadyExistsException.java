package app.back_end.auth.exceptions;

//Exception customizada para cpf ja cadastrado
public class CpfAlreadyExistsException extends RuntimeException {
    public CpfAlreadyExistsException(String message) {
        super(message);
    }
}
