package app.back_end.investments.service;

import app.back_end.investments.dto.response.StocksTransferDtoResponse;
import app.back_end.investments.model.StocksModel;
import app.back_end.investments.model.StocksTransferModel;
import app.back_end.investments.repository.StocksTransfersRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StocksTransferService {

    @Autowired
    private StocksTransfersRepository stocksTransfersRepository;

    @Transactional
    public StocksTransferDtoResponse createInvestmentTransaction(
            StocksModel stock,
            Integer stockQuantity,
            Double stockPrice,
            Double transactionTotalPrice,
            Double balanceAfterOperation,
            String operationType
    ){

        if (stock == null) {
            throw new IllegalArgumentException("Stock não pode ser nulo.");
        }
        if (stockQuantity == null || stockQuantity <= 0) {
            throw new IllegalArgumentException("Quantidade inválida.");
        }
        if (stockPrice == null || stockPrice < 0) {
            throw new IllegalArgumentException("Preço inválido.");
        }
        if (transactionTotalPrice == null || transactionTotalPrice < 0) {
            throw new IllegalArgumentException("Valor de transação inválido.");
        }
        if (operationType == null || operationType.isBlank()) {
            throw new IllegalArgumentException("Operação inválida.");
        }

        StocksTransferModel transfer = new StocksTransferModel(
                stock,
                stockQuantity,
                stockPrice,
                balanceAfterOperation,
                operationType,
                transactionTotalPrice
        );

        stocksTransfersRepository.save(transfer);

        return new StocksTransferDtoResponse(
                transfer.getTransferId(),
                stock.getStockName(),
                stock.getStockIdentifier(),
                stockQuantity,
                stockPrice,
                transactionTotalPrice,
                balanceAfterOperation,
                operationType,
                transfer.getCreationDate()
        );
    }

    @Transactional
    public List<StocksTransferDtoResponse> getAllTransactions(String email) {

        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException("Email inválido.");
        }

        var transfers = stocksTransfersRepository
                .findAllByStock_User_EmailOrderByCreationDateDesc(email);

        return transfers.stream()
                .map(t -> new StocksTransferDtoResponse(
                        t.getTransferId(),
                        t.getStock().getStockName(),
                        t.getStock().getStockIdentifier(),
                        t.getStockQuantity(),
                        t.getStockPrice(),
                        t.getTransactionTotalPrice(),
                        t.getBalanceAfterOperation(),
                        t.getOperationType(),
                        t.getCreationDate()
                ))
                .toList();
    }
}
