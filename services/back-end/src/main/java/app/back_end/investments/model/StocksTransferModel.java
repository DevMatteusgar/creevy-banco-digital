package app.back_end.investments.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name="stocks_transfers")
public class StocksTransferModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transfer_id")
    private Long transferId;

    @ManyToOne
    @JoinColumn(name = "stock_id", nullable = false)
    @JsonBackReference
    private StocksModel stock;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "America/Sao_Paulo")
    @Column(name = "creation_date")
    private LocalDateTime creationDate = LocalDateTime.now();

    @Column(name = "stock_name")
    private String stockName;

    @Column(name = "stock_identifier")
    private String stockIdentifier;

    @Column(name = "stock_quantity")
    private Integer stockQuantity;

    @Column(name = "stock_price")
    private Double stockPrice;

    @Column(name = "transaction_total_price")
    private Double transactionTotalPrice;

    @Column(name = "balance_after_operation")
    private Double balanceAfterOperation;

    @Column(name = "operation")
    private String operationType;

    public StocksTransferModel() {}

    public StocksTransferModel(
            StocksModel stock,
            Integer stockQuantity,
            Double stockPrice,
            Double balanceAfterOperation,
            String operationType,
            Double transactionTotalPrice
    ) {
        this.stock = stock;
        this.stockName = stock.getStockName();
        this.stockIdentifier = stock.getStockIdentifier();
        this.stockQuantity = stockQuantity;
        this.stockPrice = stockPrice;
        this.balanceAfterOperation = balanceAfterOperation;
        this.operationType = operationType;
        this.transactionTotalPrice = transactionTotalPrice;
    }

    // Getters

    public Long getTransferId() {
        return transferId;
    }

    public StocksModel getStock() {
        return stock;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public String getStockName() {
        return stockName;
    }

    public String getStockIdentifier() {
        return stockIdentifier;
    }

    public Integer getStockQuantity() {
        return stockQuantity;
    }

    public Double getStockPrice() {
        return stockPrice;
    }

    public Double getTransactionTotalPrice() {
        return transactionTotalPrice;
    }

    public Double getBalanceAfterOperation() {
        return balanceAfterOperation;
    }

    public String getOperationType() {
        return operationType;
    }
}
