package app.back_end.user.service;

import app.back_end.auth.dto.response.RegisterDtoResponse;
import app.back_end.auth.exceptions.UserNotFoundException;
import app.back_end.auth.model.UserModel;
import app.back_end.auth.repository.UserRepository;
import app.back_end.user.dto.response.AccountInfoDtoResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

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

    public AccountInfoDtoResponse accountInfo(Long AccountId){

        //Busca a conta pelo ID
        Optional<UserModel> findUserOpt = repo.findById(AccountId);

        //Faz a verificação da existência da conta
        if (findUserOpt.isEmpty()){
            throw new UserNotFoundException("Conta não encontrada");
        }

        //Transforma em objeto
        UserModel user = findUserOpt.get();

        //Retorna um Dto apenas com os dados de perfil da conta
        return new AccountInfoDtoResponse(
                user.getId(),
                user.getName(),
                user.getCpf()
        );
    }

    public AccountInfoDtoResponse MyInfo(String email){

        //Busca a conta pelo email
        Optional<UserModel> findUserOpt = repo.findByEmail(email);

        //Faz a verificação da existência da conta
        if (findUserOpt.isEmpty()){
            throw new UserNotFoundException("Conta não encontrada");
        }

        //Transforma em objeto
        UserModel user = findUserOpt.get();

        //Retorna um Dto apenas com os dados de perfil da conta
        return new AccountInfoDtoResponse(
                user.getId(),
                user.getName(),
                user.getCpf()
        );
    }
}
