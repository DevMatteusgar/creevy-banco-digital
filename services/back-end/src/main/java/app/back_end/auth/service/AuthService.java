package app.back_end.auth.service;

import app.back_end.auth.dto.request.RegisterDtoRequest;
import app.back_end.auth.dto.response.RegisterDtoResponse;
import app.back_end.auth.jwt.JwtUtil;
import app.back_end.auth.model.UserModel;
import app.back_end.auth.repository.UserRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    //Registrar usuário
    public RegisterDtoResponse register(RegisterDtoRequest data){

        // Verifica se o cpf já existe no banco
        if(userRepository.findByCpf(data.cpf).isPresent()){
            throw new CpfAlreadyExistsException("Cpf já existe");
        }

        // Verifica se o email já existe no banco
        if(userRepository.findByEmail(data.email).isPresent()){
            throw new EmailAlreadyExistsException("Email já existe");
        }

        // Cria um novo usuário e criptografa a senha com BCrypt
        UserModel user = new UserModel();
        user.setName(data.name);
        user.setEmail(data.email);
        user.setCpf(data.cpf);
        user.setPassword(BCrypt.hashpw(data.password, BCrypt.gensalt())); // Criptografia da senha

        // Chama o UserService
        return userService.register(user);
    }
}
