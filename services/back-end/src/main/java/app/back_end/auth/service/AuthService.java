package app.back_end.auth.service;

import app.back_end.auth.dto.request.LoginDtoRequest;
import app.back_end.auth.dto.request.RegisterDtoRequest;
import app.back_end.auth.dto.response.AuthDtoResponse;
import app.back_end.auth.dto.response.RegisterDtoResponse;
import app.back_end.auth.exceptions.CpfAlreadyExistsException;
import app.back_end.auth.exceptions.EmailAlreadyExistsException;
import app.back_end.auth.exceptions.PasswordNotMatchException;
import app.back_end.auth.exceptions.UserNotFoundException;
import app.back_end.auth.security.JwtUtil;
import app.back_end.auth.model.UserModel;
import app.back_end.auth.repository.UserRepository;
import app.back_end.user.service.UserService;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

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

    // Login do usuário
    public AuthDtoResponse login(LoginDtoRequest data){

        // Busca usuário pelo cpf
        Optional<UserModel> userOpt = userRepository.findByCpf(data.cpf);

        // Se não encontrar, lança exceção
        if (userOpt.isEmpty()){
            throw new UserNotFoundException("Usuário não encontrado");
        }

        // Usuário encontrado
        UserModel user = userOpt.get();

        // Valida a senha usando BCrypt
        if (!BCrypt.checkpw(data.password, user.getPassword())){
            throw new PasswordNotMatchException("Senha não confere");
        }

        // Gera token JWT contendo apenas o email (cpf é um dado sensível)
        String token = jwtUtil.generateToken(user.getEmail());

        // Retorna DTO com o token
        return new AuthDtoResponse(token);
    }
}
