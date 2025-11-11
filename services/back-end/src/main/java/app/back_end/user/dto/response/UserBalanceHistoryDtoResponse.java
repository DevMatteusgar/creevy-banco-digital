package app.back_end.user.dto.response;

import java.time.LocalDateTime;

public class UserBalanceHistoryDtoResponse {

    private LocalDateTime date;
    private Double balance;

    public UserBalanceHistoryDtoResponse(LocalDateTime date, Double balance) {
        this.date = date;
        this.balance = balance;
    }

    public LocalDateTime getDate() { return date; }
    public void setDate(LocalDateTime date) { this.date = date; }
    public Double getBalance() { return balance; }
    public void setBalance(Double balance) { this.balance = balance; }
}
