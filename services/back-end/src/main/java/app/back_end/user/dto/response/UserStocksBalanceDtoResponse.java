package app.back_end.user.dto.response;

import java.util.List;

public class UserStocksBalanceDtoResponse {

    private double totalInvested;
    private double totalCurrent;
    private double totalProfitValue;
    private double totalProfitPercent;
    private List<UserStockDetailDto> stocks;

    public UserStocksBalanceDtoResponse() {}

    public UserStocksBalanceDtoResponse(double totalInvested, double totalCurrent,
                                        double totalProfitValue, double totalProfitPercent,
                                        List<UserStockDetailDto> stocks) {
        this.totalInvested = totalInvested;
        this.totalCurrent = totalCurrent;
        this.totalProfitValue = totalProfitValue;
        this.totalProfitPercent = totalProfitPercent;
        this.stocks = stocks;
    }

    public double getTotalInvested() {
        return totalInvested;
    }

    public void setTotalInvested(double totalInvested) {
        this.totalInvested = totalInvested;
    }

    public double getTotalCurrent() {
        return totalCurrent;
    }

    public void setTotalCurrent(double totalCurrent) {
        this.totalCurrent = totalCurrent;
    }

    public double getTotalProfitValue() {
        return totalProfitValue;
    }

    public void setTotalProfitValue(double totalProfitValue) {
        this.totalProfitValue = totalProfitValue;
    }

    public double getTotalProfitPercent() {
        return totalProfitPercent;
    }

    public void setTotalProfitPercent(double totalProfitPercent) {
        this.totalProfitPercent = totalProfitPercent;
    }

    public List<UserStockDetailDto> getStocks() {
        return stocks;
    }

    public void setStocks(List<UserStockDetailDto> stocks) {
        this.stocks = stocks;
    }

    @Override
    public String toString() {
        return "UserStocksBalanceDtoResponse{" +
                "totalInvested=" + totalInvested +
                ", totalCurrent=" + totalCurrent +
                ", totalProfitValue=" + totalProfitValue +
                ", totalProfitPercent=" + totalProfitPercent +
                ", stocks=" + stocks +
                '}';
    }
}

