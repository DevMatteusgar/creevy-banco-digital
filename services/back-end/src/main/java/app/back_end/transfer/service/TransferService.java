package app.back_end.transfer.service;

import app.back_end.auth.exceptions.UserNotFoundException;
import app.back_end.auth.model.UserModel;
import app.back_end.auth.repository.UserRepository;
import app.back_end.transfer.dto.response.DepositDtoResponse;
import app.back_end.transfer.dto.response.TransferDtoResponse;
import app.back_end.transfer.model.TransferModel;
import app.back_end.transfer.repository.TransferRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransferService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransferRepository transferRepository;

    @Transactional
    public DepositDtoResponse deposit(String email, Double depositValue){

        //Busca a conta pelo email
        Optional<UserModel> findUserOpt = userRepository.findByEmail(email);

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
        userRepository.save(user);

        //Cria uma nova transferência de depósito
        TransferModel depositTransaction = TransferModel.createDepositTransaction(
                user,
                depositValue,
                user.getSavingsBalance()
        );

        //Salva o depósito no banco
        transferRepository.save(depositTransaction);

        //Retorna o dto de depósito
        return new DepositDtoResponse(
                user.getId(),
                user.getName(),
                user.getCpf(),
                option,
                depositValue
        );
    }

    @Transactional
    public TransferDtoResponse transfer(Long accountID, Double transferValue, String email){

        //Busca a conta do usuário ativo pelo email
        Optional<UserModel> findUserOpt = userRepository.findByEmail(email);

        //Busca a conta do usuário recebedor pelo id
        Optional<UserModel> findUserReceiverOpt = userRepository.findById(accountID);

        //Faz a verificação da existência da conta do usuário ativo
        if (findUserOpt.isEmpty()){
            throw new UserNotFoundException("Conta do usuário ativo não encontrada");
        }
        //Faz a verificação da existência da conta do usuário recebedor
        if (findUserReceiverOpt.isEmpty()){
            throw new UserNotFoundException("Conta do usuário recebedor não encontrada");
        }
        //Faz a verificação do valor a ser transferido
        if (transferValue == null || transferValue <= 0) {
            throw new IllegalArgumentException("Valor de depósito inválido");
        }

        //Transforma em objeto
        UserModel userSender = findUserOpt.get();
        UserModel userReceiver = findUserReceiverOpt.get();

        //Verifica se o saldo do usuário ativo é suficiente para realizar a transação
        if(transferValue > userSender.getSavingsBalance()){
            throw new IllegalArgumentException("Saldo insuficiente");
        }

        // Atualiza saldos
        userSender.setSavingsBalance(userSender.getSavingsBalance() - transferValue);
        userReceiver.setSavingsBalance(userReceiver.getSavingsBalance() + transferValue);

        // Salva usuários atualizados
        userRepository.save(userSender);
        userRepository.save(userReceiver);

        // Cria transações

        // Transação de envio
        TransferModel senderTransaction = new TransferModel(
                userSender,
                userReceiver,
                transferValue,
                userSender.getSavingsBalance()
        );

        // Transação de recebimento
        TransferModel receiverTransaction = TransferModel.createReceiverTransaction(
                userReceiver,
                userSender,
                transferValue,
                userReceiver.getSavingsBalance()
        );

        //Salva as transações no banco
        transferRepository.save(senderTransaction);
        transferRepository.save(receiverTransaction);

        // Cria DTOs de resposta
        TransferDtoResponse transferDtoResponse = new TransferDtoResponse(
                userSender.getId(),
                "TransferSend",
                transferValue,
                userSender.getSavingsBalance(),
                "Transferência enviada para " + userReceiver.getName()
        );

        return transferDtoResponse;
    }

    public List<TransferModel> listAllTransactions() {

        return transferRepository.findAll();
    }

    public List<TransferModel> findTransfersByUserId(Long userId) {

        //Busca as trasnferências com o mesmo SenderId e receiverID
        return transferRepository.findBySenderIdOrReceiverId(userId, userId);
    }

    public List<TransferModel> findTransfersByUserEmail(String email) {

        // Busca o usuário pelo e-mail (presente no token JWT)
        UserModel user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado para o e-mail: " + email));

        Long userId = user.getId();

        // Retorna todas as transferências onde ele foi remetente ou destinatário
        return transferRepository.findBySenderIdOrReceiverId(userId, userId);
    }
}
