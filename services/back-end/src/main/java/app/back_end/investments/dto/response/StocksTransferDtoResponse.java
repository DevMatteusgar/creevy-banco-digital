package app.back_end.investments.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public class StocksTransferDtoResponse {

    private Long transferId;

    private String stockName;
    private String stockIdentifier;

    private Integer stockQuantity;
    private Double stockPrice;

    private Double transactionTotalPrice;
    private Double balanceAfterOperation;

    private String operationType;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "America/Sao_Paulo")
    private LocalDateTime creationDate;

    // Construtor completo
    public StocksTransferDtoResponse(
            Long transferId,
            String stockName,
            String stockIdentifier,
            Integer stockQuantity,
            Double stockPrice,
            Double transactionTotalPrice,
            Double balanceAfterOperation,
            String operationType,
            LocalDateTime creationDate
    ) {
        this.transferId = transferId;
        this.stockName = stockName;
        this.stockIdentifier = stockIdentifier;
        this.stockQuantity = stockQuantity;
        this.stockPrice = stockPrice;
        this.transactionTotalPrice = transactionTotalPrice;
        this.balanceAfterOperation = balanceAfterOperation;
        this.operationType = operationType;
        this.creationDate = creationDate;
    }

    // Getters e setters
    public Long getTransferId() {
        return transferId;
    }

    public void setTransferId(Long transferId) {
        this.transferId = transferId;
    }

    public String getStockName() {
        return stockName;
    }

    public void setStockName(String stockName) {
        this.stockName = stockName;
    }

    public String getStockIdentifier() {
        return stockIdentifier;
    }

    public void setStockIdentifier(String stockIdentifier) {
        this.stockIdentifier = stockIdentifier;
    }

    public Integer getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public Double getStockPrice() {
        return stockPrice;
    }

    public void setStockPrice(Double stockPrice) {
        this.stockPrice = stockPrice;
    }

    public Double getTransactionTotalPrice() {
        return transactionTotalPrice;
    }

    public void setTransactionTotalPrice(Double transactionTotalPrice) {
        this.transactionTotalPrice = transactionTotalPrice;
    }

    public Double getBalanceAfterOperation() {
        return balanceAfterOperation;
    }

    public void setBalanceAfterOperation(Double balanceAfterOperation) {
        this.balanceAfterOperation = balanceAfterOperation;
    }

    public String getOperationType() {
        return operationType;
    }

    public void setOperationType(String operationType) {
        this.operationType = operationType;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }
}
