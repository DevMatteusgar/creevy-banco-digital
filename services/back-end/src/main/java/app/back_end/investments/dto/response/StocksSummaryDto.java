package app.back_end.investments.dto.response;

public class StocksSummaryDto {

    private String stockIdentifier;
    private String stockName;
    private Integer stockQuantity;
    private Double stockPrice;
    private Double stockTotalValue;

    public StocksSummaryDto(String stockIdentifier, String stockName,
                            Integer stockQuantity, Double stockPrice,
                            Double stockTotalValue) {
        this.stockIdentifier = stockIdentifier;
        this.stockName = stockName;
        this.stockQuantity = stockQuantity;
        this.stockPrice = stockPrice;
        this.stockTotalValue = stockTotalValue;
    }

    public String getStockIdentifier() { return stockIdentifier; }
    public String getStockName() { return stockName; }
    public Integer getStockQuantity() { return stockQuantity; }
    public Double getStockPrice() { return stockPrice; }
    public Double getStockTotalValue() { return stockTotalValue; }
}

