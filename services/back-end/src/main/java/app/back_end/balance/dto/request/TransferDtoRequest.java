package app.back_end.balance.dto.request;

public class TransferDtoRequest {

    private Long accountId;
    private Double transferValue;

    public Double getTransferValue() {
        return transferValue;
    }
    public Long getAccountId() {
        return accountId;
    }
}
