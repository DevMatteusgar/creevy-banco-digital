package app.back_end.user.dto.response;
import java.time.LocalDateTime;

public class SavingsToInvestmentsResponseDto {

    private Double amount;
    private Double savingsBalanceAfter;
    private Double investmentsBalanceAfter;
    private LocalDateTime date;

    public SavingsToInvestmentsResponseDto(Double amount,
                                           Double savingsBalanceAfter,
                                           Double investmentsBalanceAfter,
                                           LocalDateTime date) {
        this.amount = amount;
        this.savingsBalanceAfter = savingsBalanceAfter;
        this.investmentsBalanceAfter = investmentsBalanceAfter;
        this.date = date;
    }

    public Double getAmount() {
        return amount;
    }

    public Double getSavingsBalanceAfter() {
        return savingsBalanceAfter;
    }

    public Double getInvestmentsBalanceAfter() {
        return investmentsBalanceAfter;
    }

    public LocalDateTime getDate() {
        return date;
    }
}
