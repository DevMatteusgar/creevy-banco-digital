package app.back_end.user.service;

import app.back_end.auth.model.UserModel;
import app.back_end.auth.repository.UserRepository;
import app.back_end.transfer.dto.response.UserBalanceDtoResponse;
import app.back_end.transfer.model.TransferModel;
import app.back_end.transfer.repository.TransferRepository;
import app.back_end.user.dto.response.UserBalanceHistoryDtoResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserBalanceService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransferRepository transferRepository;

    public UserBalanceDtoResponse getMyBalance(String email) {
        UserModel user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        return new UserBalanceDtoResponse(
                user.getId(),
                user.getTotalBalance(),
                user.getSavingsBalance(),
                user.getInvestmentsBalance()
        );
    }

    public List<UserBalanceHistoryDtoResponse> getMyBalanceHistory(String email) {
        UserModel user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Long userId = user.getId();

        List<TransferModel> transfers = transferRepository.findBySenderIdOrReceiverId(userId, userId);

        // Filtra apenas transações que representam o saldo do usuário
        List<TransferModel> filtered = transfers.stream()
                .filter(t -> {
                    if ("Deposit".equalsIgnoreCase(t.getOperationType())) {
                        return t.getReceiverId() != null && t.getReceiverId().equals(userId);
                    } else if ("TransferSend".equalsIgnoreCase(t.getOperationType())) {
                        return t.getSenderId() != null && t.getSenderId().equals(userId);
                    } else if ("TransferReceive".equalsIgnoreCase(t.getOperationType())) {
                        return t.getReceiverId() != null && t.getReceiverId().equals(userId);
                    }
                    return false;
                })
                .sorted(Comparator.comparing(TransferModel::getDate))
                .toList();

        // Agrupa por dia e pega o último saldo do dia
        Map<LocalDate, Optional<TransferModel>> lastOfDay = filtered.stream()
                .collect(Collectors.groupingBy(
                        t -> t.getDate().toLocalDate(),
                        Collectors.maxBy(Comparator.comparing(TransferModel::getDate))
                ));

        return lastOfDay.values().stream()
                .filter(Optional::isPresent)
                .map(Optional::get)
                .sorted(Comparator.comparing(TransferModel::getDate))
                .map(t -> new UserBalanceHistoryDtoResponse(t.getDate(), t.getBalanceAfterOperation()))
                .toList();
    }

    public List<UserBalanceHistoryDtoResponse> getMyBalanceHistoryByTransfer(String email) {
        UserModel user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Long userId = user.getId();

        // Busca todas as transferências do usuário
        List<TransferModel> transfers = transferRepository.findBySenderIdOrReceiverId(userId, userId);

        // Filtra apenas as relevantes (Deposit, TransferSend, TransferReceive)
        List<TransferModel> filtered = transfers.stream()
                .filter(t -> {
                    String type = t.getOperationType();
                    if (type == null) return false;
                    return switch (type.toLowerCase()) {
                        case "deposit" -> t.getReceiverId() != null && t.getReceiverId().equals(userId);
                        case "transfersend" -> t.getSenderId() != null && t.getSenderId().equals(userId);
                        case "transferreceive" -> t.getReceiverId() != null && t.getReceiverId().equals(userId);
                        default -> false;
                    };
                })
                .sorted(Comparator.comparing(TransferModel::getDate))
                .toList();

        //Gera uma lista contínua de saldo após cada transação
        return filtered.stream()
                .map(t -> new UserBalanceHistoryDtoResponse(
                        t.getDate(),
                        t.getBalanceAfterOperation()
                ))
                .toList();
    }
}
