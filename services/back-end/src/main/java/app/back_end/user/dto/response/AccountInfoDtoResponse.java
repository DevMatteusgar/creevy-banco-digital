package app.back_end.user.dto.response;

public class AccountInfoDtoResponse {

    private Long accountId;
    private String accountName;
    private String accountCpf;

    public AccountInfoDtoResponse(Long accountId, String accountName, String accountCpf) {
        this.accountId = accountId;
        this.accountName = accountName;
        this.accountCpf = accountCpf;
    }

    public Long getAccountId() {
        return accountId;
    }
    public String getAccountName() {
        return accountName;
    }
    public String getAccountCpf() {
        return accountCpf;
    }
}
