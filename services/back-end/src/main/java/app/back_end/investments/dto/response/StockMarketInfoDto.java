package app.back_end.investments.dto.response;

public class StockMarketInfoDto {

    private String stockIdentifier;
    private String stockName;
    private Double price;
    private String currency;
    private Double marketCap;
    private String logoUrl;

    public StockMarketInfoDto(String stockIdentifier, String stockName,
                              Double price, String currency,
                              Double marketCap, String logoUrl) {
        this.stockIdentifier = stockIdentifier;
        this.stockName = stockName;
        this.price = price;
        this.currency = currency;
        this.marketCap = marketCap;
        this.logoUrl = logoUrl;
    }

    public String getStockIdentifier() { return stockIdentifier; }
    public String getStockName() { return stockName; }
    public Double getPrice() { return price; }
    public String getCurrency() { return currency; }
    public Double getMarketCap() { return marketCap; }
    public String getLogoUrl() { return logoUrl; }
}
