package app.back_end.user.dto.request;

public class SavingsToInvestmentsRequestDto {
    private Double amount;

    public SavingsToInvestmentsRequestDto() {}

    public SavingsToInvestmentsRequestDto(Double amount) {
        this.amount = amount;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }
}
