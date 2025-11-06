package app.back_end.balance.service;

import app.back_end.auth.exceptions.UserNotFoundException;
import app.back_end.auth.model.UserModel;
import app.back_end.auth.repository.UserRepository;
import app.back_end.balance.dto.response.TransferDtoResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BalanceService {

    @Autowired
    private UserRepository repo;

    @Transactional
    public TransferDtoResponse deposit(String email, Double depositValue){

        //Busca a conta pelo ID
        Optional<UserModel> findUserOpt = repo.findByEmail(email);

        //Faz a verificação da existência da conta
        if (findUserOpt.isEmpty()){
            throw new UserNotFoundException("Conta não encontrada");
        }

        //Faz a verificação do valor depositado
        if (depositValue == null || depositValue <= 0) {
            throw new IllegalArgumentException("Valor de depósito inválido");
        }

        //Tipo de operação
        String option = "Deposit";

        //Transforma em objeto
        UserModel user = findUserOpt.get();

        //Soma o valor de depósito na conta poupança
        Double finalBalance = user.getSavingsBalance() + depositValue;

        //Realiza o salvamento no bando de dados
        user.setSavingsBalance(finalBalance);
        repo.save(user);

        return new TransferDtoResponse(
                user.getId(),
                user.getName(),
                user.getCpf(),
                option,
                depositValue
        );
    }
}
