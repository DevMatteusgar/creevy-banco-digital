package app.back_end.auth.service;

import app.back_end.auth.dto.response.RegisterDtoResponse;
import app.back_end.auth.model.UserModel;
import app.back_end.auth.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    //Registra usuário com transactional
    @Transactional
    public RegisterDtoResponse register(UserModel user){

        //Salva o usuario no banco de dados
        UserModel savedUser = repo.save(user);

        //Retorna o DTO para o AuthService
        return new RegisterDtoResponse(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getCpf(),
                savedUser.getEmail(),
                savedUser.getCreationDate()
        );
    }
}
