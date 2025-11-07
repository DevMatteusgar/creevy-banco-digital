package app.back_end.transfer.dto.response;

public class TransferDtoResponse {

    private Long userId;
    private String operationType; // TransferSend ou TransferReceive
    private Double value;
    private Double balanceAfterOperation;
    private String message;

    public TransferDtoResponse(Long userId, String operationType, Double value,
                              Double balanceAfterOperation, String message) {
        this.userId = userId;
        this.operationType = operationType;
        this.value = value;
        this.balanceAfterOperation = balanceAfterOperation;
        this.message = message;
    }

    public Long getUserId() {
        return userId;
    }

    public String getMessage() {
        return message;
    }

    public Double getBalanceAfterOperation() {
        return balanceAfterOperation;
    }

    public Double getValue() {
        return value;
    }

    public String getOperationType() {
        return operationType;
    }
}
