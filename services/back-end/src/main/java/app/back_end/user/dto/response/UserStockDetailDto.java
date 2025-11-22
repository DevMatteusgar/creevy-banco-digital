package app.back_end.user.dto.response;

public class UserStockDetailDto {

    private String ticker;
    private String name;
    private int quantity;
    private double averagePrice;
    private double investedValue;
    private double currentPrice;
    private double currentValue;
    private double profitValue;
    private double profitPercent;

    public UserStockDetailDto() {}

    public UserStockDetailDto(String ticker, String name, int quantity, double averagePrice,
                              double investedValue, double currentPrice, double currentValue,
                              double profitValue, double profitPercent) {
        this.ticker = ticker;
        this.name = name;
        this.quantity = quantity;
        this.averagePrice = averagePrice;
        this.investedValue = investedValue;
        this.currentPrice = currentPrice;
        this.currentValue = currentValue;
        this.profitValue = profitValue;
        this.profitPercent = profitPercent;
    }

    public String getTicker() {
        return ticker;
    }

    public void setTicker(String ticker) {
        this.ticker = ticker;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getAveragePrice() {
        return averagePrice;
    }

    public void setAveragePrice(double averagePrice) {
        this.averagePrice = averagePrice;
    }

    public double getInvestedValue() {
        return investedValue;
    }

    public void setInvestedValue(double investedValue) {
        this.investedValue = investedValue;
    }

    public double getCurrentPrice() {
        return currentPrice;
    }

    public void setCurrentPrice(double currentPrice) {
        this.currentPrice = currentPrice;
    }

    public double getCurrentValue() {
        return currentValue;
    }

    public void setCurrentValue(double currentValue) {
        this.currentValue = currentValue;
    }

    public double getProfitValue() {
        return profitValue;
    }

    public void setProfitValue(double profitValue) {
        this.profitValue = profitValue;
    }

    public double getProfitPercent() {
        return profitPercent;
    }

    public void setProfitPercent(double profitPercent) {
        this.profitPercent = profitPercent;
    }

    @Override
    public String toString() {
        return "UserStockDetailDto{" +
                "ticker='" + ticker + '\'' +
                ", name='" + name + '\'' +
                ", quantity=" + quantity +
                ", averagePrice=" + averagePrice +
                ", investedValue=" + investedValue +
                ", currentPrice=" + currentPrice +
                ", currentValue=" + currentValue +
                ", profitValue=" + profitValue +
                ", profitPercent=" + profitPercent +
                '}';
    }
}


