package app.back_end.auth.dto.request;

import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.br.CPF;

public class LoginDtoRequest {

    @NotBlank(message = "O CPF é obrigatório")
    @CPF
    public String cpf;

    @NotBlank(message = "A senha é obrigatória")
    public String password;
}
