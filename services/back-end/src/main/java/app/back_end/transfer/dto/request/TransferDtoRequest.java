package app.back_end.transfer.dto.request;

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
