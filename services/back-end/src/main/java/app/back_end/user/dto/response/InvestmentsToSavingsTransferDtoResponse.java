package app.back_end.user.dto.response;

import java.time.LocalDateTime;

public class InvestmentsToSavingsTransferDtoResponse {

    private String operationType;
    private Double amount;
    private Double balanceAfterOperation;
    private String description;
    private LocalDateTime date;

    public InvestmentsToSavingsTransferDtoResponse(String operationType, Double amount,
                                                   Double balanceAfterOperation, String description,
                                                   LocalDateTime date) {
        this.operationType = operationType;
        this.amount = amount;
        this.balanceAfterOperation = balanceAfterOperation;
        this.description = description;
        this.date = date;
    }

    public String getOperationType() { return operationType; }
    public Double getAmount() { return amount; }
    public Double getBalanceAfterOperation() { return balanceAfterOperation; }
    public String getDescription() { return description; }
    public LocalDateTime getDate() { return date; }
}
