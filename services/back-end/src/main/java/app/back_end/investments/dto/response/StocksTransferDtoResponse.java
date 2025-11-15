package app.back_end.investments.dto.response;

public class StocksTransferDtoResponse {

    private String stockName;
    private String stockIdentifier;
    private Integer stockQuantity;
    private Double stockPrice;
    private Double balanceAfterOperation;
    private String operationType;
    private Double transactionTotalPrice;

    public StocksTransferDtoResponse(String stockName,
                                     String stockIdentifier,
                                     Integer stockQuantity,
                                     Double stockPrice,
                                     Double balanceAfterOperation,
                                     String operationType,
                                     Double transactionTotalPrice) {

        this.stockName = stockName;
        this.stockIdentifier = stockIdentifier;
        this.stockQuantity = stockQuantity;
        this.stockPrice = stockPrice;
        this.balanceAfterOperation = balanceAfterOperation;
        this.operationType = operationType;
        this.transactionTotalPrice = transactionTotalPrice;
    }

    // Getters e setters
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

    public Double getTransactionTotalPrice() {
        return transactionTotalPrice;
    }

    public void setTransactionTotalPrice(Double transactionTotalPrice) {
        this.transactionTotalPrice = transactionTotalPrice;
    }
}
