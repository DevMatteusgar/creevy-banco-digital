package app.back_end.investments.dto.request;

public class StocksSellDtoRequest {

    private Integer stockQuantity;
    private String stockIdentifier;

    public Integer getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public String getStockIdentifier() {
        return stockIdentifier;
    }

    public void setStockIdentifier(String stockIdentifier) {
        this.stockIdentifier = stockIdentifier;
    }
}
