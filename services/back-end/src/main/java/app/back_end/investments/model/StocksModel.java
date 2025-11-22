package app.back_end.investments.model;

import app.back_end.auth.model.UserModel;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="stocks")
public class StocksModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stock_id")
    private Long stockId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private UserModel user;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "America/Sao_Paulo")
    @Column(name = "creation_date")
    private LocalDateTime creationDate = LocalDateTime.now();

    @Column(name = "stock_name", nullable = false)
    private String stockName;

    @Column(name = "stock_identifier", nullable = false)
    private String stockIdentifier;

    @Column(name = "stock_quantity")
    private Integer stockQuantity = 0;

    @Column(name = "stock_price")
    private Double stockPrice = 0.00;

    @Column(name = "stock_total_value")
    private Double stockTotalValue = 0.00;

    @OneToMany(mappedBy = "stock", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<StocksTransferModel> stockTransfers = new ArrayList<>();

    @PrePersist
    @PreUpdate
    protected void updateTotals() {
        this.stockTotalValue = stockQuantity * stockPrice;
    }

    public StocksModel() {}

    public StocksModel(UserModel user, String stockName, String stockIdentifier,
                       Integer stockQuantity, Double stockPrice) {
        this.user = user;
        this.stockName = stockName;
        this.stockIdentifier = stockIdentifier;
        this.stockQuantity = stockQuantity;
        this.stockPrice = stockPrice;
        this.stockTotalValue = stockQuantity * stockPrice;
    }

    // Getters

    public Long getStockId() {
        return stockId;
    }

    public UserModel getUser() {
        return user;
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

    public Double getStockTotalValue() {
        return stockQuantity * stockPrice;
    }

    public List<StocksTransferModel> getStockTransfers() {
        return stockTransfers;
    }

    // Setters

    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
        updateTotals();
    }

    public void setStockPrice(Double stockPrice) {
        this.stockPrice = stockPrice;
        updateTotals();
    }
}
