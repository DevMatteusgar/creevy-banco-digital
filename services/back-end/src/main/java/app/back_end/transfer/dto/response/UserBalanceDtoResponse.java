package app.back_end.transfer.dto.response;

public class UserBalanceDtoResponse {

    private Long id;
    private Double totalBalance;
    private Double savingsBalance;
    private Double investmentsBalance;

    public UserBalanceDtoResponse(Long id, Double totalBalance, Double savingsBalance, Double investmentsBalance) {
        this.id = id;
        this.totalBalance = totalBalance;
        this.savingsBalance = savingsBalance;
        this.investmentsBalance = investmentsBalance;
    }

    public Long getId() {
        return id;
    }

    public Double getTotalBalance() {
        return totalBalance;
    }

    public Double getInvestmentsBalance() {
        return investmentsBalance;
    }

    public Double getSavingsBalance() {
        return savingsBalance;
    }
}
