package app.back_end.balance.dto.response;

import java.time.LocalDateTime;

public class DepositDtoResponse {

    private Long accountId;
    private String accountName;
    private String accountCpf;
    private String option;
    private Double value;
    private LocalDateTime createdAt;

    public DepositDtoResponse(Long accountId, String accountName, String accountCpf, String option, Double value) {
        this.accountId = accountId;
        this.accountName = accountName;
        this.accountCpf = accountCpf;
        this.option = option;
        this.value = value;
        this.createdAt = LocalDateTime.now();
    }

    public Long getAccountId() {
        return accountId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public Double getValue() {
        return value;
    }

    public String getAccountName() {
        return accountName;
    }

    public String getAccountCpf() {
        return accountCpf;
    }

    public String getOption() {
        return option;
    }
}
