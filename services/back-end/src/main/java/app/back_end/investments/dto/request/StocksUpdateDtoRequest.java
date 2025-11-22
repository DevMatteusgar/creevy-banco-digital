package app.back_end.investments.dto.request;

public class StocksUpdateDtoRequest {
    private String stockIdentifier;
    private Integer stockQuantity;

    public String getStockIdentifier() { return stockIdentifier; }
    public void setStockIdentifier(String stockIdentifier) { this.stockIdentifier = stockIdentifier; }

    public Integer getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; }
}

