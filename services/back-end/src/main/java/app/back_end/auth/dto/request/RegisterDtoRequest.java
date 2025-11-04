package app.back_end.auth.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.br.CPF;

public class RegisterDtoRequest {

    @NotBlank(message = "O nome é obrigatório")
    public String name;

    @NotBlank(message = "O e-mail é obrigatório")
    @Email(message = "E-mail inválido")
    public String email;

    @NotBlank(message = "O CPF é obrigatório")
    @CPF(message = "CPF inválido")
    public String cpf;

    @NotBlank(message = "A senha é obrigatória")
    @Size(min = 4, max = 4, message = "A senha deve ter pelo menos 4 caracteres")
    public String password;
}
